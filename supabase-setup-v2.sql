-- ============================================================
-- Tawano Chatbot v2 — Supabase Schema Migration
-- Run this in Supabase SQL Editor (Dashboard > SQL Editor > New Query)
--
-- SAFE: Uses IF NOT EXISTS everywhere. Will not break existing tables.
-- ============================================================

-- ─── 1. Chat Sessions ────────────────────────────────────────
CREATE TABLE IF NOT EXISTS chat_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  visitor_id TEXT NOT NULL,
  title TEXT DEFAULT 'Neues Gespräch',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  message_count INTEGER DEFAULT 0,
  -- Analytics metadata
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

-- ─── 3. Leads (create if not exists, or leave existing) ─────
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

-- ─── 4. Old chat_logs table (keep if exists, create if not) ─
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

-- ─── 6. Row Level Security ──────────────────────────────────
ALTER TABLE chat_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_logs ENABLE ROW LEVEL SECURITY;

-- ─── 7. RLS Policies (idempotent with DO blocks) ────────────

-- chat_sessions: anon can INSERT, SELECT, UPDATE
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'chat_sessions' AND policyname = 'anon_insert_sessions') THEN
    CREATE POLICY anon_insert_sessions ON chat_sessions FOR INSERT TO anon WITH CHECK (true);
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'chat_sessions' AND policyname = 'anon_select_sessions') THEN
    CREATE POLICY anon_select_sessions ON chat_sessions FOR SELECT TO anon USING (true);
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'chat_sessions' AND policyname = 'anon_update_sessions') THEN
    CREATE POLICY anon_update_sessions ON chat_sessions FOR UPDATE TO anon USING (true) WITH CHECK (true);
  END IF;
END $$;

-- chat_messages: anon can INSERT, SELECT
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'chat_messages' AND policyname = 'anon_insert_messages') THEN
    CREATE POLICY anon_insert_messages ON chat_messages FOR INSERT TO anon WITH CHECK (true);
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'chat_messages' AND policyname = 'anon_select_messages') THEN
    CREATE POLICY anon_select_messages ON chat_messages FOR SELECT TO anon USING (true);
  END IF;
END $$;

-- leads: anon can INSERT
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'leads' AND policyname = 'anon_insert_leads') THEN
    CREATE POLICY anon_insert_leads ON leads FOR INSERT TO anon WITH CHECK (true);
  END IF;
END $$;

-- chat_logs: anon can INSERT (legacy)
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'chat_logs' AND policyname = 'anon_insert_chat_logs') THEN
    CREATE POLICY anon_insert_chat_logs ON chat_logs FOR INSERT TO anon WITH CHECK (true);
  END IF;
END $$;

-- ─── 8. Auto-update updated_at on chat_sessions ─────────────
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
