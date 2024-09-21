import { defineConfig, loadEnv } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import dotenv from "dotenv";
import path from "path";

export default defineConfig(({ command, mode }) => {
  const MODE = process.env.NODE_ENV || "production";
  dotenv.config({
    path: path.join(path.resolve(), ".env"),
  });

  const env = loadEnv(mode, process.cwd(), "");

  const host = process.env.HOST;
  const port = +(process.env.PORT || 5000);

  return {
    define: {
      __APP_ENV__: JSON.stringify(env.APP_ENV),
      "process.env": {
        MODE,
      },
    },
    server: {
      host,
      port,
    },
    plugins: [tsconfigPaths()],
  };
});
