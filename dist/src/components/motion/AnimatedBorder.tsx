import { type ReactNode } from "react";
import { motion } from "framer-motion";

interface AnimatedBorderProps {
  children: ReactNode;
  className?: string;
  borderRadius?: string;
  duration?: number;
  gradient?: string;
}

export const AnimatedBorder = ({
  children,
  className = "",
  borderRadius = "1.25rem",
  duration = 3,
  gradient = "linear-gradient(90deg, hsl(217 91% 60%), hsl(277 82% 68%), hsl(200 91% 50%), hsl(217 91% 60%))",
}: AnimatedBorderProps) => (
  <div className={`relative ${className}`} style={{ borderRadius }}>
    {/* Animated gradient border */}
    <motion.div
      className="absolute -inset-[1px] rounded-[inherit] opacity-60"
      style={{
        background: gradient,
        backgroundSize: "300% 100%",
        borderRadius,
      }}
      animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
      transition={{ duration, repeat: Infinity, ease: "linear" }}
    />
    {/* Inner content */}
    <div className="relative rounded-[inherit] bg-background" style={{ borderRadius }}>
      {children}
    </div>
  </div>
);
