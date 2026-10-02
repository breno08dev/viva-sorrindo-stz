import { createFileRoute } from "@tanstack/react-router";
import { clinic } from "@/config/clinic";
import { services } from "@/content/services";
import { team } from "@/content/team";
import { posts } from "@/content/blog";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: () => {
        const paths = [
          "/", "/clinica", "/servicos", "/faq", "/localizacao", "/contato", "/politica-de-privacidade",
          ...services.map((s) => `/servicos/${s.slug}`),
          ...(team.length ? ["/equipe", ...team.map((p) => `/equipe/${p.slug}`)] : []),
          ...(posts.some((p) => !p.draft) ? ["/blog"] : []),
          ...posts.filter((p) => !p.draft).map((p) => `/blog/${p.slug}`),
        ];
        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${paths
          .map((p) => `  <url><loc>${clinic.siteUrl}${p}</loc></url>`)
          .join("\n")}\n</urlset>`;
        return new Response(xml, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
      },
    },
  },
});
