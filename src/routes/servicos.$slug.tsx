import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { cityLabel } from "@/config/clinic";
import { getService, services } from "@/content/services";
import { seo } from "@/lib/seo";
import { PageHeader } from "@/components/site/Breadcrumbs";
import { BookingButton, PlaceholderNote } from "@/components/site/primitives";
import { FaqList } from "@/components/site/FaqList";
import { CtaBanner } from "@/components/site/CtaBanner";
import { ServiceIcon } from "@/components/site/cards";

export const Route = createFileRoute("/servicos/$slug")({
  loader: ({ params }) => {
    const service = getService(params.slug);
    if (!service) throw notFound();
    return { service };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Tratamento não encontrado" }, { name: "robots", content: "noindex" }] };
    const s = loaderData.service;
    return seo({ title: `${s.name} em ${cityLabel}`, description: `${s.short} Saiba como funciona e agende sua avaliação em ${cityLabel}.`, path: `/servicos/${s.slug}` });
  },
  component: ServicePage,
});

function ServicePage() {
  const { service: s } = Route.useLoaderData();
  const others = services.filter((o) => o.slug !== s.slug).slice(0, 3);
  return (
    <>
      <PageHeader crumbs={[{ label: "Tratamentos", to: "/servicos" }, { label: s.name }]} eyebrow={s.category} title={`${s.name} em ${cityLabel}`} text={s.intro} />
      <div className="container-site section-y grid gap-12 lg:grid-cols-[1fr_20rem]">
        <article className="min-w-0 space-y-12">
          <PlaceholderNote>
            Conteúdo provisório. A indicação e o planejamento de qualquer tratamento dependem de avaliação profissional
            individual. Este texto não substitui uma consulta.
          </PlaceholderNote>
          <Block title={`O que é ${s.name.toLowerCase()}`}>{s.what}</Block>
          <Block title="Para quem pode ser indicado">{s.indicated}</Block>
          <section>
            <h2 className="text-2xl sm:text-3xl">Como funciona</h2>
            <ol className="mt-6 space-y-4">
              {s.steps.map((st, i) => (
                <li key={st} className="flex gap-4 rounded-xl border border-border bg-card p-4">
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-accent text-sm font-bold text-accent-foreground">{i + 1}</span>
                  <span className="pt-1">{st}</span>
                </li>
              ))}
            </ol>
          </section>
          <Block title="Cuidados que podem ser necessários">{s.care}</Block>
          <section>
            <h2 className="text-2xl sm:text-3xl">Perguntas frequentes</h2>
            <div className="mt-6"><FaqList items={s.faq} idPrefix={s.slug} /></div>
          </section>
        </article>
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-2xl border border-border bg-surface p-6">
            <ServiceIcon icon={s.icon} />
            <p className="mt-4 font-display text-xl">Agende uma avaliação</p>
            <p className="mt-2 text-sm text-muted-foreground">Converse com um profissional sobre o seu caso.</p>
            <BookingButton className="mt-5 w-full" />
          </div>
          <nav aria-label="Outros tratamentos" className="mt-6">
            <h2 className="font-sans text-sm font-bold">Outros tratamentos</h2>
            <ul className="mt-3 space-y-2 text-sm">
              {others.map((o) => (
                <li key={o.slug}><Link to="/servicos/$slug" params={{ slug: o.slug }} className="text-primary hover:underline">{o.name}</Link></li>
              ))}
            </ul>
          </nav>
        </aside>
      </div>
      <CtaBanner />
    </>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-2xl sm:text-3xl">{title}</h2>
      <p className="mt-4 leading-relaxed text-muted-foreground">{children}</p>
    </section>
  );
}
