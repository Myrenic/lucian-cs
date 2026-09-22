# lucian-cs

The LUCIAN site (luciancs.nl) rebuilt as Vite + React components, plus the
manifests that serve it from the home cluster.

**Preview:** https://lucian.tuntelder.com — unlisted and `noindex`, see
[Unlisted preview](#unlisted-preview).

## What this is

The original is a WordPress site (theme `luciancs`, a Mobirise export) with 41
pages. This repository replaces the rendering, not the content: every page, its
headings, lists, quotes and the contact form were imported from the live site,
and the design was measured off the live theme with `getComputedStyle` rather
than eyeballed.

```
webui/                     Vite + React 19 + TypeScript + Tailwind 4 source
  scripts/import-content.mjs   the one-way import from luciancs.nl
  scripts/build-configmap.mjs  packs the build for the cluster
  src/content/*.json           imported pages and site chrome (committed)
  src/components/              layout, prose, cards, quotes, form
  public/, src/assets/         theme images and fonts (committed)
base/                      the Flux kustomize base: ConfigMap + nginx + Deployment
docs/reference/            screenshots of the original and the rebuild
```

There is no database, no CMS and no server-side rendering: the build is a
static bundle served by stock nginx from a ConfigMap.

## Importing content

```
cd webui && npm run import
```

`import-content.mjs` reads the WordPress REST API, converts each page body into
a small block/inline AST (see `src/lib/content.ts`), and writes
`src/content/pages.json` and `src/content/site.json`. Re-running it is
one-way: edits made in this repository are overwritten.

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
npm run build          # typecheck, vite build, pack base/webui.configmap.json
```

The build output is packed into `base/webui.configmap.json` and committed: the
cluster has no image registry, so the site ships as a ConfigMap mounted into a
stock `nginx:alpine` pod (the same contract as `mushroom-finder` and `mytops`).
A ConfigMap may not exceed 1 MiB, so the builder fails when the bundle grows
past it — the fix then is to move the images into their own ConfigMap and mount
them separately.

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

Kept deliberately, each because the original is wrong:

* **The four service cards wrap.** The theme laid four `col-lg-4` cards in one
  non-wrapping flex row, which overflowed the viewport by 80px at 1440 wide.
  Here they are 1 / 2 / 4 columns.
* **Lists are lists.** One page's markup has a `<ul>` whose children are
  `<div>`s, and another nests a `<li>` inside a `<li>`; browsers flatten both, so
  the import does too.
* **No contact form backend.** The original posted to Contact Form 7. A static
  build has nowhere to post to, so the form composes the same message as a
  `mailto:` and opens the visitor's mail client, and its confirmation says so.
  Point it at a real endpoint before go-live; the code that needs changing is
  marked in `src/components/ContactForm.tsx`.
* **No Google Ads tag.** The original loads `gtag.js` (AW-1021819019) on every
  page. It is not in the rebuild; the CSP allows only same-origin resources.

Everything else is measured from the original: nav and footer bands `#efefef`,
the hero's 460px photo under `rgba(100,33,33,0.63)`, prose at `#767676` on a
740px column with `#800000` headings and rules, the contact form's 930px row,
and the icon glyphs lifted out of the theme's own fonts as SVG paths.

## Verification

Page heights of the rebuild against the live site, at 1440×1000:

| Page | Original | Rebuild |
|---|---|---|
| `/` | 2873 | 2857 |
| `/boekhouder-winschoten.html` | 3300 | 3419 |
| `/contact.html` | 1706 | 1687 |
| `/info/acties.html` | 2280 | 2290 |
| `/over.html` | 2157 | 2172 |

Screenshots of both, at desktop and mobile widths, are in `docs/reference/`.
