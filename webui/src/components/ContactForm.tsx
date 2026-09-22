import { useState, type FormEvent } from "react"
import { site } from "@/lib/content"

// Field limits are the ones Contact Form 7 enforced on the original form.
const FIELDS = [
  { name: "Naam", type: "text", required: true, maxLength: 400 },
  { name: "Email", type: "email", required: true, maxLength: 400 },
  { name: "Mobiel", type: "tel", required: false, maxLength: 12 },
  { name: "Onderwerp", type: "text", required: true, maxLength: 400 },
] as const

/**
 * The contact form.
 *
 * The original posted to WordPress' Contact Form 7 plugin, which does not
 * exist in a static build, so there is no endpoint to post to. Rather than
 * ship a form that silently loses messages, submitting composes the same
 * message as a mail to the office and hands it to the visitor's mail client.
 *
 * Replace `openMailClient` with a real endpoint (Formspree, a small function,
 * the client's own mail service) before this goes live on their domain - the
 * success message below says the mail client opened, not that mail was sent.
 */
export function ContactForm() {
  const [sent, setSent] = useState(false)
  const [error, setError] = useState("")

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const get = (key: string) => String(data.get(key) ?? "").trim()

    const message = get("Bericht")
    if (message.length < 10) {
      setError("Vul een bericht van minimaal 10 tekens in.")
      return
    }
    setError("")
    const subject = get("Onderwerp") || "Contact via luciancs.nl"
    const body = [
      `Naam: ${get("Naam")}`,
      `Email: ${get("Email")}`,
      `Mobiel: ${get("Mobiel")}`,
      "",
      message,
    ].join("\n")

    window.location.href = `mailto:${site.contact.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`
    setSent(true)
  }

  return (
    <form onSubmit={onSubmit} noValidate className="font-rubik">
      {FIELDS.map((field) => (
        <div key={field.name} className="mb-4">
          <label htmlFor={`field-${field.name}`} className="sr-only">
            {field.name}
          </label>
          <input
            id={`field-${field.name}`}
            name={field.name}
            type={field.type}
            placeholder={field.name}
            required={field.required}
            maxLength={field.maxLength}
            className="min-h-[3.5em] w-full rounded border border-field-border bg-field px-2 py-[1.07em] text-field-text outline-none focus:border-maroon"
          />
        </div>
      ))}

      <div className="mb-4">
        <label htmlFor="field-Bericht" className="sr-only">
          Bericht
        </label>
        <textarea
          id="field-Bericht"
          name="Bericht"
          rows={10}
          minLength={10}
          placeholder="Bericht"
          className="w-full rounded border border-field-border bg-field px-2 py-[1.07em] leading-[1.43] text-field-text outline-none focus:border-maroon"
        />
      </div>

      {error ? (
        <p role="alert" className="mb-4 text-center text-maroon">
          {error}
        </p>
      ) : null}

      <div className="text-center">
        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-[3px] border-2 border-maroon-deep bg-maroon-deep px-12 py-4 font-medium tracking-[1px] text-white transition-colors hover:bg-[#6b0000]"
        >
          VERSTUUR
        </button>
      </div>

      {sent ? (
        <p role="status" className="mt-4 text-center text-muted">
          Uw e-mailprogramma is geopend met dit bericht. Komt er niets tevoorschijn, mail dan direct
          naar {site.contact.email} of bel {site.contact.phone}.
        </p>
      ) : null}
    </form>
  )
}
