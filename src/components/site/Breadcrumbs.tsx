import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";

export type Crumb = { label: string; to?: string; params?: Record<string, string> };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const all: Crumb[] = [{ label: "Início", to: "/" }, ...items];
  return (
    <nav aria-label="Trilha de navegação" className="text-sm text-muted-foreground">
      <ol className="flex flex-wrap items-center gap-1.5">
        {all.map((c, i) => (
          <li key={i} className="flex min-w-0 items-center gap-1.5">
            {i > 0 && <ChevronRight className="size-3.5 shrink-0" aria-hidden />}
            {c.to && i < all.length - 1 ? (
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              <Link to={c.to as any} params={c.params as any} className="hover:text-primary">
                {c.label}
              </Link>
            ) : (
              <span aria-current="page" className="truncate text-foreground">
                {c.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function PageHeader({
  crumbs,
  eyebrow,
  title,
  text,
}: {
  crumbs: Crumb[];
  eyebrow?: string;
  title: string;
  text?: string;
}) {
  return (
    <section className="border-b border-border bg-surface">
      <div className="container-site py-10 sm:py-16">
        <Breadcrumbs items={crumbs} />
        {eyebrow && <p className="eyebrow mt-8">{eyebrow}</p>}
        <h1 className="mt-3 max-w-3xl text-display fade-up">{title}</h1>
        {text && <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">{text}</p>}
      </div>
    </section>
  );
}
