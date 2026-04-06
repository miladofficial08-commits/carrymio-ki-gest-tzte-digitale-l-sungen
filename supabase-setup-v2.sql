-- ============================================================
-- Tawano Chatbot v2 — CLEAN Supabase Setup
-- Run this in Supabase SQL Editor (Dashboard > SQL Editor)
--
-- 1. Drops OLD conflicting policies safely
-- 2. Creates tables with IF NOT EXISTS
-- 3. Sets up correct RLS policies
-- ============================================================

-- ─── 0. Drop OLD conflicting policies (from v1 setup) ───────
DO $$ BEGIN
  -- Old chat_logs policies
  DROP POLICY IF EXISTS "Allow anonymous inserts on chat_logs" ON chat_logs;
  -- Old leads policies
  DROP POLICY IF EXISTS "Allow anonymous inserts on leads" ON leads;
EXCEPTION WHEN undefined_table THEN NULL;
END $$;

-- ─── 1. Chat Sessions ────────────────────────────────────────
CREATE TABLE IF NOT EXISTS chat_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  visitor_id TEXT NOT NULL,
  title TEXT DEFAULT 'Neues Gespräch',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  message_count INTEGER DEFAULT 0,
  service_interest TEXT[] DEFAULT '{}',
  is_lead BOOLEAN DEFAULT false,
  has_pricing_objection BOOLEAN DEFAULT false,
  requested_contact BOOLEAN DEFAULT false
);

-- ─── 2. Chat Messages (normalized) ──────────────────────────
CREATE TABLE IF NOT EXISTS chat_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id UUID NOT NULL REFERENCES chat_sessions(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ─── 3. Leads ───────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id UUID,
  visitor_id TEXT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  project TEXT,
  phone TEXT,
  service_interest TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ─── 4. Legacy chat_logs (keep for backward compat) ─────────
CREATE TABLE IF NOT EXISTS chat_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id TEXT NOT NULL,
  user_message TEXT NOT NULL,
  ai_response TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ─── 5. Indexes ─────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_sessions_visitor ON chat_sessions(visitor_id);
CREATE INDEX IF NOT EXISTS idx_sessions_updated ON chat_sessions(updated_at DESC);
CREATE INDEX IF NOT EXISTS idx_messages_session ON chat_messages(session_id);
CREATE INDEX IF NOT EXISTS idx_messages_created ON chat_messages(created_at);
CREATE INDEX IF NOT EXISTS idx_chat_logs_session ON chat_logs(session_id);
CREATE INDEX IF NOT EXISTS idx_leads_created ON leads(created_at DESC);

-- ─── 6. Enable RLS ──────────────────────────────────────────
ALTER TABLE chat_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_logs ENABLE ROW LEVEL SECURITY;

-- ─── 7. Drop ALL old policies first (clean slate) ───────────
DROP POLICY IF EXISTS anon_insert_sessions ON chat_sessions;
DROP POLICY IF EXISTS anon_select_sessions ON chat_sessions;
DROP POLICY IF EXISTS anon_update_sessions ON chat_sessions;
DROP POLICY IF EXISTS anon_insert_messages ON chat_messages;
DROP POLICY IF EXISTS anon_select_messages ON chat_messages;
DROP POLICY IF EXISTS anon_insert_leads ON leads;
DROP POLICY IF EXISTS anon_insert_chat_logs ON chat_logs;

-- ─── 8. Create fresh RLS policies ───────────────────────────

-- chat_sessions: anon can INSERT, SELECT, UPDATE
CREATE POLICY anon_insert_sessions ON chat_sessions FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY anon_select_sessions ON chat_sessions FOR SELECT TO anon USING (true);
CREATE POLICY anon_update_sessions ON chat_sessions FOR UPDATE TO anon USING (true) WITH CHECK (true);

-- chat_messages: anon can INSERT, SELECT
CREATE POLICY anon_insert_messages ON chat_messages FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY anon_select_messages ON chat_messages FOR SELECT TO anon USING (true);

-- leads: anon can INSERT
CREATE POLICY anon_insert_leads ON leads FOR INSERT TO anon WITH CHECK (true);

-- chat_logs: anon can INSERT (legacy)
CREATE POLICY anon_insert_chat_logs ON chat_logs FOR INSERT TO anon WITH CHECK (true);

-- ─── 9. Auto-update updated_at trigger ──────────────────────
CREATE OR REPLACE FUNCTION update_chat_session_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_chat_sessions_updated ON chat_sessions;
CREATE TRIGGER trg_chat_sessions_updated
  BEFORE UPDATE ON chat_sessions
  FOR EACH ROW
  EXECUTE FUNCTION update_chat_session_timestamp();
