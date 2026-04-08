import { Button } from "@/components/ui/button";
import { Check, Database, Gauge, LayoutDashboard } from "lucide-react";

const packages = [
  {
    icon: LayoutDashboard,
    name: "Automations-Steuerzentrale",
    bestFor: "Fuer Teams mit mehreren automatisierten Prozessen",
    pricePrefix: "",
    price: "Projektbasiert",
    period: "inkl. Einrichtung und Rollout",
    description: "Zentrales Dashboard fuer Monitoring, Steuerung und Freigabe Ihrer digitalen Mitarbeiter.",
    features: [
      "Kennzahlen-Tracking fuer Effizienz und Kosten",
      "Live-Status aller Automationen",
      "Rollenbasierte Dashboards fuer Teams",
      "Auditierbare Prozesshistorie",
    ],
    popular: true,
  },
  {
    icon: Database,
    name: "Integrationsschicht",
    bestFor: "Fuer Unternehmen mit fragmentierter Tool-Landschaft",
    pricePrefix: "ab",
    price: "3900",
    period: " einmalig",
    description: "Sichere Schnittstellen fuer Datenfluss zwischen CRM, ERP, Helpdesk und Kollaborationstools.",
    features: [
      "Systemuebergreifende Datenharmonisierung",
      "Ereignisbasierte Automations-Trigger",
      "Validierungsregeln gegen Datenfehler",
      "Dokumentierte API- und Prozesslogik",
      "Optionales SLA-gestuetztes Monitoring",
    ],
    popular: false,
  },
  {
    icon: Gauge,
    name: "Leistungs-Bots",
    bestFor: "Fuer wiederkehrende Kernprozesse mit hohem Volumen",
    pricePrefix: "ab",
    price: "690",
    period: " / Monat",
    description: "Digitale Mitarbeiter fuer spezifische Aufgaben wie Reporting, Nachverfolgung oder Ticket-Vorbereitung.",
    features: [
      "Stabile Ausfuehrung nach klaren Regeln",
      "Automatisches Error Handling mit Selbstkorrektur",
      "Fortlaufende Lernschleife aus Echtbetrieb",
      "Mehrsprachige Kommunikation inklusive",
      "Monatliche Optimierungsreports",
    ],
    popular: false,
  },
];

export const PackagesSection = () => {
  const scrollToContact = () => {
    const element = document.querySelector("#kontakt");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="software-solutions" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/30 to-transparent" />
      
      <div className="container px-4 relative">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="section-kicker mb-6">Softwareloesungen</span>
          <h2 className="section-title mb-5 md:text-[2.6rem]">
            Individuelle Software,
            <span className="display-serif block text-gradient">gebaut fuer automatisierte Unternehmen.</span>
          </h2>
          <p className="section-copy">
            Wenn Standardtools nicht ausreichen, entwickelt Tawano passgenaue Systeme,
            die Ihre digitalen Mitarbeiter in bestehende Geschaeftsprozesse einbetten.
          </p>
        </div>

        <div className="max-w-6xl mx-auto mb-8">
          {packages.filter((pkg) => pkg.popular).map((pkg, index) => (
            <article
              key={index}
              className="premium-panel p-8 md:p-10 hover-lift"
            >
              <div className="relative z-10">
                <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
                  <span className="section-kicker">Individueller Aufbau</span>
                  <span className="text-sm text-primary/80">Auf Ihre Prozesse abgestimmt</span>
                </div>

                <div className="mb-8 grid gap-8 md:grid-cols-[minmax(0,1fr)_220px] md:items-end">
                  <div>
                    <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10">
                      <pkg.icon className="h-7 w-7 text-primary" />
                    </div>
                    <h3 className="text-3xl font-semibold mb-3">{pkg.name}</h3>
                    <p className="text-sm text-primary/80 mb-4">{pkg.bestFor}</p>
                    <p className="max-w-2xl text-base leading-7 text-muted-foreground">{pkg.description}</p>
                  </div>
                  <div className="rounded-[24px] border border-white/10 bg-black/10 p-6 md:text-right">
                    <p className="text-sm text-muted-foreground">Preis</p>
                    <div className="mt-3 text-4xl font-semibold md:text-5xl">{pkg.price}</div>
                    <p className="mt-2 text-sm text-primary/80">{pkg.period}</p>
                  </div>
                </div>

                <ul className="grid gap-3 md:grid-cols-2 mb-8">
                  {pkg.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="flex items-start gap-3 rounded-2xl border border-white/8 bg-white/5 px-4 py-4 text-sm"
                    >
                      <Check className="w-5 h-5 text-primary shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="mb-8 rounded-2xl border border-white/10 bg-white/5 p-5">
                  <h4 className="font-semibold mb-2">Warum projektbasiert?</h4>
                  <p className="text-sm leading-6 text-muted-foreground">
                    Weil Datenmodelle, Integrationen und Prozesslogik stark variieren.
                    Sie erhalten eine Loesung, die exakt zu Ihrer operativen Realitaet passt.
                  </p>
                </div>

                <Button
                  variant="hero"
                  className="w-full md:w-auto md:min-w-56"
                  onClick={scrollToContact}
                >
                  Projekt anfragen
                </Button>
              </div>
            </article>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
          {packages.filter((pkg) => !pkg.popular).map((pkg, index) => (
            <article key={index} className="rounded-[24px] border border-white/10 bg-card/70 p-7 backdrop-blur-xl hover-lift">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                <pkg.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{pkg.name}</h3>
              <p className="text-sm text-primary/80 mb-4">{pkg.bestFor}</p>
              <p className="text-sm leading-7 text-muted-foreground mb-6">{pkg.description}</p>
              <div className="mb-6">
                {pkg.pricePrefix ? <span className="text-sm text-muted-foreground">{pkg.pricePrefix} </span> : null}
                <span className="text-3xl font-semibold">{pkg.price} €</span>
                <span className="ml-1 text-sm text-muted-foreground">{pkg.period}</span>
              </div>
              <ul className="space-y-3 mb-6">
                {pkg.features.slice(0, 4).map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-3 text-sm">
                    <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button
                variant="outline"
                className="w-full"
                onClick={scrollToContact}
              >
                Projekt anfragen
              </Button>
            </article>
          ))}
        </div>

        <p className="text-center text-sm text-muted-foreground mt-12">
          * Richtwerte dienen der Einordnung. Der finale Umfang wird nach kurzer Prozessanalyse definiert.
        </p>
      </div>
    </section>
  );
};
