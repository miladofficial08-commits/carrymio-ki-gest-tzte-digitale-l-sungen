import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import {
  Bot, Sparkles, Workflow, CircleDollarSign, Users, Clock3,
  CheckCircle2, MessagesSquare, XCircle, ArrowRight, Menu, X,
} from "lucide-react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { FAQSection } from "@/components/FAQSection";
import { ContactSection } from "@/components/ContactSection";
import { WorkflowAnimation } from "@/components/WorkflowAnimation";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { StaggerContainer, StaggerItem } from "@/components/motion/StaggerContainer";
import { GradientBlob } from "@/components/motion/GradientBlob";
import { TypingHero } from "@/components/motion/TypingHero";
import { BackgroundActivity } from "@/components/motion/BackgroundActivity";
import { useCountUp } from "@/hooks/useCountUp";
import { useScrollReveal } from "@/hooks/useScrollReveal";
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

const AnimatedStat = ({ value, suffix = "", prefix = "" }: { value: number; suffix?: string; prefix?: string }) => {
  const { ref, isInView } = useScrollReveal();
  const count = useCountUp(value, isInView, 2200);
  return <span ref={ref}>{prefix}{count}{suffix}</span>;
};

const Index = () => {
  const [introComplete, setIntroComplete] = useState(false);
  const [selectedScenario, setSelectedScenario] = useState<keyof typeof scenarios>("support");
  const [employees, setEmployees] = useState(6);
  const [salary, setSalary] = useState(3200);
  const [displayYearlyCost, setDisplayYearlyCost] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleIntroComplete = useCallback(() => setIntroComplete(true), []); 

  const activeScenario = useMemo(() => scenarios[selectedScenario], [selectedScenario]);
  const heroRef = useRef<HTMLDivElement>(null);

  const yearlyCost = useMemo(() => employees * salary * 12, [employees, salary]);

  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 1500], [0, 50]);
  const heroOpacity = useTransform(scrollY, [400, 1500], [1, 0]);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setDisplayYearlyCost((prev) => animateValue(prev, yearlyCost));
    }, 16);
    return () => window.clearInterval(interval);
  }, [yearlyCost]);

  useEffect(() => {
    const handleScroll = () => {
      const doc = document.documentElement;
      const total = doc.scrollHeight - doc.clientHeight;
      setScrollProgress(total > 0 ? Math.min(100, (doc.scrollTop / total) * 100) : 0);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const element = document.querySelector(id);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Typing Intro */}
      <TypingHero onComplete={handleIntroComplete} />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/60 bg-white/80 backdrop-blur-2xl backdrop-saturate-150">
        <div className="absolute left-0 top-0 h-[2px] bg-gradient-primary transition-all duration-200" style={{ width: `${scrollProgress}%` }} aria-hidden="true" />
        <div className="container px-4">
          <div className="flex h-16 items-center justify-between gap-6 md:h-20">
            <button onClick={() => scrollTo("#home")} className="flex items-center gap-2 group" aria-label="Tawano Home">
              <img src="/tawano-logo.png" alt="Tawano Logo" className="h-12 md:h-14 w-auto transition-transform duration-300 group-hover:scale-105" width="168" height="56" fetchPriority="high" />
            </button>
            <div className="hidden items-center gap-7 md:flex">
              {navItems.map((item) => (
                <button key={item.href} onClick={() => scrollTo(item.href)} className="relative text-sm font-medium text-muted-foreground transition-colors hover:text-foreground group">
                  {item.label}
                  <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-primary transition-all duration-300 group-hover:w-full" />
                </button>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <Button size="sm" variant="hero" onClick={() => scrollTo("#kontakt")} className="hidden sm:inline-flex group">
                Kontakt aufnehmen
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
              </Button>
              <button
                onClick={() => setMobileMenuOpen((prev) => !prev)}
                className="flex md:hidden h-10 w-10 items-center justify-center rounded-lg hover:bg-muted transition-colors"
                aria-label={mobileMenuOpen ? "Menü schließen" : "Menü öffnen"}
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="md:hidden overflow-hidden border-t border-border/40 bg-white/95 backdrop-blur-xl"
            >
              <div className="flex flex-col gap-1 px-4 py-3">
                {navItems.map((item) => (
                  <button
                    key={item.href}
                    onClick={() => { scrollTo(item.href); setMobileMenuOpen(false); }}
                    className="text-left px-4 py-3 text-sm font-medium text-foreground rounded-lg hover:bg-muted transition-colors"
                  >
                    {item.label}
                  </button>
                ))}
                <Button
                  size="sm"
                  variant="hero"
                  onClick={() => { scrollTo("#kontakt"); setMobileMenuOpen(false); }}
                  className="mt-2 w-full"
                >
                  Kontakt aufnehmen
                  <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main>
        {/* HERO */}
        <header id="home" className="relative overflow-hidden pt-24 md:pt-36" ref={heroRef}>
          <div className="absolute inset-0 bg-gradient-hero-premium" aria-hidden="true" />
          <div className="absolute inset-0 aurora-bg" aria-hidden="true" />
          <div className="absolute inset-0 soft-grid opacity-30" aria-hidden="true" />
          <GradientBlob className="top-[-100px] left-[-200px]" color1="hsl(217, 91%, 50%)" color2="hsl(200, 91%, 45%)" size={600} duration={25} />
          <GradientBlob className="top-[200px] right-[-150px]" color1="hsl(277, 82%, 68%)" color2="hsl(200, 91%, 50%)" size={500} duration={30} />
          <div className="hidden md:block">
            <BackgroundActivity />
          </div>

          <motion.div style={{ y: heroY, opacity: heroOpacity }} className="container relative z-10 px-4 pb-12 pt-4 md:pb-32 md:pt-10">
            <div className="mx-auto grid max-w-6xl items-center gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
              <div>
                <motion.span initial={{ opacity: 0, y: 20, filter: "blur(8px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ duration: 0.6 }} className="section-kicker mb-6">
                  <Bot className="h-4 w-4" aria-hidden="true" />
                  Digitale Mitarbeiter für Unternehmen
                </motion.span>
                <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }} className="text-[1.875rem] font-semibold leading-[1.05] sm:text-4xl md:text-6xl xl:text-7xl">
                  Automatisieren Sie Support,
                  <motion.span initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="display-serif block text-gradient">
                    E-Mails und Anfragen.
                  </motion.span>
                </motion.h1>
                <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }} className="mt-5 max-w-2xl text-sm leading-7 text-muted-foreground md:mt-7 md:text-lg">
                  Tawano baut digitale Mitarbeiter, die tägliche Aufgaben automatisch erledigen — damit Ihr Team mehr Zeit für wichtige Arbeit hat.
                </motion.p>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.65 }} className="mt-6 flex flex-col gap-3 sm:flex-row sm:gap-4 md:mt-10">
                  <Button variant="hero" size="xl" onClick={() => scrollTo("#kontakt")} className="group w-full sm:w-auto">
                    Jetzt automatisieren
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                  <Button variant="heroOutline" size="xl" onClick={() => scrollTo("#kostenrechner")} className="w-full sm:w-auto">Einsparung berechnen</Button>
                </motion.div>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.85 }} className="mt-6 flex flex-wrap gap-2 text-sm text-muted-foreground md:mt-9 md:gap-3">
                  {["Weniger manuelle Arbeit", "Schnellere Antworten", "Mehr Zeit fürs Team"].map((text, i) => (
                    <motion.span key={text} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4, delay: 0.9 + i * 0.1 }} className="data-pill text-xs md:text-sm">{text}</motion.span>
                  ))}
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 1.1 }} className="mt-5 hidden grid-cols-1 gap-3 sm:grid sm:grid-cols-3 md:mt-8">
                  {[
                    { label: "Support-Antworten", value: "Automatisch beantwortet" },
                    { label: "E-Mails", value: "Sortiert & beantwortet" },
                    { label: "Leads", value: "Sofort erkannt" },
                  ].map((stat) => (
                    <motion.div key={stat.label} whileHover={{ y: -4, boxShadow: "0 12px 40px hsl(217 91% 50% / 0.08)" }} transition={{ type: "spring", stiffness: 300, damping: 20 }} className="stat-chip cursor-default">
                      <p className="text-xs uppercase tracking-[0.14em] text-primary">{stat.label}</p>
                      <p className="mt-1 text-xl font-semibold">{stat.value}</p>
                    </motion.div>
                  ))}
                </motion.div>
              </div>

              {/* Interactive panel — desktop only */}
              <motion.aside initial={{ opacity: 0, x: 60, rotateY: -5 }} animate={{ opacity: 1, x: 0, rotateY: 0 }} transition={{ duration: 0.9, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }} className="hidden lg:block premium-panel p-7 md:p-9">
                <div className="relative z-10">
                  <p className="text-sm text-muted-foreground">Schneller Blick auf den Nutzen</p>
                  <h2 className="mt-2 text-2xl font-semibold">Was Tawano für Ihr Team übernimmt</h2>
                  <div className="mt-6 grid gap-2 sm:grid-cols-3">
                    {(["support", "sales", "operations"] as const).map((key) => (
                      <motion.button key={key} onClick={() => setSelectedScenario(key)} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className={`interactive-ring rounded-xl border px-3 py-2 text-xs transition-all duration-300 ${selectedScenario === key ? "border-primary/40 bg-primary/8 text-foreground shadow-lg shadow-primary/5" : "border-border bg-muted/50 text-muted-foreground"}`}>
                        {key === "support" ? "Support & E-Mails" : key === "sales" ? "Leads & Anfragen" : "Interne Abläufe"}
                      </motion.button>
                    ))}
                  </div>
                  <AnimatePresence mode="wait">
                    <motion.div key={selectedScenario} initial={{ opacity: 0, y: 10, filter: "blur(4px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} exit={{ opacity: 0, y: -10, filter: "blur(4px)" }} transition={{ duration: 0.35 }} className="mt-6 rounded-2xl border border-border bg-muted/30 p-5">
                      <p className="text-sm text-primary/80">{activeScenario.title}</p>
                      <p className="mt-2 text-lg font-semibold">{activeScenario.hours}</p>
                      <p className="text-sm text-emerald-600">{activeScenario.impact}</p>
                      <p className="mt-3 text-sm leading-6 text-muted-foreground">{activeScenario.summary}</p>
                    </motion.div>
                  </AnimatePresence>
                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    {[
                      { title: "Merkt sich frühere Fälle", desc: "Berücksichtigt frühere Anfragen und arbeitet dadurch präziser." },
                      { title: "Wird mit der Zeit besser", desc: "Wird mit jeder Interaktion besser und stabiler." },
                    ].map((item) => (
                      <motion.div key={item.title} whileHover={{ borderColor: "hsl(217 91% 50% / 0.3)", y: -2 }} className="rounded-xl border border-border bg-muted/30 p-4 transition-all duration-300">
                        <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">{item.title}</p>
                        <p className="mt-2 text-sm text-foreground/85">{item.desc}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.aside>
            </div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
            <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} className="flex flex-col items-center gap-2">
              <span className="text-xs text-muted-foreground/60 uppercase tracking-widest">Scrollen</span>
              <div className="w-5 h-8 rounded-full border border-border flex justify-center pt-1.5">
                <motion.div animate={{ y: [0, 10, 0], opacity: [1, 0.3, 1] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} className="w-1 h-1.5 rounded-full bg-primary/60" />
              </div>
            </motion.div>
          </motion.div>
        </header>

        {/* SOCIAL PROOF BAR */}
        <ScrollReveal>
          <div className="py-8 border-y border-border/60 md:py-12">
            <div className="container px-4">
              <div className="mx-auto grid max-w-4xl grid-cols-2 gap-y-6 gap-x-4 md:grid-cols-4 md:gap-8 text-center">
                {[
                  { value: 24, suffix: "/7", label: "Verfügbarkeit" },
                  { value: 85, suffix: "%", label: "Automatisierungsrate" },
                  { value: 42, suffix: "h", label: "Zeitersparnis / Woche" },
                  { value: 7, suffix: "+", label: "Sprachen" },
                ].map((stat) => (
                  <motion.div key={stat.label} whileHover={{ scale: 1.05 }} className="cursor-default">
                    <p className="text-2xl font-bold text-foreground md:text-4xl">
                      <AnimatedStat value={stat.value} suffix={stat.suffix} />
                    </p>
                    <p className="mt-1 text-[10px] md:text-xs uppercase tracking-[0.14em] text-muted-foreground">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* WORKFLOW ANIMATION */}
        <WorkflowAnimation />

        {/* COST CALCULATOR */}
        <section id="kostenrechner" className="py-16 md:py-28 overflow-hidden">
          <div className="container px-4">
            <ScrollReveal className="w-full">
              <div className="mx-auto max-w-6xl rounded-2xl md:rounded-[28px] border border-border bg-white/90 backdrop-blur-xl p-4 md:p-12 relative overflow-hidden" style={{ boxShadow: '0 22px 60px hsl(222 47% 11% / 0.07), inset 0 1px 0 hsl(0 0% 100% / 0.8)' }}>
                <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-primary/5 blur-[80px] pointer-events-none" />
                <div className="relative z-10 w-full min-w-0">
                  <div className="mx-auto max-w-3xl flex flex-col items-center text-center">
                    <span className="section-kicker mb-6">Kostenrechner</span>
                    <h2 className="section-title text-center">Was kosten Support und Routineaufgaben wirklich?</h2>
                    <p className="mt-4 section-copy text-center">Finden Sie heraus, wie viel manuelle Arbeit Ihr Unternehmen jedes Jahr kostet.</p>
                  </div>
                  <div className="mt-6 grid gap-4 lg:grid-cols-2 lg:items-stretch md:mt-12 w-full">
                    <article className="rounded-xl md:rounded-2xl border border-border bg-muted/30 p-4 md:p-6 min-w-0 overflow-hidden">
                      <p className="text-sm font-medium text-foreground">Eingaben</p>
                      <div className="mt-6 space-y-7">
                        <div>
                          <div className="mb-3 flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Anzahl Mitarbeiter</span>
                            <motion.span key={employees} initial={{ scale: 1.3, color: "hsl(217 91% 50%)" }} animate={{ scale: 1, color: "hsl(222 47% 11%)" }} className="font-semibold text-foreground">{employees}</motion.span>
                          </div>
                          <Slider min={1} max={50} step={1} value={[employees]} onValueChange={(v) => setEmployees(v[0])} />
                        </div>
                        <div>
                          <div className="mb-3 flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Monatsgehalt</span>
                            <motion.span key={salary} initial={{ scale: 1.3, color: "hsl(217 91% 50%)" }} animate={{ scale: 1, color: "hsl(222 47% 11%)" }} className="font-semibold text-foreground">{euro.format(salary)}</motion.span>
                          </div>
                          <Slider min={1800} max={9000} step={100} value={[salary]} onValueChange={(v) => setSalary(v[0])} />
                        </div>
                      </div>
                      <p className="mt-6 text-xs leading-relaxed text-muted-foreground">Berechnen Sie in wenigen Sekunden, wie viel Ihr Unternehmen jährlich für Support und Routineaufgaben ausgibt.</p>
                    </article>
                    <ScrollReveal direction="right" delay={0.2} className="flex flex-col h-full min-w-0">
                      <article className="rounded-xl md:rounded-2xl border border-primary/30 bg-primary/10 p-4 md:p-6 h-full flex flex-col min-w-0 overflow-hidden">
                        <p className="text-sm font-medium text-foreground">Ergebnis</p>
                        <div className="mt-4 rounded-xl border border-rose-200 bg-rose-50/50 p-3 md:p-5 overflow-hidden">
                          <div className="flex items-start gap-2 text-rose-600">
                            <CircleDollarSign className="h-4 w-4 shrink-0 mt-0.5" aria-hidden="true" />
                            <p className="text-sm font-medium leading-snug">Geschätzte jährliche Kosten für manuellen Support</p>
                          </div>
                          <p className="mt-1 text-xs text-muted-foreground">{employees} Mitarbeiter × {euro.format(salary)}/Mo × 12 Monate</p>
                          <p className="mt-3 text-xl font-semibold text-rose-600 md:text-4xl tabular-nums break-words">{euro.format(Math.round(displayYearlyCost))} <span className="text-xs font-normal text-rose-400 md:text-base">pro Jahr</span></p>
                        </div>
                        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">Viele Unternehmen geben jedes Jahr hohe Summen für Support- und Routineaufgaben aus, obwohl ein Großteil davon automatisiert werden kann.</p>
                        <div className="mt-auto pt-5">
                          <Button className="w-full" size="lg" onClick={() => scrollTo("#kontakt")}>
                            Jetzt Einsparpotenzial berechnen lassen
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </div>
                      </article>
                    </ScrollReveal>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* COMPARISON */}
        <section className="py-16 md:py-28 relative">
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[900px] h-[1px] bg-gradient-to-r from-transparent via-primary/15 to-transparent" />
          </div>
          <div className="container px-4">
            <ScrollReveal>
              <div className="mx-auto max-w-5xl text-center">
                <span className="section-kicker mb-6">Der Unterschied</span>
                <h2 className="section-title">Manuelle Arbeit vs. digitale Mitarbeiter</h2>
                <p className="section-copy mx-auto mt-4 max-w-2xl">Wie digitale Mitarbeiter Ihr Unternehmen entlasten.</p>
              </div>
            </ScrollReveal>
            <div className="mx-auto mt-10 grid max-w-6xl gap-5 lg:grid-cols-2 lg:items-start md:mt-14">
              <ScrollReveal direction="left">
                <article className="rounded-3xl border border-rose-300/40 bg-rose-50 p-6 md:p-7">
                  <p className="text-sm font-medium uppercase tracking-[0.12em] text-rose-700">Ohne Automation</p>
                  <div className="mt-4 space-y-3">
                    {["Support-Anfragen bleiben lange offen", "Kunden warten auf Antworten", "Leads gehen verloren", "Aufgaben stapeln sich im Team", "Hohe Personalkosten"].map((item, i) => (
                      <motion.div key={item} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.4 }} className="flex items-start gap-3 rounded-xl border border-rose-200 bg-white px-4 py-3">
                        <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-rose-500" aria-hidden="true" />
                        <p className="text-sm leading-6 text-foreground/90">{item}</p>
                      </motion.div>
                    ))}
                  </div>
                </article>
              </ScrollReveal>
              <ScrollReveal direction="right" delay={0.15}>
                <article className="premium-panel p-6 md:p-7">
                  <div className="relative z-10">
                    <div className="flex items-center gap-3">
                      <p className="text-sm font-medium uppercase tracking-[0.12em] text-emerald-600">mit</p>
                      <img src="/tawano-logo.png" alt="Tawano" className="h-10 w-auto" width="150" height="40" loading="lazy" />
                    </div>
                    <div className="mt-4 space-y-3">
                      {["Support läuft 24/7 ohne Ausfall", "Kunden erhalten sofort Antworten", "Leads werden automatisch erkannt", "Aufgaben laufen automatisch im Hintergrund", "Geringere Kosten für Ihr Unternehmen"].map((item, i) => (
                        <motion.div key={item} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.4 }} whileHover={{ x: 4, borderColor: "hsl(152 69% 40% / 0.4)" }} className="flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 transition-colors">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" aria-hidden="true" />
                          <p className="text-sm leading-6 text-foreground">{item}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </article>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section id="automation" className="py-16 md:py-28 relative">
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-violet-500/3 blur-[120px]" />
            <div className="absolute right-0 top-1/3 w-[300px] h-[300px] rounded-full bg-cyan-500/3 blur-[100px]" />
          </div>
          <div className="container px-4 relative z-10">
            <ScrollReveal>
              <div className="mx-auto max-w-3xl text-center">
                <span className="section-kicker mb-6">Leistungen von Tawano</span>
                <h2 className="section-title">Unsere Lösungen</h2>
                <p className="section-copy mt-4">Für jedes Ziel die passende Lösung.</p>
              </div>
            </ScrollReveal>
            <StaggerContainer staggerDelay={0.12} className="mt-14 mx-auto max-w-6xl grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-4">
              <StaggerItem>
                <motion.article whileHover={{ y: -8, boxShadow: "0 24px 60px hsl(222 47% 11% / 0.08)" }} transition={{ type: "spring", stiffness: 300, damping: 20 }} className="surface-elevated flex h-full flex-col rounded-2xl p-6 cursor-default">
                  <div className="flex items-center gap-3">
                    <span className="rounded-xl border border-primary/20 bg-primary/8 p-2"><MessagesSquare className="h-4 w-4 text-primary" aria-hidden="true" /></span>
                    <p className="text-xl font-semibold text-foreground">Chatbots</p>
                  </div>
                  <ul className="mt-4 space-y-2 text-sm text-foreground/90">
                    {["beantwortet Supportanfragen automatisch", "erkennt Kundenabsichten in Sekunden", "sammelt und qualifiziert Leads", "integriert sich in bestehende Systeme", "reduziert Supportaufwand erheblich"].map((feat) => (
                      <li key={feat} className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />{feat}</li>
                    ))}
                  </ul>
                  <p className="mt-auto pt-4 text-xs uppercase tracking-[0.12em] text-muted-foreground">Startpreis</p>
                  <p className="mt-1 text-base font-semibold text-primary">499 EUR</p>
                </motion.article>
              </StaggerItem>
              <StaggerItem>
                <motion.article whileHover={{ y: -8, boxShadow: "0 24px 60px hsl(222 47% 11% / 0.08)" }} transition={{ type: "spring", stiffness: 300, damping: 20 }} className="surface-elevated flex h-full flex-col rounded-2xl p-6 cursor-default">
                  <div className="flex items-center gap-3">
                    <span className="rounded-xl border border-primary/20 bg-primary/8 p-2"><Workflow className="h-4 w-4 text-primary" aria-hidden="true" /></span>
                    <p className="text-xl font-semibold text-foreground">Webdesign</p>
                  </div>
                  <ul className="mt-4 space-y-2 text-sm text-foreground/90">
                    {["moderne Unternehmenswebseiten & Landing Pages", "hochwertiges Design und klare Struktur", "moderne Animationen und visuelle Elemente", "optimiert für Conversion und Leadgenerierung", "schnell, performant und mobiloptimiert"].map((feat) => (
                      <li key={feat} className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />{feat}</li>
                    ))}
                  </ul>
                  <p className="mt-auto pt-4 text-xs uppercase tracking-[0.12em] text-muted-foreground">Startpreis</p>
                  <p className="mt-1 text-base font-semibold text-primary">999 EUR</p>
                </motion.article>
              </StaggerItem>
              <StaggerItem>
                <motion.article whileHover={{ y: -10, boxShadow: "0 28px 70px hsl(217 91% 50% / 0.12)" }} transition={{ type: "spring", stiffness: 300, damping: 20 }} className="premium-panel flex h-full flex-col p-6 cursor-default ring-1 ring-primary/20 shadow-lg shadow-primary/5">
                  <div className="relative z-10">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span className="rounded-xl border border-primary/30 bg-primary/12 p-2.5"><Bot className="h-5 w-5 text-primary" aria-hidden="true" /></span>
                        <p className="text-xl font-semibold text-foreground">Digitaler Mitarbeiter</p>
                      </div>
                    </div>
                    <motion.div animate={{ opacity: [0.7, 1, 0.7] }} transition={{ duration: 3, repeat: Infinity }} className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-primary/25 bg-primary/8 px-3 py-1">
                      <Sparkles className="h-3 w-3 text-primary" aria-hidden="true" />
                      <span className="text-[11px] font-medium uppercase tracking-[0.1em] text-primary">Beliebteste Lösung</span>
                    </motion.div>
                    <ul className="mt-4 space-y-2 text-sm text-foreground/90">
                      {["erkennt automatisch Support-Anfragen und Leads", "beantwortet E-Mails automatisch", "arbeitet in bis zu 7 Sprachen", "merkt sich frühere Gespräche (Memory)", "verbessert sich durch Lernsystem", "erkennt und korrigiert Fehler"].map((feat) => (
                        <li key={feat} className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />{feat}</li>
                      ))}
                    </ul>
                    <p className="mt-4 text-sm font-semibold text-primary">Preis je nach Umfang</p>
                  </div>
                </motion.article>
              </StaggerItem>
              <StaggerItem>
                <motion.article whileHover={{ y: -8, boxShadow: "0 24px 60px hsl(222 47% 11% / 0.08)" }} transition={{ type: "spring", stiffness: 300, damping: 20 }} className="surface-elevated flex h-full flex-col rounded-2xl p-6 cursor-default">
                  <div className="flex items-center gap-3">
                    <span className="rounded-xl border border-primary/20 bg-primary/8 p-2"><Sparkles className="h-4 w-4 text-primary" aria-hidden="true" /></span>
                    <p className="text-xl font-semibold text-foreground">Custom Automation</p>
                  </div>
                  <ul className="mt-4 space-y-2 text-sm text-foreground/90">
                    {["Automatisierung interner Prozesse", "automatische Verarbeitung von Anfragen", "Integration mit bestehenden Tools", "individuelle Workflows für Unternehmen", "skalierbare Automationslösungen"].map((feat) => (
                      <li key={feat} className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />{feat}</li>
                    ))}
                  </ul>
                  <p className="mt-auto pt-4 text-sm font-semibold text-primary">Preis je nach Umfang</p>
                </motion.article>
              </StaggerItem>
            </StaggerContainer>
          </div>
        </section>

        {/* WHY TAWANO */}
        <section id="about" className="py-16 md:py-28 relative">
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[900px] h-[1px] bg-gradient-to-r from-transparent via-border to-transparent" />
          </div>
          <div className="container px-4">
            <div className="mx-auto max-w-6xl grid gap-6 lg:grid-cols-[1fr_1fr]">
              <ScrollReveal direction="left">
                <article className="premium-panel p-8 md:p-10 h-full">
                  <div className="relative z-10">
                    <span className="section-kicker mb-5">Zusammenarbeit mit Tawano</span>
                    <h2 className="section-title">Warum Firmen mit uns arbeiten</h2>
                    <p className="mt-4 section-copy">Echte Ansprechpartner, die Ihre Abläufe verstehen und Systeme bauen, die wirklich funktionieren.</p>
                  </div>
                </article>
              </ScrollReveal>
              <StaggerContainer staggerDelay={0.1} className="grid gap-5 sm:grid-cols-2">
                {["Keine Standardlösung – Ihr Ablauf im Mittelpunkt.", "Klare Umsetzung von Anfang bis Ende.", "Systeme, die Ihr Team wirklich nutzt.", "Betreuung von der Planung bis zum Betrieb."].map((point) => (
                  <StaggerItem key={point}>
                    <motion.article whileHover={{ y: -4, borderColor: "hsl(217 91% 50% / 0.2)" }} className="surface-elevated rounded-2xl p-6 h-full transition-all">
                      <p className="text-sm leading-6 text-foreground/90">{point}</p>
                    </motion.article>
                  </StaggerItem>
                ))}
              </StaggerContainer>
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
