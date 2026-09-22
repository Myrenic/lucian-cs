// Prerenders every route to a real HTML file.
//
//     node scripts/prerender.mjs            # from webui/, after both builds
//
// The site is a React application, which normally means one `index.html` for
// every URL and a crawler that has to run JavaScript to see anything. This step
// removes that: each route is rendered with react-dom/server into the same
// markup the browser would produce, with the page's own title, description,
// canonical, Open Graph tags and structured data already in the head.
//
// What the client build emitted (hashed script and stylesheet tags) is read out
// of `base/www/index.html` and re-emitted into every page, so the files stay
// byte-identical apart from the metadata and the markup.
import { mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises"
import { createElement, Fragment } from "react"
import { dirname, join, resolve } from "node:path"

const root = resolve(import.meta.dirname, "..")
const www = resolve(root, "../base/www")
const ssrEntry = resolve(root, ".ssr/entry-server.js")

const content = JSON.parse(await readFile(join(root, "src/content/pages.json"), "utf8"))
const site = JSON.parse(await readFile(join(root, "src/content/site.json"), "utf8"))
const { render } = await import(ssrEntry)

/** "/" -> index.html, "/info/acties.html" -> info/acties.html */
const fileFor = (path) => (path === "/" ? "index.html" : path.replace(/^\//, ""))

const template = await readFile(join(www, "index.html"), "utf8")

/** Turns `<link rel="stylesheet" href="/x.css">` into a React element. */
function parseTags(html) {
  const tags = []
  for (const [, name, attributes] of html.matchAll(/<(link|script)\s([^>]*?)\/?>/g)) {
    const props = {}
    for (const [, key, value] of attributes.matchAll(/([\w-]+)(?:="([^"]*)")?/g)) {
      if (!key) continue
      // `crossorigin` and friends are boolean attributes; React wants `true`.
      props[key === "charset" ? "charSet" : key === "crossorigin" ? "crossOrigin" : key] =
        value === undefined ? "" : value
    }
    tags.push({ name, props })
  }
  return tags
}

/** The latin Rubik file, found in the stylesheet by its unicode-range. */
async function fontPreload() {
  const cssFile = (await readdir(www)).find((name) => name.endsWith(".css"))
  if (!cssFile) return null
  const css = await readFile(join(www, cssFile), "utf8")
  for (const [, block] of css.matchAll(/@font-face\{([^}]*)\}/g)) {
    const range = /unicode-range:([^;]*)/.exec(block)?.[1] ?? ""
    const url = /url\((?:"|')?([^"')]+)(?:"|')?\)/.exec(block)?.[1]
    if (url && range.includes("U+0000-00FF")) return url
  }
  return null
}

const assetTags = parseTags(template)
const head = assetTags
  .filter((tag) => tag.name === "link")
  .map((tag, index) => createElement(tag.name, { key: `head-${index}`, ...tag.props }))
const body = assetTags
  .filter((tag) => tag.name === "script")
  .map((tag, index) => createElement(tag.name, { key: `body-${index}`, ...tag.props }))

const font = await fontPreload()
if (font) {
  head.unshift(
    createElement("link", {
      key: "font-preload",
      rel: "preload",
      as: "font",
      type: "font/woff2",
      crossOrigin: "anonymous",
      href: font,
    }),
  )
}

if (!body.length) throw new Error("no module script in the client build - run `vite build` first")

const routes = [
  ...content.pages.map((page) => page.path),
  // A real 404 document: nginx serves it with a 404 status for unknown paths,
  // which is what stops the site reporting "not found" pages as 200.
  "/404.html",
]

// The client build's index.html is replaced by the prerendered homepage, so the
// template is read before anything is written.
for (const path of routes) {
  const html = await render(path, { head, body })
  const file = join(www, fileFor(path))
  await mkdir(dirname(file), { recursive: true })
  await writeFile(file, html)
}

const lastmod = (site.sourceUpdated ?? "").slice(0, 10)
const ordered = [...content.pages].sort((a, b) =>
  a.path === "/" ? -1 : b.path === "/" ? 1 : a.path.localeCompare(b.path),
)
const urls = ordered
  .filter((page) => page.path !== "/404.html")
  .map((page) => {
    const loc = page.path === "/" ? `${site.canonicalOrigin}/` : `${site.canonicalOrigin}${page.path}`
    return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`
  })
  .join("\n")

await writeFile(
  join(www, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
)

// The SSR bundle and the vite manifest are build inputs, not something to ship.
await rm(resolve(root, ".ssr"), { recursive: true, force: true })

const written = (await readdir(www, { recursive: true })).filter((file) => file.endsWith(".html"))
console.log(`prerendered ${written.length} routes + sitemap (${content.pages.length} URLs)`)
