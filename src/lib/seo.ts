import { clinic } from "@/config/clinic";

type SeoInput = {
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
  image?: string;
};

/** Gera meta tags, canonical e Open Graph únicos por página. */
export function seo({ title, description, path, noindex, image }: SeoInput) {
  const fullTitle = `${title} | ${clinic.name}`;
  const url = `${clinic.siteUrl}${path}`;
  const meta: Record<string, string>[] = [
    { title: fullTitle },
    { name: "description", content: description },
    { property: "og:title", content: fullTitle },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
    { property: "og:url", content: url },
    { property: "og:locale", content: "pt_BR" },
    { name: "twitter:card", content: "summary_large_image" },
  ];
  if (image) {
    meta.push({ property: "og:image", content: image }, { name: "twitter:image", content: image });
  }
  if (noindex || !clinic.confirmed) meta.push({ name: "robots", content: "noindex, nofollow" });
  return { meta, links: [{ rel: "canonical", href: url }] };
}
