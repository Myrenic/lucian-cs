// Packs the built site into the ConfigMaps that Flux applies.
//
//     node scripts/build-configmap.mjs            # from webui/, after prerender
//
// The cluster has no image registry, so the built site is committed as
// ConfigMaps and unpacked into an emptyDir by an initContainer before nginx
// serves it (base/deployment.yaml).
//
// Three objects, because a ConfigMap may not exceed 1 MiB and one bundle of
// prerendered HTML plus JavaScript does:
//
//   lucian-pages   the 42 prerendered pages and the sitemap
//   lucian-webui   hashed JavaScript, CSS, fonts, favicons
//   lucian-media   the photographs
//
// Two transformations make that fit, and both are undone by the initContainer:
//
//   * text is gzipped       - HTML and JavaScript are mostly repetition, and
//                             base64 costs a third on top of whatever is stored.
//                             fflate, not node:zlib, because zlib's output
//                             changes between Node builds; mtime 0 because the
//                             gzip header otherwise carries the current time.
//                             CI compares the committed ConfigMaps byte for byte
//   * "/" becomes "__"      - ConfigMap keys may not contain a slash, and the
//                             routes are nested (/info/acties.html)
import { createHash } from "node:crypto"
import { readdir, readFile, writeFile } from "node:fs/promises"
import { dirname, join, relative, resolve } from "node:path"
import { gzipSync } from "fflate"

const base = resolve(import.meta.dirname, "../../base")
const www = join(base, "www")

/** Compressible text: gzipped before storing, so nginx serves the bytes as-is. */
const GZIP = /\.(html|js|css|xml|json|txt|svg|map)$/
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

const files = await walk(www).then((all) => all.sort())
if (!files.length) throw new Error("base/www is empty - run the build first")

/** Which ConfigMap a file belongs to, by what it is for. */
function groupOf(path) {
  if (path.startsWith("media/")) return "media"
  if (path.endsWith(".html") || path === "sitemap.xml") return "pages"
  return "webui"
}

const groups = { pages: {}, webui: {}, media: {} }

for (const file of files) {
  const path = relative(www, file).split("\\").join("/")
  const content = await readFile(file)
  const group = groupOf(path)
  // The photographs are mounted straight into /media, so their keys carry no
  // directory; everything else is unpacked and keeps its path in the key.
  const key = (group === "media" ? path.slice("media/".length) : path).split("/").join("__")
  if (key.includes("/")) throw new Error(`unpackable key: ${key}`)

  if (GZIP.test(path)) {
    groups[group][`${key}.gz`] = Buffer.from(gzipSync(content, { level: 9, mtime: 0 })).toString("base64")
  } else {
    groups[group][key] = content.toString("base64")
  }
}

const NAMES = { pages: "lucian-pages", webui: "lucian-webui", media: "lucian-media" }
const written = []

for (const [group, binaryData] of Object.entries(groups)) {
  const keys = Object.keys(binaryData)
  if (!keys.length) throw new Error(`${group} would be empty`)

  const object = {
    apiVersion: "v1",
    kind: "ConfigMap",
    metadata: { name: NAMES[group] },
    binaryData,
  }
  const json = JSON.stringify(object, null, 2) + "\n"
  await writeFile(join(base, `${group}.configmap.json`), json)
  written.push(json)

  const bytes = Buffer.byteLength(json)
  const kib = Math.round(bytes / 1024)
  console.log(`wrote ${group}.configmap.json (${keys.length} files, ${kib} KiB)`)
  if (bytes > OBJECT_LIMIT) {
    throw new Error(
      `${NAMES[group]} is ${kib} KiB, over the cluster's 1 MiB object limit - ` +
        `move part of it into its own ConfigMap`,
    )
  }
}

// The initContainer unpacks these into an emptyDir when a pod starts, so a
// changed ConfigMap on its own would go unnoticed until the next restart: the
// Deployment carries a checksum of everything above, which changes the pod
// template and makes Flux roll the deployment.
const digest = createHash("sha256").update(written.join("")).digest("hex").slice(0, 32)
const deploymentPath = join(base, "deployment.yaml")
const deployment = await readFile(deploymentPath, "utf8")
const stamped = deployment.replace(/checksum\/config: "[^"]*"/, `checksum/config: "${digest}"`)
if (stamped === deployment) {
  throw new Error("deployment.yaml has no checksum/config annotation to update")
}
await writeFile(deploymentPath, stamped)

// Tailwind only emits utilities for class names it finds in the files listed by
// `@source` in src/index.css. When that list goes stale the site still builds
// and still runs - it just renders unstyled, which is exactly the kind of
// failure nobody notices until it is deployed. One sentinel per design area:
const SENTINELS = [
  "bg-ink", // dark header/footer/testimonial bands
  "text-muted-foreground", // running text
  "max-w-page", // the page shell
  "max-w-measure", // article measure
  "bg-card",
  "bg-primary",
]

const stylesheet = files.find((file) => file.endsWith(".css"))
if (!stylesheet) throw new Error("no stylesheet in the build output")
const css = await readFile(stylesheet, "utf8")
const missing = SENTINELS.filter((selector) => !css.includes(selector))
if (missing.length) {
  throw new Error(
    `the stylesheet is missing ${missing.join(", ")} - ` +
      `a directory with class names is not covered by @source in src/index.css`,
  )
}

const pages = await readdir(www, { recursive: true })
console.log(
  `packed ${pages.filter((f) => f.endsWith(".html")).length} pages, ` +
    `${pages.filter((f) => f.endsWith(".js")).length} script(s), ` +
    `${pages.filter((f) => f.endsWith(".css")).length} stylesheet(s)`,
)
