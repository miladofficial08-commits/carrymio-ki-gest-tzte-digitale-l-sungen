import { motion } from "framer-motion";

/** Subtle floating data panels that create a "living website" feel behind hero content */
export const BackgroundActivity = () => (
  <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
    {/* Floating mini chart – top right */}
    <motion.div
      className="absolute right-[8%] top-[18%] w-36 rounded-xl border border-border/60 bg-white/60 p-3 backdrop-blur-sm md:w-44"
      animate={{ y: [0, -12, 0], rotate: [0, 1, 0] }}
      transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      style={{ willChange: "transform" }}
    >
      <div className="mb-1.5 flex items-center justify-between">
        <div className="h-1.5 w-10 rounded bg-primary/20" />
        <div className="h-1.5 w-6 rounded bg-emerald-400/30" />
      </div>
      <div className="flex items-end gap-[3px]">
        {[40, 65, 45, 80, 55, 72, 90, 60, 85].map((h, i) => (
          <motion.div
            key={i}
            className="flex-1 rounded-sm bg-primary/15"
            initial={{ height: 0 }}
            animate={{ height: `${h}%` }}
            transition={{ duration: 1.2, delay: 0.8 + i * 0.1, ease: "easeOut" }}
            style={{ maxHeight: 28 }}
          />
        ))}
      </div>
    </motion.div>

    {/* Data notification – left side */}
    <motion.div
      className="absolute left-[5%] top-[45%] w-40 rounded-lg border border-border/50 bg-white/50 p-2.5 backdrop-blur-sm md:left-[10%] md:w-48"
      animate={{ y: [0, 8, 0], x: [0, -4, 0] }}
      transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      style={{ willChange: "transform" }}
    >
      <div className="flex items-center gap-2">
        <div className="h-6 w-6 shrink-0 rounded-full bg-emerald-100 flex items-center justify-center">
          <div className="h-2 w-2 rounded-full bg-emerald-400" />
        </div>
        <div className="space-y-1">
          <div className="h-1.5 w-16 rounded bg-foreground/10" />
          <div className="h-1.5 w-10 rounded bg-foreground/5" />
        </div>
      </div>
    </motion.div>

    {/* Typing indicator – bottom left */}
    <motion.div
      className="absolute bottom-[22%] left-[12%] flex items-center gap-2 rounded-full border border-border/40 bg-white/40 px-3 py-1.5 backdrop-blur-sm"
      animate={{ opacity: [0.4, 0.8, 0.4] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      style={{ willChange: "opacity" }}
    >
      <div className="flex gap-1">
        {[0, 0.2, 0.4].map((delay, i) => (
          <motion.div
            key={i}
            className="h-1.5 w-1.5 rounded-full bg-primary/40"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 1, repeat: Infinity, delay, ease: "easeInOut" }}
          />
        ))}
      </div>
      <div className="h-1.5 w-12 rounded bg-foreground/8" />
    </motion.div>

    {/* Performance metric – right mid */}
    <motion.div
      className="absolute right-[6%] top-[58%] w-32 rounded-lg border border-border/40 bg-white/40 p-2 backdrop-blur-sm md:right-[12%]"
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      style={{ willChange: "transform" }}
    >
      <div className="mb-1 h-1.5 w-8 rounded bg-primary/15" />
      <div className="text-lg font-semibold text-primary/30 tabular-nums">98.7%</div>
      <div className="mt-0.5 h-1 w-full rounded-full bg-muted">
        <motion.div
          className="h-full rounded-full bg-primary/20"
          initial={{ width: "0%" }}
          animate={{ width: "98.7%" }}
          transition={{ duration: 2, delay: 1.5, ease: "easeOut" }}
        />
      </div>
    </motion.div>
  </div>
);
