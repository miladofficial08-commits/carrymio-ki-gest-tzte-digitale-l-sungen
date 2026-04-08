import { AlertCircle, Coins, TimerReset } from "lucide-react";

const painPoints = [
  {
    icon: Coins,
    title: "Routine-Aufgaben kosten viel Geld",
    text: "Mitarbeitende verbringen zu viel Zeit mit Copy-Paste-Arbeit statt mit wertschaffenden Aufgaben.",
  },
  {
    icon: TimerReset,
    title: "Langsame Reaktionszeiten kosten Umsatz",
    text: "Leads und Kunden warten zu lange, wenn Priorisierung und automatische Verarbeitung fehlen.",
  },
  {
    icon: AlertCircle,
    title: "Manuelle Prozesse erzeugen Fehler",
    text: "Ohne automatisierte Kontrolle entstehen Nacharbeit, Eskalationen und unnoetige Abstimmungsschleifen.",
  },
];

export const ProblemSection = () => {
  return (
    <section className="py-20 relative">
      <div className="container px-4">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <span className="section-kicker mb-5">Das Problem</span>
          <h2 className="section-title mb-4">
            Die meisten Unternehmen zahlen taeglich fuer vermeidbare Routinearbeit
          </h2>
          <p className="section-copy max-w-3xl mx-auto">
            Tawano ersetzt wiederkehrende Aufgaben durch digitale Mitarbeiter, die Prozesse stabilisieren,
            Durchlaufzeiten verkuerzen und Kosten im laufenden Betrieb senken.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {painPoints.map((item, index) => (
            <article key={index} className="surface-elevated hover-lift rounded-2xl p-7">
              <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <item.icon className="w-5 h-5 text-primary" aria-hidden="true" />
              </div>
              <h3 className="font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};