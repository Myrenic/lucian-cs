import { useEffect, useState } from "react"
import { Mail, Menu, Phone } from "lucide-react"
import { Link, useLocation } from "react-router-dom"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { site } from "@/lib/content"
import { pageShell } from "@/lib/layout"

/**
 * Stock shadcn chrome: a sticky bar with a blur and a hairline, ghost buttons
 * for the menu, and a Sheet for small screens. The only custom part is that the
 * Contact entry is filled rather than ghost, because it is the action the page
 * wants from a visitor.
 */
export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  // A Sheet has no idea the route changed underneath it.
  useEffect(() => setOpen(false), [pathname])

  const contact = site.nav.find((item) => item.href === "/contact.html")
  const links = site.nav.filter((item) => item !== contact)

  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md">
      <div className={pageShell}>
        <div className="flex h-16 items-center gap-1">
          <Link
            to="/"
            className="mr-3 font-heading text-[0.9375rem] font-semibold tracking-[0.1em] text-foreground"
          >
            {site.brand}
          </Link>

          <nav aria-label="Hoofdmenu" className="ml-auto hidden items-center gap-1 md:flex">
            {links.map((item) => (
              <Button key={item.href} asChild variant="ghost">
                <Link to={item.href}>{item.label}</Link>
              </Button>
            ))}
            {contact ? (
              <Button key={contact.href} asChild className="ml-2">
                <Link to={contact.href}>{contact.label}</Link>
              </Button>
            ) : null}
          </nav>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="ml-auto md:hidden" aria-label="Menu">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle className="tracking-[0.1em]">{site.brand}</SheetTitle>
                <SheetDescription className="sr-only">Hoofdmenu</SheetDescription>
              </SheetHeader>
              <nav aria-label="Hoofdmenu" className="grid gap-1 px-4">
                {links.map((item) => (
                  <Button
                    key={item.href}
                    asChild
                    variant="ghost"
                    className="h-10 justify-start px-3 text-base font-medium"
                  >
                    <Link to={item.href}>{item.label}</Link>
                  </Button>
                ))}
              </nav>
              {contact ? (
                <SheetFooter className="gap-3">
                  {/* Number and address are the client's own, from the import;
                      on a phone these are the shortest route to a gesprek. */}
                  <div className="grid gap-1">
                    <Button asChild variant="ghost" className="h-10 justify-start px-3 font-medium">
                      <a href={site.contact.phoneHref}>
                        <Phone />
                        {site.contact.phone}
                      </a>
                    </Button>
                    <Button asChild variant="ghost" className="h-10 justify-start px-3 font-medium">
                      <a href={`mailto:${site.contact.email}`}>
                        <Mail />
                        {site.contact.email}
                      </a>
                    </Button>
                  </div>
                  <Button asChild size="cta">
                    <Link to={contact.href}>{contact.label}</Link>
                  </Button>
                </SheetFooter>
              ) : null}
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
