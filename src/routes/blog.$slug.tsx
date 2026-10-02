import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import cover from "@/assets/blog-cover.jpg";
import { getPost, posts } from "@/content/blog";
import { seo } from "@/lib/seo";
import { PageHeader } from "@/components/site/Breadcrumbs";
import { PlaceholderNote } from "@/components/site/primitives";
import { CtaBanner } from "@/components/site/CtaBanner";

const fmtDate = (d: string) => new Date(d + "T12:00:00").toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" });
const anchor = (s: string) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/\s+/g, "-");

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = getPost(params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Artigo não encontrado" }, { name: "robots", content: "noindex" }] };
    const p = loaderData.post;
    return seo({ title: p.title, description: p.excerpt, path: `/blog/${p.slug}`, noindex: p.draft });
  },
  component: PostPage,
});

function PostPage() {
  const { post: p } = Route.useLoaderData();
  const related = posts.filter((o) => o.slug !== p.slug).slice(0, 2);
  return (
    <>
      <PageHeader crumbs={[{ label: "Blog", to: "/blog" }, { label: p.title }]} eyebrow={p.category} title={p.title} text={`${fmtDate(p.date)} · ${p.author}`} />
      <div className="container-site section-y grid gap-12 lg:grid-cols-[1fr_16rem]">
        <article className="min-w-0 max-w-3xl">
          {p.draft && <PlaceholderNote className="mb-8">Rascunho de exemplo — não publicado e não indexado.</PlaceholderNote>}
          <img src={cover} alt="Itens de higiene bucal (imagem ilustrativa)" width={1200} height={800} className="aspect-[3/2] w-full rounded-3xl object-cover" />
          {p.sections.map((s) => (
            <section key={s.heading} id={anchor(s.heading)} className="mt-10 scroll-mt-24">
              <h2 className="text-2xl sm:text-3xl">{s.heading}</h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">{s.body}</p>
            </section>
          ))}
        </article>
        <aside className="space-y-8 lg:sticky lg:top-24 lg:self-start">
          <nav aria-label="Sumário">
            <h2 className="font-sans text-sm font-bold">Sumário</h2>
            <ul className="mt-3 space-y-2 text-sm">
              {p.sections.map((s) => <li key={s.heading}><a href={`#${anchor(s.heading)}`} className="text-muted-foreground hover:text-primary">{s.heading}</a></li>)}
            </ul>
          </nav>
          <nav aria-label="Artigos relacionados">
            <h2 className="font-sans text-sm font-bold">Relacionados</h2>
            <ul className="mt-3 space-y-2 text-sm">
              {related.map((r) => <li key={r.slug}><Link to="/blog/$slug" params={{ slug: r.slug }} className="text-primary hover:underline">{r.title}</Link></li>)}
            </ul>
          </nav>
        </aside>
      </div>
      <CtaBanner />
    </>
  );
}
