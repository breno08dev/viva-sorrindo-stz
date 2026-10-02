import { createFileRoute, notFound } from "@tanstack/react-router";
import { UserRound } from "lucide-react";
import { getProfessional } from "@/content/team";
import { seo } from "@/lib/seo";
import { PageHeader } from "@/components/site/Breadcrumbs";
import { BookingButton } from "@/components/site/primitives";

export const Route = createFileRoute("/equipe/$slug")({
  loader: ({ params }) => {
    const p = getProfessional(params.slug);
    if (!p) throw notFound();
    return { p };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Profissional não encontrado" }, { name: "robots", content: "noindex" }] };
    const { p } = loaderData;
    return seo({ title: `${p.name} — ${p.specialties.join(", ")}`, description: `${p.name}, ${p.cro}. ${p.bio.slice(0, 120)}`, path: `/equipe/${p.slug}` });
  },
  component: ProfilePage,
});

function ProfilePage() {
  const { p } = Route.useLoaderData();
  return (
    <>
      <PageHeader crumbs={[{ label: "Nossa Equipe", to: "/equipe" }, { label: p.name }]} title={p.name} text={`${p.specialties.join(", ")} · ${p.cro}`} />
      <section className="container-site section-y grid gap-10 md:grid-cols-[18rem_1fr]">
        <div className="aspect-[4/5] overflow-hidden rounded-3xl bg-muted">
          {p.photo ? (
            <img src={p.photo} alt={`Foto de ${p.name}`} width={480} height={600} className="size-full object-cover" />
          ) : (
            <div className="grid size-full place-items-center text-muted-foreground"><UserRound className="size-14" aria-hidden /></div>
          )}
        </div>
        <div className="min-w-0 space-y-8">
          <section><h2 className="text-2xl">Apresentação</h2><p className="mt-3 text-muted-foreground">{p.bio}</p></section>
          {p.education.length > 0 && (
            <section><h2 className="text-2xl">Formação</h2><ul className="mt-3 list-disc pl-5 text-muted-foreground">{p.education.map((e) => <li key={e}>{e}</li>)}</ul></section>
          )}
          {p.areas.length > 0 && (
            <section><h2 className="text-2xl">Áreas de atuação</h2><ul className="mt-3 flex flex-wrap gap-2">{p.areas.map((a) => <li key={a} className="rounded-full bg-accent px-3 py-1 text-sm text-accent-foreground">{a}</li>)}</ul></section>
          )}
          <BookingButton />
        </div>
      </section>
    </>
  );
}
