import { MessageSquare, FileSearch, Wrench, Rocket, HeartHandshake } from "lucide-react";

const steps = [
  {
    icon: MessageSquare,
    number: "01",
    title: "Anfrage senden",
    description:
      "Füllen Sie unser kurzes Formular aus und schildern Sie Ihr Anliegen. Völlig kostenlos und unverbindlich.",
  },
  {
    icon: FileSearch,
    number: "02",
    title: "Kostenlose Beratung",
    description:
      "Wir melden uns innerhalb von 24 Stunden bei Ihnen und besprechen Ihre Anforderungen im Detail.",
  },
  {
    icon: Wrench,
    number: "03",
    title: "Angebot & Planung",
    description:
      "Sie erhalten ein transparentes Angebot mit klarem Zeitplan und allen Leistungen auf einen Blick.",
  },
  {
    icon: Rocket,
    number: "04",
    title: "Umsetzung",
    description:
      "Wir setzen Ihr Projekt um – professionell, termingerecht und mit regelmäßigen Updates für Sie.",
  },
  {
    icon: HeartHandshake,
    number: "05",
    title: "Support & Betreuung",
    description:
      "Nach der Übergabe stehen wir Ihnen weiterhin zur Seite – für Fragen, Anpassungen oder Erweiterungen.",
  },
];

export const ProcessSection = () => {
  return (
    <section id="ablauf" className="py-24 relative">
      <div className="container px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-primary text-sm font-medium mb-4">
            Unser Prozess
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            In 5 Schritten zu Ihrer Lösung
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Unser strukturierter Ablauf sorgt für klare Kommunikation und 
            erstklassige Ergebnisse – ohne böse Überraschungen.
          </p>
        </div>

        {/* Process Steps */}
        <div className="relative max-w-4xl mx-auto">
          {/* Connecting Line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-primary/20 to-transparent" />

          <div className="space-y-12 md:space-y-0">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`relative flex flex-col md:flex-row gap-6 md:gap-12 items-start ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                } md:mb-16`}
              >
                {/* Content */}
                <div
                  className={`flex-1 ${
                    index % 2 === 0 ? "md:text-right" : "md:text-left"
                  }`}
                >
                  <div
                    className={`inline-flex items-center gap-4 mb-4 ${
                      index % 2 === 0
                        ? "md:flex-row-reverse"
                        : "md:flex-row"
                    }`}
                  >
                    <span className="text-5xl font-bold text-primary/20">
                      {step.number}
                    </span>
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center md:hidden">
                      <step.icon className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>

                {/* Center Icon (Desktop) */}
                <div className="hidden md:flex items-center justify-center absolute left-1/2 -translate-x-1/2">
                  <div className="w-14 h-14 rounded-xl bg-card border-2 border-primary flex items-center justify-center shadow-glow">
                    <step.icon className="w-6 h-6 text-primary" />
                  </div>
                </div>

                {/* Spacer for alternating layout */}
                <div className="flex-1 hidden md:block" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
