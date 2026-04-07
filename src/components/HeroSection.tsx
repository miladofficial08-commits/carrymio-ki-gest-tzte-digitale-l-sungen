import { Button } from "@/components/ui/button";
import { ArrowRight, Bot, CheckCircle2, Languages, Sparkles, Workflow } from "lucide-react";

export const HeroSection = () => {
  const scrollToSection = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="relative min-h-screen flex items-center pt-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-hero-premium" aria-hidden="true" />
      <div className="absolute inset-0 soft-grid opacity-30" aria-hidden="true" />
      <div className="absolute top-24 left-[8%] h-72 w-72 rounded-full bg-primary/10 blur-3xl float-slow" aria-hidden="true" />
      <div className="absolute bottom-16 right-[10%] h-64 w-64 rounded-full bg-primary/10 blur-3xl float-slower" aria-hidden="true" />

      <div className="container relative z-10 px-4 py-16 md:py-24">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(360px,0.85fr)] lg:gap-14">
          <div className="max-w-3xl">
            <div className="animate-fade-up section-kicker mb-8" role="status" aria-label="KI-Automation fuer Unternehmen">
              <Bot className="h-4 w-4 text-primary" aria-hidden="true" />
              <span>Tawano Digitale Mitarbeiter</span>
            </div>

            <h1 className="animate-fade-up-delay-1 text-4xl font-semibold leading-[1.02] md:text-6xl xl:text-7xl">
              Senken Sie operative Kosten
              <span className="display-serif block text-gradient">mit digitalen Mitarbeitern.</span>
            </h1>

            <div className="animate-fade-up-delay-2 my-8 max-w-2xl editorial-rule" aria-hidden="true" />

            <p className="animate-fade-up-delay-2 max-w-2xl text-base leading-7 text-muted-foreground md:text-lg">
              Tawano baut KI-gestützte digitale Mitarbeiter, die wiederkehrende Bueroarbeit uebernehmen:
              E-Mail-Betreuung, Anfragequalifizierung, Kundenkommunikation und interne Arbeitsablaeufe. Rund um die Uhr,
              mit klaren Regeln und messbarer Wirtschaftlichkeit.
            </p>

            <div className="animate-fade-up-delay-3 mt-10 flex flex-col gap-4 sm:flex-row">
              <Button
                variant="hero"
                size="xl"
                onClick={() => scrollToSection("#digital-employees")}
                aria-label="Digitale Mitarbeiter ansehen"
              >
                Digitale Mitarbeiter ansehen
                <ArrowRight aria-hidden="true" />
              </Button>
              <Button
                variant="heroOutline"
                size="xl"
                onClick={() => scrollToSection("#kontakt")}
                aria-label="Automations-Check anfragen"
              >
                Automations-Check anfragen
              </Button>
            </div>

            <div className="animate-fade-up-delay-4 mt-10 flex flex-wrap gap-3 text-sm text-muted-foreground">
              <span className="data-pill inline-flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" aria-hidden="true" />
                24/7 verfuegbar ohne Schichtkosten
              </span>
              <span className="data-pill inline-flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" aria-hidden="true" />
                Lernt aus jedem Vorgang weiter
              </span>
              <span className="data-pill inline-flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" aria-hidden="true" />
                Ersetzt Routine-Aufgaben mit System
              </span>
            </div>
          </div>

          <aside className="animate-fade-up-delay-3 premium-panel p-8 md:p-10 lg:ml-auto lg:max-w-[460px]">
            <div className="relative z-10">
              <div className="mb-8 flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Live-Ansicht digitaler Mitarbeiter</p>
                  <h2 className="mt-2 text-2xl font-semibold">Kosten- und Effizienz-Engine</h2>
                </div>
                <span className="rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                  7+ Sprachen, selbstkorrigierend
                </span>
              </div>

              <p className="mb-8 text-base leading-7 text-muted-foreground">
                Digitale Mitarbeiter verstehen Kontexte, priorisieren Faelle und fuehren Aufgaben direkt in Ihren
                bestehenden Systemen aus. Ihr Team konzentriert sich auf Entscheidungen statt auf Routine.
              </p>

              <div className="space-y-4 border-y border-white/10 py-6">
                <div className="flex items-start gap-4">
                  <div className="mt-1 rounded-xl border border-primary/20 bg-primary/10 p-2">
                    <Workflow className="h-4 w-4 text-primary" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-medium">Workflow-Automation ohne Medienbrueche</h3>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">CRM, Ticketsysteme und interne Tools werden automatisch verbunden und bespielt.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="mt-1 rounded-xl border border-primary/20 bg-primary/10 p-2">
                    <Languages className="h-4 w-4 text-primary" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-medium">Mehrsprachige Kundenkommunikation</h3>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">Antworten in 7+ Sprachen mit konsistenter Tonalitaet und dokumentierter Historie.</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-black/10 p-4">
                  <p className="text-sm text-muted-foreground">Operative Entlastung</p>
                  <p className="mt-2 text-sm leading-6 text-foreground/85">Bis zu 60% weniger manuelle Arbeit bei wiederholenden Kommunikationsprozessen.</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/10 p-4">
                  <p className="text-sm text-muted-foreground">Qualitaetskontrolle</p>
                  <p className="mt-2 text-sm leading-6 text-foreground/85">Lern- und Selbstkorrektur-Schleife mit transparenten Verbesserungszyklen.</p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </header>
  );
};