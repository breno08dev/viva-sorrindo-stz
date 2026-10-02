import { createFileRoute, Link } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import cover from "@/assets/blog-cover.jpg";
import { clinic } from "@/config/clinic";
import { blogCategories, posts } from "@/content/blog";
import { seo } from "@/lib/seo";
import { PageHeader } from "@/components/site/Breadcrumbs";
import { PlaceholderNote } from "@/components/site/primitives";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/blog/")({
  head: () =>
    seo({
      title: "Blog",
      description: `Conteúdos sobre saúde bucal e cuidados com o sorriso da ${clinic.name}.`,
      path: "/blog",
      noindex: posts.every((p) => p.draft),
    }),
  component: BlogPage,
});

export const fmtDate = (d: string) => new Date(d + "T12:00:00").toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" });

function BlogPage() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("Todas");
  const list = useMemo(
    () =>
      posts.filter(
        (p) => (cat === "Todas" || p.category === cat) && (p.title + p.excerpt).toLowerCase().includes(q.toLowerCase()),
      ),
    [q, cat],
  );
  return (
    <>
      <PageHeader crumbs={[{ label: "Blog" }]} eyebrow="Blog" title="Saúde bucal em pauta" />
      <section className="container-site section-y">
        <PlaceholderNote className="mb-8">Os artigos abaixo são exemplos em rascunho, não publicados nem indexados.</PlaceholderNote>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <label className="relative block w-full md:max-w-sm">
            <span className="sr-only">Buscar artigos</span>
            <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
            <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar artigos" className="h-12 w-full rounded-full border border-input bg-card pl-11 pr-4 text-base" />
          </label>
          <div role="group" aria-label="Categorias" className="flex flex-wrap gap-2">
            {["Todas", ...blogCategories].map((c) => (
              <button key={c} type="button" aria-pressed={cat === c} onClick={() => setCat(c)} className={cn("min-h-10 rounded-full border px-4 text-sm", cat === c ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card")}>
                {c}
              </button>
            ))}
          </div>
        </div>
        {list.length === 0 ? (
          <p className="mt-12 text-center text-muted-foreground">Nenhum artigo encontrado.</p>
        ) : (
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((p) => (
              <li key={p.slug}>
                <Link to="/blog/$slug" params={{ slug: p.slug }} className="group block h-full overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition-shadow hover:shadow-lift">
                  <img src={cover} alt="" width={1200} height={800} loading="lazy" className="aspect-[3/2] w-full object-cover" />
                  <div className="p-5">
                    <p className="text-xs font-semibold text-primary">{p.category}{p.draft && " · Rascunho"}</p>
                    <h2 className="mt-2 text-xl group-hover:text-primary">{p.title}</h2>
                    <p className="mt-2 text-sm text-muted-foreground">{p.excerpt}</p>
                    <p className="mt-4 text-xs text-muted-foreground">{fmtDate(p.date)} · {p.author}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
