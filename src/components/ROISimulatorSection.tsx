import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { ArrowRight, BarChart3, Coins, Gauge, Timer } from "lucide-react";

const euro = new Intl.NumberFormat("de-DE", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

const number = new Intl.NumberFormat("de-DE");

export const ROISimulatorSection = () => {
  const [weeklyHours, setWeeklyHours] = useState(65);
  const [hourlyCost, setHourlyCost] = useState(45);
  const [automationRate, setAutomationRate] = useState(55);

  const metrics = useMemo(() => {
    const monthlyGrossSavings = weeklyHours * hourlyCost * 4.33 * (automationRate / 100);
    const monthlyPlatformCost = 1200;
    const monthlyNetSavings = Math.max(monthlyGrossSavings - monthlyPlatformCost, 0);
    const annualNetSavings = monthlyNetSavings * 12;
    const setupCost = 12000;
    const paybackMonths = monthlyNetSavings > 0 ? setupCost / monthlyNetSavings : null;

    return {
      monthlyGrossSavings,
      monthlyNetSavings,
      annualNetSavings,
      paybackMonths,
      hoursRecovered: weeklyHours * (automationRate / 100),
    };
  }, [weeklyHours, hourlyCost, automationRate]);

  const scrollToContact = () => {
    const element = document.querySelector("#kontakt");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="roi-simulator" className="relative py-24">
      <div className="container px-4">
        <div className="mx-auto max-w-6xl premium-panel p-8 md:p-10 lg:p-12">
          <div className="relative z-10">
            <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl">
                <span className="section-kicker mb-6">ROI-Rechner</span>
                <h2 className="section-title md:text-[2.6rem]">
                  Rechnen Sie live,
                  <span className="display-serif block text-gradient">wie viel Automatisierung spart.</span>
                </h2>
                <p className="mt-5 section-copy">
                  Keine Marketing-Magie: Stellen Sie Aufwand, Kosten und Automationsanteil ein.
                  Das Modell zeigt Ihnen sofort den realistischen wirtschaftlichen Effekt.
                </p>
              </div>
              <div className="rounded-2xl border border-primary/25 bg-primary/10 px-5 py-4">
                <p className="text-xs uppercase tracking-[0.18em] text-primary/80">Geschaetzte Netto-Ersparnis pro Jahr</p>
                <p className="mt-2 text-3xl font-semibold text-foreground md:text-4xl">{euro.format(metrics.annualNetSavings)}</p>
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)]">
              <article className="interactive-ring rounded-2xl border border-white/10 bg-white/5 p-6 md:p-7">
                <div className="space-y-8">
                  <div>
                    <div className="mb-3 flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Woechentliche Routine-Stunden</span>
                      <span className="font-medium text-foreground">{number.format(weeklyHours)} h</span>
                    </div>
                    <Slider value={[weeklyHours]} min={10} max={200} step={1} onValueChange={(value) => setWeeklyHours(value[0])} />
                  </div>

                  <div>
                    <div className="mb-3 flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Interner Kostensatz pro Stunde</span>
                      <span className="font-medium text-foreground">{euro.format(hourlyCost)}</span>
                    </div>
                    <Slider value={[hourlyCost]} min={25} max={120} step={1} onValueChange={(value) => setHourlyCost(value[0])} />
                  </div>

                  <div>
                    <div className="mb-3 flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Automatisierbarer Anteil</span>
                      <span className="font-medium text-foreground">{automationRate}%</span>
                    </div>
                    <Slider value={[automationRate]} min={10} max={90} step={1} onValueChange={(value) => setAutomationRate(value[0])} />
                  </div>
                </div>

                <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                  <Button variant="hero" size="lg" onClick={scrollToContact}>
                    ROI-Analyse anfragen
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Button>
                  <Button variant="heroOutline" size="lg" onClick={() => setAutomationRate(65)}>
                    Referenzwert laden
                  </Button>
                </div>
              </article>

              <article className="grid gap-4">
                <div className="interactive-ring rounded-2xl border border-white/10 bg-black/10 p-5">
                  <div className="mb-3 flex items-center gap-2 text-primary">
                    <Coins className="h-4 w-4" aria-hidden="true" />
                    <p className="text-sm font-medium">Monatliche Brutto-Ersparnis</p>
                  </div>
                  <p className="text-2xl font-semibold">{euro.format(metrics.monthlyGrossSavings)}</p>
                </div>

                <div className="interactive-ring rounded-2xl border border-white/10 bg-black/10 p-5">
                  <div className="mb-3 flex items-center gap-2 text-primary">
                    <Gauge className="h-4 w-4" aria-hidden="true" />
                    <p className="text-sm font-medium">Monatliche Netto-Ersparnis</p>
                  </div>
                  <p className="text-2xl font-semibold">{euro.format(metrics.monthlyNetSavings)}</p>
                </div>

                <div className="interactive-ring rounded-2xl border border-white/10 bg-black/10 p-5">
                  <div className="mb-3 flex items-center gap-2 text-primary">
                    <Timer className="h-4 w-4" aria-hidden="true" />
                    <p className="text-sm font-medium">Woechentlich frei werdende Zeit</p>
                  </div>
                  <p className="text-2xl font-semibold">{number.format(metrics.hoursRecovered)} h</p>
                </div>

                <div className="interactive-ring rounded-2xl border border-primary/20 bg-primary/10 p-5">
                  <div className="mb-3 flex items-center gap-2 text-primary">
                    <BarChart3 className="h-4 w-4" aria-hidden="true" />
                    <p className="text-sm font-medium">Einrichtung amortisiert in</p>
                  </div>
                  <p className="text-2xl font-semibold">
                    {metrics.paybackMonths ? `${metrics.paybackMonths.toFixed(1)} Monaten` : "mehr als 24 Monaten"}
                  </p>
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
