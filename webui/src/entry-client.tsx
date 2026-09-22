import { StrictMode } from "react"
import { hydrateRoot } from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import App from "@/App"
import "@/index.css"

// The markup is prerendered per route at build time (scripts/prerender.mjs), so
// the client hydrates it instead of rendering from scratch: first paint is the
// real page, and the bundle only takes over the interactive parts.
const container = document.getElementById("root")
if (!container) throw new Error("#root is missing from index.html")

hydrateRoot(
  container,
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
