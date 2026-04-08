import { useEffect, useMemo } from "react";
import { motion, useAnimation, type Variants } from "framer-motion";

// ─── Particle generation (deterministic positions) ───────────
function generateParticles(count: number) {
  const particles: Array<{
    id: number;
    cx: number;
    cy: number;
    r: number;
    delay: number;
    duration: number;
    orbitRadius: number;
  }> = [];
  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2;
    const orbitRadius = 55 + Math.random() * 20;
    particles.push({
      id: i,
      cx: 60 + Math.cos(angle) * orbitRadius,
      cy: 70 + Math.sin(angle) * orbitRadius,
      r: 0.8 + Math.random() * 1.2,
      delay: i * 0.15,
      duration: 3 + Math.random() * 2,
      orbitRadius,
    });
  }
  return particles;
}

// ─── Entrance sequence variants ──────────────────────────────
const containerVariants: Variants = {
  hidden: { opacity: 0, y: 80, scale: 0.3 },
  materializing: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 1.4,
      ease: [0.16, 1, 0.3, 1],
      opacity: { duration: 0.6 },
      y: { duration: 1.4, ease: [0.16, 1, 0.3, 1] },
      scale: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
    },
  },
  idle: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.3 },
  },
  exit: {
    opacity: 0,
    y: 40,
    scale: 0.5,
    filter: "blur(8px)",
    transition: { duration: 0.5, ease: "easeIn" },
  },
};

const faceVariants: Variants = {
  hidden: { opacity: 0, pathLength: 0 },
  materializing: {
    opacity: 1,
    pathLength: 1,
    transition: { duration: 1.6, delay: 0.4, ease: "easeOut" },
  },
  idle: { opacity: 1, pathLength: 1 },
};

const eyeVariants: Variants = {
  hidden: { opacity: 0, scaleX: 0 },
  materializing: {
    opacity: 1,
    scaleX: 1,
    transition: { duration: 0.4, delay: 1.0, ease: "easeOut" },
  },
  idle: { opacity: 1, scaleX: 1 },
};

const coreVariants: Variants = {
  hidden: { opacity: 0, scale: 0 },
  materializing: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, delay: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
  idle: { opacity: 1, scale: 1 },
};

// ─── Component ───────────────────────────────────────────────
interface AIAssistantAvatarProps {
  onClick: () => void;
  onDismiss: () => void;
}

export function AIAssistantAvatar({ onClick, onDismiss }: AIAssistantAvatarProps) {
  const controls = useAnimation();
  const particles = useMemo(() => generateParticles(12), []);

  useEffect(() => {
    const sequence = async () => {
      await controls.start("materializing");
      await controls.start("idle");
    };
    sequence();
  }, [controls]);

  return (
    <motion.div
      className="ai-assistant-container"
      variants={containerVariants}
      initial="hidden"
      animate={controls}
      exit="exit"
    >
      {/* Dismiss button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDismiss();
        }}
        className="ai-assistant-dismiss"
        aria-label="Assistenten schließen"
      >
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
          <path d="M1 1L9 9M9 1L1 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>

      {/* Tooltip */}
      <div className="ai-assistant-tooltip">
        <span>Sprich mit mir</span>
        <div className="ai-assistant-tooltip-arrow" />
      </div>

      {/* Clickable avatar area */}
      <button
        onClick={onClick}
        className="ai-assistant-avatar-btn"
        aria-label="KI-Assistenten aktivieren"
      >
        {/* Outer glow rings */}
        <div className="ai-assistant-glow-ring ai-assistant-glow-ring-1" />
        <div className="ai-assistant-glow-ring ai-assistant-glow-ring-2" />

        {/* Scan line effect */}
        <div className="ai-assistant-scanlines" />

        {/* SVG Avatar */}
        <svg
          viewBox="0 0 120 140"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="ai-assistant-svg"
        >
          <defs>
            {/* Glow filter */}
            <filter id="ai-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="ai-soft-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="ai-intense-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Gradients */}
            <linearGradient id="ai-face-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#60a5fa" />
              <stop offset="50%" stopColor="#818cf8" />
              <stop offset="100%" stopColor="#a78bfa" />
            </linearGradient>
            <linearGradient id="ai-eye-grad" x1="0%" y1="50%" x2="100%" y2="50%">
              <stop offset="0%" stopColor="#93c5fd" />
              <stop offset="50%" stopColor="#60a5fa" />
              <stop offset="100%" stopColor="#818cf8" />
            </linearGradient>
            <radialGradient id="ai-core-grad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
              <stop offset="40%" stopColor="#93c5fd" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* ── Ambient particles ── */}
          {particles.map((p) => (
            <motion.circle
              key={p.id}
              cx={p.cx}
              cy={p.cy}
              r={p.r}
              fill="#60a5fa"
              filter="url(#ai-glow)"
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0, 0.6, 0.2, 0.7, 0],
                cx: [p.cx, p.cx + 8, p.cx - 5, p.cx + 3, p.cx],
                cy: [p.cy, p.cy - 10, p.cy + 6, p.cy - 8, p.cy],
              }}
              transition={{
                duration: p.duration,
                delay: p.delay + 0.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}

          {/* ── Head outline ── */}
          <motion.path
            d="M60 12 C88 12, 108 38, 108 65 C108 92, 92 120, 75 128 L60 132 L45 128 C28 120, 12 92, 12 65 C12 38, 32 12, 60 12Z"
            stroke="url(#ai-face-grad)"
            strokeWidth="1.2"
            fill="none"
            opacity={0.5}
            filter="url(#ai-glow)"
            variants={faceVariants}
          />

          {/* ── Inner head contour ── */}
          <motion.path
            d="M60 20 C82 20, 98 42, 98 64 C98 86, 86 108, 72 116 L60 120 L48 116 C34 108, 22 86, 22 64 C22 42, 38 20, 60 20Z"
            stroke="url(#ai-face-grad)"
            strokeWidth="0.6"
            fill="none"
            opacity={0.2}
            filter="url(#ai-glow)"
            variants={faceVariants}
          />

          {/* ── Forehead arc ── */}
          <motion.path
            d="M38 35 Q60 22, 82 35"
            stroke="#60a5fa"
            strokeWidth="0.8"
            fill="none"
            opacity={0.3}
            filter="url(#ai-glow)"
            variants={faceVariants}
          />

          {/* ── Left eye ── */}
          <motion.g variants={eyeVariants} style={{ originX: "42px", originY: "60px" }}>
            <rect x="30" y="58" width="24" height="4" rx="2" fill="url(#ai-eye-grad)" filter="url(#ai-glow)" />
            <circle cx="42" cy="60" r="2.5" fill="#ffffff" filter="url(#ai-soft-glow)">
              <animate attributeName="opacity" values="1;0.6;1" dur="2.5s" repeatCount="indefinite" />
            </circle>
            {/* Upper eye line */}
            <path d="M30 56 Q42 52, 54 56" stroke="#60a5fa" strokeWidth="0.6" fill="none" opacity="0.4" />
          </motion.g>

          {/* ── Right eye ── */}
          <motion.g variants={eyeVariants} style={{ originX: "78px", originY: "60px" }}>
            <rect x="66" y="58" width="24" height="4" rx="2" fill="url(#ai-eye-grad)" filter="url(#ai-glow)" />
            <circle cx="78" cy="60" r="2.5" fill="#ffffff" filter="url(#ai-soft-glow)">
              <animate attributeName="opacity" values="1;0.6;1" dur="2.5s" begin="0.4s" repeatCount="indefinite" />
            </circle>
            {/* Upper eye line */}
            <path d="M66 56 Q78 52, 90 56" stroke="#60a5fa" strokeWidth="0.6" fill="none" opacity="0.4" />
          </motion.g>

          {/* ── Nose bridge ── */}
          <motion.line
            x1="60"
            y1="54"
            x2="60"
            y2="78"
            stroke="#60a5fa"
            strokeWidth="0.6"
            opacity={0.25}
            variants={faceVariants}
          />

          {/* ── Mouth line ── */}
          <motion.path
            d="M48 88 Q60 92, 72 88"
            stroke="#60a5fa"
            strokeWidth="0.8"
            fill="none"
            opacity={0.35}
            filter="url(#ai-glow)"
            variants={faceVariants}
          />

          {/* ── Temple circuit lines (left) ── */}
          <motion.g variants={faceVariants}>
            <path d="M18 50 L24 44 L32 44" stroke="#60a5fa" strokeWidth="0.7" opacity="0.25" />
            <path d="M15 62 L20 62 L24 58" stroke="#818cf8" strokeWidth="0.5" opacity="0.2" />
            <circle cx="18" cy="50" r="1.5" fill="#60a5fa" opacity="0.3" filter="url(#ai-glow)" />
          </motion.g>

          {/* ── Temple circuit lines (right) ── */}
          <motion.g variants={faceVariants}>
            <path d="M102 50 L96 44 L88 44" stroke="#60a5fa" strokeWidth="0.7" opacity="0.25" />
            <path d="M105 62 L100 62 L96 58" stroke="#818cf8" strokeWidth="0.5" opacity="0.2" />
            <circle cx="102" cy="50" r="1.5" fill="#60a5fa" opacity="0.3" filter="url(#ai-glow)" />
          </motion.g>

          {/* ── Forehead core (sensor) ── */}
          <motion.g variants={coreVariants}>
            <circle cx="60" cy="34" r="6" fill="url(#ai-core-grad)" filter="url(#ai-intense-glow)">
              <animate attributeName="r" values="5;6.5;5" dur="3s" repeatCount="indefinite" />
            </circle>
            <circle cx="60" cy="34" r="3" stroke="#93c5fd" strokeWidth="0.8" fill="none" opacity="0.5">
              <animate attributeName="r" values="3;4;3" dur="3s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.5;0.2;0.5" dur="3s" repeatCount="indefinite" />
            </circle>
          </motion.g>

          {/* ── Neck / shoulder hints ── */}
          <motion.g variants={faceVariants}>
            <path d="M48 126 L42 138" stroke="#60a5fa" strokeWidth="0.8" opacity="0.2" />
            <path d="M72 126 L78 138" stroke="#60a5fa" strokeWidth="0.8" opacity="0.2" />
            <path d="M42 138 L20 142" stroke="#60a5fa" strokeWidth="0.6" opacity="0.1" />
            <path d="M78 138 L100 142" stroke="#60a5fa" strokeWidth="0.6" opacity="0.1" />
          </motion.g>
        </svg>

        {/* Bottom energy base */}
        <div className="ai-assistant-energy-base" />
      </button>

      {/* Breathing animation overlay */}
      <div className="ai-assistant-breath" />
    </motion.div>
  );
}
