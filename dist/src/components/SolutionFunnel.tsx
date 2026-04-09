import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, CheckCircle2, Loader2, Sparkles, Shield, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

// ─── Types ───────────────────────────────────────────────────

export interface FunnelOption {
  label: string;
  value: string;
  emoji?: string;
  description?: string;
}

export interface FunnelQuestion {
  id: string;
  question: string;
  subtitle?: string;
  options: FunnelOption[];
}

export interface FunnelConfig {
  solution: string;
  solutionLabel: string;
  title: string;
  subtitle: string;
  questions: FunnelQuestion[];
}

interface Props {
  config: FunnelConfig;
  onAnswersChange?: (answers: Record<string, string>) => void;
  onSubmitted?: () => void;
}

// ─── Slide variants ──────────────────────────────────────────

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 60 : -60,
    opacity: 0,
    filter: "blur(3px)",
  }),
  center: {
    x: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 300, damping: 30 },
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -60 : 60,
    opacity: 0,
    filter: "blur(3px)",
    transition: { duration: 0.2 },
  }),
};

const optionVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.35, ease: [0.22, 1, 0.36, 1] },
  }),
};

// ─── Component ───────────────────────────────────────────────

export const SolutionFunnel = ({ config, onAnswersChange, onSubmitted }: Props) => {
  const { toast } = useToast();
  const { questions } = config;
  const totalSteps = questions.length + 1; // questions + contact step

  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [contact, setContact] = useState({ name: "", email: "" });
  const [contactErrors, setContactErrors] = useState({ name: "", email: "" });

  const isContactStep = step === questions.length;
  const currentQuestion = !isContactStep ? questions[step] : null;
  const progress = submitted ? 100 : Math.round((step / totalSteps) * 100);

  // Report answers to parent for exit-intent tracking
  useEffect(() => {
    onAnswersChange?.(answers);
  }, [answers, onAnswersChange]);

  // Advance to next step after selection
  const selectOption = useCallback(
    (questionId: string, value: string) => {
      setSelectedOption(value);
      setAnswers((prev) => ({ ...prev, [questionId]: value }));
      setTimeout(() => {
        setDirection(1);
        setStep((s) => s + 1);
        setSelectedOption(null);
      }, 400);
    },
    []
  );

  const goBack = () => {
    if (step === 0) return;
    setDirection(-1);
    setStep((s) => s - 1);
    setSelectedOption(null);
  };

  const validateContact = () => {
    const errors = { name: "", email: "" };
    if (!contact.name.trim()) errors.name = "Name ist erforderlich.";
    if (!contact.email.trim()) {
      errors.email = "E-Mail ist erforderlich.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email)) {
      errors.email = "Bitte eine gültige E-Mail eingeben.";
    }
    setContactErrors(errors);
    return !errors.name && !errors.email;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateContact()) return;
    setSubmitting(true);

    // Format answers for email body
    const answersText = questions
      .map((q) => `• ${q.question}\n  → ${answers[q.id] || "–"}`)
      .join("\n\n");

    // Send emails via Netlify function (internal notification + customer confirmation)
    try {
      const response = await fetch("/.netlify/functions/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "funnel",
          name: contact.name.trim(),
          email: contact.email.trim(),
          solution: config.solution,
          solutionLabel: config.solutionLabel,
          answersText: answersText,
          answers: answers,
          questions: questions.map((q) => ({ id: q.id, question: q.question })),
        }),
      });

      if (!response.ok) {
        console.error("[Funnel] Email sending failed:", await response.text());
      }
    } catch (err) {
      console.error("[Funnel] Email request failed:", err);
    }

    setSubmitting(false);
    setSubmitted(true);
    onSubmitted?.();
  };

  // ── Success state ────────────────────────────────────────────
  if (submitted) {
    return (
      <div className="w-full max-w-2xl mx-auto px-4">
        {/* Completed progress bar */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-[11px] font-medium text-muted-foreground tracking-widest uppercase">
              Abgeschlossen
            </span>
            <span className="text-[11px] font-semibold text-primary tabular-nums tracking-wide">
              100%
            </span>
          </div>
          <div className="relative h-[5px] w-full rounded-full bg-muted/50 overflow-hidden">
            <motion.div
              className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-primary to-[hsl(200,91%,45%)]"
              initial={{ width: "80%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center text-center py-12 px-4"
        >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.1 }}
          className="mb-8 relative"
        >
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 border border-primary/20">
            <CheckCircle2 className="h-10 w-10 text-primary" />
          </div>
          <motion.div
            initial={{ scale: 0.8, opacity: 0.6 }}
            animate={{ scale: 1.8, opacity: 0 }}
            transition={{ delay: 0.3, duration: 0.9, ease: "easeOut" }}
            className="absolute inset-0 rounded-full border-2 border-primary/20"
          />
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="text-3xl font-semibold mb-3 tracking-[-0.02em]"
        >
          Anfrage eingegangen
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="text-muted-foreground max-w-sm leading-7"
        >
          Vielen Dank, {contact.name.split(" ")[0]}. Wir prüfen Ihre Angaben und melden uns
          in Kürze mit einem passenden Vorschlag.
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-3 flex items-center gap-4 text-xs text-muted-foreground/50"
        >
          <span>info@tawano.de</span>
          <span className="h-3 w-px bg-border" />
          <span>+49 163 1283971</span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65 }}
          className="mt-10"
        >
          <Button variant="outline" className="rounded-full px-6" onClick={() => (window.location.href = "/")}>
            Zurück zur Startseite
          </Button>
        </motion.div>
      </motion.div>
      </div>
    );
  }

  // ── Main funnel ──────────────────────────────────────────────
  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      {/* Premium progress bar with gradient glow */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-[11px] font-medium text-muted-foreground tracking-widest uppercase">
            Schritt {Math.min(step + 1, totalSteps)} von {totalSteps}
          </span>
          <motion.span
            key={progress}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[11px] font-semibold text-primary tabular-nums tracking-wide"
          >
            {progress}%
          </motion.span>
        </div>
        <div className="relative h-[5px] w-full rounded-full bg-muted/50 overflow-hidden">
          <motion.div
            className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-primary to-[hsl(200,91%,45%)]"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          />
          <motion.div
            className="absolute inset-y-0 left-0 rounded-full opacity-40"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{
              background: "linear-gradient(90deg, transparent 60%, rgba(255,255,255,0.5))",
              filter: "blur(4px)",
            }}
          />
        </div>
      </div>

      {/* Step content */}
      <div className="relative overflow-hidden min-h-[380px]">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={step}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
          >
            {/* Question step */}
            {currentQuestion && (
              <div>
                {currentQuestion.subtitle && (
                  <motion.p
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.08 }}
                    className="section-kicker mb-5"
                  >
                    {currentQuestion.subtitle}
                  </motion.p>
                )}
                <h2 className="text-2xl md:text-[1.75rem] font-semibold leading-snug mb-8 tracking-[-0.02em]">
                  {currentQuestion.question}
                </h2>
                <div className="grid gap-3 sm:grid-cols-2">
                  {currentQuestion.options.map((opt, i) => {
                    const isSelected = selectedOption === opt.value;
                    return (
                      <motion.button
                        key={opt.value}
                        custom={i}
                        variants={optionVariants}
                        initial="hidden"
                        animate="visible"
                        onClick={() => selectOption(currentQuestion.id, opt.value)}
                        disabled={selectedOption !== null}
                        whileHover={{ y: -2, transition: { duration: 0.2 } }}
                        whileTap={{ scale: 0.98 }}
                        className={[
                          "group relative flex items-start gap-3.5 rounded-2xl border p-5 text-left transition-all duration-300 cursor-pointer",
                          isSelected
                            ? "border-primary/50 bg-primary/[0.06] shadow-lg shadow-primary/8 ring-1 ring-primary/15"
                            : "border-border/70 bg-white/60 backdrop-blur-sm hover:border-primary/25 hover:bg-white/80 hover:shadow-md hover:shadow-black/[0.03]",
                        ].join(" ")}
                      >
                        {opt.emoji && (
                          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-muted/50 text-lg transition-colors duration-300 group-hover:bg-primary/[0.06]">
                            {opt.emoji}
                          </span>
                        )}
                        <div className="flex-1 min-w-0 pt-0.5">
                          <span className="text-[13px] font-semibold text-foreground leading-snug block">
                            {opt.label}
                          </span>
                          {opt.description && (
                            <span className="text-[11px] text-muted-foreground leading-relaxed mt-1 block">
                              {opt.description}
                            </span>
                          )}
                        </div>
                        <AnimatePresence>
                          {isSelected && (
                            <motion.span
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              exit={{ scale: 0, opacity: 0 }}
                              transition={{ type: "spring", stiffness: 500, damping: 15 }}
                              className="absolute top-4 right-4"
                            >
                              <CheckCircle2 className="h-5 w-5 text-primary" />
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Contact step */}
            {isContactStep && (
              <div>
                <div className="flex items-center gap-2.5 mb-5">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10">
                    <Sparkles className="h-3.5 w-3.5 text-primary" />
                  </div>
                  <span className="text-[11px] font-medium text-primary tracking-widest uppercase">
                    Fast geschafft
                  </span>
                </div>
                <h2 className="text-2xl md:text-[1.75rem] font-semibold leading-snug mb-2 tracking-[-0.02em]">
                  Wohin sollen wir Ihr Angebot senden?
                </h2>
                <p className="text-muted-foreground text-sm mb-8 leading-relaxed max-w-md">
                  Kein Spam. Kein Newsletter. Nur Ihr individuelles Angebot für{" "}
                  <span className="text-foreground font-medium">{config.solutionLabel}</span>.
                </p>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Input
                      placeholder="Ihr Name"
                      value={contact.name}
                      onChange={(e) => {
                        setContact((c) => ({ ...c, name: e.target.value }));
                        if (contactErrors.name)
                          setContactErrors((er) => ({ ...er, name: "" }));
                      }}
                      className="h-12 rounded-xl bg-white/60 border-border/70 text-foreground placeholder:text-muted-foreground/50 focus:border-primary/40 focus:ring-2 focus:ring-primary/10 transition-all"
                    />
                    {contactErrors.name && (
                      <p className="mt-1.5 text-xs text-destructive">{contactErrors.name}</p>
                    )}
                  </div>
                  <div>
                    <Input
                      type="email"
                      placeholder="Ihre E-Mail-Adresse"
                      value={contact.email}
                      onChange={(e) => {
                        setContact((c) => ({ ...c, email: e.target.value }));
                        if (contactErrors.email)
                          setContactErrors((er) => ({ ...er, email: "" }));
                      }}
                      className="h-12 rounded-xl bg-white/60 border-border/70 text-foreground placeholder:text-muted-foreground/50 focus:border-primary/40 focus:ring-2 focus:ring-primary/10 transition-all"
                    />
                    {contactErrors.email && (
                      <p className="mt-1.5 text-xs text-destructive">{contactErrors.email}</p>
                    )}
                  </div>
                  <Button
                    type="submit"
                    variant="hero"
                    className="w-full h-12 mt-2 rounded-xl text-[13px] tracking-wide"
                    disabled={submitting}
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Wird gesendet…
                      </>
                    ) : (
                      <>
                        Angebot anfordern
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                  <div className="flex items-center justify-center gap-5 pt-3">
                    <span className="flex items-center gap-1.5 text-[10px] text-muted-foreground/50 tracking-wide uppercase">
                      <Shield className="h-3 w-3" />
                      DSGVO-konform
                    </span>
                    <span className="flex items-center gap-1.5 text-[10px] text-muted-foreground/50 tracking-wide uppercase">
                      <Lock className="h-3 w-3" />
                      Verschlüsselt
                    </span>
                  </div>
                  <p className="text-center text-[11px] text-muted-foreground/40 pt-0.5">
                    Unverbindlich · Kostenlos · Antwort innerhalb von 24 h
                  </p>
                </form>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Back button */}
      {step > 0 && !submitting && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-10"
        >
          <button
            onClick={goBack}
            className="group flex items-center gap-2 text-[13px] text-muted-foreground/60 hover:text-foreground transition-colors duration-200"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
            Zurück
          </button>
        </motion.div>
      )}
    </div>
  );
};
