/**
 * Shared layout for all funnel pages.
 * Thin nav (logo + back) + centered content area + exit-intent popup.
 */
import { useState } from "react";
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

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Minimal nav */}
      <header className="sticky top-0 z-50 border-b border-white/8 bg-background/80 backdrop-blur-2xl">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <a href="/" aria-label="Tawano – Startseite">
            <img
              src="/tawano-logo.png"
              alt="Tawano"
              className="h-8 w-auto"
              width="120"
              height="32"
            />
          </a>
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Zurück"
          >
            <ArrowLeft className="h-4 w-4" />
            Zurück
          </button>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 flex flex-col items-center justify-start pt-12 pb-20">
        {/* Hero header */}
        <div className="text-center mb-12 px-4 max-w-2xl mx-auto">
          <span className="section-kicker mb-4">{config.solutionLabel}</span>
          <h1 className="section-title mb-3">{config.title}</h1>
          <p className="section-copy">{config.subtitle}</p>
        </div>

        {/* Funnel */}
        <SolutionFunnel config={config} />
      </main>

      {/* Exit intent — tracks answer state via closure */}
      <ExitIntentPopup
        solution={config.solution}
        solutionLabel={config.solutionLabel}
        currentAnswers={answers}
      />
    </div>
  );
};
