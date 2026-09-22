import type { ReactNode } from "react"
import { PassThrough } from "node:stream"
import { renderToPipeableStream } from "react-dom/server"
import { StaticRouter } from "react-router"
import App from "@/App"

/**
 * Renders one route to a complete HTML document, for scripts/prerender.mjs.
 *
 * The document is rendered whole, so React 19 can hoist the page's title, meta
 * tags and structured data into the head while rendering - which is the point:
 * a crawler that never runs JavaScript still gets the finished page.
 *
 * `headTags` and `bodyTags` are the hashed asset tags from the client build
 * (stylesheet, module script, module preloads); they are passed in as elements
 * because only the build knows their names.
 */
export async function render(
  path: string,
  tags: { head?: ReactNode[]; body?: ReactNode[] } = {},
): Promise<string> {
  const stream = new PassThrough()
  let html = ""
  stream.on("data", (chunk: Buffer) => {
    html += chunk.toString()
  })

  await new Promise<void>((resolve, reject) => {
    const { pipe, abort } = renderToPipeableStream(
      <html lang="nl">
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="color-scheme" content="light" />
          <meta name="theme-color" content="#800000" />
          <link rel="icon" href="/favicon-32.png" sizes="32x32" />
          <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
          {tags.head}
        </head>
        <body>
          <div id="root">
            <StaticRouter location={path}>
              <App />
            </StaticRouter>
          </div>
          {tags.body}
        </body>
      </html>,
      {
        onAllReady: () => {
          pipe(stream)
          stream.on("end", resolve)
        },
        onError: reject,
      },
    )
    // A route that never settles should fail the build, not hang it.
    setTimeout(() => {
      abort()
      reject(new Error(`prerender timed out for ${path}`))
    }, 15_000)
  })

  return `<!doctype html>${html}`
}
