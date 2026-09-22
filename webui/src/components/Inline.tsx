import { Link } from "react-router-dom"
import type { Inline, Mark } from "@/lib/content"

// Every value here is the original's, read with getComputedStyle: prose links
// are Bootstrap 4 blue, and the one CTA link in the content carries its own
// inline button styling which is reproduced as-is.
const MARK_CLASS: Record<Mark, string> = {
  strong: "font-bold",
  em: "italic",
  underline: "underline",
  accent: "text-maroon",
  muted: "text-muted",
}

/** The source used <strong> and <em>; keep those elements when the mark is the
 *  only one, so the emphasis is not reduced to a font weight. */
const SEMANTIC_TAG: Partial<Record<Mark, "strong" | "em">> = { strong: "strong", em: "em" }

const BUTTON_CLASS =
  "inline-block rounded-[5px] bg-[#400000] px-[30px] py-[15px] text-lg font-bold text-[#e2e8f0] " +
  "no-underline shadow-[0_4px_6px_rgba(0,0,0,0.1)] transition-colors hover:bg-[#5c0000]"

const LINK_CLASS = "text-[#007bff] no-underline hover:text-[#0056b3] hover:underline"

export function Inlines({ nodes }: { nodes: Inline[] }) {
  return (
    <>
      {nodes.map((node, index) => (
        // Content is immutable per build and never reorders at runtime.
        <InlineNode key={index} node={node} />
      ))}
    </>
  )
}

function InlineNode({ node }: { node: Inline }) {
  switch (node.t) {
    case "text":
      return <>{node.v}</>
    case "br":
      return <br />
    case "span": {
      const className = node.marks.map((mark) => MARK_CLASS[mark]).join(" ")
      const semantic = node.marks.length === 1 ? SEMANTIC_TAG[node.marks[0]] : undefined
      if (semantic === "strong") {
        return (
          <strong className={className}>
            <Inlines nodes={node.c} />
          </strong>
        )
      }
      if (semantic === "em") {
        return (
          <em className={className}>
            <Inlines nodes={node.c} />
          </em>
        )
      }
      return (
        <span className={className}>
          <Inlines nodes={node.c} />
        </span>
      )
    }
    case "link": {
      const className = node.button ? BUTTON_CLASS : LINK_CLASS
      // Site-internal hrefs route client-side; everything else is a real link.
      if (node.href.startsWith("/") && !node.href.startsWith("//")) {
        return (
          <Link to={node.href} className={className}>
            <Inlines nodes={node.c} />
          </Link>
        )
      }
      return (
        <a
          href={node.href}
          className={className}
          {...(node.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          <Inlines nodes={node.c} />
        </a>
      )
    }
  }
}
