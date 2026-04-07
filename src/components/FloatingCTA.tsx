import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";

export const FloatingCTA = () => {
  const scrollToContact = () => {
    const element = document.querySelector("#kontakt");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-40 px-4 md:inset-x-auto md:right-6 md:bottom-6 md:w-auto">
      <div className="pointer-events-auto mx-auto flex max-w-md items-center justify-between gap-3 rounded-2xl border border-white/15 bg-background/80 px-4 py-3 shadow-card backdrop-blur-2xl md:max-w-none md:gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-primary/80">Tawano</p>
          <p className="text-sm text-foreground/90">Kostenpotenzial jetzt pruefen</p>
        </div>
        <Button size="sm" variant="hero" onClick={scrollToContact}>
          Analyse starten
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </Button>
      </div>
    </div>
  );
};
