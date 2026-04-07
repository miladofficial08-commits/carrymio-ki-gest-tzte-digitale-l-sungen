import { Button } from "@/components/ui/button";
import { MailCheck, AlertTriangle, Tags, Brain, Sparkles, PlugZap } from "lucide-react";

const capabilities = [
  {
    icon: MailCheck,
    title: "Erinnerungssystem fuer jeden Vorgang",
    text: "Der Digital Employee merkt sich fruehere Kontexte und vermeidet doppelte Erklaerungen.",
  },
  {
    icon: Tags,
    title: "Kontinuierliche Lernschleife",
    text: "Nach jeder Interaktion verbessert das System Priorisierung, Routing und Antwortqualitaet.",
  },
  {
    icon: Brain,
    title: "Selbstkorrektur bei Unsicherheit",
    text: "Fehlerhafte Antworten werden erkannt, korrigiert und in Regeln fuer kuenftige Faelle ueberfuehrt.",
  },
  {
    icon: AlertTriangle,
    title: "7+ Sprachen in einer einheitlichen Logik",
    text: "Kundenkommunikation, E-Mail und Anfragebearbeitung laufen mehrsprachig mit konsistentem Standard.",
  },
];

const flow = [
  {
    title: "1. Prozessaufnahme",
    text: "Wir kartieren wiederkehrende Aufgaben in Betreuung, Vertrieb und Backoffice entlang Ihrer Kostenhebel.",
  },
  {
    title: "2. Bereitstellung digitaler Mitarbeiter",
    text: "Tawano implementiert den digitalen Mitarbeiter inkl. Integrationen in CRM, Ticketing und interne Tools.",
  },
  {
    title: "3. Messbare Optimierung",
    text: "Leistungsdaten, Fehlerquoten und Bearbeitungszeiten werden laufend verbessert und transparent berichtet.",
  },
];

const results = [
  "Weniger manuelle Tickets und E-Mail-Routine",
  "Schnellere Anfragequalifizierung und Kundenantworten",
  "Hohe Prozessstabilitaet auch bei Spitzenlast",
];

const scenarios = [
  "E-Mail-Betreuung und Ticket-Priorisierung",
  "Anfragebearbeitung und Terminvorqualifizierung",
  "Interne Freigabe- und Berichts-Workflows",
  "Mehrsprachige Kundenkommunikation",
];

export const DigitalEmployeeSection = () => {
  const scrollToContact = () => {
    const element = document.querySelector("#kontakt");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="digital-employees" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/20 via-transparent to-transparent" />

      <div className="container px-4 relative">
        <div className="max-w-5xl mx-auto text-center mb-14">
          <span className="inline-flex items-center gap-2 text-primary text-sm font-medium mb-4 px-4 py-2 rounded-full border border-primary/30 bg-primary/5">
            <Sparkles className="w-4 h-4" aria-hidden="true" />
            Kernprodukt: Tawano Digitale Mitarbeiter
          </span>
          <h2 className="section-title md:text-[2.8rem] mb-5">
            Ein digitaler Mitarbeiter, der echte Arbeit abnimmt
          </h2>
          <p className="section-copy max-w-3xl mx-auto">
            Statt nur zu antworten, fuehrt ein digitaler Mitarbeiter von Tawano Aufgaben aus: priorisieren,
            qualifizieren, weiterleiten, dokumentieren und verbessern. Damit sinken Kosten und Ihr Team gewinnt Fokus.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-14 max-w-5xl mx-auto">
          {capabilities.map((item, index) => (
            <article
              key={index}
              className="surface-elevated hover-lift rounded-2xl p-7"
            >
              <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <item.icon className="w-5 h-5 text-primary" aria-hidden="true" />
              </div>
              <h3 className="font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.text}</p>
            </article>
          ))}
        </div>

        <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] gap-6 mb-14 max-w-5xl mx-auto">
          <article className="surface-elevated rounded-2xl p-7">
            <h3 className="text-xl font-semibold mb-5">Wie Tawano aus Prozessen echte Automation macht</h3>
            <div className="space-y-4">
              {flow.map((step) => (
                <div key={step.title} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="font-medium mb-1">{step.title}</p>
                  <p className="text-sm leading-6 text-muted-foreground">{step.text}</p>
                </div>
              ))}
            </div>
          </article>

          <article className="surface-elevated rounded-2xl p-7">
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-3">Wirtschaftliche Wirkung in der Praxis</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                {results.map((result) => (
                  <li key={result} className="flex items-start gap-3">
                    <Sparkles className="w-4 h-4 text-primary mt-0.5 shrink-0" aria-hidden="true" />
                    <span>{result}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <div className="flex items-center gap-3 mb-3">
                <PlugZap className="w-4 h-4 text-primary" aria-hidden="true" />
                <h4 className="font-medium">Haeufige Einsatzfelder</h4>
              </div>
              <div className="grid sm:grid-cols-2 gap-3 text-sm text-muted-foreground">
                {scenarios.map((scenario) => (
                  <div key={scenario} className="rounded-xl border border-white/10 bg-black/10 px-3 py-2">
                    {scenario}
                  </div>
                ))}
              </div>
            </div>
          </article>
        </div>

        <div className="surface-elevated rounded-2xl p-7 md:p-9 flex flex-col md:flex-row gap-6 md:gap-8 items-start md:items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold mb-2">Gemacht fuer Teams mit hohem Kommunikations- und Prozessvolumen</h3>
            <p className="text-muted-foreground max-w-2xl">
              Ideal fuer Unternehmen, die Routine-Aufgaben reduzieren und gleichzeitig schneller,
              sauberer und skalierbarer arbeiten wollen.
            </p>
          </div>
          <Button variant="hero" size="lg" onClick={scrollToContact}>
            Automations-Check anfragen
          </Button>
        </div>
      </div>
    </section>
  );
};