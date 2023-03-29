import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import { sentryVitePlugin } from "@sentry/vite-plugin";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode, ssrBuild: _ssrBuild }) => {
  if (command === "serve") {
    console.log(`Start serving...`);
  }

  const env = loadEnv(mode, process.cwd(), "");

  console.log("VITE_SITE_NAME in config:", env.VITE_SITE_NAME);

  return {
    build: {
      sourcemap: true,
    },
    plugins: [
      react(),
      sentryVitePlugin({
        org: "sotasuzuki",
        project: "react-vite-ssr",
        include: [
          {
            paths: ["./dist/client"],
            urlPrefix: "~",
          },
        ],
        authToken: env.SENTRY_AUTH_TOKEN,
        release: env.VITE_SENTRY_RELEASE,
      }),
    ],
  };
});
