export const CHATBOTS = {
  faq: {
    id: "faq",
    title: "FAQ-Bot",
    side: "left" as const,
    embedUrl: "", // FAQ Bot noch nicht konfiguriert
    short: "Schnelle Antworten",
    badge: "FAQ",
  },
  ai: {
    id: "ai",
    title: "CARRY MIO Support",
    side: "right" as const,
    embedUrl: "https://www.chatbase.co/chatbot-iframe/ppbutFQAUm_Yj4Rmvuf1y",
    short: "Professionelle Beratung",
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
