import { ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { homePage, site } from "@/lib/content"
import { pageShell } from "@/lib/layout"
import { cn } from "@/lib/utils"

/**
 * Homepage opening.
 *
 * One full-width photograph, one sentence taken from the site's own meta
 * description, and two ways onward. The original put the tagline in the middle
 * of a 460px band and repeated the same banner on all 41 pages; here the photo
 * carries the homepage and interior pages get a slim band instead.
 */
export function Hero() {
  return (
    <section className="relative isolate flex min-h-[34rem] items-end overflow-hidden bg-ink lg:min-h-[40rem]">
      <img
        src="/media/denker.avif"
        alt=""
        aria-hidden="true"
        // The photograph is Rodin's Thinker, the same image the original used.
        className="absolute inset-0 -z-20 size-full object-cover object-[52%_35%]"
      />
      <div
        className="absolute inset-0 -z-10 bg-linear-to-b from-ink/65 via-ink/72 to-ink/93"
        aria-hidden="true"
      />
      <div className={cn(pageShell, "pt-32 pb-14 sm:pb-18 lg:pb-22")}>
        <h1 className="max-w-4xl font-heading text-[clamp(2.125rem,5.2vw,3.375rem)] leading-[1.06] font-semibold tracking-[-0.03em] text-white text-balance">
          {site.heroHeading}
        </h1>
        <p className="mt-5 max-w-xl text-[1.0625rem] leading-relaxed text-white/75 text-pretty">
          {homePage.description}
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Button asChild size="cta">
            <Link to="/contact.html">
              Neem contact op
              <ArrowRight data-icon="inline-end" />
            </Link>
          </Button>
          <Button
            asChild
            size="cta"
            variant="outline"
            className="border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white"
          >
            <a href="#diensten">Bekijk diensten</a>
          </Button>
        </div>
      </div>
    </section>
  )
}
