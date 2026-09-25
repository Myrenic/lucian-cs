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
  scripts/prerender.mjs        renders every route to static HTML
  scripts/build-configmap.mjs  packs the build into three ConfigMaps
  src/content/*.json           imported pages and site chrome (committed)
  src/components/ui/*.tsx      shadcn components - generated, not ours to edit
  src/components/*.tsx         nine files: the site
  src/entry-client.tsx         hydrates the prerendered markup
  src/entry-server.tsx         renders one route to a document, for prerender
  src/lib/content.ts           the imported content, typed
  src/lib/seo.ts               canonicals, Open Graph, structured data, FAQ
  src/index.css                tokens and two utilities, nothing else
  public/media/, src/assets/   photographs and fonts (committed)
base/                      the Flux kustomize base: ConfigMaps + nginx + Deployment
docs/reference/            screenshots of the original and the rework
```

### The surface, by size

| | Files | Lines |
|---|---|---|
| shadcn components in use | 9 in `ui/` | 758, generated |
| the site's own components | 9 + `App` | 900 |
| content and SEO libraries | 2 | 345 |
| the two entry points | 2 | 86 |
| stylesheet | 1 | 134 |

Nine site files, one job each: `App` (routes), `PageHero` (the band under the
header, homepage or page), `Section` (the four band types), `Content` (the
imported AST: headings, paragraphs, lists, rules, inline runs), `ServiceCards`,
`ContactForm`, `SiteHeader`, `SiteFooter`, `PageMeta` (the head), plus `icons`
for the three brand marks lucide does not have.

Everything else is the framework: buttons, cards, inputs, textarea, label,
sheet, breadcrumb, separator and field primitives come from `shadcn add` and are
left alone. The stylesheet carries the token values, shadcn's own `@theme`
mapping, the two Rubik `@font-face` blocks and exactly two custom utilities -
`page` (the shell) and `band` (vertical rhythm). Dark bands are
`bg-foreground text-background`, straight from the palette, rather than a token
of their own.

There is no database and no CMS. The build prerenders all 41 routes to real
HTML files, which are served by stock nginx from ConfigMaps - so a crawler that
never runs JavaScript still gets the finished page, and the browser hydrates it
instead of rendering from scratch.

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
npm run build
```

Four steps, in order:

1. `tsc --noEmit` - typecheck.
2. `vite build` - the client bundle into `base/www`, with content-hashed names.
3. `vite build --ssr` - the same app as a Node module, used once and thrown away.
4. `scripts/prerender.mjs` - imports that module and renders all 41 routes plus a
   `404.html`, reading the hashed asset tags out of the client build so every
   page carries the same script and stylesheet. Then it writes `sitemap.xml`.

`npm run ssr` rebuilds just the server bundle when iterating on rendering.

The pages are rendered as complete documents, which is what puts each route's
title, description, canonical, Open Graph tags and structured data in the HTML
rather than in an effect. React 19 hoists them while rendering; the same
components keep them correct when the visitor navigates client-side.

The build output is committed and applied: the cluster has no image registry, so
the site ships as ConfigMaps mounted into a stock `nginx:alpine` pod (the same
contract as `mushroom-finder` and `mytops`).

Three objects, because a ConfigMap may not exceed 1 MiB and prerendered HTML plus
JavaScript does: `pages` (42 pages + sitemap, ~320 KiB), `webui` (hashed bundle,
CSS, fonts, ~315 KiB) and `media` (photographs, ~220 KiB). The builder fails the
build before any of them crosses the limit, so the ceiling shows up as a red
build rather than as a Kustomization that will not apply.

Two transformations make them fit, and an initContainer undoes both before nginx
starts (see `base/deployment.yaml`):

* **everything compressible is gzipped** - HTML is mostly repetition, and base64
  costs a third on top of whatever is stored;
* **`/` is stored as `__`** - a ConfigMap key may not contain a slash, and the
  routes are nested (`/info/acties.html`).

Because the initContainer only runs when a pod starts, the build also stamps a
checksum of the three ConfigMaps into the Deployment's pod template: without it
Flux would apply new ConfigMaps that nothing ever reads, and the site would keep
serving the previous release until some unrelated restart.

All of it goes into `binaryData` rather than `data`, even the text. The bundle
carries C1 control characters from a minified dependency, and a YAML round trip
rewrites those - `kubectl kustomize` turns U+0085 into a space when it renders
the ConfigMap - so the same content as plain `data` would reach the pod subtly
corrupted. base64 removes the question.

`npm run build` also fails if the stylesheet comes out without the utilities the
layout depends on, which is what a stale `@source` list in `src/index.css`
looks like: green build, unstyled site.

## Deploying

`kubernetes/apps/services/lucian-cs/` in the [nebula](https://github.com/Myrenic/nebula)
repository holds the Flux `GitRepository` and `Kustomization` for this repo, and
`kubernetes/apps/network/exposure/lucian.yaml` holds the Traefik route. Push to
`main` here, then `flux reconcile kustomization lucian-cs -n flux-system`.

Flux applies in seconds; the **pod** sees the new files a little later, because
the kubelet re-syncs mounted ConfigMaps on its own schedule (up to a minute or
so). Checking the site immediately after a reconcile shows the previous build -
which looks exactly like a failed deploy. Compare the script hash in the served
`index.html` against `base/www/index.*.js` before concluding anything, or run
`kubectl exec -n services deploy/lucian-cs -- cat /usr/share/nginx/html/index.html`.

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

**Editorial calls made in the import**

* **The footer's "Trending" column is gone.** A short list of external news
  links the client stopped updating; the import leaves it out by name, with the
  reason next to the code, rather than the footer hiding it at render time.
* **The footer credit is not the original's.** WordPress credited the studio
  that built the theme; the footer prints its own credit instead, and nothing is
  imported for it.
* **Quotation marks belong to the component.** The imported quotes arrived
  wrapped in their own `"`, so the site was printing them twice. The import
  strips them and `Testimonials` sets them typographically; the text guard treats
  quote marks as presentational and compares everything else exactly.

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
* **Icons are lucide, except three.** shadcn ships lucide; the service cards use
  it, and the WordPress theme's own glyphs survive only as the three brand marks
  (Facebook, LinkedIn, Twitter) that lucide does not carry.
* **Structured data restored.** The WordPress site carried Rank Math's
  `AccountingService` markup and the rewrite initially dropped it. It is back,
  built from the import - name, address, phone, e-mail and the three profiles in
  the footer - but it lacks opening hours, prices and a review score because
  nobody has told us what they are, and it points at `luciancs.nl`, so it only
  starts working when the site moves there. See
  [What competitors do](#what-competitors-do) for why those gaps matter.

Carried over unchanged from the original: the maroon, the photograph, Rubik, the
warm grey bands, the 1140px-ish grid, and the icon glyphs lifted out of the
theme's own fonts as SVG paths.

## What competitors do

A scan of 17 Dutch competitors (eight in Groningen/Oldambt, plus the national
online players) and 13 professional-services sites for patterns. What is worth
knowing:

* **Nobody in this market embeds a booking calendar or a WhatsApp button.** The
  Dutch pattern is one promise - "gratis en vrijblijvend kennismakingsgesprek" -
  behind a contact form plus a click-to-call number. The site already does that,
  and the mobile menu carries the number and the e-mail for exactly this reason.
* **Prices are the split.** Regional kantoren publish nothing and say so in prose
  ("we werken niet met één vast tarief"). The ones that publish win the comparison
  queries: a one-person kantoor in Winschoten advertises from EUR 800 a year, a
  tax office sells particulier subscriptions at EUR 18-25 a month, and the online
  players publish a full ladder. This is the biggest single gap on this site.
* **Trust is a formula**: years in business + one keurmerk + a third-party review
  score, named. The site has testimonials but no platform score and no
  registration numbers; two one-person competitors publish exactly those.
* **Particulier work is barely served.** No competitor homepage in the scan
  advertises schuldhulpverlening, budgetbeheer or toeslagen. This site does - it
  is the clearest differentiator it has.
* **September fiscal content is table stakes** among maintained kantoor sites
  (Prinsjesdag / Belastingplan posts dated within days of the speech). This site's
  kenniscentrum is thin and undated.
* **Local pages are owned by directories as much as by kantoren.** The site has
  more city pages than most regional peers, but is absent from the free
  directories that rank on the same queries.

The full research, with per-site evidence and URLs, is not committed here; the
ranked recommendations it produced are listed in the project conversation.

## Search

What is in place, in the order it matters:

* **Every route is a real HTML file** with its own title, description, canonical,
  Open Graph and Twitter tags, and its content already rendered (`npm run build`
  writes 42 of them). A crawler that does not run JavaScript sees the whole page;
  before this, it saw the homepage.
* **Structured data** as one `@graph` per page: `AccountingService` (address,
  phone, e-mail, area served, the three profiles), `WebPage`, `BreadcrumbList`,
  `FAQPage` on the pages whose content really is a Q&A list, and an
  `OfferCatalog` of the four service lines on the homepage.
* **Canonicals and the sitemap point at `luciancs.nl`**, the domain the site will
  live on, from a single constant in the import - so they are already right on
  the day it moves.
* **Unknown paths return 404.** The prerendered site has no SPA fallback: a typo
  used to answer 200 with the homepage, which is a soft 404.
* **Nothing is loaded from a third party.** No analytics, no tag manager, no font
  CDN, no review widget: one origin, five requests, and a CSP that says so.
* **Font and hero image are preloaded**, the stylesheet is 10.5 KiB gzipped and
  the bundle is 165 KiB gzipped for the whole 41-page site.
* **`<html lang="nl">`**, one `h1` per page, `header`/`nav`/`main`/`footer`,
  `figure`/`blockquote`/`figcaption` for the quotes, decorative images `alt=""`.

Still open, all of it content rather than code:

* the preview's `noindex` header and `robots.txt`, and the `Sitemap:` line that
  belongs in robots.txt once the domain is live (both in `base/nginx.configmap.yaml`);
* prices, opening hours, KvK and BTW numbers - competitors publish them and the
  structured data is ready for them;
* a Google Business Profile, so there is a review score like every competitor's;
* a dated page when the Belastingplan is published each September.

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

`docs/reference/` holds both: `original-*.png` from luciancs.nl and
`rework-*.png` from the deployed preview, at desktop and mobile widths.

Page speed, homepage, measured on the deployed site:

| | SPA (before) | Prerendered |
|---|---|---|
| HTML | 0.8 KiB, no page text | 41 KiB raw, **9.2 KiB gzipped**, whole page in the markup |
| First paint needs JavaScript | yes | no - text paints with the HTML and CSS |
| JavaScript | 552 KiB raw / 172 KiB gzipped | unchanged |
| Stylesheet | 61 KiB raw / 11 KiB gzipped | unchanged |
| Requests, first load | 5 | 5 (one origin, nothing third-party) |
| Unknown path | 200 with the homepage | **404** |

All 41 sitemap URLs return 200, the 404 returns 404, and the build is
byte-reproducible - `npm run build` twice produces an identical ConfigMap, which
is what the CI check compares.

`npm run build` also writes `base/www`, which is the unpacked tree: serve it with
something that does not fake an SPA fallback (`python3 -m http.server 4174
--directory ../base/www`) to check routes and 404s locally. `vite preview` will
not do: it answers every path with index.html.
