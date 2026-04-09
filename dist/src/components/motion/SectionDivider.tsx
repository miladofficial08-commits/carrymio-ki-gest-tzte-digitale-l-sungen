import { motion } from "framer-motion";

interface SectionDividerProps {
  variant?: "gradient" | "dots" | "wave";
  className?: string;
}

export const SectionDivider = ({ variant = "gradient", className = "" }: SectionDividerProps) => {
  if (variant === "dots") {
    return (
      <div className={`flex items-center justify-center gap-2 py-8 ${className}`} aria-hidden="true">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="h-1.5 w-1.5 rounded-full bg-primary/30"
            initial={{ scale: 0.5, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.4 }}
          />
        ))}
      </div>
    );
  }

  if (variant === "wave") {
    return (
      <div className={`relative h-16 overflow-hidden ${className}`} aria-hidden="true">
        <motion.div
          className="absolute inset-x-0 top-1/2 h-[1px]"
          style={{
            background: "linear-gradient(90deg, transparent, hsl(217 91% 60% / 0.2), hsl(277 82% 68% / 0.15), hsl(200 91% 50% / 0.2), transparent)",
            backgroundSize: "200% 100%",
          }}
          animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />
      </div>
    );
  }

  return (
    <div className={`relative py-4 ${className}`} aria-hidden="true">
      <div className="mx-auto h-[1px] w-full max-w-4xl bg-gradient-to-r from-transparent via-border to-transparent" />
    </div>
  );
};
