import { Button } from "@/components/ui/button";
import { Bot, Shield, Users, Zap } from "lucide-react";

const trustBadges = [
  { icon: Bot, label: "KI-gestützte Systeme" },
  { icon: Shield, label: "DSGVO-konform" },
  { icon: Users, label: "Persönliche Betreuung" },
  { icon: Zap, label: "Schnelle Umsetzung" },
];

export const HeroSection = () => {
  const scrollToSection = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      
      <div className="container relative z-10 px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="animate-fade-up inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 mb-8">
            <Bot className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">KI-gestützte Digitallösungen</span>
          </div>

          {/* Headline */}
          <h1 className="animate-fade-up-delay-1 text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Digitale Lösungen mit KI –{" "}
            <span className="text-gradient">professionell, schnell</span> und skalierbar.
          </h1>

          {/* Subheadline */}
          <p className="animate-fade-up-delay-2 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Chatbots, Social-Media-Management und moderne Websites für Unternehmen in Deutschland.
          </p>

          {/* CTA Buttons */}
          <div className="animate-fade-up-delay-3 flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button
              variant="hero"
              size="xl"
              onClick={() => scrollToSection("#kontakt")}
            >
              Kostenlose Anfrage
            </Button>
            <Button
              variant="heroOutline"
              size="xl"
              onClick={() => scrollToSection("#pakete")}
            >
              Pakete ansehen
            </Button>
          </div>

          {/* Trust Badges */}
          <div className="animate-fade-up-delay-4 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {trustBadges.map((badge, index) => (
              <div
                key={index}
                className="flex flex-col items-center gap-2 p-4"
              >
                <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
                  <badge.icon className="w-6 h-6 text-primary" />
                </div>
                <span className="text-sm text-muted-foreground text-center">
                  {badge.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
