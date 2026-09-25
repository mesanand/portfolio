/// <reference types="vitest/config" />
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { imagetools } from "vite-imagetools";

export default defineConfig({
  plugins: [react(), imagetools()],
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
});
