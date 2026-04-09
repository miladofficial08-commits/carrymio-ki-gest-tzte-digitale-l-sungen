import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TypingHeroProps {
  onComplete?: () => void;
}

/**
 * Premium intro — real terminal-style typing.
 *  1. Typing starts immediately (no delay)
 *  2. "Tawano" typed fast, character-by-character
 *  3. Brief hold — tagline fades in
 *  4. Powerful zoom-in exit → website revealed
 */
export const TypingHero = ({ onComplete }: TypingHeroProps) => {
  const brand = "Tawano";
  const [chars, setChars] = useState(0);
  const [phase, setPhase] = useState<
    "typing" | "hold" | "exit" | "done"
  >("typing");

  const finish = useCallback(() => {
    setPhase("done");
    onComplete?.();
  }, [onComplete]);

  /* ── phase machine ─────────────────────────────── */

  // Type one character at a time — starts immediately on mount
  useEffect(() => {
    if (phase !== "typing") return;
    if (chars < brand.length) {
      const id = setTimeout(() => setChars((c) => c + 1), 75);
      return () => clearTimeout(id);
    }
    const id = setTimeout(() => setPhase("hold"), 80);
    return () => clearTimeout(id);
  }, [chars, phase]);

  // Hold — let user see the finished brand name
  useEffect(() => {
    if (phase !== "hold") return;
    const id = setTimeout(() => setPhase("exit"), 750);
    return () => clearTimeout(id);
  }, [phase]);

  // Exit — elegant zoom-in, then done
  useEffect(() => {
    if (phase !== "exit") return;
    const id = setTimeout(finish, 800);
    return () => clearTimeout(id);
  }, [phase, finish]);

  const isExiting = phase === "exit";
  const typingDone = chars >= brand.length;
  const showCursor = phase !== "exit" && phase !== "done";

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          key="intro"
          className="fixed inset-0 z-[100] flex items-center justify-center"
          style={{ willChange: "transform, opacity" }}
          animate={
            isExiting
              ? { opacity: 0, scale: 1.6 }
              : { opacity: 1, scale: 1 }
          }
          transition={
            isExiting
              ? { duration: 0.75, ease: [0.16, 1, 0.3, 1] }
              : { duration: 0.2 }
          }
        >
          {/* Dark cinematic backdrop */}
          <div className="absolute inset-0 bg-[#0a0f1a]" />
          {/* Subtle radial gradient */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_hsl(217_91%_50%_/_0.06)_0%,_transparent_60%)]" />
          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(hsl(0 0% 100%) 1px, transparent 1px), linear-gradient(90deg, hsl(0 0% 100%) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

          {/* Center content */}
          <div className="relative z-10 flex flex-col items-center">

            {/*
             * Brand name — TRUE typing effect.
             * brand.slice(0, chars) progressively reveals the string
             * exactly like a terminal: T → Ta → Taw → Tawa → Tawan → Tawano
             */}
            <div className="flex items-center min-h-[3.6rem] md:min-h-[5rem]">
              <span
                className="text-[3.2rem] font-semibold tracking-[0.04em] text-white md:text-[4.5rem] leading-none select-none"
              >
                {brand.slice(0, chars)}
              </span>

              {/* Blinking cursor bar — stays visible until exit */}
              {showCursor && (
                <motion.span
                  className="inline-block w-[3px] h-[2.8rem] md:h-[4rem] ml-[2px] rounded-[1px] bg-[hsl(217,91%,60%)]"
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{
                    duration: 0.85,
                    repeat: Infinity,
                    times: [0, 0.5, 1],
                    ease: "easeInOut",
                  }}
                />
              )}
            </div>

            {/* Tagline fades in after typing */}
            <motion.p
              className="mt-3 text-[11px] tracking-[0.28em] uppercase text-white/30 md:text-xs"
              initial={{ opacity: 0, y: 4 }}
              animate={
                typingDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 4 }
              }
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              Digitale Mitarbeiter & Automation
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
