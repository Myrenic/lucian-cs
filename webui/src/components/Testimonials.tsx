import type { Testimonial } from "@/lib/content"

/**
 * Client quotes (`testimonials4` in the original): a fixed-attachment photo
 * behind a maroon veil, with white cards scrolling over it.
 */
export function Testimonials({ items }: { items: Testimonial[] }) {
  return (
    <div className="relative bg-band-alt">
      <div
        className="testimonial-bg absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url(/city.webp)" }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-maroon-deep/60" aria-hidden="true" />
      <div className="relative mx-auto max-w-[925px] px-4">
        {items.map((item) => (
          <figure key={item.name} className="mt-12 bg-white p-8 last:mb-12">
            <blockquote className="text-muted">&ldquo;{item.quote}&rdquo;</blockquote>
            <figcaption className="pt-12">
              <span className="block text-[1.2rem] font-bold text-muted">{item.name}</span>
              <span className="block text-muted">{item.role}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  )
}
