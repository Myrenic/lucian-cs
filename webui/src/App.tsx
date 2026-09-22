import { useEffect } from "react"
import { Link, Navigate, Route, Routes, useLocation, useSearchParams } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Hero } from "@/components/Hero"
import { PageHeader } from "@/components/PageHeader"
import { Sections } from "@/components/Section"
import { SiteFooter } from "@/components/SiteFooter"
import { SiteHeader } from "@/components/SiteHeader"
import { crumbsFor, homePage, pages, pathByWpId, structuredData, type Page } from "@/lib/content"
import { pageShell } from "@/lib/layout"
import { cn } from "@/lib/utils"

export default function App() {
  return (
    <>
      <ScrollToTop />
      <SiteHeader />
      {/* In the body on purpose: search engines read JSON-LD anywhere in the
          document, and this keeps one source of truth for the address. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <main>
        <Routes>
          {pages.map((page) => (
            <Route key={page.id} path={page.path} element={<PageView page={page} />} />
          ))}
          {/* WordPress' own shortlinks: /index.html and /index.html?p=<id>. */}
          <Route path="/index.html" element={<Shortlink />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <SiteFooter />
    </>
  )
}

/** The original never kept the scroll position across page loads. */
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function PageView({ page }: { page: Page }) {
  useDocumentMeta(page.title, page.description)
  return (
    <>
      {page.path === "/" ? <Hero /> : <PageHeader page={page} />}
      <Sections sections={page.sections} />
    </>
  )
}

function useDocumentMeta(title: string, description: string) {
  useEffect(() => {
    document.title = title
    let tag = document.querySelector<HTMLMetaElement>('meta[name="description"]')
    if (!tag) {
      tag = document.createElement("meta")
      tag.name = "description"
      document.head.append(tag)
    }
    tag.content = description
  }, [title, description])
}

function Shortlink() {
  const [params] = useSearchParams()
  const target = pathByWpId[params.get("p") ?? ""] ?? homePage.path
  return <Navigate to={target} />
}

function NotFound() {
  useDocumentMeta("Pagina niet gevonden - LUCIAN", "Deze pagina bestaat niet (meer).")
  const crumbs = crumbsFor("/")
  return (
    <section className="bg-background py-20 sm:py-28">
      <div className={cn(pageShell, "flex justify-center")}>
        <div className="w-full max-w-measure">
          <p className="m-0 text-[0.75rem] font-semibold tracking-[0.14em] text-primary uppercase">
            404
          </p>
          <h1 className="mt-3 font-heading text-[clamp(1.75rem,3.4vw,2.5rem)] leading-[1.12] font-semibold tracking-[-0.025em] text-foreground">
            Pagina niet gevonden
          </h1>
          <p className="mt-4 leading-[1.7] text-muted-foreground">
            Deze pagina bestaat niet of is verplaatst. Ga terug naar de homepage of stuur een bericht
            via het contactformulier.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="cta">
              <Link to={crumbs[0].href}>Terug naar de homepage</Link>
            </Button>
            <Button asChild size="cta" variant="outline">
              <Link to="/contact.html">Neem contact op</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
