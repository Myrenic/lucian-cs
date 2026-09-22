import { Card, CardContent } from "@/components/ui/card"
import { pageShell } from "@/lib/layout"
import type { Testimonial } from "@/lib/content"

/**
 * Client quotes on the photo band. Three stock cards in a column, measured so
 * the quote is readable over the picture; the quotation marks belong to the
 * component, so the imported text arrives without them.
 */
export function Testimonials({ items }: { items: Testimonial[] }) {
  return (
    <div className="relative isolate overflow-hidden bg-ink">
      <img
        src="/media/city.webp"
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        className="absolute inset-0 -z-20 size-full object-cover object-center"
      />
      <div className="absolute inset-0 -z-10 bg-ink/80" aria-hidden="true" />
      <div className={pageShell}>
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
