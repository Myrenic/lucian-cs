import path from "node:path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// Absolute asset URLs: the site serves nested paths (/info/acties.html), and
// relative URLs would resolve against that directory.
//
// Two builds come out of this config: the client bundle (hashed, in ../base/www,
// which the ConfigMap builder packs) and the server bundle used once at build
// time to prerender every route (scripts/prerender.mjs). The server build needs
// a stable file name, the client build needs content-hashed ones.
export default defineConfig(({ isSsrBuild }) => ({
  base: "/",
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./src"),
    },
  },
  build: {
    // The server bundle stays inside the project so Node can resolve react and
    // react-dom from node_modules when the prerender script imports it.
    outDir: isSsrBuild
      ? path.resolve(import.meta.dirname, "./.ssr")
      : path.resolve(import.meta.dirname, "../base/www"),
    emptyOutDir: true,
    rollupOptions: {
      output: isSsrBuild
        ? { entryFileNames: "entry-server.js" }
        : {
            // Content-hashed names so a ConfigMap update cannot leave a browser
            // running a stale bundle from cache.
            entryFileNames: "index.[hash].js",
            assetFileNames: "index.[hash].[ext]",
          },
    },
  },
}))
