import { useEffect, useMemo, useState } from "react";
import { Bot, Sparkles, Workflow, CircleDollarSign, Users, Clock3, CheckCircle2, Mail, BrainCircuit, MessagesSquare, ChevronDown, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { FAQSection } from "@/components/FAQSection";
import { ContactSection } from "@/components/ContactSection";
import Footer from "@/components/Footer";

const navItems = [
  { href: "#home", label: "Home" },
  { href: "#kostenrechner", label: "Kostenrechner" },
  { href: "#automation", label: "Automation" },
  { href: "#kontakt", label: "Kontakt" },
];

const scenarios = {
  support: {
    title: "Support & E-Mail",
    hours: "42 Std. pro Woche weniger",
    impact: "-38% operative Kosten",
    summary: "Digitale Mitarbeiter beantworten Standardfragen und geben nur schwere Fälle an Ihr Team.",
  },
  sales: {
    title: "Lead-Bearbeitung",
    hours: "29 Std. pro Woche weniger",
    impact: "+26% schnellerer Erstkontakt",
    summary: "Neue Anfragen werden automatisch geprüft und direkt an die richtige Person weitergegeben.",
  },
  operations: {
    title: "Interne Prozesse",
    hours: "34 Std. pro Woche weniger",
    impact: "-31% manuelle Arbeit",
    summary: "Interne Abläufe laufen automatisch in Ihren Tools, mit klaren Regeln und Status.",
  },
} as const;

const euro = new Intl.NumberFormat("de-DE", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

const animateValue = (from: number, to: number, speed = 0.18) => from + (to - from) * speed;

const processSteps = [
  { icon: Mail, title: "Anfrage kommt rein" },
  { icon: BrainCircuit, title: "System erkennt das Thema" },
  { icon: MessagesSquare, title: "Antwort wird erstellt" },
  { icon: Users, title: "Bei Bedarf geht es an Ihr Team" },
  { icon: CheckCircle2, title: "Anfrage ist gelöst" },
] as const;

const Index = () => {
  const [selectedScenario, setSelectedScenario] = useState<keyof typeof scenarios>("support");
  const [activeStep, setActiveStep] = useState(0);
  const [employees, setEmployees] = useState(6);
  const [salary, setSalary] = useState(3200);
  const [displayYearlyCost, setDisplayYearlyCost] = useState(0);
  const [displaySavings, setDisplaySavings] = useState(0);

  const activeScenario = useMemo(() => scenarios[selectedScenario], [selectedScenario]);

  const yearlyCost = useMemo(() => employees * salary * 12, [employees, salary]);
  const savingsRate = useMemo(() => (selectedScenario === "support" ? 0.34 : selectedScenario === "sales" ? 0.29 : 0.31), [selectedScenario]);
  const yearlySavings = useMemo(() => Math.round(yearlyCost * savingsRate), [yearlyCost, savingsRate]);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setDisplayYearlyCost((prev) => animateValue(prev, yearlyCost));
      setDisplaySavings((prev) => animateValue(prev, yearlySavings));
    }, 16);

    return () => window.clearInterval(interval);
  }, [yearlyCost, yearlySavings]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveStep((prev) => (prev + 1) % processSteps.length);
    }, 2400);

    return () => window.clearInterval(timer);
  }, []);

  const scrollTo = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-background/80 backdrop-blur-2xl">
        <div className="container px-4">
          <div className="flex h-16 items-center justify-between gap-6 md:h-20">
            <button onClick={() => scrollTo("#home")} className="flex items-center gap-3 md:gap-4" aria-label="Tawano Home">
              <span className="logo-orb flex h-10 w-10 items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-sm font-semibold text-primary">TW</span>
              <span className="text-left">
                <span className="block text-xl font-semibold tracking-[0.01em] text-foreground md:text-[1.8rem] md:leading-7">Tawano</span>
                <span className="hidden text-[10px] uppercase tracking-[0.22em] text-primary/80 md:block">Digitale Mitarbeiter & Automation</span>
              </span>
            </button>

            <div className="hidden items-center gap-7 md:flex">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollTo(item.href)}
                  className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  {item.label}
                </button>
              ))}
            </div>

            <Button size="sm" variant="hero" onClick={() => scrollTo("#kontakt")}>
              Kontakt aufnehmen
            </Button>
          </div>
        </div>
      </nav>

      <main>
        <header id="home" className="relative overflow-hidden pt-28 md:pt-36">
          <div className="absolute inset-0 bg-gradient-hero-premium" aria-hidden="true" />
          <div className="absolute inset-0 aurora-bg" aria-hidden="true" />
          <div className="absolute inset-0 soft-grid opacity-30" aria-hidden="true" />
          <div className="container relative z-10 px-4 pb-20 pt-10 md:pb-24">
            <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
              <div>
                <span className="section-kicker mb-6">
                  <Bot className="h-4 w-4" aria-hidden="true" />
                  Digitale Mitarbeiter für Unternehmen
                </span>
                <h1 className="text-4xl font-semibold leading-[1.02] md:text-6xl xl:text-7xl">
                  Automatisieren Sie Support,
                  <span className="display-serif block text-gradient">E-Mails und Anfragen.</span>
                </h1>
                <p className="mt-7 max-w-2xl text-base leading-7 text-muted-foreground md:text-lg">
                  Tawano baut digitale Mitarbeiter, die tägliche Aufgaben automatisch erledigen -
                  damit Ihr Team mehr Zeit für wichtige Arbeit hat.
                </p>

                <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                  <Button variant="hero" size="xl" onClick={() => scrollTo("#kontakt")}>Jetzt automatisieren</Button>
                  <Button variant="heroOutline" size="xl" onClick={() => scrollTo("#kostenrechner")}>Einsparung berechnen</Button>
                </div>

                <div className="mt-9 flex flex-wrap gap-3 text-sm text-muted-foreground">
                  <span className="data-pill">Weniger manuelle Arbeit</span>
                  <span className="data-pill">Schnellere Antworten</span>
                  <span className="data-pill">Mehr Zeit fürs Team</span>
                </div>

                <div className="mt-8 grid gap-3 sm:grid-cols-3">
                  <div className="stat-chip">
                    <p className="text-xs uppercase tracking-[0.14em] text-primary/80">Support-Antworten</p>
                    <p className="mt-1 text-xl font-semibold">Automatisch beantwortet</p>
                  </div>
                  <div className="stat-chip">
                    <p className="text-xs uppercase tracking-[0.14em] text-primary/80">E-Mails</p>
                    <p className="mt-1 text-xl font-semibold">Sortiert & beantwortet</p>
                  </div>
                  <div className="stat-chip">
                    <p className="text-xs uppercase tracking-[0.14em] text-primary/80">Leads</p>
                    <p className="mt-1 text-xl font-semibold">Sofort erkannt</p>
                  </div>
                </div>
              </div>

              <aside className="premium-panel p-7 md:p-9">
                <div className="relative z-10">
                  <p className="text-sm text-muted-foreground">Schneller Blick auf den Nutzen</p>
                  <h2 className="mt-2 text-2xl font-semibold">Was Tawano für Ihr Team übernimmt</h2>

                  <div className="mt-6 grid gap-2 sm:grid-cols-3">
                    <button onClick={() => setSelectedScenario("support")} className={`interactive-ring rounded-xl border px-3 py-2 text-xs ${selectedScenario === "support" ? "border-primary/50 bg-primary/10 text-foreground" : "border-white/10 bg-white/5 text-muted-foreground"}`}>Support & E-Mails</button>
                    <button onClick={() => setSelectedScenario("sales")} className={`interactive-ring rounded-xl border px-3 py-2 text-xs ${selectedScenario === "sales" ? "border-primary/50 bg-primary/10 text-foreground" : "border-white/10 bg-white/5 text-muted-foreground"}`}>Leads & Anfragen</button>
                    <button onClick={() => setSelectedScenario("operations")} className={`interactive-ring rounded-xl border px-3 py-2 text-xs ${selectedScenario === "operations" ? "border-primary/50 bg-primary/10 text-foreground" : "border-white/10 bg-white/5 text-muted-foreground"}`}>Interne Abläufe</button>
                  </div>

                  <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5">
                    <p className="text-sm text-primary/80">{activeScenario.title}</p>
                    <p className="mt-2 text-lg font-semibold">{activeScenario.hours}</p>
                    <p className="text-sm text-emerald-300">{activeScenario.impact}</p>
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">{activeScenario.summary}</p>
                  </div>

                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-xl border border-white/10 bg-black/10 p-4">
                      <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Merkt sich frühere Fälle</p>
                      <p className="mt-2 text-sm text-foreground/85">Berücksichtigt frühere Anfragen und arbeitet dadurch präziser.</p>
                    </div>
                    <div className="rounded-xl border border-white/10 bg-black/10 p-4">
                      <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Wird mit der Zeit besser</p>
                      <p className="mt-2 text-sm text-foreground/85">Wird mit jeder Interaktion besser und stabiler.</p>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </header>

        <section id="kostenrechner" className="py-24">
          <div className="container px-4">
            <div className="mx-auto max-w-6xl premium-panel p-8 md:p-10">
              <div className="relative z-10">
                <div className="mx-auto max-w-3xl text-center">
                  <span className="section-kicker mb-6">Kostenrechner</span>
                  <h2 className="section-title">Was kosten Support und Routineaufgaben wirklich?</h2>
                  <p className="mt-4 section-copy">
                    Zwei Eingaben – sofort Ihr Ergebnis.
                  </p>
                </div>

                <div className="mt-10 grid gap-6 lg:grid-cols-2 lg:items-stretch">
                  <article className="rounded-2xl border border-white/10 bg-white/5 p-6">
                    <p className="text-sm font-medium text-foreground">Eingaben</p>
                    <div className="mt-6 space-y-7">
                      <div>
                        <div className="mb-3 flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Anzahl Mitarbeiter</span>
                          <span className="font-semibold text-foreground">{employees}</span>
                        </div>
                        <Slider min={1} max={50} step={1} value={[employees]} onValueChange={(v) => setEmployees(v[0])} />
                      </div>

                      <div>
                        <div className="mb-3 flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Monatsgehalt</span>
                          <span className="font-semibold text-foreground">{euro.format(salary)}</span>
                        </div>
                        <Slider min={1800} max={9000} step={100} value={[salary]} onValueChange={(v) => setSalary(v[0])} />
                      </div>
                    </div>
                  </article>

                  <article className="rounded-2xl border border-primary/30 bg-primary/10 p-6">
                    <p className="text-sm font-medium text-foreground">Ergebnis</p>
                    <div className="mt-5 rounded-xl border border-white/10 bg-black/10 p-4">
                      <div className="flex items-center gap-2 text-primary">
                        <CircleDollarSign className="h-4 w-4" aria-hidden="true" />
                        <p className="text-sm">Jährliche Kosten</p>
                      </div>
                      <p className="mt-2 text-4xl font-semibold text-rose-300 md:text-5xl">{euro.format(Math.round(displayYearlyCost))}</p>
                    </div>

                    <div className="mt-4 rounded-xl border border-emerald-300/30 bg-emerald-400/10 p-4">
                      <div className="flex items-center gap-2 text-emerald-300">
                        <Sparkles className="h-4 w-4" aria-hidden="true" />
                        <p className="text-sm">Mögliche Einsparung</p>
                      </div>
                      <p className="mt-2 text-4xl font-semibold text-emerald-300 md:text-5xl">{euro.format(Math.round(displaySavings))}</p>
                    </div>
                  </article>
                </div>

                <div className="mx-auto mt-8 grid max-w-3xl gap-4 sm:grid-cols-3">
                  <article className="rounded-xl border border-white/10 bg-black/10 p-4 text-center">
                    <Users className="mx-auto h-4 w-4 text-primary" aria-hidden="true" />
                    <p className="mt-2 text-xl font-semibold">{employees}</p>
                    <p className="text-xs text-muted-foreground">Mitarbeiter</p>
                  </article>
                  <article className="rounded-xl border border-white/10 bg-black/10 p-4 text-center">
                    <Clock3 className="mx-auto h-4 w-4 text-primary" aria-hidden="true" />
                    <p className="mt-2 text-xl font-semibold">24/7</p>
                    <p className="text-xs text-muted-foreground">System</p>
                  </article>
                  <article className="rounded-xl border border-white/10 bg-black/10 p-4 text-center">
                    <Workflow className="mx-auto h-4 w-4 text-primary" aria-hidden="true" />
                    <p className="mt-2 text-xl font-semibold">{Math.round(savingsRate * 100)}%</p>
                    <p className="text-xs text-muted-foreground">Potenzial</p>
                  </article>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24">
          <div className="container px-4">
            <div className="mx-auto max-w-5xl text-center">
              <span className="section-kicker mb-6">Der Unterschied</span>
              <h2 className="section-title">Manuelle Arbeit vs. digitale Mitarbeiter</h2>
              <p className="section-copy mx-auto mt-4 max-w-2xl">
                Wie digitale Mitarbeiter Ihr Unternehmen entlasten.
              </p>
            </div>

            <div className="mx-auto mt-12 grid max-w-6xl gap-6 lg:grid-cols-2 lg:items-start">
              <article className="rounded-3xl border border-rose-400/30 bg-rose-400/10 p-6 md:p-7">
                <p className="text-sm font-medium uppercase tracking-[0.12em] text-rose-200">Ohne Automation</p>
                <div className="mt-4 space-y-3">
                {[
                  "Support-Anfragen bleiben lange offen",
                  "Kunden warten auf Antworten",
                  "Leads gehen verloren",
                  "Aufgaben stapeln sich im Team",
                  "Hohe Personalkosten",
                ].map((item) => (
                    <div key={item} className="flex items-start gap-3 rounded-xl border border-rose-300/25 bg-black/10 px-4 py-3">
                      <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-rose-200" aria-hidden="true" />
                      <p className="text-sm leading-6 text-foreground/90">{item}</p>
                    </div>
                  ))}
                </div>
              </article>

              <article className="premium-panel p-6 md:p-7">
                <div className="relative z-10">
                  <p className="text-sm font-medium uppercase tracking-[0.12em] text-emerald-300">Mit Tawano</p>
                  <div className="mt-4 space-y-3">
                    {[
                      "Support läuft 24/7 ohne Ausfall",
                      "Kunden erhalten sofort Antworten",
                      "Leads werden automatisch erkannt",
                      "Aufgaben laufen automatisch im Hintergrund",
                      "Geringere Kosten für Ihr Unternehmen",
                    ].map((item) => (
                      <div key={item} className="flex items-start gap-3 rounded-xl border border-emerald-300/25 bg-emerald-400/10 px-4 py-3">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" aria-hidden="true" />
                        <p className="text-sm leading-6 text-foreground">{item}</p>
                      </div>
                    ))}
                  </div>

                </div>
              </article>
            </div>
          </div>
        </section>

        <section id="automation" className="py-24">
          <div className="container px-4">
            <div className="mx-auto max-w-6xl premium-panel p-8 md:p-10">
              <div className="relative z-10">
                <span className="section-kicker mb-6">So funktioniert es</span>
                <h2 className="section-title">Jede Anfrage – ein klarer Ablauf</h2>

                <div className="mx-auto mt-10 max-w-4xl">
                  <div className="workflow-line" aria-hidden="true" />
                  <div className="grid gap-5 md:grid-cols-5 md:items-start">
                    {processSteps.map((step, index) => (
                      <article
                        key={step.title}
                        onMouseEnter={() => setActiveStep(index)}
                        className={`workflow-step ${activeStep === index ? "workflow-step-active" : ""}`}
                      >
                        <step.icon className="mx-auto h-5 w-5 text-primary" aria-hidden="true" />
                        <p className="mt-3 text-center text-sm leading-6 text-foreground/90">{step.title}</p>
                        {index < processSteps.length - 1 ? <ChevronDown className="mx-auto mt-2 h-7 w-7 text-primary md:hidden" aria-hidden="true" /> : null}
                      </article>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="websites" className="py-24">
          <div className="container px-4">
            <div className="mx-auto max-w-6xl premium-panel p-7 md:p-10">
              <div className="relative z-10">
                <div className="mx-auto max-w-3xl text-center">
                  <span className="section-kicker mb-6">Leistungen von Tawano</span>
                  <h2 className="section-title">Unsere Lösungen</h2>
                  <p className="section-copy mt-4">
                    Für jedes Ziel die passende Lösung.
                  </p>
                </div>

                <div className="mt-10 grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-4">
                  <article className="surface-elevated hover-lift flex h-full flex-col rounded-2xl p-6">
                    <div className="flex items-center gap-3">
                      <span className="rounded-xl border border-primary/30 bg-primary/10 p-2">
                        <MessagesSquare className="h-4 w-4 text-primary" aria-hidden="true" />
                      </span>
                      <p className="text-xl font-semibold text-foreground">Chatbots</p>
                    </div>
                    <p className="mt-4 text-sm leading-6 text-muted-foreground">
                      Antwortet sofort auf Fragen und nimmt neue Anfragen auf.
                    </p>
                    <p className="mt-4 text-xs uppercase tracking-[0.12em] text-muted-foreground">Startpreis</p>
                    <p className="mt-1 text-base font-semibold text-primary">500 EUR</p>
                  </article>

                  <article className="surface-elevated hover-lift flex h-full flex-col rounded-2xl p-6">
                    <div className="flex items-center gap-3">
                      <span className="rounded-xl border border-primary/30 bg-primary/10 p-2">
                        <Workflow className="h-4 w-4 text-primary" aria-hidden="true" />
                      </span>
                      <p className="text-xl font-semibold text-foreground">Websites</p>
                    </div>
                    <p className="mt-4 text-sm leading-6 text-muted-foreground">
                      Klare Seiten, die Vertrauen aufbauen und neue Kunden bringen.
                    </p>
                    <p className="mt-4 text-xs uppercase tracking-[0.12em] text-muted-foreground">Startpreis</p>
                    <p className="mt-1 text-base font-semibold text-primary">990 EUR</p>
                  </article>

                  <article className="premium-panel flex h-full flex-col p-6">
                    <div className="relative z-10">
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <span className="rounded-xl border border-primary/30 bg-primary/10 p-2">
                            <Bot className="h-4 w-4 text-primary" aria-hidden="true" />
                          </span>
                          <p className="text-xl font-semibold text-foreground">Digitaler Mitarbeiter</p>
                        </div>
                        <span className="inline-flex rounded-full border border-primary/40 bg-primary/15 px-2 py-0.5 text-[10px] uppercase tracking-[0.12em] text-primary">Beliebt</span>
                      </div>

                      <ul className="mt-4 space-y-2 text-sm text-foreground/90">
                        <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />erkennt automatisch Support-Anfragen und Leads</li>
                        <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />beantwortet E-Mails automatisch</li>
                        <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />arbeitet in bis zu 7 Sprachen</li>
                        <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />merkt sich frühere Gespräche (Memory)</li>
                        <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />verbessert sich durch Lernsystem</li>
                        <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />erkennt und korrigiert Fehler</li>
                      </ul>
                      <p className="mt-4 text-sm font-semibold text-primary">Preis je nach Umfang</p>
                    </div>
                  </article>

                  <article className="surface-elevated hover-lift flex h-full flex-col rounded-2xl p-6">
                    <div className="flex items-center gap-3">
                      <span className="rounded-xl border border-primary/30 bg-primary/10 p-2">
                        <Sparkles className="h-4 w-4 text-primary" aria-hidden="true" />
                      </span>
                      <p className="text-xl font-semibold text-foreground">Custom Automation</p>
                    </div>
                    <p className="mt-4 text-sm leading-6 text-muted-foreground">
                      Individuelle Automatisierung für Ihr Unternehmen.
                    </p>
                    <p className="mt-4 text-sm font-medium text-foreground/90">individuelles Projekt</p>
                    <p className="mt-2 text-sm text-muted-foreground">Wir bauen genau den Ablauf, den Ihr Team braucht.</p>
                  </article>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="py-24">
          <div className="container px-4">
            <div className="mx-auto max-w-6xl grid gap-5 lg:grid-cols-[1fr_1fr]">
              <article className="premium-panel p-8 md:p-10">
                <div className="relative z-10">
                  <span className="section-kicker mb-5">Zusammenarbeit mit Tawano</span>
                  <h2 className="section-title">Warum Firmen mit uns arbeiten</h2>
                  <p className="mt-4 section-copy">
                    Echte Ansprechpartner, die Ihre Abläufe verstehen und Systeme bauen, die wirklich funktionieren.
                  </p>
                </div>
              </article>

              <div className="grid gap-5 sm:grid-cols-2">
                {[
                  "Keine Standardlösung – Ihr Ablauf im Mittelpunkt.",
                  "Klare Umsetzung von Anfang bis Ende.",
                  "Systeme, die Ihr Team wirklich nutzt.",
                  "Betreuung von der Planung bis zum Betrieb.",
                ].map((point) => (
                  <article key={point} className="surface-elevated hover-lift rounded-2xl p-6">
                    <p className="text-sm leading-6 text-foreground/90">{point}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <FAQSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
