import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ─── Types ───────────────────────────────────────────────────

export interface ChatSession {
  id: string;
  visitor_id: string;
  title: string;
  created_at: string;
  updated_at: string;
  message_count: number;
  service_interest: string[];
  is_lead: boolean;
  has_pricing_objection: boolean;
  requested_contact: boolean;
}

export interface ChatMessage {
  id: string;
  session_id: string;
  role: "user" | "assistant";
  content: string;
  created_at: string;
}

export interface SessionMeta {
  service_interest: string[];
  is_lead: boolean;
  has_pricing_objection: boolean;
  requested_contact: boolean;
}

export interface Lead {
  name: string;
  email: string;
  company?: string;
  project?: string;
  phone?: string;
  service_interest?: string;
  session_id?: string;
  visitor_id?: string;
  created_at?: string;
}

// Legacy type kept for backward compat
export interface ChatLog {
  user_message: string;
  ai_response: string;
  session_id: string;
  created_at?: string;
}

// ─── Session functions ───────────────────────────────────────

export async function createSession(visitorId: string): Promise<ChatSession | null> {
  try {
    const { data, error } = await supabase
      .from("chat_sessions")
      .insert({ visitor_id: visitorId })
      .select()
      .single();
    if (error) {
      console.error(
        "[Supabase] createSession failed:",
        error.message,
        "(code:",
        error.code,
        ") — If this is a 403 or 'row-level security' error, run supabase-setup-v2.sql in your Supabase dashboard."
      );
      throw error;
    }
    return data as ChatSession;
  } catch (e) {
    console.error("[Supabase] createSession exception:", e);
    return null;
  }
}

export async function loadSessions(visitorId: string, limit = 20): Promise<ChatSession[]> {
  try {
    const { data, error } = await supabase
      .from("chat_sessions")
      .select("*")
      .eq("visitor_id", visitorId)
      .order("updated_at", { ascending: false })
      .limit(limit);
    if (error) {
      console.error("[Supabase] loadSessions failed:", error.message, "(code:", error.code, ")");
      throw error;
    }
    return (data as ChatSession[]) || [];
  } catch (e) {
    console.error("[Supabase] loadSessions exception:", e);
    return [];
  }
}

export async function loadMessages(sessionId: string): Promise<ChatMessage[]> {
  try {
    const { data, error } = await supabase
      .from("chat_messages")
      .select("*")
      .eq("session_id", sessionId)
      .order("created_at", { ascending: true });
    if (error) throw error;
    return (data as ChatMessage[]) || [];
  } catch (e) {
    console.error("Failed to load messages:", e);
    return [];
  }
}

export async function saveMessage(
  sessionId: string,
  role: "user" | "assistant",
  content: string
): Promise<boolean> {
  try {
    const { error } = await supabase.from("chat_messages").insert({
      session_id: sessionId,
      role,
      content,
    });
    if (error) {
      console.error("[Supabase] saveMessage failed:", error.message, "(code:", error.code, ")");
      return false;
    }
    return true;
  } catch (e) {
    console.error("[Supabase] saveMessage exception:", e);
    return false;
  }
}

export async function updateSessionTitle(sessionId: string, title: string): Promise<void> {
  try {
    const { error } = await supabase
      .from("chat_sessions")
      .update({ title })
      .eq("id", sessionId);
    if (error) console.error("[Supabase] updateSessionTitle failed:", error.message, "(code:", error.code, ")");
  } catch (e) {
    console.error("[Supabase] updateSessionTitle exception:", e);
  }
}

export async function updateSessionMeta(sessionId: string, meta: SessionMeta): Promise<void> {
  try {
    const { error } = await supabase
      .from("chat_sessions")
      .update({
        service_interest: meta.service_interest,
        is_lead: meta.is_lead,
        has_pricing_objection: meta.has_pricing_objection,
        requested_contact: meta.requested_contact,
      })
      .eq("id", sessionId);
    if (error) console.error("[Supabase] updateSessionMeta failed:", error.message, "(code:", error.code, ")");
  } catch (e) {
    console.error("[Supabase] updateSessionMeta exception:", e);
  }
}

export async function incrementMessageCount(sessionId: string, count: number): Promise<void> {
  try {
    const { error } = await supabase
      .from("chat_sessions")
      .update({
        message_count: count,
        updated_at: new Date().toISOString(),
      })
      .eq("id", sessionId);
    if (error) console.error("[Supabase] incrementMessageCount failed:", error.message, "(code:", error.code, ")");
  } catch (e) {
    console.error("[Supabase] incrementMessageCount exception:", e);
  }
}

export async function touchSession(sessionId: string): Promise<void> {
  try {
    const { error } = await supabase
      .from("chat_sessions")
      .update({ updated_at: new Date().toISOString() })
      .eq("id", sessionId);
    if (error) console.error("[Supabase] touchSession failed:", error.message, "(code:", error.code, ")");
  } catch (e) {
    console.error("[Supabase] touchSession exception:", e);
  }
}

// ─── Legacy functions (keep for backward compat) ─────────────

export async function logChat(data: ChatLog) {
  try {
    await supabase.from("chat_logs").insert(data);
  } catch (e) {
    console.error("Failed to log chat:", e);
  }
}

export async function saveLead(data: Lead) {
  try {
    const { error } = await supabase.from("leads").insert(data);
    if (error) {
      console.error("[Supabase] saveLead failed:", error.message, "(code:", error.code, ")");
      throw error;
    }
    return true;
  } catch (e) {
    console.error("[Supabase] saveLead exception:", e);
    return false;
  }
}

// ─── Diagnostic: test Supabase connectivity ──────────────────
export async function testSupabaseConnection(): Promise<{
  sessions: boolean;
  messages: boolean;
  details: string;
}> {
  const result = { sessions: false, messages: false, details: "" };
  try {
    const { error: sErr } = await supabase.from("chat_sessions").select("id").limit(1);
    result.sessions = !sErr;
    if (sErr) result.details += `Sessions: ${sErr.message} (${sErr.code}). `;

    const { error: mErr } = await supabase.from("chat_messages").select("id").limit(1);
    result.messages = !mErr;
    if (mErr) result.details += `Messages: ${mErr.message} (${mErr.code}). `;

    if (!result.details) result.details = "All tables accessible.";
  } catch (e) {
    result.details = `Connection error: ${e}`;
  }
  console.log("[Supabase] Connection test:", result);
  return result;
}
