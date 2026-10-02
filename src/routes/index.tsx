import { createFileRoute, Link } from "@tanstack/react-router";
import { CalendarCheck, ClipboardList, HeartHandshake, MapPin, MessageSquareQuote, Stethoscope } from "lucide-react";
import heroImg from "@/assets/clinic-room.jpg";
import blogImg from "@/assets/blog-cover.jpg";
import { clinic, cityLabel, whatsappUrl } from "@/config/clinic";
import { services } from "@/content/services";
import { team } from "@/content/team";
import { homeFaq } from "@/content/faq";
import { seo } from "@/lib/seo";
import { BookingButton, ImageNote, PlaceholderNote, SectionHeading, btn } from "@/components/site/primitives";
import { ServiceCard, TeamCard, TeamEmpty } from "@/components/site/cards";
import { FaqList } from "@/components/site/FaqList";
import { CtaBanner } from "@/components/site/CtaBanner";
import { LocationBlock } from "@/components/site/LocationBlock";

function jsonLd() {
  if (!clinic.confirmed) return [];
  return [
    {
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Dentist",
        name: clinic.name,
        url: clinic.siteUrl,
        telephone: clinic.phone || undefined,
        address: {
          "@type": "PostalAddress",
          streetAddress: clinic.address.street,
          addressLocality: clinic.city,
          addressRegion: clinic.state,
          postalCode: clinic.address.zip,
          addressCountry: "BR",
        },
        openingHours: clinic.hours.map((h) => `${h.days} ${h.time}`),
        sameAs: [clinic.social.instagram, clinic.googleBusinessUrl].filter(Boolean),
      }),
    },
  ];
}

export const Route = createFileRoute("/")({
  head: () => ({
    ...seo({
      title: `Clínica Odontológica em ${cityLabel}`,
      description: `Clínica odontológica em ${cityLabel}: avaliação, prevenção e tratamentos com atendimento acolhedor. Agende sua avaliação.`,
      path: "/",
    }),
    scripts: jsonLd(),
  }),
  component: Home,
});

const steps = [
  { icon: CalendarCheck, title: "Agendamento", text: "Você entra em contato e a equipe confirma o melhor horário." },
  { icon: Stethoscope, title: "Avaliação", text: "Conversa e exame clínico para entender suas necessidades." },
  { icon: ClipboardList, title: "Planejamento", text: "O profissional apresenta as opções indicadas para o seu caso." },
  { icon: HeartHandshake, title: "Acompanhamento", text: "Orientações e retornos conforme o plano definido." },
];

function Home() {
  return (
    <>
      {/* 1. Hero */}
      <section className="relative overflow-hidden">
        <div className="container-site grid items-center gap-10 py-10 sm:py-16 lg:grid-cols-[1.05fr_1fr] lg:py-20">
          <div className="fade-up">
            <p className="eyebrow">Odontologia em {cityLabel}</p>
            <h1 className="mt-4 text-display">
              [Clínica Odontológica em {cityLabel}]
            </h1>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
              Um espaço acolhedor para cuidar da sua saúde bucal, com atenção a cada etapa do seu tratamento.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <BookingButton />
              <Link to="/servicos" className={btn({ variant: "outline" })}>Conhecer tratamentos</Link>
            </div>
          </div>
          <div className="relative">
            <div aria-hidden className="absolute -inset-4 -z-10 rounded-[2.5rem] bg-accent/60 sm:-inset-6" />
            <div className="relative overflow-hidden rounded-3xl shadow-lift">
              <img src={heroImg} alt="Consultório odontológico claro e moderno (imagem ilustrativa)" width={1200} height={912} fetchPriority="high" className="aspect-[4/3] w-full object-cover" />
              <ImageNote />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Faixa de confiança */}
      <section aria-label="Diferenciais" className="border-y border-border bg-surface">
        <ul className="container-site grid gap-6 py-8 sm:grid-cols-3">
          {clinic.highlights.map((h) => (
            <li key={h.title} className="flex items-center gap-3">
              <span aria-hidden className="size-2 shrink-0 rounded-full bg-aqua" />
              <span className="font-semibold">{h.title}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* 3. Conheça a clínica */}
      <section className="container-site section-y grid items-center gap-10 lg:grid-cols-2">
        <div className="relative order-2 overflow-hidden rounded-3xl lg:order-1">
          <img src={blogImg} alt="Itens de higiene bucal (imagem ilustrativa)" width={1200} height={800} loading="lazy" className="aspect-[3/2] w-full object-cover" />
          <ImageNote />
        </div>
        <div className="order-1 lg:order-2">
          <SectionHeading eyebrow="Conheça a clínica" title="Cuidado próximo, do primeiro contato ao acompanhamento" text="[Texto institucional provisório: apresente a história, a proposta e o jeito de atender da clínica.]" />
          <Link to="/clinica" className={`${btn({ variant: "ghost" })} mt-6 -ml-4`}>Sobre a clínica →</Link>
        </div>
      </section>

      {/* 4. Tratamentos */}
      <section className="bg-surface">
        <div className="container-site section-y">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading eyebrow="Tratamentos" title="Tratamentos para cada fase do sorriso" text="Lista inicial editável, sujeita à confirmação dos serviços oferecidos." />
            <Link to="/servicos" className={btn({ variant: "outline" })}>Ver todos</Link>
          </div>
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s) => (
              <li key={s.slug}><ServiceCard service={s} /></li>
            ))}
          </ul>
        </div>
      </section>

      {/* 5. Equipe */}
      <section className="container-site section-y">
        <SectionHeading eyebrow="Nossa equipe" title="Profissionais que cuidam de você" />
        <div className="mt-10">
          {team.length ? (
            <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {team.slice(0, 4).map((p) => <li key={p.slug}><TeamCard p={p} /></li>)}
            </ul>
          ) : (
            <TeamEmpty />
          )}
        </div>
      </section>

      {/* 6. Como funciona */}
      <section className="bg-primary text-primary-foreground">
        <div className="container-site section-y">
          <p className="eyebrow text-aqua">Como funciona</p>
          <h2 className="mt-3 max-w-xl text-h2">Do agendamento ao acompanhamento, passo a passo</h2>
          <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <li key={s.title} className="border-t border-primary-foreground/20 pt-6">
                <span className="font-display text-sm text-aqua">0{i + 1}</span>
                <s.icon className="mt-4 size-6" aria-hidden />
                <h3 className="mt-4 text-xl">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-primary-foreground/75">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 7. Diferenciais */}
      <section className="container-site section-y">
        <SectionHeading eyebrow="Diferenciais" title="O que você encontra aqui" text="Preencha somente com informações confirmadas pela clínica." />
        <ul className="mt-10 grid gap-5 md:grid-cols-3">
          {clinic.highlights.map((h) => (
            <li key={h.title} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <h3 className="text-xl">{h.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{h.text}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* 8. Depoimentos */}
      <section className="bg-surface">
        <div className="container-site section-y">
          <SectionHeading eyebrow="Depoimentos" title="A experiência de quem nos visita" center />
          <div className="mx-auto mt-10 max-w-xl rounded-3xl border border-dashed border-input bg-card p-8 text-center">
            <MessageSquareQuote className="mx-auto size-8 text-primary" aria-hidden />
            <p className="mt-4 text-sm text-muted-foreground">
              Espaço reservado para avaliações reais e autorizadas de pacientes. Nenhum depoimento é exibido até que a
              clínica forneça avaliações verificáveis.
            </p>
            {clinic.googleBusinessUrl && (
              <a href={clinic.googleBusinessUrl} target="_blank" rel="noopener noreferrer" className={`${btn({ variant: "outline", size: "sm" })} mt-6`}>
                Ver avaliações no Google
              </a>
            )}
          </div>
        </div>
      </section>

      {/* 9. FAQ */}
      <section className="container-site section-y grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <SectionHeading eyebrow="Dúvidas frequentes" title="Perguntas frequentes" />
          <Link to="/faq" className={`${btn({ variant: "outline" })} mt-6`}>Ver todas as perguntas</Link>
        </div>
        <div>
          <FaqList items={homeFaq} idPrefix="home" />
          <PlaceholderNote className="mt-4">Respostas provisórias, sujeitas à revisão do dentista responsável.</PlaceholderNote>
        </div>
      </section>

      {/* 10. Localização */}
      <section className="bg-surface">
        <div className="container-site section-y">
          <SectionHeading eyebrow="Localização" title={`Onde estamos em ${clinic.city}`} />
          <div className="mt-10"><LocationBlock /></div>
          <Link to="/localizacao" className={`${btn({ variant: "ghost" })} mt-6 -ml-4`}>
            <MapPin className="size-4" aria-hidden /> Como chegar
          </Link>
        </div>
      </section>

      {/* 11. CTA */}
      <CtaBanner title={whatsappUrl() ? "Agende sua avaliação pelo WhatsApp" : "Agende sua avaliação"} />
    </>
  );
}
