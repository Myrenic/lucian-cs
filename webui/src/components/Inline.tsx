import { Link } from "react-router-dom"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { Inline, Mark } from "@/lib/content"

/**
 * Emphasis in the imported content, rendered as inline elements.
 *
 * The source used <strong>, <em> and coloured spans; those become real
 * elements and brand colours rather than font weights alone, which is what a
 * screen reader and a search engine both see.
 */
const MARK_CLASS: Record<Mark, string> = {
  strong: "font-semibold text-foreground",
  em: "italic",
  underline: "underline underline-offset-2",
  accent: "text-primary",
  muted: "text-muted-foreground",
}

const SEMANTIC_TAG: Partial<Record<Mark, "strong" | "em">> = { strong: "strong", em: "em" }

const LINK_CLASS =
  "font-medium text-primary decoration-primary/35 underline-offset-4 hover:decoration-primary " +
  "transition-[text-decoration-color] underline"

export function Inlines({
  nodes,
  linkClassName,
}: {
  nodes: Inline[]
  /** The dark footer needs its own link colour; it cannot override a utility. */
  linkClassName?: string
}) {
  return (
    <>
      {nodes.map((node, index) => (
        // Content is immutable per build and never reorders at runtime.
        <InlineNode key={index} node={node} linkClassName={linkClassName} />
      ))}
    </>
  )
}

function InlineNode({ node, linkClassName }: { node: Inline; linkClassName?: string }) {
  switch (node.t) {
    case "text":
      return <>{node.v}</>
    case "br":
      return <br />
    case "span": {
      const className = node.marks.map((mark) => MARK_CLASS[mark]).join(" ")
      const semantic = node.marks.length === 1 ? SEMANTIC_TAG[node.marks[0]] : undefined
      const body = <Inlines nodes={node.c} linkClassName={linkClassName} />
      if (semantic === "strong") return <strong className={className}>{body}</strong>
      if (semantic === "em") return <em className={className}>{body}</em>
      return <span className={className}>{body}</span>
    }
    case "link": {
      if (node.button) {
        // The one call to action inside the content keeps its own shape, but is
        // built from the same button variants as the rest of the site.
        return (
          <Link to={node.href} className={cn(buttonVariants({ size: "cta" }), "my-2")}>
            <Inlines nodes={node.c} linkClassName={linkClassName} />
          </Link>
        )
      }
      const className = linkClassName ?? LINK_CLASS
      // Site-internal hrefs route client-side; everything else is a real link.
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
