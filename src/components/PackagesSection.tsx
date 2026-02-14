import { Button } from "@/components/ui/button";
import { Check, Bot, Share2, Globe, Code2 } from "lucide-react";

const packages = [
  {
    icon: Bot,
    name: "KI Chatbot Starter",
    price: "149",
    period: "/ Monat",
    description: "Automatisierte KI-Kundenkommunikation für Website oder Social Media.",
    features: [
      "Setup: 499 € einmalig",
      "Betrieb & Hosting inkl.",
      "Website-Chatbot ODER Social-Media-Bot",
      "FAQ-Logik (häufige Fragen)",
      "Lead- & Kontaktformular",
      "Weiterleitung an Mitarbeiter",
      "Einrichtung & kurze Schulung",
      "Updates & Optimierung inkl.",
    ],
    popular: false,
  },
  {
    icon: Share2,
    name: "Social Media Starter",
    price: "899",
    period: "/ Monat",
    description: "Professionelle Social-Media-Betreuung für Ihr Unternehmen.",
    features: [
      "Monatlich kündbar",
      "Content-Plan & Strategie",
      "12–16 Posts / Monat",
      "KI-unterstützte Texterstellung",
      "Hashtag-Recherche & Optimierung",
      "Monatliches Reporting",
      "Persönlicher Ansprechpartner",
    ],
    popular: true,
  },
  {
    icon: Globe,
    name: "Website Starter SEO",
    price: "179",
    period: "/ Monat",
    description: "SEO-optimierte moderne Website für Ihr Unternehmen.",
    features: [
      "Setup: 999 € einmalig",
      "Individuelle Landingpage",
      "Mobil-optimiertes Design",
      "Kontaktformular mit Validierung",
      "Google SEO-Optimierung",
      "Schnelle Ladezeiten (Lighthouse 95+)",
      "Hosting, SSL, Backups & Pflege inkl.",
    ],
    popular: false,
  },
  {
    icon: Code2,
    name: "Softwarelösung Custom",
    price: "349",
    period: "/ Monat",
    description: "Spezialisierte Softwarelösungen & Prozessautomatisierung für Ihr Unternehmen.",
    features: [
      "Setup: ab 3.500 € einmalig",
      "Anforderungsanalyse & Planung",
      "Individuelle Softwarelösungen",
      "Digitalisierung & Automatisierung",
      "Benutzerverwaltung & Schnittstellen",
      "API- & System-Integrationen",
      "Tests, Wartung & technischer Support",
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
    <section id="pakete" className="py-24 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/30 to-transparent" />
      
      <div className="container px-4 relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-primary text-sm font-medium mb-4">
            Preise & Pakete
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Transparente Pakete für KI-Chatbots, Websites und Softwarelösungen
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Keine versteckten Kosten. Nach Ihrer Anfrage besprechen wir Ihre Anforderungen und erstellen ein maßgeschneidertes Angebot für Ihr Projekt.
          </p>
        </div>

        {/* Package Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {packages.map((pkg, index) => (
            <div
              key={index}
              className={`relative rounded-2xl p-8 transition-all duration-300 ${
                pkg.popular
                  ? "bg-gradient-card border-2 border-primary shadow-glow scale-105"
                  : "bg-card border border-border hover:border-primary/50"
              }`}
            >
              {/* Popular Badge */}
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-gradient-primary text-primary-foreground text-xs font-semibold px-4 py-1.5 rounded-full">
                    Beliebt
                  </span>
                </div>
              )}

              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                <pkg.icon className="w-6 h-6 text-primary" />
              </div>

              {/* Header */}
              <h3 className="text-xl font-bold mb-2">{pkg.name}</h3>
              <p className="text-muted-foreground text-sm mb-6">
                {pkg.description}
              </p>

              {/* Price */}
              <div className="mb-8">
                <span className="text-sm text-muted-foreground">ab </span>
                <span className="text-4xl font-bold">{pkg.price} €</span>
                <span className="text-muted-foreground text-sm ml-1">
                  {pkg.period}
                </span>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {pkg.features.map((feature, featureIndex) => (
                  <li
                    key={featureIndex}
                    className="flex items-start gap-3 text-sm"
                  >
                    <Check className="w-5 h-5 text-primary shrink-0" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Button
                variant={pkg.popular ? "hero" : "outline"}
                className="w-full"
                onClick={scrollToContact}
              >
                Anfrage stellen
              </Button>
            </div>
          ))}
        </div>

        {/* Note */}
        <p className="text-center text-sm text-muted-foreground mt-12">
          * Alle Preise verstehen sich als Mindestpreise. Der finale Preis wird nach dem 
          Erstgespräch individuell kalkuliert.
        </p>
      </div>
    </section>
  );
};
