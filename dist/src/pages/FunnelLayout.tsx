/**
 * Shared layout for all funnel pages.
 * Premium nav with exit-intent interception + aurora background + centered content.
 *
 * Exit interception strategy:
 *  1. Push a sentinel history entry on mount → browser-back lands on it first
 *  2. popstate listener catches that and shows popup
 *  3. beforeunload catches refresh / tab close
 *  4. Logo & "Zurück" clicks go through attemptLeave()
 */
import { useState, useCallback, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { SolutionFunnel, FunnelConfig } from "@/components/SolutionFunnel";
import { ExitIntentPopup } from "@/components/ExitIntentPopup";

interface Props {
  config: FunnelConfig;
}

export const FunnelLayout = ({ config }: Props) => {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showExitPopup, setShowExitPopup] = useState(false);
  const [pendingNav, setPendingNav] = useState<(() => void) | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const exitFiredRef = useRef(false);
  /** Tracks whether we pushed the sentinel history entry */
  const sentinelPushed = useRef(false);

  const handleAnswersChange = useCallback((a: Record<string, string>) => {
    setAnswers(a);
  }, []);

  // ── History sentinel + popstate + beforeunload ──────────────
  useEffect(() => {
    if (submitted) return;

    // Push a sentinel so browser-back doesn't leave the page immediately
    if (!sentinelPushed.current) {
      window.history.pushState({ funnelSentinel: true }, "");
      sentinelPushed.current = true;
    }

    const onPopState = (e: PopStateEvent) => {
      if (submitted || exitFiredRef.current) return;
      // Re-push sentinel so a second back-press is also caught
      window.history.pushState({ funnelSentinel: true }, "");
      exitFiredRef.current = true;
      setPendingNav(() => () => navigate(-2)); // -2 to skip sentinel
      setShowExitPopup(true);
    };

    const onBeforeUnload = (e: BeforeUnloadEvent) => {
      if (submitted) return;
      e.preventDefault();
    };

    window.addEventListener("popstate", onPopState);
    window.addEventListener("beforeunload", onBeforeUnload);
    return () => {
      window.removeEventListener("popstate", onPopState);
      window.removeEventListener("beforeunload", onBeforeUnload);
    };
  }, [submitted, navigate]);

  const attemptLeave = useCallback(
    (navFn: () => void) => {
      if (submitted || exitFiredRef.current) {
        navFn();
        return;
      }
      exitFiredRef.current = true;
      setPendingNav(() => navFn);
      setShowExitPopup(true);
    },
    [submitted]
  );

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    attemptLeave(() => navigate("/"));
  };

  const handleBackClick = () => {
    attemptLeave(() => navigate(-1));
  };

  const handleExitContinue = () => {
    setShowExitPopup(false);
    setPendingNav(null);
    // Allow the popup to fire again on the next leave attempt
    exitFiredRef.current = false;
  };

  const handleExitLeave = () => {
    setShowExitPopup(false);
    if (pendingNav) pendingNav();
    setPendingNav(null);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col relative">
      {/* Aurora background — brand-consistent */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{ background: "var(--gradient-aurora)" }}
      />
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-40"
        style={{
          background:
            "radial-gradient(ellipse 60% 35% at 50% 0%, hsl(217 91% 50% / 0.05), transparent)",
        }}
      />

      {/* Minimal premium nav */}
      <header className="sticky top-0 z-50 border-b border-border/40 bg-white/70 backdrop-blur-2xl">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <a
            href="/"
            onClick={handleLogoClick}
            aria-label="Tawano – Startseite"
            className="transition-opacity hover:opacity-80"
          >
            <img
              src="/tawano-logo.png"
              alt="Tawano"
              className="h-8 w-auto"
              width="120"
              height="32"
            />
          </a>
          <button
            onClick={handleBackClick}
            className="flex items-center gap-2 text-[13px] text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Zurück"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Zurück
          </button>
        </div>
      </header>

      {/* Content */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-start pt-14 pb-24">
        {/* Hero header */}
        <div className="text-center mb-14 px-4 max-w-2xl mx-auto">
          <span className="section-kicker mb-5 inline-flex">{config.solutionLabel}</span>
          <h1 className="text-[2rem] md:text-[2.5rem] font-semibold leading-[1.12] tracking-[-0.03em] mb-4">
            {config.title}
          </h1>
          <p className="section-copy max-w-lg mx-auto">{config.subtitle}</p>
        </div>

        {/* Funnel */}
        <SolutionFunnel config={config} onAnswersChange={handleAnswersChange} onSubmitted={() => setSubmitted(true)} />
      </main>

      {/* Exit intent popup — smart triggers + parent-controlled */}
      <ExitIntentPopup
        solution={config.solution}
        solutionLabel={config.solutionLabel}
        currentAnswers={answers}
        forceShow={showExitPopup}
        onContinue={handleExitContinue}
        onLeave={handleExitLeave}
      />
    </div>
  );
};
