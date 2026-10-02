/**
 * EQUIPE — [PROFISSIONAIS]
 * Adicione somente profissionais reais com dados autorizados.
 * Enquanto a lista estiver vazia, o site exibe um estado vazio.
 *
 * Exemplo:
 * {
 *   slug: "dra-nome-sobrenome",
 *   name: "Dra. Nome Sobrenome",
 *   cro: "CRO-UF 00000",
 *   specialties: ["Ortodontia"],
 *   photo: "/images/equipe/nome.jpg",
 *   education: ["Graduação — Instituição"],
 *   bio: "Apresentação...",
 *   areas: ["Ortodontia", "Prevenção"],
 * }
 */
export type Professional = {
  slug: string;
  name: string;
  cro: string;
  specialties: string[];
  photo?: string;
  education: string[];
  bio: string;
  areas: string[];
};

export const team: Professional[] = [];

export const getProfessional = (slug: string) => team.find((p) => p.slug === slug);
