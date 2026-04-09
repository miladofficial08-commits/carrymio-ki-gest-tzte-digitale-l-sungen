import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  speed?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span";
}

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&";

export const TextReveal = ({
  text,
  className = "",
  delay = 0,
  speed = 30,
  as: Tag = "span",
}: TextRevealProps) => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [display, setDisplay] = useState(text);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!isInView) return;
    const timer = setTimeout(() => setStarted(true), delay * 1000);
    return () => clearTimeout(timer);
  }, [isInView, delay]);

  useEffect(() => {
    if (!started) return;
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplay(
        text
          .split("")
          .map((char, i) => {
            if (char === " ") return " ";
            if (i < iteration) return text[i];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );
      iteration += 1 / 3;
      if (iteration >= text.length) {
        setDisplay(text);
        clearInterval(interval);
      }
    }, speed);
    return () => clearInterval(interval);
  }, [started, text, speed]);

  return (
    <motion.span
      ref={ref as any}
      className={className}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.3 }}
    >
      {display}
    </motion.span>
  );
};
