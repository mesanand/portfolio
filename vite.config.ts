/// <reference types="vitest/config" />
import { existsSync } from "node:fs";
import type { IncomingMessage, ServerResponse } from "node:http";
import { fileURLToPath, URL } from "node:url";
import { defineConfig, loadEnv, type Connect, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import { imagetools } from "vite-imagetools";

type Handler = (req: IncomingMessage, res: ServerResponse) => unknown;

/**
 * Serves api/<name>.ts at /api/<name> in `pnpm dev` and `pnpm preview`, the
 * same handlers Vercel runs in production. No Vercel CLI or login needed.
 */
function localApi(): Plugin {
  const middleware =
    (load: (file: string) => Promise<{ default?: unknown }>): Connect.NextHandleFunction =>
    async (req, res, next) => {
      const name = /^\/api\/([\w-]+)(?:[/?]|$)/.exec(req.url ?? "")?.[1];
      const file = name && `./api/${name}.ts`;
      if (!file || !existsSync(file)) return next();
      try {
        const mod = await load(file);
        if (typeof mod.default !== "function") return next();
        await (mod.default as Handler)(req, res);
      } catch (err) {
        next(err);
      }
    };
  return {
    name: "local-api",
    configureServer(server) {
      server.middlewares.use(middleware((file) => server.ssrLoadModule(file)));
    },
    configurePreviewServer(server) {
      server.middlewares.use(
        middleware(async (file) => {
          const { tsImport } = await import("tsx/esm/api");
          return tsImport(file, import.meta.url);
        }),
      );
    },
  };
}

export default defineConfig(({ mode }) => {
  // Make .env.local (GITHUB_TOKEN) visible to the local API handlers. Never exposed to the client:
  // only VITE_-prefixed variables reach the bundle.
  const env = loadEnv(mode, process.cwd(), "");
  if (env.GITHUB_TOKEN && !process.env.GITHUB_TOKEN) process.env.GITHUB_TOKEN = env.GITHUB_TOKEN;

  return {
    plugins: [react(), imagetools(), localApi()],
    define: {
      // Vercel sets VERCEL=1 in its build environment.
      __ON_VERCEL__: JSON.stringify(Boolean(process.env.VERCEL)),
    },
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    test: {
      include: ["src/test/**/*.test.ts"],
      environment: "node",
    },
  };
});
