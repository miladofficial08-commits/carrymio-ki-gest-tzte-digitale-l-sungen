import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2, Sparkles, CheckCircle2, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

interface Props {
  solution: string;
  solutionLabel: string;
  currentAnswers: Record<string, string>;
  /** Imperative trigger from parent (logo/nav/back click) */
  forceShow?: boolean;
  /** Called when user chooses to continue the funnel */
  onContinue?: () => void;
  /** Called when user confirms leaving */
  onLeave?: () => void;
  /** Legacy callback */
  onDismiss?: () => void;
}

export const ExitIntentPopup = ({
  solution,
  solutionLabel,
  currentAnswers,
  forceShow = false,
  onContinue,
  onLeave,
  onDismiss,
}: Props) => {
  const { toast } = useToast();
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [emailError, setEmailError] = useState("");
  const firedOnce = useRef(false);

  // Force show from parent (logo/nav/back click interception)
  useEffect(() => {
    if (forceShow && !firedOnce.current) {
      firedOnce.current = true;
      setVisible(true);
    }
  }, [forceShow]);

  // Autonomous trigger: mouseleave (desktop)
  useEffect(() => {
    const DELAY_MS = 1500;
    let armed = false;
    const armTimer = setTimeout(() => { armed = true; }, DELAY_MS);

    const handleMouseLeave = (e: MouseEvent) => {
      if (!armed || firedOnce.current) return;
      if (e.clientY <= 5) {
        firedOnce.current = true;
        setVisible(true);
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      clearTimeout(armTimer);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const handleContinue = () => {
    setVisible(false);
    firedOnce.current = false; // allow re-trigger on next attempt
    onContinue?.();
    onDismiss?.();
  };

  const handleLeave = () => {
    setVisible(false);
    onLeave?.();
  };

  const handleSave = async () => {
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Bitte eine gültige E-Mail eingeben.");
      return;
    }
    setEmailError("");
    setSaving(true);
    try {
      const response = await fetch("/.netlify/functions/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "funnel",
          name: "Interessent",
          email: email.trim(),
          solution,
          solutionLabel,
          answersText: JSON.stringify(currentAnswers, null, 2),
          answers: currentAnswers,
        }),
      });

      if (!response.ok) {
        throw new Error("Email sending failed");
      }

      setSaved(true);
      setTimeout(() => handleLeave(), 2400);
    } catch (error) {
      console.error("[ExitPopup] Failed to send email:", error);
      toast({
        title: "Senden fehlgeschlagen",
        description: "Bitte versuchen Sie es in Kürze erneut.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Backdrop */}
          <motion.div
            key="exit-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm"
            onClick={handleContinue}
          />

          {/* Popup card */}
          <motion.div
            key="exit-panel"
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 25, mass: 0.8 }}
            className="fixed z-[201] inset-x-4 top-1/2 -translate-y-1/2 mx-auto max-w-[420px] sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2"
          >
            <div className="relative overflow-hidden rounded-3xl bg-white shadow-[0_25px_60px_-12px_rgba(0,0,0,0.25)]">
              {/* Animated gradient top bar */}
              <motion.div
                className="h-1.5 bg-gradient-to-r from-primary via-[hsl(200,91%,50%)] to-[hsl(270,70%,55%)]"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
                style={{ transformOrigin: "left" }}
              />

              {/* Glow orb behind icon */}
              <div className="absolute top-6 left-1/2 -translate-x-1/2 w-32 h-32 rounded-full bg-primary/10 blur-3xl pointer-events-none" />

              {/* Close button */}
              <button
                onClick={handleContinue}
                className="absolute top-4 right-4 p-1.5 rounded-full text-muted-foreground/30 hover:text-foreground hover:bg-muted/50 transition-all z-10"
                aria-label="Schließen"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="px-7 pt-8 pb-7 sm:px-9 sm:pt-10 sm:pb-8">
                {saved ? (
                  /* ── Saved confirmation ── */
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="text-center py-4"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 500, damping: 15, delay: 0.1 }}
                      className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 mx-auto mb-5"
                    >
                      <CheckCircle2 className="h-7 w-7 text-primary" />
                    </motion.div>
                    <motion.p
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="text-xl font-bold mb-2"
                    >
                      Perfekt!
                    </motion.p>
                    <motion.p
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="text-sm text-muted-foreground leading-relaxed"
                    >
                      Ihr Angebot für <span className="font-semibold text-foreground">{solutionLabel}</span> ist unterwegs.
                    </motion.p>
                  </motion.div>
                ) : (
                  /* ── Main view — single step ── */
                  <div className="text-center">
                    {/* Animated icon */}
                    <motion.div
                      initial={{ scale: 0, rotate: -20 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 400, damping: 15, delay: 0.1 }}
                      className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/15 to-[hsl(270,70%,55%)]/10 mx-auto mb-5"
                    >
                      <Gift className="h-6 w-6 text-primary" />
                    </motion.div>

                    {/* Headline */}
                    <motion.h3
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15, duration: 0.35 }}
                      className="text-[1.3rem] sm:text-[1.45rem] font-bold leading-snug tracking-[-0.02em] mb-2"
                    >
                      Warten Sie kurz!
                    </motion.h3>

                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.22, duration: 0.35 }}
                      className="text-sm text-muted-foreground leading-relaxed mb-6 max-w-[280px] mx-auto"
                    >
                      Erhalten Sie ein <span className="font-semibold text-foreground">kostenloses Angebot</span> für{" "}
                      <span className="font-semibold text-foreground">{solutionLabel}</span> — direkt in Ihr Postfach.
                    </motion.p>

                    {/* Email input — immediately visible */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.35 }}
                      className="space-y-3"
                    >
                      <div>
                        <Input
                          type="email"
                          placeholder="Ihre E-Mail-Adresse"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            if (emailError) setEmailError("");
                          }}
                          onKeyDown={(e) => e.key === "Enter" && handleSave()}
                          autoFocus
                          className="h-12 rounded-xl bg-muted/10 border-border/40 text-center text-[15px] placeholder:text-muted-foreground/40 focus:border-primary/50 focus:ring-2 focus:ring-primary/15 transition-all"
                        />
                        {emailError && (
                          <p className="mt-1.5 text-xs text-destructive">{emailError}</p>
                        )}
                      </div>

                      <Button
                        variant="hero"
                        className="w-full h-12 rounded-xl text-[14px] font-semibold shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all"
                        onClick={handleSave}
                        disabled={saving}
                      >
                        {saving ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Wird gesendet…
                          </>
                        ) : (
                          <>
                            <Sparkles className="mr-2 h-4 w-4" />
                            Kostenloses Angebot erhalten
                          </>
                        )}
                      </Button>
                    </motion.div>

                    {/* Secondary actions */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.45 }}
                      className="mt-4 space-y-1"
                    >
                      <button
                        onClick={handleContinue}
                        className="w-full py-2 text-[13px] font-medium text-primary/80 hover:text-primary transition-colors"
                      >
                        ← Zurück zur Anfrage
                      </button>
                      <button
                        onClick={handleLeave}
                        className="w-full py-1.5 text-[11px] text-muted-foreground/35 hover:text-muted-foreground/60 transition-colors"
                      >
                        Nein danke
                      </button>
                    </motion.div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
