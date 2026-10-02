import { Link } from "@tanstack/react-router";
import { cva, type VariantProps } from "class-variance-authority";
import type { ReactNode } from "react";
import { Info, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { whatsappUrl } from "@/config/clinic";

export const btn = cva(
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 text-sm font-semibold transition-all duration-200 focus-visible:outline-2 disabled:opacity-60",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground shadow-soft hover:-translate-y-0.5 hover:shadow-lift",
        outline: "border border-input bg-card text-foreground hover:border-primary hover:text-primary",
        ghost: "text-primary hover:bg-primary-soft",
        light: "bg-primary-foreground text-primary hover:-translate-y-0.5",
      },
      size: { md: "", sm: "min-h-10 px-4 text-sm" },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

/** Botão de agendamento: abre o WhatsApp se configurado, senão leva para /contato. */
export function BookingButton({
  children = "Agendar avaliação",
  className,
  ...v
}: { children?: ReactNode; className?: string } & VariantProps<typeof btn>) {
  const url = whatsappUrl();
  if (url) {
    return (
      <a href={url} target="_blank" rel="noopener noreferrer" className={cn(btn(v), className)}>
        <MessageCircle className="size-4" aria-hidden /> {children}
      </a>
    );
  }
  return (
    <Link to="/contato" className={cn(btn(v), className)}>
      {children}
    </Link>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  text,
  center,
  as: Tag = "h2",
}: {
  eyebrow?: string;
  title: string;
  text?: string;
  center?: boolean;
  as?: "h1" | "h2";
}) {
  return (
    <div className={cn("max-w-2xl", center && "mx-auto text-center")}>
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
      <Tag className={Tag === "h1" ? "text-display" : "text-h2"}>{title}</Tag>
      {text && <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">{text}</p>}
    </div>
  );
}

/** Aviso visível de conteúdo provisório. */
export function PlaceholderNote({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      role="note"
      className={cn(
        "flex gap-3 rounded-xl border border-dashed border-warning-foreground/30 bg-warning p-4 text-sm text-warning-foreground",
        className,
      )}
    >
      <Info className="mt-0.5 size-4 shrink-0" aria-hidden />
      <div className="min-w-0">{children}</div>
    </div>
  );
}

export function ImageNote() {
  return (
    <span className="absolute bottom-3 left-3 rounded-full bg-card/90 px-3 py-1 text-[11px] font-medium text-muted-foreground backdrop-blur">
      Imagem ilustrativa — substituir por foto real
    </span>
  );
}
