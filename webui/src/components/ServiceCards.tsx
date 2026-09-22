import { Icon } from "@/components/icons"
import { Inlines } from "@/components/Inline"
import { Link } from "react-router-dom"
import type { ServiceCard } from "@/lib/content"

/**
 * The four service panels on the homepage (`counters1` in the original).
 *
 * The original laid four `col-lg-4` cards out in one non-wrapping flex row,
 * which overflowed the viewport by 80px at 1440 wide. Here they wrap: 1 column
 * on phones, 2 on tablets, 4 on desktop, which is what the markup intended.
 */
export function ServiceCards({ cards }: { cards: ServiceCard[] }) {
  return (
    <div className="mx-auto grid max-w-content grid-cols-1 gap-y-10 px-4 md:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <Link
          key={card.href}
          to={card.href}
          className="flex flex-col items-center p-4 text-center font-rubik no-underline"
        >
          <div className="flex h-[98px] items-center justify-center pb-4">
            <Icon name={card.icon} className="h-20 w-20 text-maroon-deep" />
          </div>
          <h2 className="mb-2 text-[1.2rem] leading-none font-bold text-muted">{card.title}</h2>
          <p className="mb-4 leading-6 text-muted">
            <Inlines nodes={card.lead} />
          </p>
          <hr className="mx-auto my-4 w-full border-0 border-t border-hairline" />
          <ul className="text-muted">
            {card.items.map((item) => (
              <li key={item} className="mb-2 leading-none">
                {item}
              </li>
            ))}
          </ul>
        </Link>
      ))}
    </div>
  )
}
