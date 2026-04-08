import { motion } from "framer-motion";

interface GradientBlobProps {
  className?: string;
  color1?: string;
  color2?: string;
  size?: number;
  duration?: number;
}

export const GradientBlob = ({
  className = "",
  color1 = "hsl(217, 91%, 60%)",
  color2 = "hsl(277, 82%, 68%)",
  size = 400,
  duration = 20,
}: GradientBlobProps) => (
  <motion.div
    className={`pointer-events-none absolute rounded-full blur-[100px] ${className}`}
    style={{
      width: size,
      height: size,
      background: `radial-gradient(circle, ${color1} 0%, ${color2} 50%, transparent 70%)`,
      opacity: 0.06,
    }}
    animate={{
      x: [0, 30, -20, 10, 0],
      y: [0, -20, 15, -10, 0],
      scale: [1, 1.1, 0.95, 1.05, 1],
    }}
    transition={{
      duration,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
);
