import { canonicalFor, OG_IMAGE, ORIGIN, structuredDataFor } from "@/lib/seo"
import { site, type Page } from "@/lib/content"

/**
 * Everything that belongs in `<head>` for one page.
 *
 * Rendered as part of the tree, not set with an effect: React 19 hoists these
 * into the document head while rendering, so the prerendered HTML that a
 * crawler receives already carries the right title, canonical and structured
 * data - and the same code keeps them correct during client-side navigation.
 */
export function PageMeta({ page }: { page: Page }) {
  const url = canonicalFor(page.path)
  const image = page.path === "/" ? OG_IMAGE : `${ORIGIN}/media/denker.avif`

  return (
    <>
      <title>{page.title}</title>
      {page.description ? <meta name="description" content={page.description} /> : null}
      <link rel="canonical" href={url} />

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={site.brand} />
      <meta property="og:locale" content="nl_NL" />
      <meta property="og:title" content={page.title} />
      {page.description ? <meta property="og:description" content={page.description} /> : null}
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={page.title} />
      {page.description ? <meta name="twitter:description" content={page.description} /> : null}
      <meta name="twitter:image" content={image} />

      <script
        type="application/ld+json"
        // Values come from our own content file, not from user input.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredDataFor(page)) }}
      />
    </>
  )
}
