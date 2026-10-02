import { Link } from "@tanstack/react-router";
import {
  ArrowUpRight,
  Baby,
  Crown,
  Gem,
  ShieldCheck,
  Smile,
  Sparkles,
  Stethoscope,
  UserRound,
  Users,
  type LucideIcon,
} from "lucide-react";
import type { Service } from "@/content/services";
import type { Professional } from "@/content/team";

const icons: Record<Service["icon"], LucideIcon> = {
  implant: Gem,
  braces: Smile,
  sparkle: Sparkles,
  shield: ShieldCheck,
  crown: Crown,
  fill: Stethoscope,
  root: Stethoscope,
  child: Baby,
};

export function ServiceIcon({ icon }: { icon: Service["icon"] }) {
  const I = icons[icon];
  return (
    <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-accent text-accent-foreground">
      <I className="size-5" aria-hidden />
    </span>
  );
}

export function ServiceCard({ service }: { service: Service }) {
  return (
    <Link
      to="/servicos/$slug"
      params={{ slug: service.slug }}
      className="group flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lift"
    >
      <div className="flex items-start justify-between gap-4">
        <ServiceIcon icon={service.icon} />
        <ArrowUpRight className="size-5 text-muted-foreground transition-colors group-hover:text-primary" aria-hidden />
      </div>
      <h3 className="mt-6 text-xl">{service.name}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{service.short}</p>
      <span className="mt-5 text-xs font-medium text-muted-foreground">Sujeito à confirmação da clínica</span>
    </Link>
  );
}

export function TeamCard({ p }: { p: Professional }) {
  return (
    <Link
      to="/equipe/$slug"
      params={{ slug: p.slug }}
      className="group block overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition-all hover:shadow-lift"
    >
      <div className="aspect-[4/5] bg-muted">
        {p.photo ? (
          <img src={p.photo} alt={`Foto de ${p.name}`} loading="lazy" width={480} height={600} className="size-full object-cover" />
        ) : (
          <div className="grid size-full place-items-center text-muted-foreground">
            <UserRound className="size-12" aria-hidden />
          </div>
        )}
      </div>
      <div className="p-5">
        <h3 className="text-lg">{p.name}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{p.specialties.join(", ")}</p>
        {p.cro && <p className="mt-1 text-xs text-muted-foreground">{p.cro}</p>}
      </div>
    </Link>
  );
}

export function TeamEmpty() {
  return (
    <div className="rounded-3xl border border-dashed border-input bg-surface p-8 text-center sm:p-12">
      <span className="mx-auto grid size-14 place-items-center rounded-full bg-accent text-accent-foreground">
        <Users className="size-6" aria-hidden />
      </span>
      <h3 className="mt-5 text-xl">Equipe em breve</h3>
      <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
        Os perfis dos profissionais serão publicados assim que a clínica fornecer nomes, CRO, especialidades e fotos
        reais. [PROFISSIONAIS]
      </p>
    </div>
  );
}
