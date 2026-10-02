import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export function FaqList({ items, idPrefix = "faq" }: { items: { q: string; a: string }[]; idPrefix?: string }) {
  return (
    <Accordion type="single" collapsible className="divide-y divide-border rounded-2xl border border-border bg-card px-5 sm:px-6">
      {items.map((it, i) => (
        <AccordionItem key={i} value={`${idPrefix}-${i}`} className="border-0">
          <AccordionTrigger className="py-5 text-left text-base font-semibold hover:no-underline">{it.q}</AccordionTrigger>
          <AccordionContent className="pb-5 text-sm leading-relaxed text-muted-foreground">{it.a}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
