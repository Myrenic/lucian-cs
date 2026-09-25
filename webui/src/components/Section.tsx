import { Card, CardContent } from "@/components/ui/card"
import { Content } from "@/components/Content"
import { ServiceCards } from "@/components/ServiceCards"
import type { Section as SectionType, Testimonial } from "@/lib/content"

/**
 * The four kinds of band the pages are built from, in the order the source put
 * them: a statement, the services, the client quotes, the article.
 */
export function Section({ section }: { section: SectionType }) {
  switch (section.t) {
    case "banner":
      return (
        <section className="border-b border-border/70">
          <div className="page py-12 sm:py-16">
            {/* The original flanked this heading with two 25%-wide rules; the
                hairlines keep that shape without pinning the text to 25%. */}
            <div className="mx-auto flex max-w-4xl items-center gap-5 sm:gap-8">
              <span className="hidden h-px flex-1 bg-border sm:block" aria-hidden="true" />
              <h2 className="font-heading text-[clamp(1.375rem,2.6vw,1.875rem)] leading-[1.2] font-medium text-foreground text-balance">
                {section.heading}
              </h2>
              <span className="hidden h-px flex-1 bg-border sm:block" aria-hidden="true" />
            </div>
          </div>
        </section>
      )
    case "services":
      return (
        <section id="diensten" className="band bg-secondary">
          <ServiceCards cards={section.cards} />
        </section>
      )
    case "testimonials":
      return (
        <section className="band bg-foreground">
          <Testimonials items={section.items} />
        </section>
      )
    case "prose":
      return (
        <section className="band bg-background">
          <div className="page">
            <article
              className={
                section.width === "wide"
                  ? "mx-auto w-full max-w-4xl"
                  : "mx-auto w-full max-w-3xl"
              }
            >
              <Content blocks={section.blocks} />
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

/** Client quotes on the photograph, as stock cards in a column. */
function Testimonials({ items }: { items: Testimonial[] }) {
  return (
    <div className="relative isolate overflow-hidden">
      <img
        src="/media/city.webp"
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        className="absolute inset-0 -z-20 size-full object-cover object-center"
      />
      <div className="absolute inset-0 -z-10 bg-foreground/80" aria-hidden="true" />
      <div className="page">
        <ul className="mx-auto flex max-w-2xl list-none flex-col gap-5 p-0">
          {items.map((item) => (
            <li key={item.name}>
              <Card>
                <CardContent>
                  <figure className="flex flex-col gap-4">
                    <blockquote className="text-[1.0625rem] leading-[1.7] text-pretty">
                      &ldquo;{item.quote}&rdquo;
                    </blockquote>
                    <figcaption className="flex flex-col border-t pt-4">
                      <span className="font-heading font-semibold">{item.name}</span>
                      <span className="text-sm text-muted-foreground">{item.role}</span>
                    </figcaption>
                  </figure>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
