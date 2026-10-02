import { Link } from "@tanstack/react-router";
import { Menu } from "lucide-react";
import { useState } from "react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { clinic } from "@/config/clinic";
import { BookingButton } from "./primitives";

export const navItems = [
  { to: "/", label: "Início" },
  { to: "/clinica", label: "A Clínica" },
  { to: "/servicos", label: "Tratamentos" },
  { to: "/equipe", label: "Nossa Equipe" },
  { to: "/blog", label: "Blog" },
  { to: "/faq", label: "FAQ" },
  { to: "/localizacao", label: "Localização" },
  { to: "/contato", label: "Contato" },
] as const;

export function Logo() {
  return (
    <Link to="/" className="flex min-w-0 items-center gap-2.5" aria-label={`${clinic.name} — página inicial`}>
      {/* [LOGO] substitua este símbolo pelo logo real */}
      <span aria-hidden className="grid size-9 shrink-0 place-items-center rounded-xl bg-primary font-display text-lg text-primary-foreground">
        ◡
      </span>
      <span className="truncate font-display text-lg font-medium">{clinic.name}</span>
    </Link>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur-md">
      <a href="#conteudo" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-2 focus:rounded-md focus:bg-card focus:px-3 focus:py-2">
        Pular para o conteúdo
      </a>
      <div className="container-site grid h-16 grid-cols-[minmax(0,1fr)_auto] items-center gap-4 lg:h-18">
        <Logo />
        <div className="flex items-center gap-2">
          <nav aria-label="Principal" className="hidden xl:block">
            <ul className="flex items-center gap-1">
              {navItems.map((n) => (
                <li key={n.to}>
                  <Link
                    to={n.to}
                    activeOptions={{ exact: n.to === "/" }}
                    className="rounded-full px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                    activeProps={{ className: "text-primary" }}
                  >
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <BookingButton size="sm" className="ml-2 hidden sm:inline-flex" />
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              className="grid size-11 place-items-center rounded-full border border-border xl:hidden"
              aria-label="Abrir menu"
              aria-expanded={open}
            >
              <Menu className="size-5" aria-hidden />
            </SheetTrigger>
            <SheetContent side="right" className="w-[86vw] max-w-sm bg-background p-6">
              <SheetTitle className="font-display text-xl">Menu</SheetTitle>
              <nav aria-label="Menu móvel" className="mt-6">
                <ul className="flex flex-col">
                  {navItems.map((n) => (
                    <li key={n.to}>
                      <Link
                        to={n.to}
                        onClick={() => setOpen(false)}
                        activeOptions={{ exact: n.to === "/" }}
                        className="block border-b border-border py-4 text-base font-medium"
                        activeProps={{ className: "text-primary" }}
                      >
                        {n.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
              <div className="mt-8" onClick={() => setOpen(false)}>
                <BookingButton className="w-full" />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
