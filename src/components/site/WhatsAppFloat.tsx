import { Link } from "@tanstack/react-router";
import { MessageCircle } from "lucide-react";
import { whatsappUrl } from "@/config/clinic";

const cls =
  "fixed bottom-5 right-5 z-30 grid size-14 place-items-center rounded-full bg-whatsapp text-whatsapp-foreground shadow-lift transition-transform hover:scale-105";

export function WhatsAppFloat() {
  const url = whatsappUrl();
  if (url) {
    return (
      <a href={url} target="_blank" rel="noopener noreferrer" aria-label="Conversar pelo WhatsApp (abre em nova aba)" className={cls}>
        <MessageCircle className="size-6" aria-hidden />
      </a>
    );
  }
  return (
    <Link to="/contato" aria-label="Fale conosco — WhatsApp ainda não configurado" className={cls}>
      <MessageCircle className="size-6" aria-hidden />
    </Link>
  );
}
