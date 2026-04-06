import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle,
  X,
  Send,
  Bot,
  User,
  Loader2,
  ArrowDown,
  Plus,
  Clock,
  ChevronLeft,
  Sparkles,
} from "lucide-react";
import {
  createSession,
  loadSessions,
  loadMessages,
  saveMessage,
  saveMessagesBulk,
  updateSessionTitle,
  updateSessionMeta,
  incrementMessageCount,
  touchSession,
  saveLead,
  type ChatSession,
  type SessionMeta,
} from "@/lib/supabase";

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

// ─── Persistent Visitor ID (survives tab close + refresh) ────
function getVisitorId(): string {
  const KEY = "tawano-visitor-id";
  let id = localStorage.getItem(KEY);
  if (!id) {
    id = generateId();
    localStorage.setItem(KEY, id);
  }
  return id;
}

// ─── Lead detection keywords ─────────────────────────────────
const LEAD_KEYWORDS = [
  "preis", "kosten", "angebot", "buchen", "termin", "beratung",
  "projekt", "zusammenarbeit", "starten", "demo", "interesse",
  "kontakt", "anfrage", "beauftragen", "bestellen",
];

const CHAT_ENDPOINT =
  (import.meta.env.VITE_CHAT_API_URL as string | undefined)?.trim() ||
  "/.netlify/functions/chat";

function shouldCaptureLead(messages: Message[]): boolean {
  const userMessages = messages
    .filter((m) => m.role === "user")
    .map((m) => m.content.toLowerCase());
  return (
    userMessages.length >= 2 &&
    userMessages.some((msg) => LEAD_KEYWORDS.some((kw) => msg.includes(kw)))
  );
}

// ─── Metadata extraction (silent analytics) ──────────────────
function extractSessionMeta(messages: Message[]): SessionMeta {
  const allUserText = messages
    .filter((m) => m.role === "user")
    .map((m) => m.content.toLowerCase())
    .join(" ");

  const services: string[] = [];
  if (/chatbot|chat.bot|supportbot|support.bot/.test(allUserText))
    services.push("chatbot");
  if (/webdesign|website|webseite|landingpage|landing.page|homepage/.test(allUserText))
    services.push("webdesign");
  if (/automat|digitale.mitarbeiter|workflow|prozess/.test(allUserText))
    services.push("automation");
  if (/custom|individuell|maßgeschneidert|spezial/.test(allUserText))
    services.push("custom");

  return {
    service_interest: services,
    is_lead: LEAD_KEYWORDS.some((kw) => allUserText.includes(kw)),
    has_pricing_objection:
      /zu teuer|zu viel|budget|günstig|billig|kostet.*viel|nicht leisten/.test(allUserText),
    requested_contact:
      /kontakt|termin|anruf|beratung|gespräch|treffen|rückruf|callback/.test(allUserText),
  };
}

// ─── Relative time formatting ────────────────────────────────
function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Gerade eben";
  if (mins < 60) return `vor ${mins} Min.`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `vor ${hours} Std.`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `vor ${days} Tag${days > 1 ? "en" : ""}`;
  return new Date(dateStr).toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "2-digit",
  });
}

// ─── Message timestamp formatting ────────────────────────────
function formatTime(date: Date): string {
  return date.toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" });
}

// ─── API Call ────────────────────────────────────────────────
async function sendChat(
  messages: { role: string; content: string }[]
): Promise<string> {
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
    if (res.status === 500)
      throw new Error(`CHAT_SERVER_ERROR:${details || "unbekannt"}`);
    throw new Error(`CHAT_HTTP_${res.status}:${details || "unbekannt"}`);
  }

  const data = payload as { reply?: string };
  if (!data.reply) throw new Error("CHAT_EMPTY_REPLY");
  return data.reply;
}

// ─── Session title localStorage helpers ─────────────────────
function saveLocalTitle(sessionId: string, title: string): void {
  try {
    const raw = localStorage.getItem("tawano-session-titles");
    const map: Record<string, string> = raw ? JSON.parse(raw) : {};
    map[sessionId] = title;
    localStorage.setItem("tawano-session-titles", JSON.stringify(map));
  } catch { /* ignore */ }
}

function getLocalTitles(): Record<string, string> {
  try {
    const raw = localStorage.getItem("tawano-session-titles");
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

// ─── Local session backup for offline/fallback ──────────────
interface LocalSessionBackup {
  sessions: Array<{
    id: string;
    visitor_id: string;
    title: string;
    created_at: string;
    updated_at: string;
    messages: Array<{
      id: string;
      role: "user" | "assistant";
      content: string;
      timestamp: string;
    }>;
  }>;
  activeSessionId: string | null;
}

function saveLocalBackup(backup: LocalSessionBackup): void {
  try {
    localStorage.setItem("tawano-chat-backup", JSON.stringify(backup));
  } catch { /* quota exceeded */ }
}

function getLocalBackup(): LocalSessionBackup | null {
  try {
    const raw = localStorage.getItem("tawano-chat-backup");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function clearLocalBackup(): void {
  try {
    localStorage.removeItem("tawano-chat-backup");
  } catch { /* ignore */ }
}

function deriveTitleFromMessages(msgs: Array<{ role: string; content: string }>): string {
  const first = msgs.find((m) => m.role === "user");
  if (!first) return "Neues Gespräch";
  return first.content.length > 50 ? first.content.slice(0, 47) + "\u2026" : first.content;
}

const TEASER_MESSAGES = [
  "Hi 👋 Kann ich Ihnen helfen?",
  "Fragen zu unseren Lösungen?",
  "Automatisierung leicht gemacht!",
  "Ich berate Sie gerne 😊",
  "Neugierig? Fragen Sie mich!",
];

const GREETING_TEXT =
  "Hallo! 👋 Ich bin Tawano Assistent – Ihr digitaler Berater. Wie kann ich Ihnen helfen?";

// ─── Greeting ────────────────────────────────────────────────
function makeGreeting(): Message {
  return {
    id: generateId(),
    role: "assistant",
    content: GREETING_TEXT,
    timestamp: new Date(),
  };
}

function makeLocalSession(visitor: string): ChatSession & { _local: true } {
  const now = new Date().toISOString();
  return {
    id: generateId(),
    visitor_id: visitor,
    title: "Neues Gespräch",
    created_at: now,
    updated_at: now,
    message_count: 0,
    service_interest: [],
    is_lead: false,
    has_pricing_objection: false,
    requested_contact: false,
    _local: true,
  };
}

/** Check if a session was actually persisted in Supabase (not a local fallback) */
function isPersistedSession(session: ChatSession): boolean {
  return !("_local" in session && (session as ChatSession & { _local?: boolean })._local);
}

// ═══════════════════════════════════════════════════════════════
// ─── COMPONENT ───────────────────────────────────────────────
// ═══════════════════════════════════════════════════════════════
export const TawanoChatbot = () => {
  // Core state
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showScrollBtn, setShowScrollBtn] = useState(false);

  // Entry animation
  const [showBubble, setShowBubble] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const teaserIndex = useRef(0);
  const [teaserText, setTeaserText] = useState(TEASER_MESSAGES[0]);

  // Lead capture
  const [leadStep, setLeadStep] = useState<LeadStep>("idle");
  const [leadData, setLeadData] = useState({
    name: "",
    email: "",
    company: "",
    project: "",
  });

  // Session management
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  const [showHistory, setShowHistory] = useState(false);
  const [isLoadingSessions, setIsLoadingSessions] = useState(false);
  const [sessionReady, setSessionReady] = useState(false);

  // Refs
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const visitorId = useRef(getVisitorId());
  const titledSessions = useRef<Set<string>>(new Set());
  const initCalled = useRef(false);
  const leadTriggeredForSession = useRef<Set<string>>(new Set());
  const sessionPersisted = useRef(false);

  // ─── Auto-scroll ────────────────────────────────────────────
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, scrollToBottom]);

  useEffect(() => {
    const el = scrollAreaRef.current;
    if (!el) return;
    const onScroll = () => {
      setShowScrollBtn(el.scrollHeight - el.scrollTop - el.clientHeight > 80);
    };
    el.addEventListener("scroll", onScroll);
    return () => el.removeEventListener("scroll", onScroll);
  }, [isOpen, showHistory]);

  // ─── Entry animation (delayed bubble + rotating teaser hints) ──────
  useEffect(() => {
    const t1 = setTimeout(() => setShowBubble(true), 2500);
    const t2 = setTimeout(() => {
      setTeaserText(TEASER_MESSAGES[0]);
      setShowHint(true);
    }, 3500);
    // Hide first teaser after 8s, then start rotation
    const t3 = setTimeout(() => setShowHint(false), 11500);
    // Rotation: every 18s (10s hidden + 8s visible), show next teaser
    const interval = setInterval(() => {
      if (isOpen) return; // don't rotate while chatbot is open
      teaserIndex.current = (teaserIndex.current + 1) % TEASER_MESSAGES.length;
      setTeaserText(TEASER_MESSAGES[teaserIndex.current]);
      setShowHint(true);
      setTimeout(() => setShowHint(false), 8000);
    }, 18000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearInterval(interval); };
  }, [isOpen]);

  // ─── localStorage restore on mount (visual cache only — Supabase is source of truth) ───
  useEffect(() => {
    try {
      const sid = localStorage.getItem("tawano-active-session-id");
      const raw = localStorage.getItem("tawano-chat-messages");
      if (sid && raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setActiveSessionId(sid);
          setMessages(
            parsed.map((m: { id: string; role: "user" | "assistant"; content: string; timestamp: string }) => ({
              ...m,
              timestamp: new Date(m.timestamp),
            }))
          );
          // NOTE: sessionReady stays false until initializeSessions completes
          // This prevents sending messages before Supabase is ready
        }
      }
    } catch { /* ignore corrupted data */ }
  }, []);

  // ─── localStorage save whenever state changes ──────────────
  useEffect(() => {
    if (activeSessionId) {
      localStorage.setItem("tawano-active-session-id", activeSessionId);
    }
  }, [activeSessionId]);

  useEffect(() => {
    if (messages.length > 0) {
      try {
        localStorage.setItem(
          "tawano-chat-messages",
          JSON.stringify(
            messages.map((m) => ({
              id: m.id,
              role: m.role,
              content: m.content,
              timestamp: m.timestamp.toISOString(),
            }))
          )
        );
      } catch { /* quota exceeded */ }
    }
  }, [messages]);

  // ─── Session initialization (Supabase is source of truth, localStorage is backup) ──
  const initializeSessions = useCallback(async () => {
    if (initCalled.current) return;
    initCalled.current = true;
    setIsLoadingSessions(true);

    // Check for local backup FIRST (before touching Supabase)
    const localBackup = getLocalBackup();
    const savedSessionId = localStorage.getItem("tawano-active-session-id");
    const savedMessagesRaw = localStorage.getItem("tawano-chat-messages");
    let localSessionToMigrate: { id: string; messages: Message[] } | null = null;

    if (savedSessionId && savedMessagesRaw) {
      try {
        const parsed = JSON.parse(savedMessagesRaw);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const msgs = parsed.map((m: { id: string; role: "user" | "assistant"; content: string; timestamp: string }) => ({
            ...m,
            timestamp: new Date(m.timestamp),
          }));
          localSessionToMigrate = { id: savedSessionId, messages: msgs };
          console.log("[Session] Found local session to migrate:", savedSessionId, "with", msgs.length, "messages");
        }
      } catch { /* ignore corrupted data */ }
    }

    try {
      const existing = await loadSessions(visitorId.current);
      console.log("[Session] Loaded", existing.length, "sessions from Supabase");

      // Merge with locally-stored titles (covers title-update failures)
      const localTitles = getLocalTitles();
      const allSessions = existing.map((s) => ({
        ...s,
        title:
          s.title === "Neues Gespräch" && localTitles[s.id]
            ? localTitles[s.id]
            : s.title,
      }));

      if (allSessions.length > 0) {
        // Supabase has sessions — use them as source of truth
        setSessions(allSessions);

        // Check if saved session exists in Supabase
        const target =
          (savedSessionId && allSessions.find((s) => s.id === savedSessionId)) ||
          allSessions[0];
        setActiveSessionId(target.id);
        sessionPersisted.current = true;

        // Load messages from Supabase
        const msgs = await loadMessages(target.id);
        console.log("[Session] Loaded", msgs.length, "messages for session", target.id);
        if (msgs.length > 0) {
          setMessages(
            msgs.map((m) => ({
              id: m.id,
              role: m.role,
              content: m.content,
              timestamp: new Date(m.created_at),
            }))
          );
        } else {
          // Session exists but no messages — show greeting
          const g = makeGreeting();
          setMessages([g]);
          const ok = await saveMessage(target.id, "assistant", g.content);
          console.log("[Session] Greeting save:", ok ? "SUCCESS" : "FAILED");
        }

        // If there was a local session with messages that's NOT in Supabase, save it too
        // (this handles the case where local session failed to persist earlier)
        if (localSessionToMigrate && !allSessions.find(s => s.id === localSessionToMigrate!.id)) {
          console.log("[Session] Orphaned local session detected, messages may be lost");
        }
      } else {
        // No sessions in Supabase — check if we have a local session to migrate
        if (localSessionToMigrate) {
          console.log("[Session] Migrating local session to Supabase:", localSessionToMigrate.id);
          // Create session in Supabase
          const session = await createSession(visitorId.current);
          if (session) {
            console.log("[Session] Created Supabase session for migration:", session.id);
            setActiveSessionId(session.id);
            setSessions([session]);
            sessionPersisted.current = true;
            setMessages(localSessionToMigrate.messages);

            // Save all messages to Supabase
            for (const msg of localSessionToMigrate.messages) {
              const ok = await saveMessage(session.id, msg.role, msg.content);
              console.log("[Session] Migrated message:", msg.role, ok ? "SUCCESS" : "FAILED");
            }
            // Update message count
            await incrementMessageCount(session.id, localSessionToMigrate.messages.length);

            // Update localStorage to point to new session
            localStorage.setItem("tawano-active-session-id", session.id);
            console.log("[Session] Migration complete, new session:", session.id);
          } else {
            // Supabase still failing — keep local session
            console.warn("[Session] Migration failed, keeping local session");
            setActiveSessionId(localSessionToMigrate.id);
            const localSess = makeLocalSession(visitorId.current);
            localSess.id = localSessionToMigrate.id; // Preserve ID
            setSessions([localSess]);
            sessionPersisted.current = false;
            setMessages(localSessionToMigrate.messages);
          }
        } else {
          // No local session either — create fresh
          console.log("[Session] No existing session, creating fresh");
          const session = await createSession(visitorId.current);
          if (session) {
            console.log("[Session] Created initial session:", session.id);
            setActiveSessionId(session.id);
            setSessions([session]);
            sessionPersisted.current = true;
            const g = makeGreeting();
            setMessages([g]);
            const ok = await saveMessage(session.id, "assistant", g.content);
            console.log("[Session] Greeting save:", ok ? "SUCCESS" : "FAILED");
          } else {
            // Supabase unreachable — local fallback
            console.warn("[Session] createSession failed, using local fallback");
            const localSession = makeLocalSession(visitorId.current);
            setActiveSessionId(localSession.id);
            setSessions([localSession]);
            sessionPersisted.current = false;
            setMessages([makeGreeting()]);
          }
        }
      }
    } catch (e) {
      console.error("[Session] Init failed:", e);
      // On error, try to restore local session if available
      if (localSessionToMigrate) {
        console.log("[Session] Restoring local session after error");
        setActiveSessionId(localSessionToMigrate.id);
        const localSess = makeLocalSession(visitorId.current);
        localSess.id = localSessionToMigrate.id;
        setSessions([localSess]);
        sessionPersisted.current = false;
        setMessages(localSessionToMigrate.messages);
      } else {
        const localSession = makeLocalSession(visitorId.current);
        setActiveSessionId(localSession.id);
        setSessions([localSession]);
        sessionPersisted.current = false;
        setMessages([makeGreeting()]);
      }
    }

    setSessionReady(true);
    setIsLoadingSessions(false);
  }, []);

  useEffect(() => {
    if (isOpen) initializeSessions();
  }, [isOpen, initializeSessions]);

  // Focus input
  useEffect(() => {
    if (isOpen && !showHistory) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen, showHistory]);

  // ─── New Chat ───────────────────────────────────────────────
  const handleNewChat = useCallback(async () => {
    // Try to create session in Supabase, retry once on failure
    let dbSession = await createSession(visitorId.current);
    if (!dbSession) {
      console.warn("[Session] createSession failed, retrying...");
      dbSession = await createSession(visitorId.current);
    }

    const session = dbSession ?? makeLocalSession(visitorId.current);
    sessionPersisted.current = !!dbSession;

    if (dbSession) {
      console.log("[Session] New chat created:", dbSession.id);
    } else {
      console.warn("[Session] New chat is local-only (won't survive refresh)");
    }

    setActiveSessionId(session.id);
    setSessions((prev) => [session, ...prev]);
    setLeadStep("idle");
    setLeadData({ name: "", email: "", company: "", project: "" });
    setShowHistory(false);

    const g = makeGreeting();
    setMessages([g]);
    if (sessionPersisted.current) saveMessage(session.id, "assistant", g.content);
    setTimeout(() => inputRef.current?.focus(), 200);
  }, []);

  // ─── Switch Session ────────────────────────────────────────
  const handleSwitchSession = useCallback(
    async (sid: string) => {
      if (sid === activeSessionId) {
        setShowHistory(false);
        return;
      }
      setActiveSessionId(sid);
      setShowHistory(false);
      setLeadStep("idle");
      setLeadData({ name: "", email: "", company: "", project: "" });

      // Check if this session is persisted
      const target = sessions.find((s) => s.id === sid);
      sessionPersisted.current = target ? isPersistedSession(target) : false;

      const msgs = await loadMessages(sid);
      if (msgs.length > 0) {
        setMessages(
          msgs.map((m) => ({
            id: m.id,
            role: m.role,
            content: m.content,
            timestamp: new Date(m.created_at),
          }))
        );
      } else {
        const g = makeGreeting();
        setMessages([g]);
        if (sessionPersisted.current) saveMessage(sid, "assistant", g.content);
      }
      setTimeout(() => inputRef.current?.focus(), 200);
    },
    [activeSessionId, sessions]
  );

  // ─── Lead capture flow ─────────────────────────────────────
  const addBotMsg = useCallback(
    async (text: string) => {
      const msg: Message = {
        id: generateId(),
        role: "assistant",
        content: text,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, msg]);
      if (activeSessionId && sessionPersisted.current) {
        console.log("[Save] Saving lead bot message to session", activeSessionId);
        const ok = await saveMessage(activeSessionId, "assistant", text);
        if (!ok) console.error("[Save] Lead bot message save FAILED");
        else console.log("[Save] Lead bot message saved successfully");
      }
    },
    [activeSessionId]
  );

  const handleLeadInput = useCallback(
    async (value: string) => {
      switch (leadStep) {
        case "name":
          setLeadData((p) => ({ ...p, name: value }));
          setLeadStep("email");
          setTimeout(() => addBotMsg("Perfekt! Und Ihre E-Mail-Adresse? 📧"), 500);
          break;
        case "email":
          if (!value.includes("@") || !value.includes(".")) {
            setTimeout(
              () => addBotMsg("Bitte geben Sie eine gültige E-Mail-Adresse ein."),
              300
            );
            return;
          }
          setLeadData((p) => ({ ...p, email: value }));
          setLeadStep("company");
          setTimeout(
            () =>
              addBotMsg(
                "Für welches Unternehmen arbeiten Sie? (Optional — einfach 'weiter' schreiben)"
              ),
            500
          );
          break;
        case "company":
          setLeadData((p) => ({
            ...p,
            company: value.toLowerCase() === "weiter" ? "" : value,
          }));
          setLeadStep("project");
          setTimeout(
            () =>
              addBotMsg(
                "Kurz beschrieben: Was möchten Sie automatisieren oder verbessern?"
              ),
            500
          );
          break;
        case "project": {
          const finalLead = { ...leadData, project: value };
          setLeadData(finalLead);
          setLeadStep("done");
          await saveLead({
            ...finalLead,
            session_id: activeSessionId || undefined,
            visitor_id: visitorId.current,
          });
          if (activeSessionId) {
            updateSessionMeta(activeSessionId, {
              service_interest: [],
              is_lead: true,
              has_pricing_objection: false,
              requested_contact: true,
            });
          }
          setTimeout(
            () =>
              addBotMsg(
                `Vielen Dank, ${finalLead.name}! 🎉 Wir melden uns in Kürze bei Ihnen. Kann ich Ihnen sonst noch weiterhelfen?`
              ),
            500
          );
          break;
        }
      }
    },
    [leadStep, leadData, activeSessionId, addBotMsg]
  );

  const startLeadCapture = useCallback(() => {
    if (activeSessionId && leadTriggeredForSession.current.has(activeSessionId))
      return;
    if (activeSessionId) leadTriggeredForSession.current.add(activeSessionId);

    setLeadStep("name");
    addBotMsg(
      "Das klingt spannend! Damit wir Ihnen ein passendes Angebot machen können, bräuchte ich kurz ein paar Infos. 😊 Wie heißen Sie?"
    );
  }, [activeSessionId, addBotMsg]);

  // ─── Send message ──────────────────────────────────────────
  const handleSend = useCallback(async () => {
    const text = input.trim();
    if (!text || isTyping || !sessionReady) return;

    const userMsg: Message = {
      id: generateId(),
      role: "user",
      content: text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    // Track the effective session ID (may change during lazy-create)
    let effectiveSessionId = activeSessionId;

    // Save user message to Supabase
    if (activeSessionId && sessionPersisted.current) {
      console.log("[Save] Saving user message to session", activeSessionId);
      const now = new Date().toISOString();
      try {
        const saveOk = await saveMessage(activeSessionId, "user", text);
        if (saveOk) {
          console.log("[Save] User message saved successfully");
          await touchSession(activeSessionId);
        } else {
          console.error("[Save] User message save FAILED for session", activeSessionId);
        }
      } catch (e) {
        console.error("[Save] User message save EXCEPTION:", e);
      }
      // Update local session list with new timestamp
      setSessions((prev) =>
        prev.map((s) =>
          s.id === activeSessionId ? { ...s, updated_at: now } : s
        )
      );
    } else if (activeSessionId && !sessionPersisted.current) {
      // Lazy-create: the session was local-only, try to persist now
      console.log("[Session] Attempting lazy-create for local session");
      const realSession = await createSession(visitorId.current);
      if (realSession) {
        console.log("[Session] Lazy-created session:", realSession.id);
        sessionPersisted.current = true;
        effectiveSessionId = realSession.id;
        setActiveSessionId(realSession.id);

        // Replace local session with real session in the sessions list
        setSessions((prev) =>
          prev.map((s) =>
            s.id === activeSessionId ? { ...realSession } : s
          )
        );

        // Save ALL existing messages to Supabase (not just greeting)
        console.log("[Session] Migrating", messages.length + 1, "messages to Supabase");
        for (const msg of [...messages, userMsg]) {
          const ok = await saveMessage(realSession.id, msg.role, msg.content);
          console.log("[Session] Migrated message:", msg.role, ok ? "SUCCESS" : "FAILED");
        }

        // Update message count
        await incrementMessageCount(realSession.id, messages.length + 1);

        // Update localStorage to point to new session
        localStorage.setItem("tawano-active-session-id", realSession.id);
        console.log("[Session] Lazy-create complete, new session:", realSession.id);
      } else {
        console.warn("[Session] Lazy-create failed, staying in local mode");
      }
    }

    // Lead capture flow intercept
    if (leadStep !== "idle" && leadStep !== "done") {
      handleLeadInput(text);
      return;
    }

    setIsTyping(true);

    try {
      const chatHistory = [...messages, userMsg].map((m) => ({
        role: m.role,
        content: m.content,
      }));
      const reply = await sendChat(chatHistory);

      const botMsg: Message = {
        id: generateId(),
        role: "assistant",
        content: reply,
        timestamp: new Date(),
      };

      const updatedMessages = [...messages, userMsg, botMsg];
      setMessages(updatedMessages);

      // Save to Supabase (only if session is persisted)
      if (effectiveSessionId && sessionPersisted.current) {
        console.log("[Save] Saving bot reply to session", effectiveSessionId);
        const now = new Date().toISOString();

        // Save message and update session timestamp (use await for reliability)
        try {
          const saveOk = await saveMessage(effectiveSessionId, "assistant", reply);
          if (saveOk) {
            console.log("[Save] Bot reply saved successfully");
            await touchSession(effectiveSessionId);
          } else {
            console.error("[Save] Bot reply save FAILED");
          }
        } catch (e) {
          console.error("[Save] Bot reply save EXCEPTION:", e);
        }

        // Update local session list with new timestamp to ensure correct ordering
        setSessions((prev) =>
          prev.map((s) =>
            s.id === effectiveSessionId
              ? { ...s, message_count: updatedMessages.length, updated_at: now }
              : s
          )
        );

        // Auto-title on first user message
        const userMsgCount = updatedMessages.filter(
          (m) => m.role === "user"
        ).length;
        if (
          userMsgCount === 1 &&
          !titledSessions.current.has(effectiveSessionId)
        ) {
          const title =
            text.length > 50 ? text.slice(0, 47) + "…" : text;
          titledSessions.current.add(effectiveSessionId);
          updateSessionTitle(effectiveSessionId, title);
          saveLocalTitle(effectiveSessionId, title);
          setSessions((prev) =>
            prev.map((s) =>
              s.id === effectiveSessionId
                ? { ...s, title, updated_at: now }
                : s
            )
          );
        }

        // Analytics metadata
        const meta = extractSessionMeta(updatedMessages);
        updateSessionMeta(effectiveSessionId, meta);
      } else if (effectiveSessionId) {
        // Still save title locally even if Supabase is down
        const userMsgCount = updatedMessages.filter((m) => m.role === "user").length;
        if (userMsgCount === 1 && !titledSessions.current.has(effectiveSessionId)) {
          const title = text.length > 50 ? text.slice(0, 47) + "…" : text;
          titledSessions.current.add(effectiveSessionId);
          saveLocalTitle(effectiveSessionId, title);
          setSessions((prev) =>
            prev.map((s) =>
              s.id === effectiveSessionId
                ? { ...s, title, updated_at: new Date().toISOString() }
                : s
            )
          );
        }
      }

      // Lead capture check
      if (leadStep === "idle" && shouldCaptureLead(updatedMessages)) {
        setTimeout(() => startLeadCapture(), 1500);
      }
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "UNKNOWN_ERROR";

      let userError =
        "Entschuldigung, es gab einen Fehler. Bitte versuchen Sie es erneut oder kontaktieren Sie uns unter info@tawano.de.";
      if (
        message === "CHAT_ENDPOINT_NOT_FOUND" ||
        message === "CHAT_NETWORK_ERROR"
      ) {
        userError =
          "Der Chat-Server ist nicht erreichbar. Bitte versuchen Sie es in wenigen Sekunden erneut.";
      } else if (message.startsWith("CHAT_SERVER_ERROR:")) {
        const detail = message
          .replace("CHAT_SERVER_ERROR:", "")
          .toLowerCase();
        if (detail.includes("api key")) {
          userError =
            "Es gibt ein technisches Problem. Bitte kontaktieren Sie uns unter info@tawano.de.";
        } else {
          userError = `Serverfehler — bitte versuchen Sie es erneut.`;
        }
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
  }, [
    input,
    isTyping,
    sessionReady,
    messages,
    activeSessionId,
    leadStep,
    handleLeadInput,
    startLeadCapture,
  ]);

  // ═══════════════════════════════════════════════════════════════
  // ─── RENDER ────────────────────────────────────────────────
  // ═══════════════════════════════════════════════════════════════
  return (
    <>
      {/* ─── Floating Bubble + Greeting Hint ─── */}
      <AnimatePresence>
        {!isOpen && showBubble && (
          <>
            {/* Greeting tooltip */}
            <AnimatePresence>
              {showHint && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className="fixed bottom-[90px] right-6 z-[9999] max-w-[260px]"
                >
                  <button
                    onClick={() => { setShowHint(false); setIsOpen(true); }}
                    className="relative rounded-2xl bg-white px-4 py-3 shadow-lg border border-gray-100 text-[13px] text-gray-700 leading-relaxed text-left cursor-pointer hover:shadow-xl transition-shadow duration-200"
                  >
                    {teaserText}
                    <div className="absolute -bottom-[6px] right-7 h-3 w-3 rotate-45 bg-white border-b border-r border-gray-100" />
                  </button>
                  <button
                    onClick={() => setShowHint(false)}
                    className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-gray-200 text-gray-500 hover:bg-gray-300 text-[10px] leading-none"
                    aria-label="Schließen"
                  >
                    ✕
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Floating chat button */}
            <motion.button
              initial={{ x: 80, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
              onClick={() => { setShowHint(false); setIsOpen(true); }}
              className="fixed bottom-6 right-6 z-[9999] flex h-[60px] w-[60px] items-center justify-center rounded-full bg-gradient-to-br from-blue-600 via-blue-600 to-indigo-700 text-white shadow-lg shadow-blue-600/30 hover:shadow-xl hover:shadow-blue-600/40 transition-shadow duration-300"
              aria-label="Chat öffnen"
            >
              <MessageCircle className="h-6 w-6" />
              <span className="absolute inset-0 rounded-full animate-ping bg-blue-500/20 pointer-events-none" />
            </motion.button>
          </>
        )}
      </AnimatePresence>

      {/* ─── Chat Window ─── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            className="fixed z-[9999] flex flex-col overflow-hidden bg-white shadow-2xl chatbot-window"
            style={{
              boxShadow:
                "0 25px 50px -12px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(0, 0, 0, 0.03)",
            }}
          >
            {/* ─── Header ─── */}
            <div className="relative flex items-center px-4 py-3 overflow-hidden"
              style={{ background: "linear-gradient(135deg, hsl(222 47% 15%) 0%, hsl(221 55% 22%) 40%, hsl(217 65% 30%) 100%)" }}
            >
              {/* Shimmer overlay */}
              <div className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, transparent 50%, rgba(255,255,255,0.02) 100%)" }} />

              {/* History / Back button */}
              <motion.button
                whileHover={{ backgroundColor: "rgba(255,255,255,0.1)" }}
                whileTap={{ scale: 0.92 }}
                onClick={() => setShowHistory((p) => !p)}
                className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-white/50 hover:text-white/90 transition-colors mr-2.5"
                aria-label={showHistory ? "Chat anzeigen" : "Verlauf"}
                title={showHistory ? "Zurück zum Chat" : "Chat-Verlauf"}
              >
                {showHistory ? (
                  <ChevronLeft className="h-4 w-4" />
                ) : (
                  <Clock className="h-4 w-4" />
                )}
              </motion.button>

              {/* Avatar + Title group */}
              <div className="relative z-10 flex items-center gap-3 flex-1 min-w-0">
                {/* Bot avatar */}
                <div className="relative h-9 w-9 shrink-0 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
                  <Bot className="h-[18px] w-[18px] text-white" />
                  <span className="absolute -bottom-px -right-px h-2.5 w-2.5 rounded-full bg-emerald-400 ring-2 ring-[hsl(221_55%_22%)]" />
                </div>

                {/* Text */}
                <div className="min-w-0">
                  <p className="text-[15px] font-semibold text-white leading-none tracking-[-0.01em]">
                    Tawano Assistent
                  </p>
                  <p className="text-[11px] text-white/40 leading-none mt-1">
                    Immer online
                  </p>
                </div>
              </div>

              {/* Action buttons */}
              <div className="relative z-10 flex items-center gap-0.5">
                <motion.button
                  whileHover={{ backgroundColor: "rgba(255,255,255,0.1)" }}
                  whileTap={{ scale: 0.92 }}
                  onClick={handleNewChat}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-white/50 hover:text-white/90 transition-colors"
                  aria-label="Neues Gespräch"
                  title="Neues Gespräch starten"
                >
                  <Plus className="h-4 w-4" />
                </motion.button>

                <motion.button
                  whileHover={{ backgroundColor: "rgba(255,255,255,0.1)" }}
                  whileTap={{ scale: 0.92 }}
                  onClick={() => setIsOpen(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-white/50 hover:text-white/90 transition-colors"
                  aria-label="Schließen"
                >
                  <X className="h-4 w-4" />
                </motion.button>
              </div>
            </div>

            {/* ─── Content Area ─── */}
            <AnimatePresence mode="wait">
              {showHistory ? (
                /* ─── SESSION HISTORY ─── */
                <motion.div
                  key="history"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="flex-1 overflow-y-auto"
                  style={{
                    scrollbarWidth: "thin",
                    scrollbarColor: "hsl(0 0% 88%) transparent",
                  }}
                >
                  {/* History Header */}
                  <div className="sticky top-0 z-10 flex items-center justify-between bg-white/95 backdrop-blur-sm px-4 py-3 border-b border-gray-100">
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                      Gespräche
                    </p>
                    <button
                      onClick={handleNewChat}
                      className="flex items-center gap-1.5 rounded-lg bg-blue-50 px-3 py-1.5 text-[12px] font-semibold text-blue-600 hover:bg-blue-100 active:bg-blue-200 transition-colors"
                    >
                      <Plus className="h-3.5 w-3.5" />
                      Neu
                    </button>
                  </div>

                  {isLoadingSessions ? (
                    <div className="flex flex-col items-center justify-center py-16 gap-3">
                      <Loader2 className="h-6 w-6 animate-spin text-blue-400" />
                      <p className="text-sm text-gray-400">
                        Lade Gespräche…
                      </p>
                    </div>
                  ) : sessions.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16 gap-3 px-8">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-50">
                        <MessageCircle className="h-6 w-6 text-gray-300" />
                      </div>
                      <p className="text-sm text-gray-400 text-center">
                        Noch keine Gespräche.
                        <br />
                        Starten Sie jetzt!
                      </p>
                      <button
                        onClick={handleNewChat}
                        className="mt-2 flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
                      >
                        <Plus className="h-4 w-4" />
                        Neues Gespräch
                      </button>
                    </div>
                  ) : (
                    <div className="p-2 space-y-0.5">
                      {sessions.map((s) => (
                        <motion.button
                          key={s.id}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleSwitchSession(s.id)}
                          className={`w-full rounded-xl px-3.5 py-3 text-left transition-all duration-150 ${
                            s.id === activeSessionId
                              ? "bg-blue-50 ring-1 ring-blue-200"
                              : "hover:bg-gray-50 active:bg-gray-100"
                          }`}
                        >
                          <p
                            className={`text-[13px] font-medium truncate leading-snug ${
                              s.id === activeSessionId
                                ? "text-blue-700"
                                : "text-gray-700"
                            }`}
                          >
                            {s.title}
                          </p>
                          <div className="flex items-center justify-between mt-1">
                            <p className="text-[11px] text-gray-400">
                              {timeAgo(s.updated_at)}
                            </p>
                            <div className="flex items-center gap-1.5">
                              {s.message_count > 0 && (
                                <span className="text-[10px] text-gray-400">
                                  {s.message_count} Nachr.
                                </span>
                              )}
                              {s.is_lead && (
                                <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full ring-1 ring-emerald-200/50">
                                  Lead
                                </span>
                              )}
                            </div>
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  )}
                </motion.div>
              ) : (
                /* ─── MESSAGES ─── */
                <motion.div
                  key="messages"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.2 }}
                  className="flex-1 flex flex-col overflow-hidden relative"
                >
                  <div
                    ref={scrollAreaRef}
                    className="flex-1 overflow-y-auto px-4 py-4 space-y-3 scroll-smooth bg-gradient-to-b from-slate-50/60 to-white"
                    style={{
                      scrollbarWidth: "thin",
                      scrollbarColor: "hsl(0 0% 88%) transparent",
                    }}
                  >
                    {/* Welcome hint (only when greeting is the only message) */}
                    {messages.length <= 1 && sessionReady && (
                      <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.4 }}
                        className="flex flex-col items-center text-center py-3 mb-1"
                      >
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 mb-3">
                          <Sparkles className="h-5 w-5 text-blue-500" />
                        </div>
                        <p className="text-[11px] text-gray-400 leading-relaxed max-w-[240px]">
                          Fragen Sie mich zu Chatbots, Webdesign,
                          Automatisierung oder unseren Leistungen.
                        </p>
                      </motion.div>
                    )}

                    {messages.map((msg, i) => {
                      // Show time separator if gap > 5 min
                      const prev = messages[i - 1];
                      const showTime =
                        !prev ||
                        msg.timestamp.getTime() - prev.timestamp.getTime() >
                          300_000;

                      return (
                        <div key={msg.id}>
                          {showTime && (
                            <p className="text-center text-[10px] text-gray-300 mb-2 select-none">
                              {formatTime(msg.timestamp)}
                            </p>
                          )}
                          <motion.div
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.2 }}
                            className={`flex gap-2.5 ${
                              msg.role === "user" ? "flex-row-reverse" : ""
                            }`}
                          >
                            {/* Avatar */}
                            <div
                              className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
                                msg.role === "assistant"
                                  ? "bg-gradient-to-br from-blue-100 to-indigo-100 text-blue-600"
                                  : "bg-gray-100 text-gray-500"
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
                              className={`max-w-[78%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-[1.6] ${
                                msg.role === "assistant"
                                  ? "bg-white text-gray-800 rounded-bl-sm shadow-sm border border-gray-100"
                                  : "bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-br-sm shadow-md shadow-blue-500/25"
                              }`}
                            >
                              {msg.content}
                            </div>
                          </motion.div>
                        </div>
                      );
                    })}

                    {/* Typing indicator */}
                    <AnimatePresence>
                      {isTyping && (
                        <motion.div
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="flex gap-2.5"
                        >
                          <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 text-blue-600">
                            <Bot className="h-3.5 w-3.5" />
                          </div>
                          <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-sm bg-white shadow-sm border border-gray-100 px-4 py-3">
                            <motion.span
                              animate={{ opacity: [0.3, 1, 0.3] }}
                              transition={{
                                duration: 1.2,
                                repeat: Infinity,
                                delay: 0,
                              }}
                              className="h-1.5 w-1.5 rounded-full bg-blue-400"
                            />
                            <motion.span
                              animate={{ opacity: [0.3, 1, 0.3] }}
                              transition={{
                                duration: 1.2,
                                repeat: Infinity,
                                delay: 0.2,
                              }}
                              className="h-1.5 w-1.5 rounded-full bg-blue-400"
                            />
                            <motion.span
                              animate={{ opacity: [0.3, 1, 0.3] }}
                              transition={{
                                duration: 1.2,
                                repeat: Infinity,
                                delay: 0.4,
                              }}
                              className="h-1.5 w-1.5 rounded-full bg-blue-400"
                            />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div ref={messagesEndRef} />
                  </div>

                  {/* Scroll-to-bottom */}
                  <AnimatePresence>
                    {showScrollBtn && (
                      <motion.button
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        onClick={scrollToBottom}
                        className="absolute bottom-3 left-1/2 -translate-x-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-white border border-gray-200 shadow-md text-gray-400 hover:text-gray-700 transition-colors z-10"
                      >
                        <ArrowDown className="h-3.5 w-3.5" />
                      </motion.button>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ─── Input Bar ─── */}
            <div className="border-t border-gray-100/80 bg-white/95 backdrop-blur-sm px-3 py-3 pb-4">
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
                      ? "Ihr Name…"
                      : leadStep === "email"
                        ? "ihre@email.de"
                        : leadStep === "company"
                          ? "Unternehmen (oder 'weiter')…"
                          : leadStep === "project"
                            ? "Was möchten Sie automatisieren?"
                            : "Nachricht schreiben…"
                  }
                  className="flex-1 rounded-2xl border border-gray-200 bg-gray-50/80 px-4 py-2.5 text-[13px] text-gray-800 placeholder:text-gray-400 outline-none focus:border-blue-300 focus:bg-white focus:ring-2 focus:ring-blue-50 transition-all duration-200"
                  disabled={isTyping}
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.92 }}
                  type="submit"
                  disabled={!input.trim() || isTyping}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-sm shadow-blue-600/20 disabled:opacity-35 disabled:cursor-not-allowed disabled:shadow-none hover:shadow-md hover:shadow-blue-600/25 transition-all duration-200"
                  aria-label="Senden"
                >
                  {isTyping ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </motion.button>
              </form>
              <p className="mt-2 text-center text-[10px] text-gray-300">
                Powered by{" "}
                <span className="font-semibold text-blue-400">Tawano</span>
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
