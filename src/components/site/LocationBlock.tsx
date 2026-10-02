import { Clock, MapPin, Phone } from "lucide-react";
import { clinic, cityLabel } from "@/config/clinic";

export function LocationBlock({ showMap = true }: { showMap?: boolean }) {
  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1.4fr]">
      <dl className="space-y-6 rounded-2xl border border-border bg-card p-6 shadow-soft">
        <Item icon={MapPin} label="Endereço">
          {clinic.address.street}, {clinic.address.neighborhood}
          <br />
          {cityLabel} — {clinic.address.zip}
        </Item>
        <Item icon={Clock} label="Horários">
          {clinic.hours.length ? (
            <ul>{clinic.hours.map((h) => <li key={h.days}>{h.days}: {h.time}</li>)}</ul>
          ) : (
            clinic.hoursPlaceholder
          )}
        </Item>
        <Item icon={Phone} label="Telefone">
          {clinic.phone ? <a href={`tel:${clinic.phone}`} className="text-primary">{clinic.phone}</a> : clinic.phoneDisplay}
        </Item>
      </dl>
      {showMap && (
        <div className="min-h-64 overflow-hidden rounded-2xl border border-border bg-muted">
          {clinic.mapEmbedUrl ? (
            <iframe
              src={clinic.mapEmbedUrl}
              title={`Mapa de localização da ${clinic.name}`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="size-full min-h-64"
            />
          ) : (
            <div className="grid size-full min-h-64 place-items-center p-6 text-center text-sm text-muted-foreground">
              O mapa será exibido após a confirmação do endereço da clínica.
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function Item({ icon: I, label, children }: { icon: typeof MapPin; label: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-4">
      <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-accent text-accent-foreground">
        <I className="size-4" aria-hidden />
      </span>
      <div className="min-w-0">
        <dt className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{label}</dt>
        <dd className="mt-1 text-sm">{children}</dd>
      </div>
    </div>
  );
}
