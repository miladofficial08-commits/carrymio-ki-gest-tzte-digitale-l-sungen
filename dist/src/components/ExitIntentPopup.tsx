import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { saveFunnelLead } from "@/lib/supabase";

interface Props {
  solution: string;
  solutionLabel: string;
  currentAnswers: Record<string, string>;
  /** Call this to notify parent that popup dismissed permanently */
  onDismiss?: () => void;
}

export const ExitIntentPopup = ({ solution, solutionLabel, currentAnswers, onDismiss }: Props) => {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [emailError, setEmailError] = useState("");
  const triggered = useRef(false);
  const dismissed = useRef(false);

  // Only trigger once per page visit, not immediately
  useEffect(() => {
    const DELAY_MS = 3000; // wait 3s before arming the trap
    let armed = false;

    const armTimer = setTimeout(() => {
      armed = true;
    }, DELAY_MS);

    const handleMouseLeave = (e: MouseEvent) => {
      if (!armed || triggered.current || dismissed.current) return;
      // Only trigger when cursor exits from the top of the viewport
      if (e.clientY <= 5) {
        triggered.current = true;
        setVisible(true);
      }
    };

    const handlePopState = () => {
      if (!armed || triggered.current || dismissed.current) return;
      triggered.current = true;
      setVisible(true);
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("popstate", handlePopState);

    return () => {
      clearTimeout(armTimer);
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  const dismiss = () => {
    dismissed.current = true;
    setVisible(false);
    onDismiss?.();
  };

  const handleSave = async () => {
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Bitte eine gültige E-Mail eingeben.");
      return;
    }
    setEmailError("");
    setSaving(true);
    await saveFunnelLead({
      name: "–",
      email: email.trim(),
      solution,
      answers: currentAnswers,
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => dismiss(), 2200);
  };

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm"
            onClick={dismiss}
          />

          {/* Panel */}
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            className="fixed inset-x-4 bottom-6 z-[201] mx-auto max-w-md rounded-[24px] border border-white/12 bg-card/95 p-7 shadow-2xl backdrop-blur-2xl sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 sm:bottom-8"
          >
            {/* Close */}
            <button
              onClick={dismiss}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Schließen"
            >
              <X className="h-4 w-4" />
            </button>

            {saved ? (
              <div className="text-center py-2">
                <p className="text-lg font-semibold mb-1">Gespeichert.</p>
                <p className="text-sm text-muted-foreground">
                  Wir melden uns in Kürze bei Ihnen.
                </p>
              </div>
            ) : (
              <>
                <p className="text-sm text-primary/80 font-medium mb-1">Kurze Unterbrechung</p>
                <h3 className="text-xl font-semibold mb-2 leading-snug">
                  Möchten Sie Ihre Auswahl speichern?
                </h3>
                <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
                  Hinterlassen Sie einfach Ihre E-Mail – wir senden Ihnen ein
                  unverbindliches Angebot für{" "}
                  <span className="text-foreground font-medium">{solutionLabel}</span>.
                </p>

                <div className="space-y-3">
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
                      className="h-11 bg-white/5 border-white/12 placeholder:text-muted-foreground/60 focus:border-primary/50"
                    />
                    {emailError && (
                      <p className="mt-1 text-xs text-destructive">{emailError}</p>
                    )}
                  </div>

                  <Button
                    variant="hero"
                    className="w-full h-11"
                    onClick={handleSave}
                    disabled={saving}
                  >
                    {saving ? (
                      <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Speichert…</>
                    ) : (
                      "Angebot zusenden"
                    )}
                  </Button>

                  <button
                    onClick={dismiss}
                    className="w-full text-center text-xs text-muted-foreground/60 hover:text-muted-foreground transition-colors py-1"
                  >
                    Weiter ausfüllen
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
