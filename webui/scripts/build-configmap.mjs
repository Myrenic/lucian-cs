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
//   lucian-pages-a  } the 42 prerendered pages and the sitemap, in two halves.
//   lucian-pages-b  } the stylesheet is inlined into every page, so they are big
//   lucian-webui    hashed JavaScript, fonts, favicons
//   lucian-media    the photographs
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
import { readdir, readFile, rm, writeFile } from "node:fs/promises"
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

// The pages are split in two, always, because the inlined stylesheet makes each
// page ~14 KiB: one object of 42 of them is 90% of the 1 MiB ceiling, and the
// site is expected to grow. Two halves keep both objects at half of that.
const NAMES = {
  "pages-a": "lucian-pages-a",
  "pages-b": "lucian-pages-b",
  webui: "lucian-webui",
  media: "lucian-media",
}

const pageKeys = Object.keys(groups.pages)
const halves = {
  "pages-a": Object.fromEntries(Object.entries(groups.pages).slice(0, Math.ceil(pageKeys.length / 2))),
  "pages-b": Object.fromEntries(Object.entries(groups.pages).slice(Math.ceil(pageKeys.length / 2))),
}

const written = []
const outputs = new Set()

for (const [group, binaryData] of Object.entries({ ...halves, webui: groups.webui, media: groups.media })) {
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
  outputs.add(`${group}.configmap.json`)
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

// A renamed or dropped object must not survive on disk: the stale file would
// still be referenced by kustomization.yaml and applied, which is exactly how a
// page ConfigMap kept being served while the Deployment moved to new names.
for (const file of await readdir(base)) {
  if (file.endsWith(".configmap.json") && !outputs.has(file)) {
    await rm(join(base, file), { force: true })
    console.log(`removed stale ${file}`)
  }
}

// The initContainer unpacks these into an emptyDir when a pod starts, so a
// changed ConfigMap on its own would go unnoticed until the next restart: the
// Deployment carries a checksum of everything above, which changes the pod
// template and makes Flux roll the deployment.
const digest = createHash("sha256").update(written.join("")).digest("hex").slice(0, 32)
const deploymentPath = join(base, "deployment.yaml")
const deployment = await readFile(deploymentPath, "utf8")
if (!/checksum\/config: "[^"]*"/.test(deployment)) {
  throw new Error("deployment.yaml has no checksum/config annotation to update")
}
// Rewriting it to the same value is the normal case: nothing changed.
await writeFile(deploymentPath, deployment.replace(/checksum\/config: "[^"]*"/, `checksum/config: "${digest}"`))

const pages = await readdir(www, { recursive: true })
console.log(
  `packed ${pages.filter((f) => f.endsWith(".html")).length} pages, ` +
    `${pages.filter((f) => f.endsWith(".js")).length} script(s), ` +
    `${pages.filter((f) => f.endsWith(".css")).length} stylesheet(s)`,
)
