import path from "node:path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// Absolute asset URLs: the site serves nested paths (/info/acties.html) with an
// SPA fallback, and relative URLs would resolve against that directory.
export default defineConfig({
  base: "/",
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./src"),
    },
  },
  build: {
    outDir: path.resolve(import.meta.dirname, "../base/www"),
    emptyOutDir: true,
    rollupOptions: {
      output: {
        // Content-hashed names so a ConfigMap update cannot leave a browser
        // running a stale bundle from cache.
        entryFileNames: "index.[hash].js",
        assetFileNames: "index.[hash].[ext]",
      },
    },
  },
})
