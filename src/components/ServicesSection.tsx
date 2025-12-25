import { Button } from "@/components/ui/button";
import { Bot, Share2, Globe, ArrowRight } from "lucide-react";

const services = [
  {
    icon: Bot,
    title: "Chatbots",
    subtitle: "Website & Social Media",
    description: "KI-gestützte Kundenkommunikation für Ihre digitalen Kanäle.",
    features: [
      "Automatische Beantwortung häufiger Fragen",
      "Lead-Erfassung & Qualifizierung",
      "Weiterleitung an Mitarbeiter bei Bedarf",
    ],
  },
  {
    icon: Share2,
    title: "Social-Media-Management",
    subtitle: "Content & Wachstum",
    description: "Professionelle Betreuung Ihrer Social-Media-Präsenz.",
    features: [
      "Content-Planung & regelmäßiges Posting",
      "KI-Unterstützung für Texte & Ideen",
      "Wachstumsstrategie & Markenaufbau",
    ],
  },
  {
    icon: Globe,
    title: "Website-Erstellung",
    subtitle: "Modern & Conversion-stark",
    description: "Websites, die Besucher in Kunden verwandeln.",
    features: [
      "Modernes, responsives Design",
      "Mobil-optimiert & SEO-Grundlagen",
      "Kontakt- & Anfrage-Systeme",
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
    <section id="leistungen" className="py-24 relative">
      <div className="container px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-primary text-sm font-medium mb-4">
            Unsere Leistungen
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Drei Kernbereiche für Ihren digitalen Erfolg
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Von intelligenten Chatbots über Social Media bis zur perfekten Website – 
            wir bringen Ihr Unternehmen digital voran.
          </p>
        </div>

        {/* Service Cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative bg-gradient-card rounded-2xl p-8 border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-glow"
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                <service.icon className="w-7 h-7 text-primary" />
              </div>

              {/* Content */}
              <div className="mb-6">
                <h3 className="text-xl font-bold mb-1">{service.title}</h3>
                <span className="text-sm text-primary">{service.subtitle}</span>
              </div>

              <p className="text-muted-foreground mb-6">{service.description}</p>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {service.features.map((feature, featureIndex) => (
                  <li
                    key={featureIndex}
                    className="flex items-start gap-3 text-sm text-muted-foreground"
                  >
                    <ArrowRight className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Button
                variant="outline"
                className="w-full group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all duration-300"
                onClick={scrollToContact}
              >
                Kostenlose Anfrage
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
