import { BadgeCheck, CalendarClock, Landmark, MonitorSmartphone } from "lucide-react";

const trustItems = [
  { icon: CalendarClock, label: "17 anos no mercado de crédito" },
  { icon: BadgeCheck, label: "Representante autorizada Itaú Consórcios" },
  { icon: MonitorSmartphone, label: "Atendimento digital em todo o Brasil" },
  { icon: Landmark, label: "Sistema regulado pelo Banco Central (Lei 11.795/2008)" },
];

export function TrustBar() {
  return (
    <section className="border-b border-border bg-surface" aria-label="Credenciais da Santa Sophia">
      <ul className="container-custom grid gap-6 py-10 sm:grid-cols-2 lg:grid-cols-4">
        {trustItems.map(({ icon: Icon, label }) => (
          <li key={label} className="flex items-start gap-3">
            <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-primary text-highlight">
              <Icon className="size-5" aria-hidden="true" />
            </span>
            <span className="pt-2 text-sm font-semibold text-primary">{label}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
