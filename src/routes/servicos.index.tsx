import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { cityLabel } from "@/config/clinic";
import { serviceCategories, services, type ServiceCategory } from "@/content/services";
import { seo } from "@/lib/seo";
import { PageHeader } from "@/components/site/Breadcrumbs";
import { ServiceCard } from "@/components/site/cards";
import { CtaBanner } from "@/components/site/CtaBanner";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/servicos/")({
  head: () =>
    seo({
      title: "Tratamentos odontológicos",
      description: `Conheça os tratamentos odontológicos oferecidos em ${cityLabel}: prevenção, estética, reabilitação e especialidades.`,
      path: "/servicos",
    }),
  component: ServicosPage,
});

function ServicosPage() {
  const [cat, setCat] = useState<ServiceCategory | "Todos">("Todos");
  const list = cat === "Todos" ? services : services.filter((s) => s.category === cat);
  return (
    <>
      <PageHeader crumbs={[{ label: "Tratamentos" }]} eyebrow="Tratamentos" title="Tratamentos odontológicos" text="Lista provisória, sujeita à confirmação dos serviços oferecidos pela clínica. A indicação de qualquer tratamento depende de avaliação." />
      <section className="container-site section-y">
        <div role="group" aria-label="Filtrar por categoria" className="flex flex-wrap gap-2">
          {(["Todos", ...serviceCategories] as const).map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={cat === c}
              onClick={() => setCat(c)}
              className={cn(
                "min-h-10 rounded-full border px-4 text-sm font-medium transition-colors",
                cat === c ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card hover:border-primary",
              )}
            >
              {c}
            </button>
          ))}
        </div>
        <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((s) => <li key={s.slug}><ServiceCard service={s} /></li>)}
        </ul>
      </section>
      <CtaBanner />
    </>
  );
}
