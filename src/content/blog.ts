/**
 * BLOG — os artigos abaixo são DEMONSTRATIVOS (draft: true).
 * Artigos com draft: true recebem noindex e não entram no sitemap.
 */
export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string; // ISO
  author: string;
  draft: boolean;
  sections: { heading: string; body: string }[];
};

const T = "[Conteúdo de exemplo — substituir por texto real revisado por um dentista antes de publicar.]";

export const posts: Post[] = [
  {
    slug: "exemplo-cuidados-diarios-com-a-saude-bucal",
    title: "[Exemplo] Cuidados diários com a saúde bucal",
    excerpt: "Artigo demonstrativo sobre hábitos de higiene bucal. Não publicado.",
    category: "Prevenção",
    date: "2026-01-01",
    author: "[AUTOR]",
    draft: true,
    sections: [
      { heading: "Introdução", body: T },
      { heading: "Escovação e fio dental", body: T },
      { heading: "Quando procurar o dentista", body: T },
    ],
  },
  {
    slug: "exemplo-o-que-esperar-da-primeira-consulta",
    title: "[Exemplo] O que esperar da primeira consulta",
    excerpt: "Artigo demonstrativo sobre a primeira visita à clínica. Não publicado.",
    category: "Atendimento",
    date: "2026-01-01",
    author: "[AUTOR]",
    draft: true,
    sections: [
      { heading: "Antes da consulta", body: T },
      { heading: "Durante a avaliação", body: T },
    ],
  },
  {
    slug: "exemplo-odontologia-para-criancas",
    title: "[Exemplo] Odontologia para crianças",
    excerpt: "Artigo demonstrativo sobre odontopediatria. Não publicado.",
    category: "Especialidades",
    date: "2026-01-01",
    author: "[AUTOR]",
    draft: true,
    sections: [
      { heading: "A primeira visita", body: T },
      { heading: "Hábitos em casa", body: T },
    ],
  },
];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);
export const blogCategories = Array.from(new Set(posts.map((p) => p.category)));
