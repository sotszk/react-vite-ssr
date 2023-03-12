import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import { createServer as createViteServer } from "vite";

const PORT = 5173;

// [x] import.meta.url には何が入るか
const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function createServer(
  root = process.cwd(),
  isProd = process.env.NODE_ENV === "production",
) {
  const app = express();

  let vite;

  if (!isProd) {
    // Vite server を Middleware モードで起動する
    // appType は 'custom' で
    vite = await createViteServer({
      root,
      server: { middlewareMode: true },
      appType: "custom",
    });

    // Vite の connect instance を Middleware として使う
    app.use(vite.middlewares);
  } else {
    app.use((await import("compression")).default());
    app.use(
      (await import("serve-static")).default(
        path.resolve(__dirname, "dist/client"),
        {
          index: false,
        },
      ),
    );
  }

  app.use("*", async (req, res, next) => {
    const url = req.originalUrl;

    try {
      const templatePath = isProd
        ? path.resolve(__dirname, "dist", "client", "index.html")
        : path.resolve(__dirname, "index.html");

      let template = fs.readFileSync(templatePath, "utf-8");
      let render;

      if (!isProd) {
        template = await vite.transformIndexHtml(url, template);
        const ssrModule = await vite.ssrLoadModule("/src/entry-server.tsx");
        render = ssrModule.render;
      } else {
        render = (await import("./dist/server/entry-server.js")).render;
      }

      // 4. app HTML をレンダリングする
      const appHtml = await render(url);

      // 5. app-rendered HTML を template に挿入する
      const html = template.replace(`<!--ssr-outlet-->`, appHtml);

      // 6. HTML を送り返す
      res.status(200).set({ "Content-Type": "text/html" }).end(html);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });

  app.listen(PORT, () => {
    console.log("Server running on %o", `http://localhost:${PORT}/`);
  });
}

createServer();
