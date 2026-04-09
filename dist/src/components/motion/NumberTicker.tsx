import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface NumberTickerProps {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
  decimalPlaces?: number;
}

export const NumberTicker = ({
  value,
  suffix = "",
  prefix = "",
  duration = 2,
  className = "",
  decimalPlaces = 0,
}: NumberTickerProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const startTime = performance.now();
    const startVal = 0;

    const animate = (now: number) => {
      const elapsed = (now - startTime) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const ease = 1 - Math.pow(1 - progress, 3);
      setDisplay(startVal + (value - startVal) * ease);
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isInView, value, duration]);

  return (
    <motion.span
      ref={ref}
      className={`tabular-nums ${className}`}
      initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
      animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {prefix}
      {decimalPlaces > 0 ? display.toFixed(decimalPlaces) : Math.round(display)}
      {suffix}
    </motion.span>
  );
};
