import { ArrowRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";

const proofCards = [
  {
    title: "Vorher/Nachher",
    text: "Vorher: manuelle Bearbeitung in Silos. Nachher: automatisierte Prozesskette mit klaren Uebergaben und messbarer Geschwindigkeit.",
  },
  {
    title: "Fuehrungsebene",
    text: "Entscheider sehen jederzeit, welche Workflows Kosten sparen, wo Engpaesse entstehen und wie sich die Leistung entwickelt.",
  },
  {
    title: "Team-Sicht",
    text: "Mitarbeitende verlieren weniger Zeit durch Routineaufgaben und koennen sich auf Kunden und Problemloesung konzentrieren.",
  },
];

export const SocialProofSection = () => {
  const scrollToContact = () => {
    const element = document.querySelector("#kontakt");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="premium-panel p-8 md:p-10 lg:p-12">
          <div className="relative z-10">
            <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl">
                <span className="section-kicker mb-6">Vertrauen</span>
                <h2 className="section-title md:text-[2.6rem]">
                  Vertrauen entsteht durch
                  <span className="display-serif block text-gradient">klare Kennzahlen statt Bauchgefuehl.</span>
                </h2>
              </div>
              <p className="max-w-xl text-base leading-7 text-muted-foreground">
                Tabanu fokussiert auf Wirkung im Betrieb: weniger Prozesskosten, schnellere Reaktionszeiten,
                hoehere Servicequalitaet und belastbare Automationsstandards.
              </p>
            </div>

            <div className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
              <article className="rounded-[26px] border border-primary/20 bg-gradient-to-br from-primary/12 via-transparent to-transparent p-8 md:p-10">
                <div className="mb-6 flex items-center gap-3 text-primary">
                  <Quote className="h-5 w-5" aria-hidden="true" />
                  <span className="text-sm font-medium">Operatives Realbild</span>
                </div>
                <p className="display-serif text-2xl leading-tight text-foreground md:text-[2.15rem]">
                  "Digitale Mitarbeiter sind nicht nur ein Chatfenster. Sie sind ein operativer Kostenhebel,
                  der aus manuellen Routinen einen planbaren, skalierbaren Prozess macht."
                </p>
                <div className="mt-8 editorial-rule" aria-hidden="true" />
                <div className="mt-8 grid gap-4 md:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-sm font-medium mb-2">Vorher</p>
                    <p className="text-sm leading-6 text-muted-foreground">Hoher manueller Aufwand, verzoegerte Antworten und intransparente Bearbeitungsstaende.</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-sm font-medium mb-2">Nachher</p>
                    <p className="text-sm leading-6 text-muted-foreground">Automatisierte Priorisierung, schnelle Verarbeitung und saubere Uebergabe an Ihr Team.</p>
                  </div>
                </div>
              </article>

              <div className="grid gap-6">
                {proofCards.map((card) => (
                  <article key={card.title} className="rounded-[24px] border border-white/10 bg-white/5 p-6 hover-lift">
                    <div className="mb-4 flex items-center justify-between">
                      <p className="font-medium text-foreground">{card.title}</p>
                      <ArrowRight className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                    </div>
                    <p className="text-base leading-7 text-foreground/88">{card.text}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground mb-5">
            Sie wollen wissen, welches Einsparpotenzial in Ihren Prozessen steckt?
          </p>
          <Button variant="hero" size="lg" onClick={scrollToContact}>
            Potenzial analysieren
          </Button>
        </div>
      </div>
    </section>
  );
};
