import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, BrainCircuit, MessagesSquare, CheckCircle2, ChevronRight, ChevronDown } from "lucide-react";

const steps = [
  {
    icon: Mail,
    label: "Anfrage kommt rein",
    desc: "Per E-Mail, Chat oder Formular",
    color: "from-blue-100 to-blue-50",
    accent: "text-blue-600",
    border: "border-blue-200",
    glow: "shadow-blue-100",
    ring: "ring-blue-400/30",
  },
  {
    icon: BrainCircuit,
    label: "KI erkennt das Thema",
    desc: "Automatische Kategorisierung",
    color: "from-violet-100 to-violet-50",
    accent: "text-violet-600",
    border: "border-violet-200",
    glow: "shadow-violet-100",
    ring: "ring-violet-400/30",
  },
  {
    icon: MessagesSquare,
    label: "Antwort wird erstellt",
    desc: "Passende Lösung in Sekunden",
    color: "from-cyan-100 to-cyan-50",
    accent: "text-cyan-600",
    border: "border-cyan-200",
    glow: "shadow-cyan-100",
    ring: "ring-cyan-400/30",
  },
  {
    icon: CheckCircle2,
    label: "Kunde erhält Antwort",
    desc: "Sofort und rund um die Uhr",
    color: "from-emerald-100 to-emerald-50",
    accent: "text-emerald-600",
    border: "border-emerald-200",
    glow: "shadow-emerald-100",
    ring: "ring-emerald-400/30",
  },
];

const lineColors = [
  "from-blue-400 to-violet-400",
  "from-violet-400 to-cyan-400",
  "from-cyan-400 to-emerald-400",
];

export const WorkflowAnimation = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "0px 0px -120px 0px" });
  const [activeStep, setActiveStep] = useState(-1);

  // Sequential step reveal when in view
  useEffect(() => {
    if (!isInView) return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    for (let i = 0; i < steps.length; i++) {
      timers.push(setTimeout(() => setActiveStep(i), 400 + i * 600));
    }
    return () => timers.forEach(clearTimeout);
  }, [isInView]);

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

        {/* Desktop flow — horizontal with animated arrows */}
        <div className="hidden md:flex items-start justify-center mx-auto max-w-5xl">
          {steps.map((step, i) => {
            const isActive = activeStep >= i;
            const arrowActive = activeStep > i;
            return (
              <div key={step.label} className="flex items-start">
                {/* Step card */}
                <motion.div
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  animate={isActive ? { opacity: 1, y: 0, scale: 1 } : {}}
                  transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="text-center min-w-[150px] px-2"
                >
                  {/* Icon with pulse ring */}
                  <motion.div
                    className="relative mx-auto w-16 h-16 mb-4"
                    animate={isActive ? { scale: [0.9, 1.08, 1] } : {}}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  >
                    {isActive && (
                      <motion.div
                        className={`absolute inset-0 rounded-2xl ring-2 ${step.ring}`}
                        initial={{ scale: 1, opacity: 0.8 }}
                        animate={{ scale: 1.35, opacity: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                      />
                    )}
                    <div className={`relative w-16 h-16 rounded-2xl bg-gradient-to-b ${step.color} border ${step.border} flex items-center justify-center shadow-lg ${step.glow}`}>
                      <motion.div
                        animate={isActive ? { rotate: [0, -8, 8, 0] } : {}}
                        transition={{ duration: 0.5, delay: 0.15 }}
                      >
                        <step.icon className={`h-7 w-7 ${step.accent}`} />
                      </motion.div>
                    </div>
                  </motion.div>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={isActive ? { opacity: 1 } : {}}
                    transition={{ duration: 0.4, delay: 0.15 }}
                    className="text-sm font-medium text-foreground"
                  >
                    {step.label}
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={isActive ? { opacity: 1 } : {}}
                    transition={{ duration: 0.4, delay: 0.25 }}
                    className="mt-1 text-xs text-muted-foreground"
                  >
                    {step.desc}
                  </motion.p>
                </motion.div>

                {/* Arrow connector */}
                {i < steps.length - 1 && (
                  <div className="mt-5 shrink-0 flex items-center gap-1 px-1">
                    {/* Animated line segment */}
                    <motion.div
                      className={`h-[2px] rounded-full bg-gradient-to-r ${lineColors[i]}`}
                      initial={{ width: 0, opacity: 0 }}
                      animate={arrowActive ? { width: 28, opacity: 1 } : {}}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                    />
                    <motion.div
                      initial={{ opacity: 0, x: -6 }}
                      animate={arrowActive ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.3, delay: 0.2 }}
                    >
                      <ChevronRight className="h-4 w-4 text-muted-foreground/60" />
                    </motion.div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Mobile flow — vertical with animated arrows */}
        <div className="md:hidden mx-auto max-w-xs space-y-1">
          {steps.map((step, i) => {
            const isActive = activeStep >= i;
            const arrowActive = activeStep > i;
            return (
              <div key={step.label}>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={isActive ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="flex items-center gap-4"
                >
                  <motion.div
                    className="relative shrink-0"
                    animate={isActive ? { scale: [0.85, 1.1, 1] } : {}}
                    transition={{ duration: 0.5 }}
                  >
                    {isActive && (
                      <motion.div
                        className={`absolute inset-0 rounded-xl ring-2 ${step.ring}`}
                        initial={{ scale: 1, opacity: 0.8 }}
                        animate={{ scale: 1.4, opacity: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                      />
                    )}
                    <div className={`relative w-12 h-12 rounded-xl bg-gradient-to-b ${step.color} border ${step.border} flex items-center justify-center shadow-lg ${step.glow}`}>
                      <motion.div
                        animate={isActive ? { rotate: [0, -8, 8, 0] } : {}}
                        transition={{ duration: 0.5, delay: 0.1 }}
                      >
                        <step.icon className={`h-5 w-5 ${step.accent}`} />
                      </motion.div>
                    </div>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={isActive ? { opacity: 1 } : {}}
                    transition={{ duration: 0.4, delay: 0.15 }}
                  >
                    <p className="text-sm font-medium text-foreground">{step.label}</p>
                    <p className="text-xs text-muted-foreground">{step.desc}</p>
                  </motion.div>
                </motion.div>
                {i < steps.length - 1 && (
                  <div className="flex flex-col items-center py-1 pl-6">
                    <motion.div
                      className={`w-[2px] rounded-full bg-gradient-to-b ${lineColors[i]}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={arrowActive ? { height: 16, opacity: 1 } : {}}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    />
                    <motion.div
                      initial={{ opacity: 0, y: -4 }}
                      animate={arrowActive ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.25, delay: 0.15 }}
                    >
                      <ChevronDown className="h-3.5 w-3.5 text-muted-foreground/50" />
                    </motion.div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
