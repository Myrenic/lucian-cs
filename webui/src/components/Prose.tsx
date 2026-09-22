import { Inlines } from "@/components/Inline"
import { ContactForm } from "@/components/ContactForm"
import type { Block } from "@/lib/content"

// Sizes and colours measured on the live site. Prose headings are small and
// dense (1rem, maroon or grey) - the theme ran everything through Bootstrap's
// `.display-7` class, so `h2` is body-sized bold maroon, not a display size.
// Headings that declare their own font-size keep it, set inline because the
// value comes from the imported content rather than from this stylesheet.
const HEADING_SIZE: Record<1 | 2 | 3 | 4, string> = {
  1: "text-[1.4rem]",
  2: "text-base",
  3: "text-base",
  4: "text-base",
}

const HEADING_TAG = { 1: "h1", 2: "h2", 3: "h3", 4: "h4" } as const

export function Prose({ blocks }: { blocks: Block[] }) {
  return (
    <div className="font-rubik">
      {blocks.map((block, index) => (
        <Block key={index} block={block} />
      ))}
    </div>
  )
}

function Block({ block }: { block: Block }) {
  switch (block.t) {
    case "heading": {
      const Tag = HEADING_TAG[block.level]
      const className = [
        block.size ? "" : HEADING_SIZE[block.level],
        block.strong ? "font-bold" : "font-medium",
        block.accent ? "text-maroon" : "text-muted",
        block.align === "center" ? "text-center" : "",
        "mb-[15px] leading-none",
      ].join(" ")
      return (
        <Tag className={className} style={block.size ? { fontSize: `${block.size}rem` } : undefined}>
          <Inlines nodes={block.c} />
        </Tag>
      )
    }
    case "paragraph":
      return (
        <p className={`mb-4 leading-[1.6] text-muted ${block.align === "center" ? "text-center" : ""}`}>
          <Inlines nodes={block.c} />
        </p>
      )
    case "list":
      return (
        <ul className="mb-[25px] list-[circle] pl-5 leading-[1.6] text-muted">
          {block.c.map((item, index) => (
            <li key={index} className="mb-2">
              <Inlines nodes={item} />
            </li>
          ))}
        </ul>
      )
    case "divider":
      return (
        <hr className={`my-[25px] border-0 border-t ${block.accent ? "border-maroon" : "border-black/10"}`} />
      )
    case "contactForm":
      return <ContactForm />
  }
}
