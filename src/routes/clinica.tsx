import { createFileRoute } from "@tanstack/react-router";
import img from "@/assets/clinic-room.jpg";
import { clinic, cityLabel } from "@/config/clinic";
import { seo } from "@/lib/seo";
import { PageHeader } from "@/components/site/Breadcrumbs";
import { ImageNote, PlaceholderNote, SectionHeading } from "@/components/site/primitives";
import { CtaBanner } from "@/components/site/CtaBanner";

export const Route = createFileRoute("/clinica")({
  head: () =>
    seo({
      title: "A Clínica",
      description: `Conheça a história, a missão e a estrutura da ${clinic.name}, clínica odontológica em ${cityLabel}.`,
      path: "/clinica",
    }),
  component: ClinicaPage,
});

const values = ["[Valor 1 — ex.: acolhimento]", "[Valor 2 — ex.: ética]", "[Valor 3 — ex.: transparência]"];

function ClinicaPage() {
  return (
    <>
      <PageHeader crumbs={[{ label: "A Clínica" }]} eyebrow="A Clínica" title={`Conheça a ${clinic.name}`} text="Conteúdo de exemplo — substitua pela apresentação real da clínica." />
      <section className="container-site section-y grid items-center gap-10 lg:grid-cols-2">
        <div>
          <SectionHeading title="Nossa história" text="[História da clínica: quando e por que foi fundada, trajetória e propósito. Texto provisório.]" />
          <PlaceholderNote className="mt-6">Todos os textos desta página são placeholders.</PlaceholderNote>
        </div>
        <div className="relative overflow-hidden rounded-3xl">
          <img src={img} alt="Consultório odontológico (imagem ilustrativa)" width={1200} height={912} loading="lazy" className="aspect-[4/3] w-full object-cover" />
          <ImageNote />
        </div>
      </section>
      <section className="bg-surface">
        <div className="container-site section-y grid gap-6 md:grid-cols-3">
          <article className="rounded-2xl border border-border bg-card p-6">
            <h2 className="text-2xl">Missão</h2>
            <p className="mt-3 text-sm text-muted-foreground">[Missão da clínica.]</p>
          </article>
          <article className="rounded-2xl border border-border bg-card p-6">
            <h2 className="text-2xl">Visão</h2>
            <p className="mt-3 text-sm text-muted-foreground">[Visão da clínica.]</p>
          </article>
          <article className="rounded-2xl border border-border bg-card p-6">
            <h2 className="text-2xl">Valores</h2>
            <ul className="mt-3 space-y-1 text-sm text-muted-foreground">{values.map((v) => <li key={v}>{v}</li>)}</ul>
          </article>
        </div>
      </section>
      <section className="container-site section-y">
        <SectionHeading title="Estrutura e ambiente" text="[Descreva consultórios, equipamentos, esterilização e conforto — apenas o que for real.]" />
        <ul className="mt-10 grid gap-5 sm:grid-cols-3">
          {clinic.highlights.map((h) => (
            <li key={h.title} className="rounded-2xl border border-border p-6">
              <h3 className="text-lg">{h.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{h.text}</p>
            </li>
          ))}
        </ul>
      </section>
      <CtaBanner />
    </>
  );
}
