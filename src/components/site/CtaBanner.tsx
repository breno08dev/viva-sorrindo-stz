import { BookingButton } from "./primitives";
import { whatsappUrl } from "@/config/clinic";

export function CtaBanner({
  title = "Vamos cuidar do seu sorriso?",
  text = "Agende uma avaliação. A consulta é confirmada pela nossa equipe após o contato.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="container-site section-y">
      <div className="relative overflow-hidden rounded-3xl bg-primary px-6 py-12 text-primary-foreground sm:px-12 sm:py-16">
        <div aria-hidden className="absolute -right-24 -top-24 size-72 rounded-full bg-aqua/20 blur-2xl" />
        <div className="relative grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
          <div className="max-w-xl">
            <h2 className="text-h2">{title}</h2>
            <p className="mt-3 text-primary-foreground/80">{text}</p>
          </div>
          <BookingButton variant="light">{whatsappUrl() ? "Agendar pelo WhatsApp" : "Solicitar agendamento"}</BookingButton>
        </div>
      </div>
    </section>
  );
}
