import { createFileRoute } from "@tanstack/react-router";
import { clinic } from "@/config/clinic";
import { seo } from "@/lib/seo";
import { PageHeader } from "@/components/site/Breadcrumbs";
import { PlaceholderNote } from "@/components/site/primitives";

export const Route = createFileRoute("/politica-de-privacidade")({
  head: () =>
    seo({
      title: "Política de Privacidade",
      description: `Como a ${clinic.name} trata dados pessoais, em conformidade com a LGPD.`,
      path: "/politica-de-privacidade",
    }),
  component: PrivacyPage,
});

const sections = [
  ["Quem somos", `${clinic.name}, responsável pelo tratamento dos dados coletados neste site. [CNPJ e contato do encarregado (DPO).]`],
  ["Quais dados coletamos", "Apenas os dados informados voluntariamente no formulário de contato: nome, telefone, e-mail (opcional) e mensagem."],
  ["Finalidade", "Os dados são usados exclusivamente para responder ao seu contato e agendar atendimentos."],
  ["Cookies", "Este site não utiliza cookies de rastreamento ou publicidade. [Atualizar caso ferramentas de análise sejam adicionadas.]"],
  ["Compartilhamento", "[Descreva se e com quem os dados são compartilhados, ex.: provedor de formulário.]"],
  ["Retenção", "[Prazo de armazenamento dos dados.]"],
  ["Seus direitos (LGPD)", "Você pode solicitar acesso, correção, anonimização ou exclusão dos seus dados a qualquer momento pelos canais de contato."],
  ["Contato", "[E-mail do encarregado de dados.]"],
];

function PrivacyPage() {
  return (
    <>
      <PageHeader crumbs={[{ label: "Política de Privacidade" }]} title="Política de Privacidade" />
      <article className="container-site section-y max-w-3xl space-y-8">
        <PlaceholderNote>Modelo provisório — deve ser revisado pela clínica e por assessoria jurídica antes da publicação.</PlaceholderNote>
        {sections.map(([h, t]) => (
          <section key={h}>
            <h2 className="text-2xl">{h}</h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">{t}</p>
          </section>
        ))}
      </article>
    </>
  );
}
