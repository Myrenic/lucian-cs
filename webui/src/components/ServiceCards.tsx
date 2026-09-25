import { ArrowUpRight, Briefcase, Lightbulb, Settings, TrendingUp, type LucideIcon } from "lucide-react"
import { Link } from "react-router-dom"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Inlines } from "@/components/Content"
import type { ServiceCard, ServiceIcon } from "@/lib/content"

/** The source's own icon names, mapped onto lucide, which is what shadcn uses. */
const ICONS: Record<ServiceIcon, LucideIcon> = {
  briefcase: Briefcase,
  idea: Lightbulb,
  "growing-chart": TrendingUp,
  setting: Settings,
}

/**
 * The four service panels from the homepage. Stock Card, one link per panel so
 * the whole thing is a target, and a 1/2/4 grid: the original laid four
 * `col-lg-4` cards in a row that did not wrap and overflowed the viewport.
 */
export function ServiceCards({ cards }: { cards: ServiceCard[] }) {
  return (
    <div className="page">
      <ul className="grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => {
          const Icon = ICONS[card.icon]
          return (
            <li key={card.href} className="flex">
              <Link
                to={card.href}
                className="group/card flex w-full rounded-xl focus-visible:outline-none"
              >
                <Card className="h-full w-full transition-colors group-hover/card:ring-primary/40 group-focus-visible/card:ring-primary">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-3">
                      <Icon className="size-6 text-primary" aria-hidden="true" />
                      <ArrowUpRight
                        className="size-4 text-muted-foreground"
                        aria-hidden="true"
                      />
                    </div>
                    <h3 className="font-heading leading-snug font-semibold">{card.title}</h3>
                  </CardHeader>
                  <CardContent className="flex flex-1 flex-col gap-4 text-muted-foreground">
                    <p className="leading-relaxed">
                      <Inlines nodes={card.lead} />
                    </p>
                    <ul className="mt-auto space-y-1.5 border-t pt-3 text-[0.9375rem]">
                      {card.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
