import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User, Loader2, ArrowDown } from "lucide-react";
import { logChat, saveLead } from "@/lib/supabase";

// ─── Types ───────────────────────────────────────────────────
interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

type LeadStep = "idle" | "name" | "email" | "company" | "project" | "done";

// ─── UUID fallback (works without HTTPS) ─────────────────────
function generateId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
}

// ─── Session ID ──────────────────────────────────────────────
function getSessionId(): string {
  let id = sessionStorage.getItem("tawano-chat-session");
  if (!id) {
    id = generateId();
    sessionStorage.setItem("tawano-chat-session", id);
  }
  return id;
}

// ─── Lead detection keywords ─────────────────────────────────
const LEAD_KEYWORDS = [
  "preis", "kosten", "angebot", "buchen", "termin", "beratung",
  "projekt", "zusammenarbeit", "starten", "demo", "interesse",
  "kontakt", "anfrage", "beauftragen", "bestellen",
];

const CHAT_ENDPOINT = (import.meta.env.VITE_CHAT_API_URL as string | undefined)?.trim() || "/.netlify/functions/chat";

function shouldCaptureLead(messages: Message[]): boolean {
  const userMessages = messages.filter((m) => m.role === "user").map((m) => m.content.toLowerCase());
  return userMessages.some((msg) => LEAD_KEYWORDS.some((kw) => msg.includes(kw)));
}

// ─── API Call ────────────────────────────────────────────────
async function sendChat(messages: { role: string; content: string }[]): Promise<string> {
  let res: Response;
  try {
    res = await fetch(CHAT_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages }),
    });
  } catch {
    throw new Error("CHAT_NETWORK_ERROR");
  }

  const payload = await res.json().catch(() => ({} as Record<string, unknown>));
  const details =
    typeof payload.details === "string"
      ? payload.details
      : typeof payload.error === "string"
        ? payload.error
        : "";

  if (!res.ok) {
    if (res.status === 404) throw new Error("CHAT_ENDPOINT_NOT_FOUND");
    if (res.status === 500) throw new Error(`CHAT_SERVER_ERROR:${details || "unbekannt"}`);
    throw new Error(`CHAT_HTTP_${res.status}:${details || "unbekannt"}`);
  }

  const data = payload as { reply?: string };
  if (!data.reply) throw new Error("CHAT_EMPTY_REPLY");
  return data.reply;
}

// ─── Component ───────────────────────────────────────────────
export const TawanoChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showScrollBtn, setShowScrollBtn] = useState(false);
  const [leadStep, setLeadStep] = useState<LeadStep>("idle");
  const [leadData, setLeadData] = useState({ name: "", email: "", company: "", project: "" });
  const [hasGreeted, setHasGreeted] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const sessionId = useRef(getSessionId());

  // Auto-scroll
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, scrollToBottom]);

  // Show scroll button
  useEffect(() => {
    const el = scrollAreaRef.current;
    if (!el) return;
    const handleScroll = () => {
      const atBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 80;
      setShowScrollBtn(!atBottom);
    };
    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, [isOpen]);

  // Greeting message on first open
  useEffect(() => {
    if (isOpen && !hasGreeted) {
      setHasGreeted(true);
      setTimeout(() => {
        setMessages([
          {
            id: generateId(),
            role: "assistant",
            content: "Hallo! 👋 Ich bin der digitale Assistent von Tawano. Wie kann ich Ihnen helfen?",
            timestamp: new Date(),
          },
        ]);
      }, 400);
    }
  }, [isOpen, hasGreeted]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 300);
  }, [isOpen]);

  // ─── Lead capture flow ─────────────────────────────────────
  const handleLeadInput = async (value: string) => {
    const addBotMessage = (text: string) => {
      setMessages((prev) => [
        ...prev,
        { id: generateId(), role: "assistant", content: text, timestamp: new Date() },
      ]);
    };

    switch (leadStep) {
      case "name":
        setLeadData((p) => ({ ...p, name: value }));
        setLeadStep("email");
        setTimeout(() => addBotMessage("Und Ihre E-Mail-Adresse?"), 500);
        break;
      case "email":
        if (!value.includes("@")) {
          setTimeout(() => addBotMessage("Bitte geben Sie eine gültige E-Mail-Adresse ein."), 300);
          return;
        }
        setLeadData((p) => ({ ...p, email: value }));
        setLeadStep("company");
        setTimeout(() => addBotMessage("Für welches Unternehmen arbeiten Sie? (optional — einfach 'weiter' eingeben)"), 500);
        break;
      case "company":
        setLeadData((p) => ({ ...p, company: value === "weiter" ? "" : value }));
        setLeadStep("project");
        setTimeout(() => addBotMessage("Kurz: Was möchten Sie automatisieren oder verbessern?"), 500);
        break;
      case "project": {
        const finalLead = { ...leadData, project: value };
        setLeadData(finalLead);
        setLeadStep("done");
        await saveLead({ ...finalLead, session_id: sessionId.current });
        setTimeout(
          () =>
            addBotMessage(
              `Vielen Dank, ${finalLead.name}! Wir melden uns in Kürze bei Ihnen. Kann ich Ihnen sonst noch weiterhelfen?`
            ),
          500
        );
        break;
      }
    }
  };

  const startLeadCapture = () => {
    setLeadStep("name");
    setMessages((prev) => [
      ...prev,
      {
        id: generateId(),
        role: "assistant",
        content: "Das klingt spannend! Damit wir Ihnen ein passendes Angebot machen können, bräuchte ich kurz ein paar Infos. Wie heißen Sie?",
        timestamp: new Date(),
      },
    ]);
  };

  // ─── Send message ──────────────────────────────────────────
  const handleSend = async () => {
    const text = input.trim();
    if (!text || isTyping) return;

    const userMsg: Message = {
      id: generateId(),
      role: "user",
      content: text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    // Lead capture flow
    if (leadStep !== "idle" && leadStep !== "done") {
      handleLeadInput(text);
      return;
    }

    setIsTyping(true);

    try {
      const chatHistory = [...messages, userMsg].map((m) => ({ role: m.role, content: m.content }));
      const reply = await sendChat(chatHistory);

      const botMsg: Message = {
        id: generateId(),
        role: "assistant",
        content: reply,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMsg]);

      // Log to Supabase
      logChat({
        session_id: sessionId.current,
        user_message: text,
        ai_response: reply,
      });

      // Check if we should capture lead
      if (leadStep === "idle" && shouldCaptureLead([...messages, userMsg])) {
        setTimeout(() => startLeadCapture(), 1500);
      }
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "UNKNOWN_ERROR";

      let userError = "Entschuldigung, es gab einen Fehler. Bitte versuchen Sie es erneut oder kontaktieren Sie uns unter info@tawano.de.";
      if (message === "CHAT_ENDPOINT_NOT_FOUND" || message === "CHAT_NETWORK_ERROR") {
        userError = "Der Chat-Server ist lokal nicht erreichbar. Starten Sie die Seite mit 'npx netlify dev' statt nur mit 'npm run dev'.";
      } else if (message.startsWith("CHAT_SERVER_ERROR:")) {
        const serverDetail = message.replace("CHAT_SERVER_ERROR:", "").toLowerCase();
        if (serverDetail.includes("api key")) {
          userError = "OpenAI API-Key fehlt oder ist ungueltig. Bitte setzen Sie OPENAI_API_KEY in Netlify Environment Variables.";
        } else {
          userError = `Serverfehler: ${message.replace("CHAT_SERVER_ERROR:", "")}`;
        }
      } else if (message.startsWith("CHAT_HTTP_")) {
        userError = `API-Fehler: ${message.replace("CHAT_HTTP_", "HTTP ")}`;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: generateId(),
          role: "assistant",
          content: userError,
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  // ─── Render ────────────────────────────────────────────────
  return (
    <>
      {/* Floating Bubble */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-[9999] flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-600/25 hover:shadow-xl hover:shadow-blue-600/30 transition-shadow"
            aria-label="Chat öffnen"
          >
            <MessageCircle className="h-6 w-6" />
            {/* Pulse ring */}
            <span className="absolute inset-0 rounded-full animate-ping bg-blue-500/20 pointer-events-none" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-6 right-6 z-[9999] flex w-[380px] max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-2xl border border-border/60 bg-white shadow-2xl shadow-black/10"
            style={{ height: "min(580px, calc(100vh - 6rem))" }}
          >
            {/* Header */}
            <div className="relative flex items-center gap-3 border-b border-border/50 bg-gradient-to-r from-blue-600 to-blue-700 px-5 py-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm">
                <Bot className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white">Tawano Assistent</p>
                <div className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <p className="text-[11px] text-white/70">Online</p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.15)" }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full text-white/80 transition-colors"
                aria-label="Chat schließen"
              >
                <X className="h-4 w-4" />
              </motion.button>
            </div>

            {/* Messages */}
            <div
              ref={scrollAreaRef}
              className="flex-1 overflow-y-auto px-4 py-4 space-y-3 scroll-smooth"
              style={{ scrollbarWidth: "thin", scrollbarColor: "hsl(0 0% 85%) transparent" }}
            >
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className={`flex gap-2.5 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
                >
                  {/* Avatar */}
                  <div
                    className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
                      msg.role === "assistant"
                        ? "bg-blue-100 text-blue-600"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {msg.role === "assistant" ? (
                      <Bot className="h-3.5 w-3.5" />
                    ) : (
                      <User className="h-3.5 w-3.5" />
                    )}
                  </div>

                  {/* Bubble */}
                  <div
                    className={`max-w-[75%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed ${
                      msg.role === "assistant"
                        ? "bg-gray-50 text-gray-800 rounded-bl-md"
                        : "bg-blue-600 text-white rounded-br-md"
                    }`}
                  >
                    {msg.content}
                  </div>
                </motion.div>
              ))}

              {/* Typing indicator */}
              <AnimatePresence>
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex gap-2.5"
                  >
                    <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                      <Bot className="h-3.5 w-3.5" />
                    </div>
                    <div className="flex items-center gap-1 rounded-2xl rounded-bl-md bg-gray-50 px-4 py-3">
                      <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.2, repeat: Infinity, delay: 0 }} className="h-1.5 w-1.5 rounded-full bg-gray-400" />
                      <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.2, repeat: Infinity, delay: 0.2 }} className="h-1.5 w-1.5 rounded-full bg-gray-400" />
                      <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.2, repeat: Infinity, delay: 0.4 }} className="h-1.5 w-1.5 rounded-full bg-gray-400" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div ref={messagesEndRef} />
            </div>

            {/* Scroll to bottom */}
            <AnimatePresence>
              {showScrollBtn && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={scrollToBottom}
                  className="absolute bottom-[72px] left-1/2 -translate-x-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-white border border-border shadow-md text-gray-500 hover:text-gray-800 transition-colors z-10"
                >
                  <ArrowDown className="h-3.5 w-3.5" />
                </motion.button>
              )}
            </AnimatePresence>

            {/* Input */}
            <div className="border-t border-border/50 bg-white px-3 py-3">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex items-center gap-2"
              >
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={
                    leadStep === "name"
                      ? "Ihr Name..."
                      : leadStep === "email"
                        ? "Ihre E-Mail..."
                        : leadStep === "company"
                          ? "Unternehmen (oder 'weiter')..."
                          : leadStep === "project"
                            ? "Ihr Projekt beschreiben..."
                            : "Nachricht schreiben..."
                  }
                  className="flex-1 rounded-xl border border-border/60 bg-gray-50 px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 outline-none focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all"
                  disabled={isTyping}
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  disabled={!input.trim() || isTyping}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
                  aria-label="Senden"
                >
                  {isTyping ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </motion.button>
              </form>
              <p className="mt-2 text-center text-[10px] text-gray-400">
                Powered by <span className="font-medium text-blue-500">Tawano</span>
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
