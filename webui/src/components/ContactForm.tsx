import { useState, type FormEvent } from "react"
import { Button } from "@/components/ui/button"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { site } from "@/lib/content"

type FieldName = "Naam" | "Email" | "Mobiel" | "Onderwerp" | "Bericht"

// Labels and limits are the ones the original Contact Form 7 form used.
const FIELDS: {
  name: Exclude<FieldName, "Bericht">
  label: string
  type: "text" | "email" | "tel"
  required: boolean
  maxLength: number
}[] = [
  { name: "Naam", label: "Naam", type: "text", required: true, maxLength: 400 },
  { name: "Email", label: "Email", type: "email", required: true, maxLength: 400 },
  { name: "Mobiel", label: "Mobiel", type: "tel", required: false, maxLength: 12 },
  { name: "Onderwerp", label: "Onderwerp", type: "text", required: true, maxLength: 400 },
]

/**
 * The contact form.
 *
 * The original posted to WordPress' Contact Form 7, which does not exist in a
 * static build, so there is no endpoint to post to. Rather than ship a form
 * that silently loses messages, submitting composes the same message as a mail
 * to the office and hands it to the visitor's mail client.
 *
 * Replace `compose` with a real endpoint (a form service, a small function, the
 * client's own mail setup) before this goes live on their domain. The
 * confirmation below says the mail client opened, not that mail was sent.
 */
export function ContactForm() {
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({})
  const [opened, setOpened] = useState(false)

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const value = (name: FieldName) => String(data.get(name) ?? "").trim()

    const next: Partial<Record<FieldName, string>> = {}
    if (!value("Naam")) next.Naam = "Vul uw naam in."
    if (!value("Email")) next.Email = "Vul uw e-mailadres in."
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value("Email")))
      next.Email = "Dit lijkt geen geldig e-mailadres."
    if (!value("Onderwerp")) next.Onderwerp = "Vul een onderwerp in."
    if (value("Bericht").length < 10) next.Bericht = "Vul een bericht van minimaal 10 tekens in."

    setErrors(next)
    if (Object.keys(next).length) {
      setOpened(false)
      return
    }

    const subject = value("Onderwerp")
    const body = [
      `Naam: ${value("Naam")}`,
      `Email: ${value("Email")}`,
      `Mobiel: ${value("Mobiel")}`,
      "",
      value("Bericht"),
    ].join("\n")

    window.location.href = `mailto:${site.contact.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`
    setOpened(true)
  }

  return (
    <form onSubmit={onSubmit} noValidate className="mt-8">
      <FieldGroup className="gap-5">
        {FIELDS.map((field) => (
          <Field key={field.name} data-invalid={errors[field.name] ? true : undefined}>
            <FieldLabel htmlFor={`field-${field.name}`} className="text-foreground">
              {field.label}
              {field.required ? null : (
                <span className="ml-1 text-muted-foreground">(optioneel)</span>
              )}
            </FieldLabel>
            <Input
              id={`field-${field.name}`}
              name={field.name}
              type={field.type}
              required={field.required}
              maxLength={field.maxLength}
              aria-invalid={errors[field.name] ? true : undefined}
              className="h-11 bg-card text-base"
            />
            <FieldError>{errors[field.name]}</FieldError>
          </Field>
        ))}

        <Field data-invalid={errors.Bericht ? true : undefined}>
          <FieldLabel htmlFor="field-Bericht" className="text-foreground">
            Bericht
          </FieldLabel>
          <Textarea
            id="field-Bericht"
            name="Bericht"
            rows={8}
            minLength={10}
            aria-invalid={errors.Bericht ? true : undefined}
            className="min-h-40 bg-card text-base"
          />
          <FieldError>{errors.Bericht}</FieldError>
        </Field>
      </FieldGroup>

      <div className="mt-7 flex flex-wrap items-center gap-4">
        <Button type="submit" size="cta">
          Verstuur
        </Button>
        <p className="m-0 text-[0.875rem] text-muted-foreground">
          of mail direct naar{" "}
          <a
            href={`mailto:${site.contact.email}`}
            className="font-medium text-primary underline decoration-primary/35 underline-offset-4 hover:decoration-primary"
          >
            {site.contact.email}
          </a>
        </p>
      </div>

      {opened ? (
        <p
          role="status"
          className="mt-5 rounded-lg border border-primary/20 bg-primary/5 px-4 py-3 text-[0.9375rem] text-foreground"
        >
          Uw e-mailprogramma is geopend met dit bericht. Komt er niets tevoorschijn, mail dan direct
          naar {site.contact.email} of bel {site.contact.phone}.
        </p>
      ) : null}
    </form>
  )
}
