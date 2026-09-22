import { Prose } from "@/components/Prose"
import { ServiceCards } from "@/components/ServiceCards"
import { Testimonials } from "@/components/Testimonials"
import { bandPadding, pageShell } from "@/lib/layout"
import { cn } from "@/lib/utils"
import type { Section as SectionType } from "@/lib/content"

/**
 * The four kinds of band the imported pages are built from, in the order the
 * source put them: a statement, the services, the client quotes, the article.
 */
export function Section({ section }: { section: SectionType }) {
  switch (section.t) {
    case "banner":
      return (
        <section className="border-b border-border/70">
          <div className={cn(pageShell, "py-12 sm:py-16")}>
            {/* The original flanked this heading with two 25%-wide rules; the
                hairlines keep that shape without pinning the text to 25%. */}
            <div className="mx-auto flex max-w-4xl items-center gap-5 sm:gap-8">
              <span className="hidden h-px flex-1 bg-border sm:block" aria-hidden="true" />
              <h2 className="font-heading text-[clamp(1.375rem,2.6vw,1.875rem)] leading-[1.2] font-medium tracking-[-0.015em] text-foreground text-balance">
                {section.heading}
              </h2>
              <span className="hidden h-px flex-1 bg-border sm:block" aria-hidden="true" />
            </div>
          </div>
        </section>
      )
    case "services":
      return (
        <section id="diensten" className={cn("bg-secondary", bandPadding)}>
          <ServiceCards cards={section.cards} />
        </section>
      )
    case "testimonials":
      return (
        <section className={cn("bg-ink", bandPadding)}>
          <Testimonials items={section.items} />
        </section>
      )
    case "prose":
      return (
        <section className={cn("bg-background", bandPadding)}>
          <div className={pageShell}>
            <article
              className={cn(
                "mx-auto w-full",
                section.width === "wide" ? "max-w-[60rem]" : "max-w-measure",
              )}
            >
              <Prose blocks={section.blocks} />
            </article>
          </div>
        </section>
      )
  }
}

/** Renders a whole page body, i.e. everything between the header band and the footer. */
export function Sections({ sections }: { sections: SectionType[] }) {
  return (
    <>
      {sections.map((section, index) => (
        <Section key={index} section={section} />
      ))}
    </>
  )
}
