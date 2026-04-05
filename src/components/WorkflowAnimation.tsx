import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Mail, BrainCircuit, MessagesSquare, CheckCircle2 } from "lucide-react";

const steps = [
  {
    icon: Mail,
    label: "Anfrage kommt rein",
    color: "from-blue-100 to-blue-50",
    accent: "text-blue-600",
    border: "border-blue-200",
    glow: "shadow-blue-100",
  },
  {
    icon: BrainCircuit,
    label: "KI erkennt das Thema",
    color: "from-violet-100 to-violet-50",
    accent: "text-violet-600",
    border: "border-violet-200",
    glow: "shadow-violet-100",
  },
  {
    icon: MessagesSquare,
    label: "Antwort wird erstellt",
    color: "from-cyan-100 to-cyan-50",
    accent: "text-cyan-600",
    border: "border-cyan-200",
    glow: "shadow-cyan-100",
  },
  {
    icon: CheckCircle2,
    label: "Kunde erhält Antwort",
    color: "from-emerald-100 to-emerald-50",
    accent: "text-emerald-600",
    border: "border-emerald-200",
    glow: "shadow-emerald-100",
  },
];

export const WorkflowAnimation = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "end 0.3"],
  });

  // The traveling dot/email moves across the flow line
  const dotX = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const dotOpacity = useTransform(scrollYProgress, [0, 0.05, 0.95, 1], [0, 1, 1, 0]);

  // Each step reveals based on scroll progress
  const step0 = useTransform(scrollYProgress, [0, 0.15], [0, 1]);
  const step1 = useTransform(scrollYProgress, [0.15, 0.4], [0, 1]);
  const step2 = useTransform(scrollYProgress, [0.4, 0.65], [0, 1]);
  const step3 = useTransform(scrollYProgress, [0.65, 0.85], [0, 1]);
  const stepProgress = [step0, step1, step2, step3];

  // Pre-compute scale transforms (hooks must be called at top level)
  const scale0 = useTransform(step0, [0, 1], [0.85, 1]);
  const scale1 = useTransform(step1, [0, 1], [0.85, 1]);
  const scale2 = useTransform(step2, [0, 1], [0.85, 1]);
  const scale3 = useTransform(step3, [0, 1], [0.85, 1]);
  const stepScales = [scale0, scale1, scale2, scale3];

  // Flow line grows with scroll
  const lineWidth = useTransform(scrollYProgress, [0, 0.9], ["0%", "100%"]);

  return (
    <section className="relative py-32 overflow-hidden" ref={containerRef}>
      {/* Background glow */}
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-primary/3 blur-[120px]" />
      </div>

      <div className="container px-4 relative z-10">
        <div className="mx-auto max-w-3xl text-center mb-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="section-kicker mb-6"
          >
            So funktioniert es
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="section-title"
          >
            Von der Anfrage zur Lösung —{" "}
            <span className="text-gradient">vollautomatisch</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="section-copy mt-4"
          >
            Jede Anfrage durchläuft einen klaren Ablauf. Sie sehen hier, was im Hintergrund passiert.
          </motion.p>
        </div>

        {/* Desktop flow - horizontal */}
        <div className="hidden md:block mx-auto max-w-5xl">
          {/* Flow line track */}
          <div className="relative mx-8 mb-10">
            <div className="h-[2px] w-full rounded-full bg-border" />
            <motion.div
              className="absolute top-0 left-0 h-[2px] rounded-full"
              style={{
                width: lineWidth,
                background: "linear-gradient(90deg, hsl(217 91% 50%), hsl(277 82% 58%), hsl(184 84% 48%), hsl(152 69% 45%))",
                boxShadow: "0 0 12px hsl(217 91% 50% / 0.15)",
              }}
            />
            {/* Traveling dot */}
            <motion.div
              className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-primary"
              style={{
                left: dotX,
                opacity: dotOpacity,
                boxShadow: "0 0 10px hsl(217 91% 50% / 0.4), 0 0 24px hsl(217 91% 50% / 0.2)",
              }}
            />
          </div>

          {/* Steps */}
          <div className="grid grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={step.label}
                style={{ opacity: stepProgress[i], scale: stepScales[i] }}
                className="text-center"
              >
                <div className={`mx-auto w-16 h-16 rounded-2xl bg-gradient-to-b ${step.color} border ${step.border} flex items-center justify-center shadow-lg ${step.glow} mb-4`}>
                  <step.icon className={`h-7 w-7 ${step.accent}`} />
                </div>
                <p className="text-sm font-medium text-foreground">{step.label}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile flow - vertical */}
        <div className="md:hidden mx-auto max-w-sm">
          <div className="relative pl-8">
            {/* Vertical line */}
            <div className="absolute left-3 top-0 bottom-0 w-[2px] bg-border" />
            <motion.div
              className="absolute left-3 top-0 w-[2px] rounded-full"
              style={{
                height: lineWidth,
                background: "linear-gradient(180deg, hsl(217 91% 50%), hsl(277 82% 58%), hsl(184 84% 48%), hsl(152 69% 45%))",
              }}
            />

            <div className="space-y-8">
              {steps.map((step, i) => (
                <motion.div
                  key={step.label}
                  style={{ opacity: stepProgress[i] }}
                  className="flex items-center gap-4"
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-b ${step.color} border ${step.border} flex items-center justify-center shadow-lg ${step.glow} shrink-0`}>
                    <step.icon className={`h-5 w-5 ${step.accent}`} />
                  </div>
                  <p className="text-sm font-medium text-foreground">{step.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
