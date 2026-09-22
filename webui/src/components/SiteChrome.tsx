import { Icon } from "@/components/icons"
import { Inlines } from "@/components/Inline"
import { site } from "@/lib/content"
import { Link } from "react-router-dom"

/**
 * The fixed top bar from the original theme: light grey, black bold Rubik
 * links, brand on the left. The checkbox is the mobile menu - the source used
 * Bootstrap's JS for the same collapse, which is the only behaviour worth
 * keeping.
 */
export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 h-nav bg-band">
      <nav className="mx-auto flex h-full max-w-[1280px] items-center px-4 md:px-20">
        <Link to="/" className="font-rubik text-[1.2rem] font-bold text-black no-underline">
          {site.brand}
        </Link>

        <input id="nav-toggle" type="checkbox" className="peer sr-only" />
        <label htmlFor="nav-toggle" className="ml-auto cursor-pointer p-2 md:hidden" aria-label="Menu">
          <span className="block h-0.5 w-6 bg-black" />
          <span className="mt-1.5 block h-0.5 w-6 bg-black" />
          <span className="mt-1.5 block h-0.5 w-6 bg-black" />
        </label>

        <ul className="m-0 hidden list-none items-center gap-x-[10px] p-0 font-rubik peer-checked:absolute peer-checked:inset-x-0 peer-checked:top-nav peer-checked:block peer-checked:bg-band peer-checked:px-4 peer-checked:pb-4 md:ml-auto md:flex md:peer-checked:static">
          {site.nav.map((item) => (
            <li key={item.href}>
              <Link
                to={item.href}
                className="block px-2 py-3 text-[1.2rem] font-bold text-black no-underline hover:underline"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}

/** Bottom of every page: four link/text columns, copyright and socials. */
export function SiteFooter() {
  return (
    <footer className="bg-band py-[60px] font-rubik">
      <div className="mx-auto max-w-content px-4">
        <div className="grid grid-cols-1 gap-y-8 md:grid-cols-4">
          {site.columns.map((column) => (
            <div key={column.title}>
              {/* The original's column titles carry 3rem of top padding. */}
              <h2 className="pt-12 text-[1.2rem] font-bold text-muted">{column.title}</h2>
              <div className="mt-6 text-muted [&_a]:text-muted [&_a]:no-underline [&_a:hover]:underline">
                {column.lines.map((line, index) => (
                  <p key={index} className="mb-0">
                    <Inlines nodes={line} />
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>

        <hr className="my-4 border-0 border-t border-white" />

        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="mb-0 text-muted">{site.copyright}</p>
          <ul className="m-0 flex list-none gap-3 p-0">
            {site.social.map((social) => (
              <li key={social.name}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="block text-black transition-opacity hover:opacity-70"
                >
                  <Icon name={social.name} className="h-5 w-5" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}
