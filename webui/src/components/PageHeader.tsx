import { Link } from "react-router-dom"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { crumbsFor, hasOwnTitle, shortTitle, type Page } from "@/lib/content"
import { pageShell } from "@/lib/layout"
import { cn } from "@/lib/utils"

/**
 * The band under the header on every page except the homepage.
 *
 * It keeps the brand photograph and the maroon ink of the original hero but at
 * a third of the height, and it carries the one thing the original site had no
 * version of at all: a breadcrumb, derived from the URL and the menu. Pages
 * whose article already opens with an h1 do not repeat that title here.
 */
export function PageHeader({ page }: { page: Page }) {
  const crumbs = crumbsFor(page.path)

  return (
    <section className="relative isolate overflow-hidden bg-ink">
      <img
        src="/media/denker.avif"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 -z-20 size-full object-cover object-[52%_28%] opacity-40"
      />
      <div className="absolute inset-0 -z-10 bg-linear-to-t from-ink via-ink/85 to-ink/70" aria-hidden="true" />
      <div className={cn(pageShell, "pt-28 pb-9 sm:pt-32 sm:pb-11")}>
        {crumbs.length > 1 ? (
          <Breadcrumb>
            <BreadcrumbList className="text-white/60">
              {crumbs.map((crumb, index) => {
                const last = index === crumbs.length - 1
                return (
                  <span key={crumb.href} className="contents">
                    <BreadcrumbItem>
                      {last ? (
                        <BreadcrumbPage className="font-medium text-white/90">{crumb.label}</BreadcrumbPage>
                      ) : (
                        <BreadcrumbLink asChild className="transition-colors hover:text-white">
                          <Link to={crumb.href}>{crumb.label}</Link>
                        </BreadcrumbLink>
                      )}
                    </BreadcrumbItem>
                    {last ? null : <BreadcrumbSeparator className="text-white/30" />}
                  </span>
                )
              })}
            </BreadcrumbList>
          </Breadcrumb>
        ) : null}

        {hasOwnTitle(page) ? null : (
          <h1 className="mt-4 font-heading text-[clamp(1.75rem,4vw,2.75rem)] leading-[1.1] font-semibold tracking-[-0.025em] text-white text-balance">
            {shortTitle(page.title)}
          </h1>
        )}
      </div>
    </section>
  )
}
