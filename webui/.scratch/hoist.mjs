import { renderToString, renderToPipeableStream } from "react-dom/server"
import { createElement as h } from "react"
import { PassThrough } from "node:stream"

const App = () => h("div", null,
  h("title", null, "Page title"),
  h("meta", { name: "description", content: "desc" }),
  h("link", { rel: "canonical", href: "https://example.com/x" }),
  h("p", null, "body"),
)

console.log("--- renderToString ---")
console.log(JSON.stringify(renderToString(h(App))))

const stream = new PassThrough()
let out = ""
stream.on("data", (c) => { out += c })
await new Promise((resolve) => {
  const { pipe } = renderToPipeableStream(h("html", null,
    h("head", null, h("meta", { charSet: "utf-8" }), h(App)),
    h("body", null, h("div", { id: "root" }, h("p", null, "hi"))),
  ), { onAllReady: () => { pipe(stream); stream.on("end", resolve) } })
})
console.log("--- renderToPipeableStream (document) ---")
console.log(out.slice(0, 700))
