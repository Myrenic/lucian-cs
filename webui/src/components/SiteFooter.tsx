import { Icon } from "@/components/icons"
import { Inlines } from "@/components/Inline"
import { Separator } from "@/components/ui/separator"
import { site } from "@/lib/content"
import { pageShell } from "@/lib/layout"

/**
 * Footer on the brand's darkest tone, which also gives every page an end.
 *
 * The four columns are the original's (address, contact, info, the links the
 * client curates) - the imported content decides what is in them, including the
 * mailto: address that the old site hid behind Cloudflare's email obfuscation.
 */
export function SiteFooter() {
  return (
    <footer className="bg-ink text-ink-foreground">
      <div className={pageShell}>
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 py-16 sm:grid-cols-2 lg:grid-cols-4">
          {site.columns.map((column) => (
            <div key={column.title}>
              <h2 className="text-[0.75rem] font-semibold tracking-[0.14em] text-ink-muted uppercase">
                {column.title}
              </h2>
              <div className="mt-4 space-y-1 text-[0.9375rem] leading-relaxed">
                {column.lines.map((line, index) => (
                  <p key={index} className="m-0">
                    <Inlines nodes={line} linkClassName="text-ink-foreground/85 underline decoration-ink-foreground/30 underline-offset-4 transition-colors hover:text-white hover:decoration-white" />
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>

        <Separator className="bg-white/12" />

        <div className="flex flex-col-reverse items-start justify-between gap-6 py-7 sm:flex-row sm:items-center">
          <p className="m-0 text-[0.875rem] text-ink-muted">By Mike T.</p>
          <ul className="m-0 flex list-none gap-2 p-0">
            {site.social.map((social) => (
              <li key={social.name}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="flex size-9 items-center justify-center rounded-md text-ink-muted ring-1 ring-white/12 transition-colors hover:bg-white/8 hover:text-white"
                >
                  <Icon name={social.name} className="size-4" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}
