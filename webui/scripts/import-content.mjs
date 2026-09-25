// Imports luciancs.nl into this repository.
//
//     node scripts/import-content.mjs            # from webui/
//
// The original site is WordPress; its REST API exposes every page as rendered
// HTML (41 pages, one entry per page). That is the import source: the WordPress
// editor output, not the browser output, so no theme chrome is mixed into page
// bodies. The theme chrome - navigation, hero, footer - lives in the rendered
// templates instead, so it is scraped from the live pages once and stored as
// site.json.
//
// Page HTML is converted into a small block/inline AST (see src/lib/content.ts)
// rather than kept as HTML strings: the rebuild owns the markup, and the input
// vocabulary is tiny (p, h1-h3, ul/li, hr, strong, em, span, a).
//
// Two guards run per page, because a silent partial import is the failure mode
// that shipping this would otherwise hide:
//   * every character of source text must survive into the AST, and
//   * headings, lists, rules, forms and links must be accounted for one to one.
//
// Output is committed, so a rebuild never depends on the site staying online:
//   src/content/pages.json, src/content/site.json
//   public/*, src/assets/*            (theme images and fonts, renamed flat)
import { createHash } from "node:crypto"
import { execFileSync } from "node:child_process"
import { mkdir, readdir, readFile, rm, writeFile } from "node:fs/promises"
import { tmpdir } from "node:os"
import { basename, dirname, join, resolve } from "node:path"
import { selectAll, selectOne } from "css-select"
import { textContent } from "domutils"
import { parseDocument } from "htmlparser2"

const ORIGIN = "https://www.luciancs.nl"

/** Logical name -> fingerprinted path, written to src/content/media.json. */
const media = {}

/** The domain the site will live on, once it leaves the preview host. Kept here
 *  because canonicals, Open Graph URLs and the sitemap all need one source. */
const CANONICAL_ORIGIN = "https://www.luciancs.nl"
const root = resolve(import.meta.dirname, "..")
const contentDir = join(root, "src/content")

// ---------------------------------------------------------------- fetch utils

async function getJson(url) {
  const res = await fetch(url, { headers: { "user-agent": "lucian-cs-import/1.0" } })
  if (!res.ok) throw new Error(`${res.status} ${url}`)
  return res.json()
}

async function getText(url) {
  const res = await fetch(url, { headers: { "user-agent": "lucian-cs-import/1.0" } })
  if (!res.ok) throw new Error(`${res.status} ${url}`)
  return res.text()
}

async function getBinary(url) {
  const res = await fetch(url, { headers: { "user-agent": "lucian-cs-import/1.0" } })
  if (!res.ok) throw new Error(`${res.status} ${url}`)
  return Buffer.from(await res.arrayBuffer())
}

async function pool(items, limit, fn) {
  const out = new Array(items.length)
  let next = 0
  await Promise.all(
    Array.from({ length: Math.min(limit, items.length) }, async () => {
      while (next < items.length) {
        const i = next++
        out[i] = await fn(items[i], i)
      }
    }),
  )
  return out
}

async function download(url, relativePath) {
  const buf = await getBinary(url)
  const target = join(root, relativePath)
  await mkdir(dirname(target), { recursive: true })
  await writeFile(target, buf)
  return { name: relativePath, bytes: buf.byteLength }
}

/**
 * Re-encodes a photo before storing it.
 *
 * The originals are print-sized (1280px wide, 84 KiB for a picture that only
 * ever shows through an 80% dark veil). They are committed and packed into a
 * ConfigMap that has a 1 MiB ceiling, so the weight matters; ffmpeg is the one
 * external tool the import needs.
 */
/**
 * Runs a downloaded image through ffmpeg before storing it.
 *
 * The originals are print-sized (2000px wide) and these files are committed and
 * packed into a ConfigMap with a size ceiling, so they are re-encoded on the way
 * in. ffmpeg is the one external tool the import needs.
 */
/**
 * Stores a media file under a content-addressed name: `/media/denker.<hash>.avif`.
 *
 * Two reasons. Fingerprinted names may be cached for a year instead of a week
 * (Lighthouse says so, and it is true), and the hero has to ship several widths
 * - the original is 2000px wide for a slot that is often 400px.
 */
async function downloadMedia(url, key, extension, filter, encode) {
  const name = await downloadImage(url, `public/media/${key}.${extension}`, filter, encode)
  const bytes = await readFile(join(root, `public/media/${key}.${extension}`))
  const digest = createHash("sha256").update(bytes).digest("hex").slice(0, 8)
  const hashed = `${key}.${digest}.${extension}`
  await rm(join(root, `public/media/${key}.${extension}`), { force: true })
  await writeFile(join(root, `public/media/${hashed}`), bytes)
  media[key] = `/media/${hashed}`
  return { name: hashed, bytes: bytes.byteLength }
}

async function downloadImage(url, relativePath, filter, encode) {
  const source = await getBinary(url)
  const target = join(root, relativePath)
  await mkdir(dirname(target), { recursive: true })
  const input = join(tmpdir(), `lucian-import-${basename(relativePath)}`)
  const output = join(tmpdir(), `lucian-import-out-${basename(relativePath)}`)
  await writeFile(input, source)
  try {
    execFileSync("ffmpeg", ["-y", "-loglevel", "error", "-i", input, "-vf", filter, ...encode, output], {
      stdio: ["ignore", "inherit", "inherit"],
    })
  } catch (error) {
    throw new Error(`re-encoding ${relativePath} needs ffmpeg on PATH: ${error.message}`)
  }
  const buf = await readFile(output)
  await writeFile(target, buf)
  await rm(input, { force: true })
  await rm(output, { force: true })
  if (buf.byteLength >= source.byteLength) {
    throw new Error(`${relativePath}: re-encode produced ${buf.byteLength} bytes, larger than the original`)
  }
  return { name: relativePath, bytes: buf.byteLength }
}


// -------------------------------------------------------------- HTML helpers
//
// htmlparser2 rather than node-html-parser: the source markup is messy, and
// node-html-parser's error recovery silently rewrote it (it dropped the
// .container wrapper and lifted <li> elements out of their <ul>), which turned
// lists into loose paragraphs. This parser keeps the tree as written and
// decodes entities once, so both the import and its text guard agree.

const parse = (html) => parseDocument(html, { decodeEntities: true })

const isTag = (node) => node?.type === "tag"
const tagOf = (node) => (isTag(node) ? node.name.toLowerCase() : "")
const attr = (node, name) => (isTag(node) ? (node.attribs[name] ?? "") : "")
const children = (node) => node?.children ?? []
// css-select only searches element nodes: a Document has to be entered through
// its children, and every lookup here wants descendants, never the node itself.
const searchFrom = children
const find = (selector, node) => selectOne(selector, searchFrom(node))
const findAll = (selector, node) => selectAll(selector, searchFrom(node))
const textOf = (node) => (node ? textContent(node) : "")

const classesOf = (node) => attr(node, "class").split(/\s+/).filter(Boolean)
const hasClass = (node, name) => classesOf(node).includes(name)
const classStarting = (node, prefix) => classesOf(node).find((c) => c.startsWith(prefix)) ?? ""

const collapse = (s) => s.replace(/\s+/g, " ")

// ------------------------------------------------------------ inline / blocks

/** Colour / weight / decoration hints the original markup encodes per element. */
const accentRe = /#800000|rgb\(128,\s*0,\s*0\)|rgb\(80,\s*0,\s*0\)/
const mutedRe = /#767676|rgb\(118,\s*118,\s*118\)/
const isAccent = (style = "") => accentRe.test(style.toLowerCase())

/** Weight comes from inline style or the theme's `mbr-bold` utility class. */
const isBold = (node) =>
  hasClass(node, "mbr-bold") || /font-weight\s*:\s*(bold|[6-9]00)/.test(attr(node, "style"))

/** Declared font-size in rem, when the markup sets one. */
const declaredRem = (style = "") => {
  const m = /font-size\s*:\s*([0-9.]+)rem/.exec(style)
  return m ? Number(m[1]) : undefined
}

function marksFromStyle(style = "") {
  const s = style.toLowerCase()
  const marks = []
  if (/font-weight\s*:\s*(bold|[6-9]00)/.test(s)) marks.push("strong")
  if (/text-decoration[^;]*underline/.test(s)) marks.push("underline")
  if (isAccent(s)) marks.push("accent")
  if (mutedRe.test(s)) marks.push("muted")
  return marks
}

const mergeText = (nodes) => {
  const out = []
  for (const node of nodes) {
    const last = out[out.length - 1]
    if (node.t === "text" && last?.t === "text") last.v += node.v
    else out.push(node)
  }
  return out
}

/** Keeps a single optional space between words that markup split apart. */
function trimInline(nodes) {
  const out = mergeText(nodes)
  const first = out[0]
  if (first?.t === "text") first.v = first.v.replace(/^[\s\u00a0]+/, "")
  const last = out[out.length - 1]
  if (last?.t === "text") last.v = last.v.replace(/[\s\u00a0]+$/, "")
  return out.filter((n) => n.t !== "text" || n.v !== "")
}

const path = (url) => (url.startsWith(ORIGIN) ? url.slice(ORIGIN.length) : url)

function normaliseHref(href) {
  // The original mixes absolute luciancs.nl links, root-relative links and a
  // typo'd `mob:` scheme; all internal links become absolute paths.
  const trimmed = href.trim()
  if (trimmed.startsWith(ORIGIN)) return trimmed.slice(ORIGIN.length)
  if (/^(mailto:|tel:|https?:\/\/)/.test(trimmed)) return trimmed
  if (trimmed.startsWith("mob:")) return `tel:${trimmed.slice(4).trim().replace(/\D/g, "")}`
  return path(trimmed)
}

function decodeCfEmail(hex) {
  const key = parseInt(hex.slice(0, 2), 16)
  let out = ""
  for (let i = 2; i < hex.length; i += 2) {
    out += String.fromCharCode(parseInt(hex.slice(i, i + 2), 16) ^ key)
  }
  return out
}

function inlineOf(node) {
  const tag = tagOf(node)
  const style = attr(node, "style")
  switch (tag) {
    case "br":
      return { t: "br" }
    case "strong":
    case "b":
      return { t: "span", marks: ["strong"], c: inlines(node) }
    case "em":
    case "i":
      return { t: "span", marks: ["em"], c: inlines(node) }
    case "u":
      return { t: "span", marks: ["underline"], c: inlines(node) }
    case "a": {
      const href = attr(node, "href").trim()
      const protected_ = /\/cdn-cgi\/l\/email-protection#([0-9a-f]+)/i.exec(href)
      if (protected_) {
        // Cloudflare's protected address: the real mailto is only in the
        // obfuscated fragment, and the visible text is a placeholder.
        const email = decodeCfEmail(protected_[1]).trim()
        return { t: "link", href: `mailto:${email}`, c: [{ t: "text", v: email }] }
      }
      return {
        t: "link",
        href: normaliseHref(href),
        c: inlines(node),
        ...(/background-color|border-radius/.test(style) ? { button: true } : {}),
        ...(/^https?:\/\//.test(href) && !href.includes("luciancs.nl") ? { external: true } : {}),
      }
    }
    case "span": {
      // The Cloudflare email protector: keep its placeholder text out of the
      // output, site.json carries the decoded address instead.
      if (hasClass(node, "__cf_email__")) return null
      return { t: "span", marks: marksFromStyle(style), c: inlines(node) }
    }
    default:
      return inlines(node)
  }
}

function inlines(parent) {
  const out = []
  for (const child of children(parent)) {
    if (child.type === "text") {
      const value = collapse(child.data)
      if (value) out.push({ t: "text", v: value })
      continue
    }
    if (child.type !== "tag") continue
    const node = inlineOf(child)
    if (node) (Array.isArray(node) ? out.push(...node) : out.push(node))
  }
  return trimInline(out)
}

const BLOCK_TAGS = new Set([
  "address", "article", "aside", "blockquote", "div", "dl", "fieldset", "figure", "footer",
  "header", "main", "nav", "ol", "p", "section", "table", "ul",
])

/** Tags whose content the rebuild re-implements or drops on purpose. */
const SKIPPED_TAGS = new Set(["script", "style"])

const isHeading = (tag) => /^h[1-6]$/.test(tag)
const isBlockElement = (node) => isHeading(tagOf(node)) || BLOCK_TAGS.has(tagOf(node))

/**
 * Collects the items of one <li>.
 *
 * The source has a list item containing another list item
 * (`<li><span>text<li>text</li></span></li>`). A browser closes the outer item
 * at that point and renders them as siblings, so the same is done here rather
 * than letting the nested text be swallowed into the outer item.
 */
function listItems(li, items) {
  let buffer = []
  const flush = () => {
    const c = trimInline(buffer)
    buffer = []
    if (c.length) items.push(c)
  }
  const visit = (node) => {
    for (const child of children(node)) {
      if (tagOf(child) === "li") {
        flush()
        visit(child)
        continue
      }
      if (child.type === "text") {
        const value = collapse(child.data)
        if (value) buffer.push({ t: "text", v: value })
        continue
      }
      if (child.type !== "tag") continue
      if (findAll("li", child).length) {
        visit(child)
        continue
      }
      const node_ = inlineOf(child)
      if (node_) (Array.isArray(node_) ? buffer.push(...node_) : buffer.push(node_))
    }
  }
  visit(li)
  flush()
}

function blocks(node, out = [], align) {
  // Inline content sitting directly in a container still has to survive: the
  // source has whole paragraphs without <p> tags, CTA links in bare <div>s and
  // one <ul> whose items are <div>s. Collect that content and flush it into a
  // paragraph whenever a real block element interrupts it.
  let pending = []
  const flush = () => {
    if (!pending.length) return
    const c = trimInline(pending)
    pending = []
    if (c.length) out.push({ t: "paragraph", c, ...(align ? { align } : {}) })
  }

  const handle = (child) => {
    if (child.type === "text") {
      const value = collapse(child.data)
      if (value) pending.push({ t: "text", v: value })
      return
    }
    if (child.type !== "tag") return
    const tag = tagOf(child)
    if (SKIPPED_TAGS.has(tag)) return
    const style = attr(child, "style")
    // text-align is the only layout hint the source puts on elements and on
    // containers (a centred call-to-action, the contact form heading).
    const childAlign = /text-align\s*:\s*center/.test(style) ? "center" : align

    // A container carrying inline styling (the source wraps single sentences in
    // <div style="font-weight: bold">) is a text run, not a block.
    const marks = marksFromStyle(style)
    if (BLOCK_TAGS.has(tag) && marks.length && !children(child).some(isBlockElement)) {
      pending.push({ t: "span", marks, c: inlines(child) })
      return
    }

    if (isHeading(tag)) {
      flush()
      const size = declaredRem(style)
      out.push({
        t: "heading",
        level: Number(tag[1]),
        accent: isAccent(style),
        ...(size === undefined ? {} : { size }),
        ...(isBold(child) ? { strong: true } : {}),
        ...(childAlign ? { align: childAlign } : {}),
        c: inlines(child),
      })
    } else if (tag === "p") {
      flush()
      const c = inlines(child)
      if (c.length) out.push({ t: "paragraph", c, ...(childAlign ? { align: childAlign } : {}) })
    } else if (tag === "ul" || tag === "ol") {
      flush()
      // Consecutive <li>s become one list; anything else inside a list (the
      // source has <ul>s holding <div>s) keeps flowing through the normal path.
      let items = []
      const flushList = () => {
        const c = items.filter((i) => i.length)
        items = []
        if (c.length) out.push({ t: "list", ordered: tag === "ol", c })
      }
      for (const item of children(child)) {
        if (tagOf(item) === "li") {
          listItems(item, items)
          continue
        }
        // Whitespace and comments between <li>s are formatting, not content:
        // treating them as "something else" would close the list after every
        // item and turn one list into one list per bullet.
        if (item.type === "comment" || (item.type === "text" && item.data.trim() === "")) continue
        flushList()
        handle(item)
      }
      flushList()
      flush()
    } else if (tag === "hr") {
      flush()
      out.push({ t: "divider", accent: isAccent(style) })
    } else if (tag === "form") {
      // Only the form element itself: an ancestor that merely *contains* the
      // form (the Contact Form 7 wrapper, or any container) has to be walked,
      // or its other children are lost.
      flush()
      out.push({ t: "contactForm" })
    } else if (tag === "table" || tag === "iframe" || tag === "img" || tag === "video") {
      throw new Error(`unhandled element <${tag}>: extend the import, do not drop it silently`)
    } else if (BLOCK_TAGS.has(tag)) {
      flush()
      blocks(child, out, childAlign)
    } else {
      const node = inlineOf(child)
      if (node) (Array.isArray(node) ? pending.push(...node) : pending.push(node))
    }
  }

  for (const child of children(node)) handle(child)
  flush()
  return out
}

// ------------------------------------------------------------------- guards

/** All text in the converted content, for comparison against the source. */
function contentText(sections) {
  const inlineText = (nodes) =>
    nodes
      .map((n) => {
        switch (n.t) {
          case "text":
            return n.v
          case "link":
          case "span":
            return inlineText(n.c)
          default:
            return ""
        }
      })
      .join("")

  return sections
    .map((section) => {
      switch (section.t) {
        case "banner":
          return section.heading
        case "services":
          return section.cards.map((c) => c.title + inlineText(c.lead) + c.items.join("")).join("")
        case "testimonials":
          return section.items.map((i) => i.quote + i.name + i.role).join("")
        case "prose":
          return section.blocks
            .map((b) => {
              if (b.t === "heading" || b.t === "paragraph") return inlineText(b.c)
              if (b.t === "list") return b.c.map(inlineText).join("")
              return ""
            })
            .join("")
        default:
          return ""
      }
    })
    .join("")
}

/** Whitespace-insensitive text of the source markup, form controls excluded. */
function sourceText(doc) {
  const parts = []
  const walk = (node) => {
    for (const child of children(node)) {
      if (child.type === "text") parts.push(child.data)
      else if (child.type === "tag") {
        if (SKIPPED_TAGS.has(tagOf(child)) || tagOf(child) === "form") continue
        walk(child)
      }
    }
  }
  walk(doc)
  return collapse(parts.join(""))
}

/**
 * Whitespace and quotation marks are excluded from the text comparison: the
 * source wraps quotes in their own `"`, and the site sets them typographically
 * instead, so those characters are presentational. Everything else still has to
 * match exactly.
 */
const strip = (s) => s.replace(/[\s"“”]+/g, "")

function assertSameText(sections, doc, page) {
  const source = strip(sourceText(doc))
  const converted = strip(contentText(sections))
  if (source === converted) return
  const at = [...source].findIndex((ch, i) => ch !== converted[i])
  throw new Error(
    `${page}: converted text differs from the source at offset ${at}\n` +
      `  source:    ${JSON.stringify(source.slice(Math.max(0, at - 60), at + 60))}\n` +
      `  converted: ${JSON.stringify(converted.slice(Math.max(0, at - 60), at + 60))}`,
  )
}

/** Elements of `name` that are not part of a form (the contact form is not
 *  imported as markup, so its controls must not count as content). */
function countOutsideForms(doc, name) {
  const inForm = new Set()
  for (const form of findAll("form", doc)) for (const el of findAll("*", form)) inForm.add(el)
  return findAll(name, doc).filter((el) => !inForm.has(el)).length
}

/** Counts how many of each block the AST produced, for the one-to-one check. */
function contentCounts(sections) {
  const counts = { heading: 0, listItems: 0, divider: 0, contactForm: 0, link: 0 }
  const walkInline = (nodes) => {
    for (const node of nodes) {
      if (node.t === "link") counts.link++
      if (node.c) walkInline(node.c)
    }
  }
  for (const section of sections) {
    if (section.t === "prose") {
      for (const block of section.blocks) {
        if (block.t === "heading") counts.heading++
        if (block.t === "list") {
          counts.listItems += block.c.length
          for (const item of block.c) walkInline(item)
        }
        if (block.t === "divider") counts.divider++
        if (block.t === "contactForm") counts.contactForm++
        if (block.c && block.t !== "list") walkInline(block.c)
      }
    }
  }
  return counts
}

function blockCounts(blocks) {
  const counts = { heading: 0, lists: 0, listItems: 0, divider: 0, contactForm: 0, link: 0 }
  const walkInline = (nodes) => {
    for (const node of nodes) {
      if (node.t === "link") counts.link++
      if (node.c) walkInline(node.c)
    }
  }
  for (const block of blocks) {
    if (block.t === "heading") counts.heading++
    if (block.t === "divider") counts.divider++
    if (block.t === "contactForm") counts.contactForm++
    if (block.t === "list") {
      counts.lists++
      counts.listItems += block.c.length
      for (const item of block.c) walkInline(item)
    } else if (block.c) {
      walkInline(block.c)
    }
  }
  return counts
}

/**
 * Every run of consecutive <li> siblings becomes exactly one list block. This
 * is the shape the converter implements, so counting runs is what catches a
 * list being split (or two being merged) rather than merely a wrong total:
 * whitespace between <li>s once turned every bullet into its own list, and the
 * item count alone could not see it.
 */
function countListItemRuns(node) {
  let runs = 0
  for (const list of findAll("ul, ol", node)) {
    let previousWasItem = false
    for (const child of children(list)) {
      if (child.type === "comment" || (child.type === "text" && child.data.trim() === "")) continue
      const isItem = tagOf(child) === "li"
      if (isItem && !previousWasItem) runs++
      previousWasItem = isItem
    }
  }
  return runs
}

/** Fails loudly when a prose section dropped, merged or invented structure. */
function assertProseStructure(node, blocks, page) {
  const source = {
    heading: findAll("h1, h2, h3, h4, h5, h6", node).length,
    lists: countListItemRuns(node),
    listItems: findAll("li", node).length,
    divider: findAll("hr", node).length,
    contactForm: findAll("form", node).length,
    link: countOutsideForms(node, "a"),
  }
  const converted = blockCounts(blocks)
  for (const key of Object.keys(source)) {
    if (converted[key] !== source[key]) {
      throw new Error(`${page}: ${source[key]} source ${key} produced ${converted[key]} in the content`)
    }
  }
}

function contentSections(html, page) {
  const doc = parse(html)
  const sections = parseSections(doc, page)
  assertSameText(sections, doc, page)
  return sections
}

// ------------------------------------------------------------- site sections

/** Must match the keys of `icons` in src/components/icons.tsx. */
const KNOWN_ICONS = new Set(["briefcase", "idea", "growing-chart", "setting"])

function services(section) {
  return findAll(".card", section).map((card) => {
    const iconName = classStarting(find("span.mbr-iconfont", card), "mbrib-").replace("mbrib-", "")
    // A new icon in WordPress has to be lifted out of the font before it can
    // render; better to fail the import than to ship a blank square.
    if (!KNOWN_ICONS.has(iconName)) {
      throw new Error(`unknown service icon "${iconName}" - add it to src/components/icons.tsx`)
    }
    const text = find(".card-text", card)
    return {
      title: collapse(textOf(find("h2", text))).trim(),
      lead: inlines(find("p", text)),
      href: normaliseHref(attr(find("a", card), "href")),
      icon: iconName,
      items: findAll("h2", text).slice(1).map((h) => collapse(textOf(h)).trim()),
    }
  })
}

/** Quotes arrive wrapped in their own quotation marks; the component sets them. */
const unquoted = (text) => text.replace(/^["“”]+/, "").replace(/["“”]+$/, "").trim()

function testimonials(section) {
  return findAll(".testimonials-item", section).map((item) => ({
    quote: unquoted(collapse(textOf(find(".user_text", item))).trim()),
    name: collapse(textOf(find(".user_name", item))).trim(),
    // Direct child only: .user_text > p carries mbr-content-text as well.
    role: collapse(textOf(find(".testimonials-caption > .mbr-content-text", item))).trim(),
  }))
}

function parseSections(doc, page) {
  const tops = findAll("section", doc)
  // With no <section> at all the page body is WordPress' raw article area
  // (contact.html): it has no band padding and its column runs the full width.
  const bare = tops.length === 0
  const sources = tops.length ? tops : [doc]
  // Every page except contact.html wraps its body in a Bootstrap container, so
  // its article column is 740px wide. The contact page has no container and its
  // column stretches to 930px - the form is visibly wider there.
  const out = []
  for (const node of sources) {
    // The theme names its block type in the id (`counters1-k`) as often as in
    // the class list, so match against both.
    const classList = `${attr(node, "class")} ${attr(node, "id")}`
    if (/content9/.test(classList)) {
      out.push({ t: "banner", heading: collapse(textOf(find("h2", node))).trim() })
    } else if (/counters1/.test(classList)) {
      const cards = services(node)
      if (cards.length !== findAll(".card", node).length) {
        throw new Error(`${page}: ${findAll(".card", node).length} cards produced ${cards.length}`)
      }
      out.push({ t: "services", cards })
    } else if (/testimonials4/.test(classList)) {
      const items = testimonials(node)
      if (items.length !== findAll(".testimonials-item", node).length) {
        throw new Error(`${page}: ${findAll(".testimonials-item", node).length} quotes produced ${items.length}`)
      }
      if (items.some((item) => !item.quote || !item.name || !item.role)) {
        throw new Error(`${page}: a quote is missing its text, name or role`)
      }
      out.push({ t: "testimonials", items })
    } else {
      const parsed = blocks(node)
      assertProseStructure(node, parsed, page)
      if (parsed.length) {
        out.push({
          t: "prose",
          variant: bare ? "bare" : "article",
          width: find(".container", node) ? "text" : "wide",
          blocks: parsed,
        })
      }
    }
  }
  return out
}

// -------------------------------------------------------------- theme chrome

/** Splits a footer cell into lines, the source separates them with <br>. */
function cellLines(cell) {
  const lines = []
  let current = []
  for (const child of children(cell)) {
    if (tagOf(child) === "br") {
      lines.push(trimInline(current))
      current = []
      continue
    }
    if (child.type === "text") {
      const value = collapse(child.data)
      if (value) current.push({ t: "text", v: value })
      continue
    }
    if (child.type === "tag") {
      const node = inlineOf(child)
      if (node) (Array.isArray(node) ? current.push(...node) : current.push(node))
    }
  }
  lines.push(trimInline(current))
  return lines.filter((line) => line.length)
}

/**
 * Footer columns the site deliberately does not publish.
 *
 * "Trending" was a short list of external news links the client stopped
 * updating; leaving it out is an editorial decision, so it is made here rather
 * than by hiding a column at render time.
 */
const OMITTED_COLUMNS = new Set(["Trending"])

function chrome(html) {
  const doc = parse(html)

  return {
    brand: collapse(textOf(find(".navbar-caption", doc))).trim(),
    heroHeading: collapse(textOf(find(".denker h1", doc))).trim(),
    nav: findAll("section.menu .navbar-nav li a", doc).map((a) => ({
      label: collapse(textOf(a)).trim(),
      href: normaliseHref(attr(a, "href")),
    })),
    columns: findAll(".footer2 .footerfix", doc)
      .map((col) => ({
        title: collapse(textOf(find(".user_name", col))).trim(),
        lines: cellLines(find("p", col)),
      }))
      .filter((column) => !OMITTED_COLUMNS.has(column.title)),
    // The original credited the studio that built the WordPress theme
    // ("www.1stbuddha.com"). That is not this site's credit to carry, so the
    // footer prints its own and nothing is imported here.
    social: findAll(".footer2 .social-list a", doc).map((a) => ({
      name: classStarting(find("span", a), "socicon-").replace("socicon-", "") || collapse(textOf(a)).trim(),
      href: attr(a, "href"),
    })),
    contact: {
      name: "Andries Luchies",
      street: "Brederolaan 19",
      postalCode: "9673 GM",
      city: "Winschoten",
      email: decodeCfEmail(attr(find(".__cf_email__", doc), "data-cfemail")),
      phone: collapse(textOf(find('.footer2 a[href^="mob:"]', doc))).trim(),
      phoneHref: `tel:${collapse(textOf(find('.footer2 a[href^="mob:"]', doc))).replace(/\D/g, "")}`,
    },
  }
}

// --------------------------------------------------------------------- run it

await mkdir(contentDir, { recursive: true })

const wpPages = await getJson(`${ORIGIN}/wp-json/wp/v2/pages?per_page=100&orderby=id&order=asc`)
console.log(`wordpress: ${wpPages.length} pages`)

const live = await pool(wpPages, 5, async (page) => {
  const html = await getText(page.link)
  const doc = parse(html)
  return {
    id: page.id,
    path: new URL(page.link).pathname,
    title: collapse(textOf(find("title", doc))).trim(),
    description: attr(find('meta[name="description"]', doc), "content"),
    html,
  }
})

const site = { ...chrome(live.find((page) => page.path === "/").html), canonicalOrigin: CANONICAL_ORIGIN }

const pages = wpPages.map((page, i) => ({
  id: page.id,
  path: live[i].path,
  title: live[i].title,
  description: live[i].description,
  sections: contentSections(page.content.rendered, live[i].path),
}))

// The navigation points at pretty paths; keep only pages that exist so a stale
// menu entry cannot ship as a dead link.
const known = new Set(pages.map((page) => page.path))
const dropped = site.nav.filter((item) => !known.has(item.href))
if (dropped.length) console.warn(`navigation entries dropped (no page): ${dropped.map((d) => d.href).join(", ")}`)
site.nav = site.nav.filter((item) => known.has(item.href))

// Sanity checks that would otherwise only show up as a blank page in production.
// A page with source content that converts to nothing means the import dropped
// it; a page with no source content (info.html, a pure menu parent) is fine.
const lost = wpPages.filter((page, i) => page.content.rendered.trim() && pages[i].sections.length === 0)
if (lost.length) throw new Error(`pages with content but no sections: ${lost.map((p) => p.slug).join(", ")}`)
if (!site.brand) throw new Error("brand missing")
if (!site.heroHeading) throw new Error("hero heading missing")
if (!site.nav.length) throw new Error("navigation import produced nothing")
if (!site.contact.email) throw new Error("contact email missing")
if (site.columns.length !== 3) throw new Error(`expected 3 footer columns, got ${site.columns.length}`)
if (site.columns.some((column) => OMITTED_COLUMNS.has(column.title))) {
  throw new Error(`an omitted footer column came back: ${site.columns.map((c) => c.title).join(", ")}`)
}
if (site.social.length !== 3) throw new Error(`expected 3 social links, got ${site.social.length}`)

// Provenance is the newest WordPress modification date, not the time of the
// run: the same site state must always produce the same bytes, or every run
// would show up as a change.
const sourceUpdated = wpPages
  .map((page) => page.modified_gmt)
  .sort()
  .at(-1)

await writeFile(
  join(contentDir, "pages.json"),
  JSON.stringify({ source: ORIGIN, sourceUpdated, pages }, null, 2) + "\n",
)
await writeFile(
  join(contentDir, "site.json"),
  JSON.stringify({ source: ORIGIN, sourceUpdated, ...site }, null, 2) + "\n",
)

// Theme assets, renamed flat: nginx serves a single directory and ConfigMap
// keys cannot contain a slash.
//
// Images live in public/media/ because the components reference them by name
// (and because the build splits that directory into its own ConfigMap to stay
// under the cluster's object limit); fonts live in src/assets/ so the CSS url()
// lets Vite hash them. Only the latin Rubik subsets are kept - the original also ships
// cyrillic, hebrew and cyrillic-ext files the site never renders. The icon
// fonts are gone entirely, replaced by outlines in src/components/icons.tsx.
// 2000 is the source width, so the largest variant is the original, re-encoded.
const HERO_WIDTHS = [800, 1200, 1600, 2000]

const theme = `${ORIGIN}/wp-content/themes/luciancs/assets`
const uploads = `${ORIGIN}/wp-content/uploads`
const assets = await Promise.all([
  download(`${uploads}/2025/05/cropped-logo2-32x32.png`, "public/favicon-32.png"),
  download(`${uploads}/2025/05/cropped-logo2-180x180.png`, "public/apple-touch-icon.png"),
  download(`${theme}/fonts/iJWKBXyIfDnIV7nBrXw.woff2`, "src/assets/rubik-latin.woff2"),
  download(`${theme}/fonts/iJWKBXyIfDnIV7nPrXyi0A.woff2`, "src/assets/rubik-latin-ext.woff2"),

  // The testimonial background only ever shows through an 80% veil, so it can be
  // compressed hard and scaled down.
  downloadMedia(`${theme}/images/city-3295173-1280-1280x853.webp`, "city", "webp", "scale=800:-2", [
    "-c:v",
    "libwebp",
    "-quality",
    "38",
    "-compression_level",
    "6",
  ]),
  // The social card: 1200x630 is what scrapers expect.
  downloadMedia(
    `${theme}/images/denker.avif`,
    "og",
    "jpg",
    "crop=iw:iw*1050/2000:0:ih*0.08,scale=1200:630",
    ["-q:v", "4", "-f", "mjpeg"],
  ),
  // The hero at the widths a phone, a laptop and a large screen actually ask
  // for, instead of one 2000px file everyone downloads.
  ...HERO_WIDTHS.map((width) =>
    downloadMedia(`${theme}/images/denker.avif`, `hero-${width}`, "avif", `scale=${width}:-2`, [
      "-c:v",
      "libaom-av1",
      "-crf",
      "38",
      "-still-picture",
      "1",
      "-f",
      "avif",
    ]),
  ),
])

// Content-addressed names change whenever an image does, so the previous file
// has to go: it would otherwise keep being shipped in the ConfigMap for ever.
const current = new Set(Object.values(media).map((path) => basename(path)))
for (const file of await readdir(join(root, "public/media"))) {
  if (!current.has(file)) {
    await rm(join(root, "public/media", file), { force: true })
    console.log(`removed stale media/${file}`)
  }
}

await writeFile(join(contentDir, "media.json"), JSON.stringify(media, null, 2) + "\n")

console.log(
  `pages: ${pages.length} | sections: ${pages.reduce((n, p) => n + p.sections.length, 0)} | ` +
    `nav: ${site.nav.length} | assets: ${(assets.reduce((n, a) => n + a.bytes, 0) / 1024) | 0} KiB`,
)
