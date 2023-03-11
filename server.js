import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import { createServer as createViteServer } from "vite";

// [ ] import.meta.url には何が入るか
const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function createServer() {
  const app = express();

  // Vite server を Middleware モードで起動する
  // appType は 'custom' で
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: "custom",
  });

  // Vite の connect instance を Middleware として使う
  app.use(vite.middlewares);

  app.use("*", async (req, res, next) => {
    const url = req.originalUrl;

    try {
      // 1. index.html を読み込む
      let template = fs.readFileSync(
        path.resolve(__dirname, "index.html"),
        "utf-8",
      );

      // 2. Vite HTML Transform を適用する。
      template = await vite.transformIndexHtml(url, template);

      // 3. server entry ファイルを読み込む
      const { render } = await vite.ssrLoadModule("/src/entry-server.tsx");

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

  app.listen(5173);
}

createServer();
