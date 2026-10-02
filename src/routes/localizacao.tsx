import { createFileRoute } from "@tanstack/react-router";
import { clinic, cityLabel, whatsappUrl } from "@/config/clinic";
import { seo } from "@/lib/seo";
import { PageHeader } from "@/components/site/Breadcrumbs";
import { LocationBlock } from "@/components/site/LocationBlock";
import { btn, PlaceholderNote } from "@/components/site/primitives";
import { CtaBanner } from "@/components/site/CtaBanner";

export const Route = createFileRoute("/localizacao")({
  head: () =>
    seo({
      title: `Localização em ${cityLabel}`,
      description: `Endereço, horários, telefone e como chegar à ${clinic.name} em ${cityLabel}.`,
      path: "/localizacao",
    }),
  component: LocalizacaoPage,
});

function LocalizacaoPage() {
  const wa = whatsappUrl();
  return (
    <>
      <PageHeader crumbs={[{ label: "Localização" }]} eyebrow="Localização" title={`Como chegar à ${clinic.name}`} />
      <section className="container-site section-y space-y-10">
        <LocationBlock />
        <div className="flex flex-col gap-3 sm:flex-row">
          {wa && <a href={wa} target="_blank" rel="noopener noreferrer" className={btn()}>WhatsApp</a>}
          {clinic.googleBusinessUrl && <a href={clinic.googleBusinessUrl} target="_blank" rel="noopener noreferrer" className={btn({ variant: "outline" })}>Ver no Google</a>}
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          <Info title="Como chegar" text="[Instruções reais de acesso: transporte público, pontos de referência.]" />
          <Info title="Estacionamento" text={clinic.parkingInfo || "[Informação de estacionamento, se disponível.]"} />
          <Info title="Acessibilidade" text={clinic.accessibilityInfo || "[Informações reais de acessibilidade, se disponíveis.]"} />
        </div>
        {!clinic.confirmed && <PlaceholderNote>Endereço, horários e mapa serão exibidos após a confirmação dos dados da clínica.</PlaceholderNote>}
      </section>
      <CtaBanner />
    </>
  );
}

function Info({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <h2 className="text-xl">{title}</h2>
      <p className="mt-2 text-sm text-muted-foreground">{text}</p>
    </div>
  );
}
