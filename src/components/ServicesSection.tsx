import { Button } from "@/components/ui/button";
import { ArrowRight, MailCheck, MessagesSquare, Workflow } from "lucide-react";

const services = [
  {
    icon: MailCheck,
    title: "E-Mail-Automation",
    subtitle: "Weniger Ticket-Stau, schnellere Antworten",
    description: "Digitale Mitarbeiter priorisieren eingehende E-Mails, beantworten Standardfaelle und uebergeben kritische Themen sauber an Ihr Team.",
    features: [
      "Automatische Kategorisierung und Priorisierung",
      "Kontextbezogene Antwortvorschlaege oder Direktantworten",
      "SLA-orientierte Eskalationslogik",
    ],
  },
  {
    icon: MessagesSquare,
    title: "Anfragebearbeitung",
    subtitle: "Mehr qualifizierte Gespraeche, weniger Leerlauf",
    description: "Anfragen werden in Echtzeit geprueft, angereichert und fuer Vertrieb oder Beratung vorbereitet.",
    features: [
      "Qualifizierung nach Branche, Bedarf und Dringlichkeit",
      "Routing in CRM mit sauberem Datensatz",
      "Terminlogik fuer passende Ansprechpartner",
    ],
  },
  {
    icon: Workflow,
    title: "Ablauf-Automation",
    subtitle: "Operative Prozesse ohne manuelle Schleifen",
    description: "Von Freigaben bis Berichten: Tawano automatisiert wiederkehrende interne Aufgaben ueber Ihre bestehende Tool-Landschaft hinweg.",
    features: [
      "Integrationen mit CRM, ERP, Helpdesk und Kollaborationstools",
      "Automatische Datenuebergabe zwischen Systemen",
      "Monitoring und Selbstkorrektur bei Ausnahmen",
    ],
  },
];

export const ServicesSection = () => {
  const scrollToContact = () => {
    const element = document.querySelector("#kontakt");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="automation-solutions" className="py-24 relative">
      <div className="container px-4">
        <div className="grid gap-10 lg:grid-cols-[minmax(280px,0.75fr)_minmax(0,1.25fr)] lg:gap-16 max-w-6xl mx-auto">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <span className="section-kicker mb-6">Automationsloesungen</span>
            <h2 className="section-title mb-5 md:text-[2.6rem]">
              Automation, die Routine-Aufgaben
              <span className="display-serif block text-gradient">systematisch ersetzt.</span>
            </h2>
            <p className="section-copy max-w-md">
              Tawano entwickelt keine isolierten Features, sondern automatisierte Prozessketten.
              Ziel ist immer derselbe Hebel: weniger operative Last, mehr Tempo, niedrigere Kosten.
            </p>
          </div>

          <div className="space-y-5">
          {services.map((service, index) => (
            <article
              key={index}
              className="group premium-panel p-7 md:p-8 hover-lift"
            >
              <div className="relative z-10 grid gap-8 md:grid-cols-[auto_minmax(0,1fr)_auto] md:items-start">
                <div className="flex items-center gap-4 md:block">
                  <span className="text-sm font-semibold text-primary/70">0{index + 1}</span>
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 md:mt-5">
                    <service.icon className="h-6 w-6 text-primary" aria-hidden="true" />
                  </div>
                </div>

                <div>
                  <div className="mb-5">
                    <h3 className="text-2xl font-semibold mb-2">{service.title}</h3>
                    <span className="text-sm text-primary/80">{service.subtitle}</span>
                  </div>
                  <p className="mb-6 max-w-2xl text-base leading-7 text-muted-foreground">{service.description}</p>
                  <ul className="grid gap-3 md:grid-cols-2">
                    {service.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-start gap-3 rounded-2xl border border-white/8 bg-white/5 px-4 py-3 text-sm text-muted-foreground"
                      >
                        <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Button
                  variant="outline"
                  className="w-full md:w-auto md:min-w-40 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground"
                  onClick={scrollToContact}
                  aria-label={`Anfrage für ${service.title} stellen`}
                >
                  Loesung besprechen
                </Button>
              </div>
            </article>
          ))}
          </div>
        </div>
      </div>
    </section>
  );
};
