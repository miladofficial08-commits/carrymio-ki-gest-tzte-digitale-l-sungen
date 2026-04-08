import { type ReactNode } from "react";
import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";

type Direction = "up" | "down" | "left" | "right" | "none";

interface ScrollRevealProps {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  duration?: number;
  distance?: number;
  className?: string;
  scale?: number;
}

const directionOffset = (dir: Direction, distance: number) => {
  switch (dir) {
    case "up": return { y: distance };
    case "down": return { y: -distance };
    case "left": return { x: distance };
    case "right": return { x: -distance };
    case "none": return {};
  }
};

export const ScrollReveal = ({
  children,
  direction = "up",
  delay = 0,
  duration = 0.7,
  distance = 40,
  className,
  scale,
}: ScrollRevealProps) => {
  const { ref, isInView } = useScrollReveal();

  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        ...directionOffset(direction, distance),
        ...(scale ? { scale } : {}),
      }}
      animate={isInView ? {
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
      } : {
        opacity: 0,
        ...directionOffset(direction, distance),
        ...(scale ? { scale } : {}),
      }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
