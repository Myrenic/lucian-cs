import { Inlines } from "@/components/Inline"
import { ContactForm } from "@/components/ContactForm"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import type { Block } from "@/lib/content"

/**
 * Article typography.
 *
 * The original ran every heading through Bootstrap's `.display-7`, so a section
 * heading was set in 16px bold - the same size as body copy, just a different
 * colour. That is what made the old pages read as one grey block. The scale
 * below keeps the source's own emphasis (the import records which headings were
 * maroon) and gives each level a size that means something.
 */
const HEADING: Record<1 | 2 | 3 | 4, string> = {
  1: "text-[clamp(1.75rem,3.4vw,2.5rem)] leading-[1.12]",
  2: "text-[clamp(1.25rem,2.1vw,1.625rem)] leading-[1.25]",
  3: "text-[1.0625rem] leading-snug",
  4: "text-[1rem] leading-snug",
}

const HEADING_TAG = { 1: "h1", 2: "h2", 3: "h3", 4: "h4" } as const

export function Prose({ blocks }: { blocks: Block[] }) {
  return (
    <div className="text-[1.0625rem] text-muted-foreground">
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
      return (
        <Tag
          className={cn(
            HEADING[block.level],
            block.strong ? "font-semibold" : "font-medium",
            block.accent ? "text-primary" : "text-foreground",
            block.align === "center" && "text-center",
            block.level === 1 ? "mt-0 mb-4" : "mt-10 mb-3 first:mt-0",
          )}
          style={block.size ? { fontSize: `${block.size}rem` } : undefined}
        >
          <Inlines nodes={block.c} />
        </Tag>
      )
    }
    case "paragraph":
      return (
        <p className={cn("mb-4 leading-[1.7]", block.align === "center" && "text-center")}>
          <Inlines nodes={block.c} />
        </p>
      )
    case "list":
      return (
        <ul className="my-4 list-disc space-y-2 pl-5 marker:text-primary/45">
          {block.c.map((item, index) => (
            <li key={index} className="leading-[1.7] pl-1">
              <Inlines nodes={item} />
            </li>
          ))}
        </ul>
      )
    case "divider":
      return (
        <Separator
          className={cn("my-9", block.accent ? "bg-primary/25" : "bg-border")}
          aria-hidden="true"
        />
      )
    case "contactForm":
      return <ContactForm />
  }
}
