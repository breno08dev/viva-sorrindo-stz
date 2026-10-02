import { Link } from "@tanstack/react-router";
import { clinic, cityLabel } from "@/config/clinic";
import { services } from "@/content/services";
import { Logo, navItems } from "./Header";

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="container-site grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="min-w-0">
          <Logo />
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Clínica odontológica em {cityLabel}. [Breve descrição institucional.]
          </p>
          {clinic.social.instagram ? (
            <a href={clinic.social.instagram} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block text-sm font-semibold text-primary">
              Instagram
            </a>
          ) : (
            <p className="mt-4 text-xs text-muted-foreground">[INSTAGRAM]</p>
          )}
        </div>
        <FooterCol title="Navegação">
          {navItems.map((n) => (
            <li key={n.to}><Link to={n.to} className="hover:text-primary">{n.label}</Link></li>
          ))}
        </FooterCol>
        <FooterCol title="Tratamentos">
          {services.map((s) => (
            <li key={s.slug}>
              <Link to="/servicos/$slug" params={{ slug: s.slug }} className="hover:text-primary">{s.name}</Link>
            </li>
          ))}
        </FooterCol>
        <FooterCol title="Contato">
          <li>{clinic.address.street}, {clinic.address.neighborhood}</li>
          <li>{cityLabel} — {clinic.address.zip}</li>
          <li>{clinic.phone ? <a href={`tel:${clinic.phone}`} className="hover:text-primary">{clinic.phone}</a> : clinic.phoneDisplay}</li>
          <li>
            {clinic.hours.length
              ? clinic.hours.map((h) => `${h.days}: ${h.time}`).join(" · ")
              : clinic.hoursPlaceholder}
          </li>
        </FooterCol>
      </div>
      <div className="border-t border-border">
        <div className="container-site flex flex-col gap-2 py-6 text-xs text-muted-foreground sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} {clinic.name}. {clinic.technicalResponsible}</p>
          <Link to="/politica-de-privacidade" className="hover:text-primary">Política de Privacidade</Link>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="font-sans text-sm font-bold tracking-wide">{title}</h2>
      <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">{children}</ul>
    </div>
  );
}
