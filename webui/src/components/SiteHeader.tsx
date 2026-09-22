import { useEffect, useState } from "react"
import { Menu } from "lucide-react"
import { Link, NavLink, useLocation } from "react-router-dom"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { site } from "@/lib/content"
import { pageShell } from "@/lib/layout"
import { cn } from "@/lib/utils"

/**
 * The header borrows the hero's dark band while the page is at the top and turns
 * into a solid, blurred bar once you scroll past it. Both states are readable:
 * over the photo the wordmark is white, over the page it is ink.
 *
 * The last menu entry is a call to action rather than a seventh identical link.
 */
export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const [lifted, setLifted] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setLifted(window.scrollY > 12)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // A route change closes the mobile menu; the sheet has no way to know.
  useEffect(() => setOpen(false), [pathname])

  const links = site.nav.filter((item) => item.href !== "/contact.html")
  const action = site.nav.find((item) => item.href === "/contact.html")

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        lifted ? "border-b border-border bg-background/85 backdrop-blur-md" : "bg-transparent",
      )}
      data-lifted={lifted}
    >
      <div className={cn(pageShell, "flex h-16 items-center gap-6 lg:h-18")}>
        <Link
          to="/"
          className={cn(
            "font-heading text-lg font-semibold tracking-[0.08em] transition-colors",
            lifted ? "text-foreground" : "text-white",
          )}
        >
          {site.brand}
        </Link>

        <nav aria-label="Hoofdmenu" className="ml-auto hidden items-center gap-1 lg:flex">
          {links.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              className={({ isActive }) =>
                cn(
                  "rounded-md px-3 py-2 text-[0.9375rem] font-medium transition-colors",
                  lifted
                    ? "text-muted-foreground hover:bg-secondary hover:text-foreground"
                    : "text-white/80 hover:bg-white/10 hover:text-white",
                  isActive && (lifted ? "text-foreground" : "text-white"),
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
          {action ? (
            <Button asChild size="cta" className={cn("ml-3", !lifted && "shadow-none")}>
              <Link to={action.href}>{action.label}</Link>
            </Button>
          ) : null}
        </nav>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon-lg"
              className={cn("ml-auto lg:hidden", lifted ? "text-foreground" : "text-white")}
              aria-label="Menu openen"
            >
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full max-w-sm">
            <SheetHeader>
              <SheetTitle className="tracking-[0.08em]">{site.brand}</SheetTitle>
            </SheetHeader>
            <nav aria-label="Hoofdmenu" className="flex flex-col px-4">
              {site.nav.map((item, index) => (
                <div key={item.href}>
                  {index > 0 ? <Separator /> : null}
                  <SheetClose asChild>
                    <NavLink
                      to={item.href}
                      className={({ isActive }) =>
                        cn(
                          "block py-3.5 text-base font-medium text-muted-foreground transition-colors hover:text-foreground",
                          isActive && "text-primary",
                        )
                      }
                    >
                      {item.label}
                    </NavLink>
                  </SheetClose>
                </div>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
