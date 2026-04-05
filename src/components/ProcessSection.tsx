import { MessageSquare, FileSearch, HeartHandshake } from "lucide-react";

const steps = [
  {
    icon: MessageSquare,
    number: "01",
    title: "Automations-Analyse",
    description:
      "Wir finden die teuersten Routine-Aufgaben mit dem groessten Hebel fuer Ihr Unternehmen.",
  },
  {
    icon: FileSearch,
    number: "02",
    title: "Fahrplan mit Wirtschaftlichkeitsfaellen",
    description:
      "Sie erhalten eine klare Priorisierung: was sofort automatisiert wird, was spaeter folgt und welcher Nutzen realistisch ist.",
  },
  {
    icon: HeartHandshake,
    number: "03",
    title: "Begleitete Implementierung",
    description:
      "Tabanu begleitet Einrichtung, Integration und Befaehigung, damit Automation im Alltag stabil funktioniert.",
  },
];

export const ProcessSection = () => {
  return (
    <section id="automation-consulting" className="py-24 relative">
      <div className="container px-4">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="section-kicker mb-5">
            Automationsberatung
          </span>
          <h2 className="section-title mb-4">
            Wenn Prozesse stocken, bringt Tabanu Struktur in die Automation.
          </h2>
          <p className="section-copy">
            Sie haben bereits Tools, aber keine durchgaengige Wirkung? Wir analysieren Ursachen,
            priorisieren Loesungen und setzen gemeinsam um.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3 max-w-5xl mx-auto">
            {steps.map((step, index) => (
              <article
                key={index}
                className="surface-elevated rounded-2xl p-6 hover-lift"
              >
                <div className="mb-5 flex items-center justify-between gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <step.icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-sm font-semibold text-primary/60">{step.number}</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-sm leading-6 text-muted-foreground">{step.description}</p>
              </article>
            ))}
        </div>
      </div>
    </section>
  );
};
