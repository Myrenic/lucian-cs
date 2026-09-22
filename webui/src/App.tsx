import { useEffect } from "react"
import { Link, Navigate, Route, Routes, useLocation, useSearchParams } from "react-router-dom"
import { Hero } from "@/components/Hero"
import { Sections } from "@/components/Section"
import { SiteFooter, SiteHeader } from "@/components/SiteChrome"
import { homePage, pages, pathByWpId, type Page } from "@/lib/content"

export default function App() {
  return (
    <>
      <ScrollToTop />
      <SiteHeader />
      <Hero />
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
  return <Sections sections={page.sections} />
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
  return (
    <section className="bg-white py-[60px]">
      <div className="mx-auto max-w-text px-4 font-rubik">
        <h1 className="mb-5 text-[1.4rem] font-bold text-maroon">Pagina niet gevonden</h1>
        <p className="mb-4 leading-[1.6] text-muted">
          Deze pagina bestaat niet of is verplaatst. Ga terug naar de{" "}
          <Link to="/" className="text-[#007bff] no-underline hover:underline">
            homepage
          </Link>{" "}
          of neem contact op via{" "}
          <Link to="/contact.html" className="text-[#007bff] no-underline hover:underline">
            het contactformulier
          </Link>
          .
        </p>
      </div>
    </section>
  )
}
