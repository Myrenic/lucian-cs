import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  crumbsFor,
  hasOwnTitle,
  homePage,
  mediaPath,
  shortTitle,
  site,
  type Page,
} from "@/lib/content"
import { cn } from "@/lib/utils"

const contact = site.nav.find((item) => item.href === "/contact.html")
const HERO_WIDTHS = [800, 1200, 1600, 2000]

/**
 * The band under the header, on every page.
 *
 * Homepage: the photograph, the tagline, the site's own meta description as the
 * lead, and two ways onward. Anywhere else: the same photograph at a third of
 * the height with a breadcrumb derived from the URL, and the page title only if
 * the article below does not already open with one.
 */
export function PageHero({ page }: { page?: Page }) {
  return (
    <section
      className={cn(
        "relative isolate overflow-hidden bg-foreground",
        !page && "flex min-h-[34rem] items-end lg:min-h-[40rem]",
      )}
    >
      <img
        src={mediaPath("hero-1600")}
        srcSet={HERO_WIDTHS.map((width) => `${mediaPath(`hero-${width}`)} ${width}w`).join(", ")}
        sizes="100vw"
        alt=""
        aria-hidden="true"
        // The largest thing above the fold: it is the LCP element, so it is
        // requested early and at the width the viewport actually needs.
        fetchPriority="high"
        className={cn(
          "absolute inset-0 -z-20 size-full object-cover",
          page ? "object-[52%_28%] opacity-40" : "object-[52%_35%]",
        )}
      />
      <div
        className={cn(
          "absolute inset-0 -z-10 bg-linear-to-b",
          page
            ? "from-foreground/70 via-foreground/85 to-foreground"
            : "from-foreground/65 via-foreground/72 to-foreground/93",
        )}
        aria-hidden="true"
      />
      {page ? <PageBand page={page} /> : <HomeBand />}
    </section>
  )
}

function HomeBand() {
  return (
    <div className="page pt-32 pb-14 sm:pb-18 lg:pb-22">
      <h1 className="max-w-4xl font-heading text-[clamp(2.125rem,5.2vw,3.375rem)] leading-[1.06] font-semibold text-white text-balance">
        {site.heroHeading}
      </h1>
      <p className="mt-5 max-w-xl text-lg leading-relaxed text-background/75 text-pretty">
        {homePage.description}
      </p>
      {contact ? (
        <Button asChild size="cta" className="mt-8">
          <Link to={contact.href}>{contact.label}</Link>
        </Button>
      ) : null}
    </div>
  )
}

function PageBand({ page }: { page: Page }) {
  const crumbs = crumbsFor(page.path)
  return (
    <div className="page pt-28 pb-9 sm:pt-32 sm:pb-11">
      <Breadcrumb>
        <BreadcrumbList className="text-background/60">
          {crumbs.map((crumb, index) => {
            const last = index === crumbs.length - 1
            return (
              <span key={crumb.href} className="contents">
                <BreadcrumbItem>
                  {last ? (
                    <BreadcrumbPage className="font-medium text-background/90">
                      {crumb.label}
                    </BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink asChild className="hover:text-background">
                      <Link to={crumb.href}>{crumb.label}</Link>
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
                {last ? null : <BreadcrumbSeparator className="text-background/30" />}
              </span>
            )
          })}
        </BreadcrumbList>
      </Breadcrumb>

      {hasOwnTitle(page) ? null : (
        <h1 className="mt-4 font-heading text-[clamp(1.75rem,4vw,2.75rem)] leading-[1.1] font-semibold text-white text-balance">
          {shortTitle(page.title)}
        </h1>
      )}
    </div>
  )
}
