# lucian-cs

The LUCIAN site (luciancs.nl) rebuilt as a React application on
[shadcn/ui](https://ui.shadcn.com/), plus the manifests that serve it from the
home cluster.

**Preview:** https://lucian.tuntelder.com — unlisted and `noindex`, see
[Unlisted preview](#unlisted-preview).

## What this is

The original is a WordPress site (theme `luciancs`, a Mobirise export) with 41
pages. This repository replaces the rendering, not the content: every page, its
headings, lists, quotes and the contact form were imported from the live site.

The import was then rebuilt on shadcn/ui: Radix primitives for the interactive
parts, Tailwind v4 tokens for the theme, and the brand's own maroon, photograph
and typeface carried across. (The first pass was a literal port that measured
the live theme with `getComputedStyle`; that is what the numbers in
[Verification](#verification) still compare against.)

```
webui/                     Vite + React 19 + TypeScript + Tailwind 4 source
  components.json              shadcn config (aliases, base library, icon set)
  scripts/import-content.mjs   the one-way import from luciancs.nl
  scripts/build-configmap.mjs  packs the build into the two ConfigMaps
  src/content/*.json           imported pages and site chrome (committed)
  src/components/*.tsx         the site: bands, prose, cards, quotes, form
  src/components/ui/*.tsx      shadcn components (generated, then yours)
  src/index.css                the design tokens, one file
  public/media/, src/assets/   photographs and fonts (committed)
base/                      the Flux kustomize base: ConfigMaps + nginx + Deployment
docs/reference/            screenshots of the original and the rebuild
```

There is no database, no CMS and no server-side rendering: the build is a
static bundle served by stock nginx, mounted from two ConfigMaps.

## Design system

shadcn/ui, added with the CLI, then themed. Two token sets meet in
`src/index.css`:

* **shadcn's names** (`--background`, `--primary`, `--muted-foreground`,
  `--border`, `--radius`, ...) are the vocabulary every component already
  speaks, so the site themes by setting values rather than by fighting the
  components. They are written in `oklch()`.
* **the brand's values**, sampled from the original theme: maroon `#800000` is
  `--primary`, the page greys (`#efefef`, `#f5f5f5`) became warm neutrals so
  they sit next to that maroon, and `--ink` is a near-black maroon for the dark
  bands that open and close every page.

Two roles shadcn's set has no name for are added: `--ink` (the dark band) and
`--surface`. One component is extended: `Button` gains a `cta` size, because the
preset's sizes are app density (`h-8`/`h-9`) and a marketing page needs a target
you can hit on a phone.

Type is Rubik, the original's face, at a scale that means something: the old
theme ran every heading through Bootstrap's `.display-7`, so a section heading
was 16px bold - the same size as body copy. The import kept which headings the
source made maroon, and `Prose.tsx` sets them at a size per level.

What the rework deliberately did *not* do: no gradient text, no glassmorphism, no
scroll-in animations, no icon per feature row, no second accent colour. The
material is a photograph, one maroon, warm neutrals and a hairline grid.

## Importing content

```
cd webui && npm run import        # needs ffmpeg on PATH, see below
```

`import-content.mjs` reads the WordPress REST API, converts each page body into
a small block/inline AST (see `src/lib/content.ts`), and writes
`src/content/pages.json` and `src/content/site.json`. Re-running it is
one-way: edits made in this repository are overwritten.

It also fetches the theme's photograph and re-encodes it through `ffmpeg`
(1024px wide, WebP q58) before committing it, because the original is
print-sized and these files end up in a ConfigMap with a hard size ceiling.

Two guards run per page, because a silent partial import is the failure this
would otherwise ship with:

* every character of source text must survive into the AST, and
* headings, list items, rules, forms and links must be accounted for one to one.

The import uses htmlparser2, not a lenient HTML fixer: node-html-parser
rewrote the messy source (it dropped the `.container` wrapper and lifted `<li>`
elements out of their `<ul>`), which turned lists into loose paragraphs.

## Building

```
cd webui
npm ci
npm run build          # typecheck, vite build, pack the ConfigMaps
```

The build output is committed and applied: the cluster has no image registry, so
the site ships as ConfigMaps mounted into a stock `nginx:alpine` pod (the same
contract as `mushroom-finder` and `mytops`).

Two objects, because one may not exceed 1 MiB and the JavaScript bundle alone is
already close to it: `base/webui.configmap.json` (bundle, fonts, favicons) at
~900 KiB and `base/media.configmap.json` (the two photographs) at ~150 KiB.
`scripts/build-configmap.mjs` fails the build before either crosses the limit,
so the ceiling shows up as a red build rather than as a Kustomization that will
not apply. When it does, in order of how little they cost: pre-compress the
assets and serve them with nginx's `gzip_static` (the bundle is 565 KiB raw,
140 KiB gzipped - a three-fold saving), move another asset group into its own
ConfigMap, or build an image in CI and push it to `ghcr.io`, which the cluster
already pulls from.

The bundle goes into `binaryData` even though it is text. It carries C1 control
characters from a minified dependency, and a YAML round trip rewrites those -
`kubectl kustomize` turns U+0085 into a space when it renders the ConfigMap - so
the same content as plain `data` would reach the pod subtly corrupted.

`npm run build` also fails if the stylesheet comes out without the utilities the
layout depends on, which is what a stale `@source` list in `src/index.css`
looks like: green build, unstyled site.

## Deploying

`kubernetes/apps/services/lucian-cs/` in the [nebula](https://github.com/Myrenic/nebula)
repository holds the Flux `GitRepository` and `Kustomization` for this repo, and
`kubernetes/apps/network/exposure/lucian.yaml` holds the Traefik route. Push to
`main` here (the image is in the bundle), then the cluster converges within a
minute.

## Unlisted preview

`lucian.tuntelder.com` is a preview of a site that will live on the client's own
domain, so it is kept out of search engines two ways: `X-Robots-Tag: noindex`
and a `robots.txt` that disallows everything (both in `base/nginx.configmap.yaml`).
It is not linked from anywhere, and the Traefik route carries
`testlab.io/exposure: public` with that reason.

**Going live on luciancs.nl means removing both.** If the preview needs to be
private rather than merely unlisted, the cluster already runs oauth2-proxy:
adding its `oauth2-proxy-auth` middleware to the route is the one-line change.

## Deviations from the original

Each of these is a decision, not an accident, and each is reversible:

**Fixed because the original is wrong**

* **The four service cards wrap.** The theme laid four `col-lg-4` cards in one
  non-wrapping flex row, which overflowed the viewport by 80px at 1440 wide.
  Here they are 1 / 2 / 4 columns.
* **Lists are lists.** One page's markup has a `<ul>` whose children are
  `<div>`s, and another nests a `<li>` inside a `<li>`; browsers flatten both, so
  the import does too.
* **Running text got darker.** The old theme set almost everything in `#767676`.
  The new `--muted-foreground` is a warm grey at a comfortable contrast; headings
  that were grey in the source are now ink.
* **The contact form has labels.** The original relied on placeholders, which
  vanish as soon as you type.

**Modernised, same feeling**

* **Interior pages no longer repeat the hero.** The original opened all 41 pages
  with the same 460px photograph and the same tagline. The homepage keeps that
  photo full-height; interior pages get a slim band that carries the brand image
  plus a breadcrumb, which the original had no version of.
* **The footer is dark.** It was light grey. `--ink` is a near-black from the
  maroon family, so it still reads as the brand, and it gives every page an end.
* **Headings have a scale.** See [Design system](#design-system).

**Still open, needs a decision before go-live**

* **No contact form backend.** The original posted to Contact Form 7. A static
  build has nowhere to post to, so the form composes the same message as a
  `mailto:` and opens the visitor's mail client, and its confirmation says so.
  Point it at a real endpoint before go-live; the code that needs changing is
  marked in `src/components/ContactForm.tsx`.
* **No Google Ads tag.** The original loads `gtag.js` (AW-1021819019) on every
  page. It is not in the rewrite; the CSP allows only same-origin resources.
* **Two lines of new UI copy**: the hero's buttons ("Neem contact op",
  "Bekijk diensten"). Every other word on the site is imported. The hero's lead
  sentence is the homepage's own meta description, not new text.

Carried over unchanged from the original: the maroon, the photograph, Rubik, the
warm grey bands, the 1140px-ish grid, and the icon glyphs lifted out of the
theme's own fonts as SVG paths.

## Verification

The rework is a redesign, so heights no longer track the original. What must
still hold is the *content*: every heading, list item, quote and link from the
import has to survive the new components. The import's own guard proves that for
the AST, and a sweep of the built site proves it again in the browser - headings
and `<li>` counts per page match `src/content/pages.json` exactly.

Page heights, before and after the rework, at 1440×1000:

| Page | Original | First port | Rework |
|---|---|---|---|
| `/` | 2873 | 2857 | 2840 |
| `/boekhouder-winschoten.html` | 3300 | 3283 | 3484 |
| `/contact.html` | 1706 | 1687 | 1509 |

Screenshots of both, at desktop and mobile widths, are in `docs/reference/`;
the rebuild ones are captured from the deployed preview, not from a local run.
