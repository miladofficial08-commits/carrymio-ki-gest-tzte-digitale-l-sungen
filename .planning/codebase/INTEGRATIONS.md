# External Integrations

**Analysis Date:** 2026-04-07

## APIs & External Services

**AI / LLM:**
- OpenAI (GPT-4o-mini) — Powers the Tawano AI chatbot
  - SDK: `openai ^6.33.0` (installed but unused; raw `fetch` used instead)
  - Endpoint: `https://api.openai.com/v1/chat/completions`
  - Auth: `OPENAI_API_KEY` (Netlify server-side environment variable)
  - Model: `gpt-4o-mini`, max_tokens: 500, temperature: 0.7
  - Implementation: `netlify/functions/chat.ts` (serverless function, never exposes key to browser)

**Email:**
- EmailJS — Client-side transactional email for contact form submissions
  - SDK: `@emailjs/browser ^4.4.1`
  - Endpoint called: `https://api.emailjs.com` (visible in CSP)
  - Auth: `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, `VITE_EMAILJS_PUBLIC_KEY`
  - Implementation: `src/components/ContactSection.tsx`
  - Note: All three vars are required; form renders error toast if any are missing

**Fonts:**
- Google Fonts — Font delivery for Inter typeface
  - Preconnect: `https://fonts.googleapis.com`, `https://fonts.gstatic.com`
  - No API key required

## Data Storage

**Databases:**
- Supabase (PostgreSQL) — Stores chat sessions, messages, and leads
  - Project URL visible in `index.html` DNS prefetch: `https://fcjuqyrcehhtaejxpfey.supabase.co`
  - Client: `@supabase/supabase-js ^2.101.1`
  - Connection env vars: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`
  - Client initialization: `src/lib/supabase.ts`
  - Tables used:
    - `chat_sessions` — visitor sessions with metadata (is_lead, service_interest, etc.)
    - `chat_messages` — individual messages per session
    - `leads` — captured lead contact data (name, email, company, project)
    - `chat_logs` — legacy table, kept for backward compatibility
  - Row-level security enabled (errors reference RLS in `src/lib/supabase.ts`)
  - Schema setup files: `supabase-setup.sql`, `supabase-setup-v2.sql` at project root

**File Storage:**
- Local filesystem only (static assets in `public/`)

**Caching:**
- None (no Redis, no Memcached)
- Browser: Netlify CDN cache headers configured in `netlify.toml`
  - Assets (`/assets/*`): `max-age=31536000, immutable`
  - JS/CSS: `max-age=31536000, immutable`
  - JSON: `max-age=3600`
  - HTML: `no-cache, no-store, must-revalidate`

## Authentication & Identity

**Auth Provider:**
- None — No user login system
- Visitor identification: `localStorage` key `tawano-visitor-id` (UUID, generated client-side)
  - Implementation: `src/components/TawanoChatbot.tsx` (`getVisitorId()` function)
  - Survives page refresh and tab close; scoped to browser profile

## Monitoring & Observability

**Error Tracking:**
- None detected (no Sentry, no Datadog, no LogRocket)

**Logs:**
- `console.log` / `console.error` throughout `src/lib/supabase.ts` for all DB operations
- Structured log prefixes: `[Supabase]`, includes operation name and truncated IDs

## CI/CD & Deployment

**Hosting:**
- Netlify
  - Build command: `npm run build`
  - Publish directory: `dist`
  - Functions directory: `netlify/functions`
  - Config: `netlify.toml`

**CI Pipeline:**
- Not detected (no GitHub Actions, no CircleCI config found)

**Local Development:**
- Vite dev server: `npm run dev` (port 8080)
- With Netlify Functions: `npm run dev:netlify` (uses `npx netlify dev`, port 8888)
- Vite proxies `/.netlify/functions` → `http://localhost:8888`

## Environment Configuration

**Required env vars (frontend — must have `VITE_` prefix):**
- `VITE_SUPABASE_URL` — Supabase project URL
- `VITE_SUPABASE_ANON_KEY` — Supabase anonymous public key
- `VITE_EMAILJS_SERVICE_ID` — EmailJS service identifier
- `VITE_EMAILJS_TEMPLATE_ID` — EmailJS template identifier
- `VITE_EMAILJS_PUBLIC_KEY` — EmailJS public key
- `VITE_CHAT_API_URL` — (Optional) Override for chat API endpoint; defaults to `/.netlify/functions/chat`

**Required env vars (server-side — Netlify environment, NOT prefixed):**
- `OPENAI_API_KEY` — OpenAI API key; used only in `netlify/functions/chat.ts`

**Secrets location:**
- Development: `.env` file at project root (gitignored)
- Production: Netlify Dashboard → Site Settings → Environment Variables
- Template: `.env.example` documents EmailJS vars only (missing Supabase and OpenAI vars)

## Webhooks & Callbacks

**Incoming:**
- None detected

**Outgoing:**
- `POST https://api.openai.com/v1/chat/completions` — from `netlify/functions/chat.ts` on each chat message
- `EmailJS.send(...)` — from browser via `@emailjs/browser` on contact form submit

## Content Security Policy

The deployed site enforces a strict CSP via `netlify.toml`:
- `connect-src`: allows `https://*.supabase.co`, `wss://*.supabase.co`, `https://api.openai.com`, `https://api.emailjs.com`
- `font-src`: allows `https://fonts.gstatic.com`
- `style-src`: allows `https://fonts.googleapis.com`

Any new external API integration requires a CSP update in `netlify.toml`.

---

*Integration audit: 2026-04-07*
