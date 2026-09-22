import { Card } from "@/components/ui/card"
import { pageShell } from "@/lib/layout"
import type { Testimonial } from "@/lib/content"

/**
 * Client quotes on the photo band.
 *
 * Same three quotes, same photo, same maroon veil as the original; the quotes
 * are now a readable measure instead of 895px wide boxes on a busy background,
 * and the attribution is separate from the quote rather than a second grey
 * paragraph.
 */
export function Testimonials({ items }: { items: Testimonial[] }) {
  return (
    <div className="relative isolate overflow-hidden bg-ink">
      <img
        src="/media/city.webp"
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="absolute inset-0 -z-20 size-full object-cover object-center"
      />
      <div className="absolute inset-0 -z-10 bg-ink/80" aria-hidden="true" />
      <div className={pageShell}>
        <ul className="mx-auto flex max-w-3xl list-none flex-col gap-5 p-0">
          {items.map((item) => (
            <li key={item.name}>
              <Card className="gap-6 bg-card shadow-[var(--shadow-lift)] ring-0">
                <figure className="px-(--card-spacing)">
                  <blockquote className="text-[1.0625rem] leading-[1.7] text-foreground/90 text-pretty">
                    <span aria-hidden="true" className="mr-1 font-heading text-primary">
                      &ldquo;
                    </span>
                    {item.quote}
                    <span aria-hidden="true" className="font-heading text-primary">
                      &rdquo;
                    </span>
                  </blockquote>
                  <figcaption className="mt-5 flex flex-col gap-0.5 border-t border-border pt-4">
                    <span className="font-heading font-semibold text-foreground">{item.name}</span>
                    <span className="text-[0.9375rem] text-muted-foreground">{item.role}</span>
                  </figcaption>
                </figure>
              </Card>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
