/**
 * TRATAMENTOS — conteúdo PROVISÓRIO.
 * Todos os textos clínicos devem ser revisados pelo responsável técnico.
 * Remova os tratamentos que a clínica não oferece ([SERVIÇOS CONFIRMADOS]).
 */
export type ServiceCategory = "Reabilitação" | "Estética" | "Prevenção" | "Especialidades";

export type Service = {
  slug: string;
  name: string;
  short: string;
  icon: "implant" | "braces" | "sparkle" | "shield" | "crown" | "fill" | "root" | "child";
  category: ServiceCategory;
  intro: string;
  what: string;
  indicated: string;
  steps: string[];
  care: string;
  faq: { q: string; a: string }[];
};

const P = "[Texto provisório — revisar com o dentista responsável.]";

function make(
  slug: string,
  name: string,
  short: string,
  icon: Service["icon"],
  category: ServiceCategory,
): Service {
  return {
    slug,
    name,
    short,
    icon,
    category,
    intro: `${short} ${P}`,
    what: `Explique aqui, em linguagem simples, o que é ${name.toLowerCase()}. ${P}`,
    indicated: `Descreva em termos gerais para quem ${name.toLowerCase()} pode ser indicado. A indicação depende sempre de avaliação clínica individual. ${P}`,
    steps: [
      "Avaliação inicial com o profissional",
      "Planejamento individualizado",
      "Realização do procedimento conforme o plano",
      "Acompanhamento e orientações",
    ],
    care: `Liste cuidados gerais que podem ser recomendados antes e depois. ${P}`,
    faq: [
      { q: `Quanto tempo leva ${name.toLowerCase()}?`, a: `A duração varia de caso para caso e só pode ser definida após avaliação. ${P}` },
      { q: "Qual é o valor?", a: `Os valores dependem do planejamento individual e são informados após a avaliação. ${P}` },
    ],
  };
}

export const services: Service[] = [
  make("implantes-dentarios", "Implantes dentários", "Reposição de dentes perdidos com planejamento individual.", "implant", "Reabilitação"),
  make("ortodontia", "Ortodontia", "Alinhamento dos dentes e correção da mordida.", "braces", "Especialidades"),
  make("clareamento-dental", "Clareamento dental", "Clareamento com acompanhamento profissional.", "sparkle", "Estética"),
  make("limpeza-e-prevencao", "Limpeza e prevenção", "Consultas de rotina para cuidar da saúde bucal.", "shield", "Prevenção"),
  make("proteses", "Próteses", "Soluções para recuperar função e estética do sorriso.", "crown", "Reabilitação"),
  make("restauracoes", "Restaurações", "Tratamento de dentes com cáries ou pequenas fraturas.", "fill", "Estética"),
  make("tratamento-de-canal", "Tratamento de canal", "Tratamento endodôntico para preservar o dente.", "root", "Especialidades"),
  make("odontopediatria", "Odontopediatria", "Cuidado odontológico dedicado às crianças.", "child", "Especialidades"),
];

export const serviceCategories: ServiceCategory[] = ["Reabilitação", "Estética", "Prevenção", "Especialidades"];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
