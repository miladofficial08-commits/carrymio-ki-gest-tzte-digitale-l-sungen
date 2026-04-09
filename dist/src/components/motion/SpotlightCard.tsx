import { useRef, useState, type ReactNode } from "react";
import { motion } from "framer-motion";

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  spotlightColor?: string;
}

export const SpotlightCard = ({
  children,
  className = "",
  spotlightColor = "hsl(217 91% 60% / 0.08)",
}: SpotlightCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative overflow-hidden ${className}`}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[inherit] opacity-0 transition-opacity duration-500"
        style={{
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 40%)`,
        }}
        animate={{ opacity: isHovered ? 1 : 0 }}
      />
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[inherit] opacity-0 transition-opacity duration-500"
        style={{
          background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, hsl(217 91% 60% / 0.06), transparent 40%)`,
          filter: "blur(20px)",
        }}
        animate={{ opacity: isHovered ? 1 : 0 }}
      />
      {children}
    </motion.div>
  );
};
