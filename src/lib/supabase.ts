import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface ChatLog {
  user_message: string;
  ai_response: string;
  session_id: string;
  created_at?: string;
}

export interface Lead {
  name: string;
  email: string;
  company?: string;
  project?: string;
  session_id: string;
  created_at?: string;
}

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
    if (error) throw error;
    return true;
  } catch (e) {
    console.error("Failed to save lead:", e);
    return false;
  }
}
