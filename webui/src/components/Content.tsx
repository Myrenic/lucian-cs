import { Link } from "react-router-dom"
import { buttonVariants } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ContactForm } from "@/components/ContactForm"
import { cn } from "@/lib/utils"
import type { Block, Inline, Mark } from "@/lib/content"

/**
 * The imported content, rendered.
 *
 * The import turns the WordPress markup into an AST of blocks and inline runs;
 * this is the only place that knows how those look. The original ran every
 * heading through Bootstrap's `.display-7`, so a section heading was 16px bold -
 * the same size as body copy. The scale below keeps the source's own emphasis
 * (the import records which headings were maroon) and gives each level a size.
 */
const HEADING: Record<1 | 2 | 3 | 4, string> = {
  1: "text-[clamp(1.75rem,3.4vw,2.5rem)] leading-[1.12]",
  2: "text-[clamp(1.25rem,2.1vw,1.625rem)] leading-[1.25]",
  3: "text-[1.0625rem] leading-snug",
  4: "text-[1rem] leading-snug",
}

const HEADING_TAG = { 1: "h1", 2: "h2", 3: "h3", 4: "h4" } as const

const MARK: Record<Mark, string> = {
  strong: "font-semibold text-foreground",
  em: "italic",
  underline: "underline underline-offset-2",
  accent: "text-primary",
  muted: "text-muted-foreground",
}

const LINK = "font-medium text-primary underline decoration-primary/35 underline-offset-4 hover:decoration-primary"

export function Content({ blocks }: { blocks: Block[] }) {
  return (
    <div className="text-[1.0625rem] text-muted-foreground">
      {blocks.map((block, index) => (
        <BlockView key={index} block={block} />
      ))}
    </div>
  )
}

function BlockView({ block }: { block: Block }) {
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
            <li key={index} className="pl-1 leading-[1.7]">
              <Inlines nodes={item} />
            </li>
          ))}
        </ul>
      )
    case "divider":
      return <Separator className={cn("my-9", block.accent ? "bg-primary/25" : "bg-border")} />
    case "contactForm":
      return <ContactForm />
  }
}

/**
 * Inline runs. The source used <strong>, <em> and coloured spans; those become
 * real elements and brand colours rather than a font weight alone, which is
 * what a screen reader and a search engine both see.
 */
export function Inlines({ nodes, linkClassName }: { nodes: Inline[]; linkClassName?: string }) {
  return (
    <>
      {nodes.map((node, index) => (
        // Content is immutable per build and never reorders at runtime.
        <InlineView key={index} node={node} linkClassName={linkClassName} />
      ))}
    </>
  )
}

function InlineView({ node, linkClassName }: { node: Inline; linkClassName?: string }) {
  switch (node.t) {
    case "text":
      return <>{node.v}</>
    case "br":
      return <br />
    case "span": {
      const className = node.marks.map((mark) => MARK[mark]).join(" ")
      const body = <Inlines nodes={node.c} linkClassName={linkClassName} />
      if (node.marks.length === 1 && node.marks[0] === "strong") {
        return <strong className={className}>{body}</strong>
      }
      if (node.marks.length === 1 && node.marks[0] === "em") {
        return <em className={className}>{body}</em>
      }
      return <span className={className}>{body}</span>
    }
    case "link": {
      // The one call to action inside the content gets the same button as the
      // rest of the site; every other link is a link.
      if (node.button) {
        return (
          <Link to={node.href} className={cn(buttonVariants({ size: "cta" }), "my-2")}>
            <Inlines nodes={node.c} linkClassName={linkClassName} />
          </Link>
        )
      }
      const className = linkClassName ?? LINK
      if (node.href.startsWith("/") && !node.href.startsWith("//")) {
        return (
          <Link to={node.href} className={className}>
            <Inlines nodes={node.c} linkClassName={linkClassName} />
          </Link>
        )
      }
      return (
        <a
          href={node.href}
          className={className}
          {...(node.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          <Inlines nodes={node.c} linkClassName={linkClassName} />
        </a>
      )
    }
  }
}
