import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, CheckCircle2, Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { saveFunnelLead } from "@/lib/supabase";
import emailjs from "@emailjs/browser";

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
}

// ─── Slide variants ──────────────────────────────────────────

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 60 : -60,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 340, damping: 30 },
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -60 : 60,
    opacity: 0,
    transition: { duration: 0.18 },
  }),
};

// ─── Component ───────────────────────────────────────────────

export const SolutionFunnel = ({ config }: Props) => {
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
  const progress = Math.round((step / totalSteps) * 100);

  // Advance to next step after selection
  const selectOption = useCallback(
    (questionId: string, value: string) => {
      setSelectedOption(value);
      setAnswers((prev) => ({ ...prev, [questionId]: value }));
      setTimeout(() => {
        setDirection(1);
        setStep((s) => s + 1);
        setSelectedOption(null);
      }, 320);
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

    // 1. Save to Supabase
    await saveFunnelLead({
      name: contact.name.trim(),
      email: contact.email.trim(),
      solution: config.solution,
      answers,
    });

    // 2. Send internal notification via EmailJS
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (serviceId && templateId && publicKey) {
      try {
        await emailjs.send(
          serviceId,
          templateId,
          {
            from_name: contact.name.trim(),
            from_email: contact.email.trim(),
            reply_to: contact.email.trim(),
            email: contact.email.trim(),
            subject: `Funnel-Anfrage: ${config.solutionLabel}`,
            service: config.solutionLabel,
            interest: config.solutionLabel,
            message: `Neue Funnel-Anfrage für: ${config.solutionLabel}\n\n${answersText}`,
            datetime: new Date().toLocaleString("de-DE", {
              dateStyle: "short",
              timeStyle: "short",
              timeZone: "Europe/Berlin",
            }),
            page_url: window.location.href,
          },
          { publicKey }
        );
      } catch (err) {
        console.error("[Funnel] EmailJS notification failed:", err);
      }

      // 3. Auto-response to user (requires VITE_EMAILJS_AUTORESPONSE_TEMPLATE_ID)
      const autoTemplateId = import.meta.env.VITE_EMAILJS_AUTORESPONSE_TEMPLATE_ID;
      if (autoTemplateId) {
        try {
          await emailjs.send(
            serviceId,
            autoTemplateId,
            {
              to_name: contact.name.trim(),
              to_email: contact.email.trim(),
              solution: config.solutionLabel,
              reply_to: "info@tawano.de",
            },
            { publicKey }
          );
        } catch (err) {
          console.error("[Funnel] Auto-response email failed:", err);
        }
      }
    }

    setSubmitting(false);
    setSubmitted(true);
  };

  // ── Success state ────────────────────────────────────────────
  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center justify-center text-center py-16 px-4"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.1 }}
          className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/15 border border-primary/30"
        >
          <CheckCircle2 className="h-10 w-10 text-primary" />
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="text-3xl font-semibold mb-3"
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
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55 }}
          className="mt-2 text-sm text-muted-foreground/60"
        >
          info@tawano.de · +49 163 1283971
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65 }}
          className="mt-10"
        >
          <Button variant="outline" onClick={() => (window.location.href = "/")}>
            Zurück zur Startseite
          </Button>
        </motion.div>
      </motion.div>
    );
  }

  // ── Main funnel ──────────────────────────────────────────────
  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      {/* Progress bar */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-muted-foreground">
            Schritt {Math.min(step + 1, totalSteps)} von {totalSteps}
          </span>
          <span className="text-xs text-muted-foreground">{progress}%</span>
        </div>
        <div className="h-1 w-full rounded-full bg-white/8 overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-primary"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Step content */}
      <div className="relative overflow-hidden min-h-[360px]">
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
                  <p className="section-kicker mb-4">{currentQuestion.subtitle}</p>
                )}
                <h2 className="text-2xl md:text-3xl font-semibold leading-snug mb-8">
                  {currentQuestion.question}
                </h2>
                <div className="grid gap-3 sm:grid-cols-2">
                  {currentQuestion.options.map((opt) => {
                    const isSelected = selectedOption === opt.value;
                    return (
                      <motion.button
                        key={opt.value}
                        onClick={() => selectOption(currentQuestion.id, opt.value)}
                        disabled={selectedOption !== null}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        animate={
                          isSelected
                            ? { scale: [1, 1.04, 1], transition: { duration: 0.28 } }
                            : {}
                        }
                        className={[
                          "group relative flex flex-col gap-1 rounded-2xl border p-4 text-left transition-all duration-200 cursor-pointer",
                          isSelected
                            ? "border-primary bg-primary/15 text-foreground shadow-lg shadow-primary/10"
                            : "border-white/10 bg-white/4 hover:border-primary/40 hover:bg-white/8",
                        ].join(" ")}
                      >
                        {opt.emoji && (
                          <span className="text-xl mb-0.5">{opt.emoji}</span>
                        )}
                        <span className="text-sm font-semibold leading-snug">
                          {opt.label}
                        </span>
                        {opt.description && (
                          <span className="text-xs text-muted-foreground leading-relaxed">
                            {opt.description}
                          </span>
                        )}
                        {isSelected && (
                          <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute top-3 right-3"
                          >
                            <CheckCircle2 className="h-4 w-4 text-primary" />
                          </motion.span>
                        )}
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Contact step */}
            {isContactStep && (
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <span className="section-kicker">Fast geschafft</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-semibold leading-snug mb-2">
                  Wohin sollen wir das Angebot senden?
                </h2>
                <p className="text-muted-foreground text-sm mb-8 leading-relaxed">
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
                      className="h-12 bg-white/5 border-white/12 text-foreground placeholder:text-muted-foreground/60 focus:border-primary/50"
                    />
                    {contactErrors.name && (
                      <p className="mt-1 text-xs text-destructive">{contactErrors.name}</p>
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
                      className="h-12 bg-white/5 border-white/12 text-foreground placeholder:text-muted-foreground/60 focus:border-primary/50"
                    />
                    {contactErrors.email && (
                      <p className="mt-1 text-xs text-destructive">{contactErrors.email}</p>
                    )}
                  </div>
                  <Button
                    type="submit"
                    variant="hero"
                    className="w-full h-12 mt-2"
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
                  <p className="text-center text-xs text-muted-foreground/50 pt-1">
                    Unverbindlich · Kostenlos · Antwort innerhalb von 24 Stunden
                  </p>
                </form>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Back button */}
      {step > 0 && !submitting && (
        <div className="mt-8">
          <button
            onClick={goBack}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Zurück
          </button>
        </div>
      )}
    </div>
  );
};
