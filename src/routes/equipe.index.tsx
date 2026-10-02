import { createFileRoute } from "@tanstack/react-router";
import { clinic, cityLabel } from "@/config/clinic";
import { team } from "@/content/team";
import { seo } from "@/lib/seo";
import { PageHeader } from "@/components/site/Breadcrumbs";
import { TeamCard, TeamEmpty } from "@/components/site/cards";
import { CtaBanner } from "@/components/site/CtaBanner";

export const Route = createFileRoute("/equipe/")({
  head: () =>
    seo({
      title: "Nossa Equipe",
      description: `Conheça os dentistas da ${clinic.name} em ${cityLabel}, suas especialidades e formação.`,
      path: "/equipe",
      noindex: team.length === 0,
    }),
  component: EquipePage,
});

function EquipePage() {
  return (
    <>
      <PageHeader crumbs={[{ label: "Nossa Equipe" }]} eyebrow="Nossa Equipe" title="Profissionais da clínica" text="Conheça quem cuida do seu sorriso." />
      <section className="container-site section-y">
        {team.length ? (
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((p) => <li key={p.slug}><TeamCard p={p} /></li>)}
          </ul>
        ) : (
          <TeamEmpty />
        )}
      </section>
      <CtaBanner />
    </>
  );
}
