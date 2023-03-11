import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode, ssrBuild: _ssrBuild }) => {
  if (command === "serve") {
    console.log(`Start serving...`);
  }

  const env = loadEnv(mode, process.cwd(), "");
  console.log("VITE_SITE_NAME in config:", env.VITE_SITE_NAME);

  return {
    plugins: [react()],
  };
});
