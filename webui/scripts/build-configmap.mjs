// Packs the vite output in ../base/www into the ConfigMap that Flux applies.
//
//     node scripts/build-configmap.mjs            # from webui/
//
// The cluster has no image registry, so the built site is committed as a
// ConfigMap and mounted into a stock nginx pod (same contract as
// mushroom-finder and mytops).
//
// Text files stay plain `data` and only fonts and images become `binaryData`:
// base64 costs a third of the payload, and the cluster stores this object in
// etcd, whose ConfigMap cap is 1 MiB. The build fails rather than ship a
// bundle Flux cannot apply.
import { readdir, readFile, writeFile } from "node:fs/promises"
import { join, resolve } from "node:path"

const base = resolve(import.meta.dirname, "../../base")
const www = join(base, "www")
const out = join(base, "webui.configmap.json")

const TEXT = /\.(html|js|css|map|txt|json|svg)$/
const OBJECT_LIMIT = 1024 * 1024

const files = (await readdir(www)).filter((name) => !name.startsWith("."))
const data = {}
const binaryData = {}

for (const name of files) {
  const content = await readFile(join(www, name))
  if (TEXT.test(name)) {
    const text = content.toString("utf8")
    // A control character would mean the file is not UTF-8 text after all; the
    // cluster would reject it in `data`, so find out here.
    if (/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/.test(text)) {
      throw new Error(`${name} is not plain text - add its extension to the binary list`)
    }
    data[name] = text
  } else {
    binaryData[name] = content.toString("base64")
  }
}

// Tailwind only emits utilities for class names it finds in the files listed by
// `@source` in src/index.css. When that list goes stale the site still builds
// and still runs - it just renders unstyled, which is exactly the kind of
// failure nobody notices until it is deployed. One sentinel per design area:
const SENTINELS = [
  "bg-band", // header, service band, footer
  "h-nav", // fixed header height
  "bg-maroon-deep", // buttons and testimonial overlay
  "text-maroon", // prose headings
  "max-w-text", // article column
  "min-h-\\[460px\\]", // hero
  "list-\\[circle\\]", // prose bullets
  "bg-field", // form inputs
  "grid-cols-4", // footer columns
  "peer-checked\\:top-nav", // mobile menu
]

const css = Object.entries(data).find(([name]) => name.endsWith(".css"))
if (!css) throw new Error("no stylesheet in the build output")
const missing = SENTINELS.filter((selector) => !css[1].includes(selector))
if (missing.length) {
  throw new Error(
    `the stylesheet is missing ${missing.join(", ")} - ` +
      `a directory with class names is not covered by @source in src/index.css`,
  )
}

const configMap = {
  apiVersion: "v1",
  kind: "ConfigMap",
  metadata: { name: "lucian-webui" },
  data,
  binaryData,
}

const json = JSON.stringify(configMap, null, 2) + "\n"
await writeFile(out, json)

const bytes = Buffer.byteLength(json)
const kib = (n) => Math.round(n / 1024)
console.log(
  `wrote ${out} (${files.length} files: ${Object.keys(data).length} text, ` +
    `${Object.keys(binaryData).length} binary, ${kib(bytes)} KiB)`,
)

if (bytes > OBJECT_LIMIT) {
  throw new Error(
    `webui ConfigMap is ${kib(bytes)} KiB, over the cluster's 1 MiB object limit - ` +
      `split the images into their own ConfigMap and mount them separately`,
  )
}
