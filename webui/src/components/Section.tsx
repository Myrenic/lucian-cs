import { Prose } from "@/components/Prose"
import { ServiceCards } from "@/components/ServiceCards"
import { Testimonials } from "@/components/Testimonials"
import type { Section as SectionType } from "@/lib/content"

/**
 * Section paddings and bands are the original's: 60px for an article, 30px for
 * the rule-and-heading banner, 90px for the grey service band.
 */
export function Section({ section }: { section: SectionType }) {
  switch (section.t) {
    case "banner":
      return (
        <section className="bg-white py-[30px]">
          <div className="mx-auto max-w-content px-4 text-center font-rubik">
            {/* The original rules are 3px boxes with a hairline on top, and the
                heading carries 2rem of its own padding: together that is the
                162px band the live site renders. */}
            <hr className="mx-auto my-0 h-[3px] w-1/4 border-0 border-t border-hairline" />
            <h2 className="mb-2 py-8 text-[1.5rem] leading-none font-medium text-muted">
              {section.heading}
            </h2>
            <hr className="mx-auto my-0 h-[3px] w-1/4 border-0 border-t border-hairline" />
          </div>
        </section>
      )
    case "services":
      return (
        <section className="bg-band py-[90px]">
          <ServiceCards cards={section.cards} />
        </section>
      )
    case "testimonials":
      return (
        <section className="py-[60px]">
          <Testimonials items={section.items} />
        </section>
      )
    case "prose":
      // `article` is the usual 60px-padded band with a 740px column; `bare` is
      // WordPress' raw content area (contact.html), which has neither.
      return (
        <section className={`bg-white ${section.variant === "article" ? "py-[60px]" : ""}`}>
          <div
            className={`mx-auto px-[15px] ${section.width === "wide" ? "max-w-[960px]" : "max-w-text"}`}
          >
            <Prose blocks={section.blocks} />
          </div>
        </section>
      )
    default:
      return null
  }
}

/** Renders a whole page body, i.e. everything between hero and footer. */
export function Sections({ sections }: { sections: SectionType[] }) {
  return (
    <>
      {sections.map((section, index) => (
        <Section key={index} section={section} />
      ))}
    </>
  )
}
