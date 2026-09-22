import { site } from "@/lib/content"

/**
 * The banner under the header, on every page in the original: a photo of
 * Rodin's Thinker behind a maroon veil with the tagline. The tint is the
 * theme's own `rgba(100, 33, 33, 0.63)`, and the image sits 170px higher once
 * the viewport passes 992px (see the `.hero-bg` rule in index.css).
 */
export function Hero() {
  return (
    <section
      className="hero-bg relative flex min-h-[460px] items-center bg-cover py-[70px]"
      style={{ backgroundImage: "url(/denker.avif)" }}
    >
      <div className="absolute inset-0 bg-[rgba(100,33,33,0.63)]" aria-hidden="true" />
      <div className="relative mx-auto w-full max-w-content px-4">
        <h1 className="text-center text-[46px] leading-none font-bold text-white">
          {site.heroHeading}
        </h1>
      </div>
    </section>
  )
}
