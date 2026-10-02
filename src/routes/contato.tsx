import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { MessageCircle, Phone } from "lucide-react";
import { clinic, cityLabel, whatsappUrl } from "@/config/clinic";
import { seo } from "@/lib/seo";
import { PageHeader } from "@/components/site/Breadcrumbs";
import { btn, PlaceholderNote } from "@/components/site/primitives";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/contato")({
  head: () =>
    seo({
      title: "Contato",
      description: `Fale com a ${clinic.name} em ${cityLabel} pelo formulário, WhatsApp ou telefone.`,
      path: "/contato",
    }),
  component: ContatoPage,
});

const schema = z.object({
  name: z.string().trim().min(2, "Informe seu nome.").max(100),
  phone: z.string().trim().regex(/^[\d\s()+-]{10,20}$/, "Informe um telefone válido com DDD."),
  email: z.union([z.literal(""), z.string().trim().email("E-mail inválido.").max(255)]),
  subject: z.string().min(1, "Selecione um assunto."),
  message: z.string().trim().min(5, "Escreva uma mensagem.").max(1000, "Máximo de 1000 caracteres."),
  consent: z.literal(true, { errorMap: () => ({ message: "É necessário concordar com a política de privacidade." }) }),
});

type Errors = Partial<Record<keyof z.infer<typeof schema>, string>>;

/** Integração futura: substitua por chamada a um serviço de formulário/backend seguro. */
const FORM_ENDPOINT_CONFIGURED = false;

function ContatoPage() {
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "not-configured">("idle");
  const wa = whatsappUrl();

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = { ...Object.fromEntries(fd), consent: fd.get("consent") === "on" };
    const r = schema.safeParse(data);
    if (!r.success) {
      const errs: Errors = {};
      r.error.issues.forEach((i) => (errs[i.path[0] as keyof Errors] ??= i.message));
      setErrors(errs);
      setStatus("idle");
      return;
    }
    setErrors({});
    if (!FORM_ENDPOINT_CONFIGURED) setStatus("not-configured");
  }

  return (
    <>
      <PageHeader crumbs={[{ label: "Contato" }]} eyebrow="Contato" title="Fale com a gente" text="Envie sua mensagem ou, se preferir, fale diretamente pelo WhatsApp ou telefone." />
      <section className="container-site section-y grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        <form noValidate onSubmit={onSubmit} className="space-y-5 rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-8">
          <Field id="name" label="Nome" error={errors.name}><input id="name" name="name" autoComplete="name" className={input(errors.name)} aria-invalid={!!errors.name} aria-describedby={errors.name && "name-error"} /></Field>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field id="phone" label="Telefone / WhatsApp" error={errors.phone}><input id="phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" className={input(errors.phone)} aria-invalid={!!errors.phone} aria-describedby={errors.phone && "phone-error"} /></Field>
            <Field id="email" label="E-mail (opcional)" error={errors.email}><input id="email" name="email" type="email" autoComplete="email" className={input(errors.email)} aria-invalid={!!errors.email} aria-describedby={errors.email && "email-error"} /></Field>
          </div>
          <Field id="subject" label="Assunto" error={errors.subject}>
            <select id="subject" name="subject" defaultValue="" className={input(errors.subject)} aria-invalid={!!errors.subject} aria-describedby={errors.subject && "subject-error"}>
              <option value="" disabled>Selecione</option>
              <option>Agendar avaliação</option>
              <option>Dúvida sobre tratamento</option>
              <option>Outro assunto</option>
            </select>
          </Field>
          <Field id="message" label="Mensagem" error={errors.message}>
            <textarea id="message" name="message" rows={5} maxLength={1000} className={cn(input(errors.message), "h-auto py-3")} aria-invalid={!!errors.message} aria-describedby={errors.message && "message-error"} />
          </Field>
          <p className="text-xs text-muted-foreground">Não inclua informações de saúde detalhadas nesta mensagem.</p>
          <div>
            <label className="flex items-start gap-3 text-sm">
              <input type="checkbox" name="consent" className="mt-1 size-4 shrink-0 accent-primary" aria-invalid={!!errors.consent} aria-describedby={errors.consent && "consent-error"} />
              <span>Concordo com o uso dos meus dados apenas para retorno deste contato, conforme a <Link to="/politica-de-privacidade" className="text-primary underline">Política de Privacidade</Link>.</span>
            </label>
            {errors.consent && <p id="consent-error" className="mt-1 text-sm text-destructive">{errors.consent}</p>}
          </div>
          <button type="submit" className={cn(btn(), "w-full sm:w-auto")}>Enviar mensagem</button>
          <div aria-live="polite">
            {status === "not-configured" && (
              <PlaceholderNote>
                Dados válidos, mas a sua mensagem <strong>não foi enviada</strong>: o envio do formulário ainda não está
                configurado. Por favor, utilize o WhatsApp ou telefone.
              </PlaceholderNote>
            )}
          </div>
        </form>
        <aside className="space-y-4">
          <div className="rounded-3xl bg-primary p-6 text-primary-foreground">
            <MessageCircle className="size-6" aria-hidden />
            <h2 className="mt-4 text-2xl">WhatsApp</h2>
            {wa ? (
              <a href={wa} target="_blank" rel="noopener noreferrer" className={cn(btn({ variant: "light" }), "mt-5")}>Conversar agora</a>
            ) : (
              <p className="mt-2 text-sm text-primary-foreground/80">[WHATSAPP] — número ainda não configurado.</p>
            )}
          </div>
          <div className="rounded-3xl border border-border p-6">
            <Phone className="size-6 text-primary" aria-hidden />
            <h2 className="mt-4 text-2xl">Telefone</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {clinic.phone ? <a href={`tel:${clinic.phone}`} className="text-primary">{clinic.phone}</a> : clinic.phoneDisplay}
            </p>
          </div>
        </aside>
      </section>
    </>
  );
}

const input = (err?: string) =>
  cn("h-12 w-full rounded-xl border bg-background px-4 text-base", err ? "border-destructive" : "border-input");

function Field({ id, label, error, children }: { id: string; label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold">{label}</label>
      {children}
      {error && <p id={`${id}-error`} className="mt-1 text-sm text-destructive">{error}</p>}
    </div>
  );
}
