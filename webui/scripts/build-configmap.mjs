// Packs the vite output in ../base/www into the ConfigMaps that Flux applies.
//
//     node scripts/build-configmap.mjs            # from webui/
//
// The cluster has no image registry, so the built site is committed as a
// ConfigMap and mounted into a stock nginx pod (same contract as
// mushroom-finder and mytops).
//
// Two objects, not one: a ConfigMap may not exceed 1 MiB, the JavaScript bundle
// already sits near it, and the photographs are the part that grows.
// `public/media/*` becomes its own ConfigMap, mounted next to the site at
// /media - which is also where index.html and the components already point.
//
// JavaScript and CSS go into `binaryData` even though they are text, because
// base64 is the only representation that survives the whole pipeline byte for
// byte. This bundle carries C1 control characters (U+0085 and friends) from a
// minified dependency, and a YAML round trip rewrites those - `kubectl kustomize`
// turns U+0085 into a space when it renders the ConfigMap, so the same content
// in `data` would reach the pod subtly corrupted. base64 costs a third more and
// removes the question. index.html stays plain `data` so it is easy to inspect.
import { readdir, readFile, writeFile } from "node:fs/promises"
import { dirname, join, relative, resolve } from "node:path"

const base = resolve(import.meta.dirname, "../../base")
const www = join(base, "www")
const MEDIA = "media"

const TEXT = /\.(html|map|txt|json|svg)$/
const OBJECT_LIMIT = 1024 * 1024

async function walk(dir) {
  const out = []
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) out.push(...(await walk(full)))
    else if (!entry.name.startsWith(".")) out.push(full)
  }
  return out
}

const files = []
for (const file of await walk(www)) {
  const path = relative(www, file).split("\\").join("/")
  const content = await readFile(file)
  if (TEXT.test(path)) {
    const text = content.toString("utf8")
    // A control character would mean the file is not UTF-8 text after all; the
    // cluster would reject it in `data`, so find out here.
    if (/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/.test(text)) {
      throw new Error(`${path} is not plain text - add its extension to the binary list`)
    }
  }
  files.push({ path, content })
}

/** ConfigMap keys may not contain a slash, so the two trees have to be flat. */
function pack(name, selected) {
  if (!selected.length) throw new Error(`${name} would be empty`)
  const data = {}
  const binaryData = {}
  for (const { path, content } of selected) {
    const key = path.startsWith(`${MEDIA}/`) ? path.slice(MEDIA.length + 1) : path
    if (key.includes("/")) throw new Error(`${name}: "${key}" is nested; ConfigMap keys are flat`)
    if (TEXT.test(path)) data[key] = content.toString("utf8")
    else binaryData[key] = content.toString("base64")
  }
  return {
    apiVersion: "v1",
    kind: "ConfigMap",
    metadata: { name },
    ...(Object.keys(data).length ? { data } : {}),
    ...(Object.keys(binaryData).length ? { binaryData } : {}),
  }
}

async function write(name, selected, out) {
  const object = pack(name, selected)
  const json = JSON.stringify(object, null, 2) + "\n"
  await writeFile(out, json)

  const bytes = Buffer.byteLength(json)
  const kib = Math.round(bytes / 1024)
  const counts = `${Object.keys(object.data ?? {}).length} text, ${Object.keys(object.binaryData ?? {}).length} binary`
  console.log(`wrote ${out} (${selected.length} files: ${counts}, ${kib} KiB)`)
  if (bytes > OBJECT_LIMIT) {
    throw new Error(
      `${name} is ${kib} KiB, over the cluster's 1 MiB object limit - ` +
        `split the largest asset group into its own ConfigMap`,
    )
  }
}

// Tailwind only emits utilities for class names it finds in the files listed by
// `@source` in src/index.css. When that list goes stale the site still builds
// and still runs - it just renders unstyled, which is exactly the kind of
// failure nobody notices until it is deployed. One sentinel per design area:
const SENTINELS = [
  // the site's own bands and type
  "bg-ink", // dark header/footer/testimonial bands
  "text-muted-foreground", // running text
  "max-w-page", // the page shell
  "max-w-measure", // article measure
  "shadow-card", // themed card shadow
  // one per generated directory, so a missing @source glob fails the build
  // instead of shipping a half-styled site
  "bg-card",
  "bg-primary",
]

const app = files.filter(({ path }) => !path.startsWith(`${MEDIA}/`))
const media = files.filter(({ path }) => path.startsWith(`${MEDIA}/`))

const stylesheet = app.find(({ path }) => path.endsWith(".css"))
if (!stylesheet) throw new Error("no stylesheet in the build output")
const missing = SENTINELS.filter((selector) => !stylesheet.content.includes(selector))
if (missing.length) {
  throw new Error(
    `the stylesheet is missing ${missing.join(", ")} - ` +
      `a directory with class names is not covered by @source in src/index.css`,
  )
}

await write("lucian-webui", app, join(base, "webui.configmap.json"))
await write("lucian-media", media, join(base, "media.configmap.json"))
