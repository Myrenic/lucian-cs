import { ArrowUpRight } from "lucide-react"
import { Link } from "react-router-dom"
import { Icon } from "@/components/icons"
import { Inlines } from "@/components/Inline"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { pageShell } from "@/lib/layout"
import type { ServiceCard } from "@/lib/content"

/**
 * The four service panels from the homepage. Stock Card, one link per panel so
 * the whole card is a target, and a 1/2/4 grid: the original laid four
 * `col-lg-4` cards in a row that did not wrap and overflowed the viewport.
 */
export function ServiceCards({ cards }: { cards: ServiceCard[] }) {
  return (
    <div className={pageShell}>
      <ul className="grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <li key={card.href} className="flex">
            <Link
              to={card.href}
              className="group/card flex w-full rounded-xl focus-visible:outline-none"
            >
              <Card className="h-full w-full transition-colors group-hover/card:ring-primary/40 group-focus-visible/card:ring-primary">
                <CardHeader className="gap-4">
                  <div className="flex items-start justify-between gap-3">
                    <span className="flex size-11 items-center justify-center rounded-lg bg-primary/8 text-primary ring-1 ring-primary/12">
                      <Icon name={card.icon} className="size-6" />
                    </span>
                    <ArrowUpRight className="mt-0.5 size-4 text-muted-foreground" aria-hidden="true" />
                  </div>
                  <h3 className="font-heading text-[1.0625rem] leading-snug font-semibold">
                    {card.title}
                  </h3>
                </CardHeader>
                <CardContent className="flex flex-1 flex-col gap-4 text-muted-foreground">
                  <p className="leading-relaxed">
                    <Inlines nodes={card.lead} />
                  </p>
                  <ul className="mt-auto space-y-1.5 border-t pt-3 text-[0.9375rem]">
                    {card.items.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span aria-hidden="true" className="mt-2 size-1 shrink-0 rounded-full bg-primary/45" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
