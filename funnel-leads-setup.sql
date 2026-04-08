-- Run this in your Supabase SQL editor to create the funnel_leads table

CREATE TABLE IF NOT EXISTS funnel_leads (
  id          uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
  name        text        NOT NULL,
  email       text        NOT NULL,
  solution    text        NOT NULL,
  answers     jsonb       NOT NULL DEFAULT '{}'::jsonb,
  created_at  timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE funnel_leads ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (website visitors submit without login)
CREATE POLICY "Allow anon insert on funnel_leads"
  ON funnel_leads
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Optional: allow service_role to read all rows
CREATE POLICY "Allow service_role to read funnel_leads"
  ON funnel_leads
  FOR SELECT
  TO service_role
  USING (true);
