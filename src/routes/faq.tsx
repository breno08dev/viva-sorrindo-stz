import { createFileRoute } from "@tanstack/react-router";
import { clinic, cityLabel } from "@/config/clinic";
import { faqCategories } from "@/content/faq";
import { seo } from "@/lib/seo";
import { PageHeader } from "@/components/site/Breadcrumbs";
import { FaqList } from "@/components/site/FaqList";
import { PlaceholderNote } from "@/components/site/primitives";
import { CtaBanner } from "@/components/site/CtaBanner";

export const Route = createFileRoute("/faq")({
  head: () =>
    seo({
      title: "Perguntas Frequentes",
      description: `Dúvidas sobre agendamento, pagamentos, atendimento e tratamentos na ${clinic.name} em ${cityLabel}.`,
      path: "/faq",
    }),
  component: FaqPage,
});

const slug = (s: string) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

function FaqPage() {
  return (
    <>
      <PageHeader crumbs={[{ label: "FAQ" }]} eyebrow="FAQ" title="Perguntas frequentes" />
      <div className="container-site section-y grid gap-10 lg:grid-cols-[14rem_1fr]">
        <nav aria-label="Categorias" className="lg:sticky lg:top-24 lg:self-start">
          <ul className="flex flex-wrap gap-2 lg:flex-col">
            {faqCategories.map((c) => (
              <li key={c.name}>
                <a href={`#${slug(c.name)}`} className="block rounded-full border border-border px-4 py-2 text-sm hover:border-primary lg:rounded-lg lg:border-0 lg:px-0">
                  {c.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="min-w-0 space-y-12">
          <PlaceholderNote>Todas as respostas são provisórias e devem ser revisadas pelo dentista responsável.</PlaceholderNote>
          {faqCategories.map((c) => (
            <section key={c.name} id={slug(c.name)} className="scroll-mt-24">
              <h2 className="text-2xl sm:text-3xl">{c.name}</h2>
              <div className="mt-5"><FaqList items={c.items} idPrefix={slug(c.name)} /></div>
            </section>
          ))}
        </div>
      </div>
      <CtaBanner title="Ainda com dúvidas?" text="Fale com a nossa equipe e agende uma avaliação." />
    </>
  );
}
