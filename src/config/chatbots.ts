export const CHATBOTS = {
  faq: {
    id: "faq",
    title: "FAQ-Bot",
    side: "left" as const,
    embedUrl: "https://www.chatbase.co/embed/YOUR_FAQ_BOT_ID", // PASTE_CHATBASE_URL
    short: "Schnelle Antworten",
    badge: "FAQ",
  },
  ai: {
    id: "ai",
    title: "KI-Assistent",
    side: "right" as const,
    embedUrl: "https://www.chatbase.co/embed/YOUR_AI_BOT_ID", // PASTE_CHATBASE_URL
    short: "Individuelle Hilfe",
    badge: "AI",
  },
};

export const TEASER_MODE: "staggered" | "simultaneous" = "staggered";

// Timing config (in milliseconds)
export const TEASER_TIMINGS = {
  faq_show: 3000, // FAQ shows at 3s
  ai_show: 4500, // AI shows at 4.5s
  minimize_all: 9000, // Both minimize at 9s
};
