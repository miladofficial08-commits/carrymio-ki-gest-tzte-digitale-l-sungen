# Architecture

**Analysis Date:** 2026-04-07

## Pattern Overview

**Overall:** Single-Page Application (SPA) with serverless backend functions

**Key Characteristics:**
- React 18 + Vite frontend, deployed as a static site on Netlify
- Serverless API layer via Netlify Functions (one function: `chat.ts`)
- Supabase as persistent data store (chat sessions, messages, leads)
- All routing is client-side via react-router-dom v6; Netlify handles SPA fallback (`/* → /index.html`)
- No Redux or Zustand — state is entirely component-local (useState/useRef) or fetched on demand (TanStack Query client is configured but not actively used for data fetching in current components)

## Layers

**Entry / Bootstrap:**
- Purpose: Mount React tree into DOM
- Location: `src/main.tsx`
- Contains: `createRoot`, global CSS import
- Depends on: `src/App.tsx`, `src/index.css`
- Used by: Browser / Vite dev server

**Application Shell:**
- Purpose: Provider wrappers, routing, global overlays
- Location: `src/App.tsx`
- Contains: `QueryClientProvider`, `TooltipProvider`, `Toaster`/`Sonner` toasts, `BrowserRouter`, top-level `<Routes>`, and the globally mounted `<TawanoChatbot>`
- Depends on: React Query client, react-router-dom, shadcn UI providers
- Used by: `src/main.tsx`

**Pages:**
- Purpose: Route-level components; each maps to a URL path
- Location: `src/pages/`
- Contains: `Index.tsx` (main landing page), `Impressum.tsx`, `Datenschutz.tsx`, `AGB.tsx`, `NotFound.tsx`
- Depends on: Section components, motion utilities, hooks
- Used by: `src/App.tsx` routes

**Feature Components:**
- Purpose: Self-contained UI sections and interactive features
- Location: `src/components/`
- Contains: Landing page sections, chatbot, navigation, footer, chatbot dock teasers
- Depends on: `src/lib/supabase.ts`, `src/config/chatbots.ts`, shadcn UI primitives, framer-motion
- Used by: `src/pages/`

**Motion Primitives:**
- Purpose: Reusable animation wrappers with no business logic
- Location: `src/components/motion/`
- Contains: `ScrollReveal.tsx`, `StaggerContainer.tsx`, `GradientBlob.tsx`, `TypingHero.tsx`, `BackgroundActivity.tsx`, `ParallaxLayer.tsx`
- Depends on: framer-motion, `src/hooks/useScrollReveal.ts`
- Used by: Feature components and `src/pages/Index.tsx`

**UI Primitives:**
- Purpose: shadcn/ui component library (design system layer)
- Location: `src/components/ui/`
- Contains: 40+ Radix UI–based primitives (button, input, dialog, accordion, etc.)
- Depends on: Radix UI packages, `src/lib/utils.ts`
- Used by: All feature components

**Lib / Data Access:**
- Purpose: Supabase client singleton and all database operations
- Location: `src/lib/supabase.ts`
- Contains: Typed Supabase client, functions for `chat_sessions`, `chat_messages`, and `leads` tables
- Depends on: `@supabase/supabase-js`, `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY` env vars
- Used by: `src/components/TawanoChatbot.tsx`

**Config:**
- Purpose: Static configuration objects shared across components
- Location: `src/config/chatbots.ts`
- Contains: `CHATBOTS` map (id, title, embedUrl, badge), `TEASER_MODE`, `TEASER_TIMINGS`
- Used by: `src/components/ChatbotsDock.tsx`, `src/components/ChatbotDeviceTeaser.tsx`

**Hooks:**
- Purpose: Reusable stateful logic extracted from components
- Location: `src/hooks/`
- Contains: `useCountUp.ts` (animated number counter), `useScrollReveal.ts` (InView detection), `use-mobile.tsx` (breakpoint detection), `use-toast.ts` (toast state)
- Used by: Feature components, motion primitives

**Serverless Function:**
- Purpose: Secure proxy that calls OpenAI; prevents API key exposure on the client
- Location: `netlify/functions/chat.ts`
- Contains: Hardcoded `SYSTEM_PROMPT`, request validation, OpenAI `gpt-4o-mini` call via native `fetch`
- Depends on: `OPENAI_API_KEY` environment variable (Netlify dashboard)
- Used by: `src/components/TawanoChatbot.tsx` via `VITE_CHAT_API_URL` or default `/.netlify/functions/chat`

## Data Flow

**Chat message flow:**

1. User types message in `TawanoChatbot.tsx` and submits
2. Component calls `sendChat()` which POSTs `{ messages }` to `/.netlify/functions/chat`
3. Netlify Function prepends `SYSTEM_PROMPT`, sends last 20 messages to OpenAI `gpt-4o-mini`
4. OpenAI returns `reply`; function returns `{ reply }` with JSON
5. Component appends assistant message to local `messages` state
6. Component calls `saveMessage()` (or `saveMessagesBulk()`) on `src/lib/supabase.ts` to persist to `chat_messages` table
7. `updateSessionMeta()` runs to update lead signals on the `chat_sessions` row

**Lead capture flow:**

1. After 2+ user messages containing lead keywords, `shouldCaptureLead()` returns `true`
2. `TawanoChatbot.tsx` initiates a multi-step conversational form (name → email → company → project)
3. On completion, `saveLead()` writes a row to the Supabase `leads` table

**Contact form flow:**

1. User fills `ContactSection.tsx` and submits
2. Component calls `emailjs.send()` directly from the browser using `VITE_EMAILJS_*` env vars
3. EmailJS delivers the email; no server-side component involved

**Scroll-driven animations:**

1. framer-motion `useScroll` / `useTransform` hooks derive parallax values from scroll position
2. `useScrollReveal` hook wraps framer-motion `useInView` to trigger entrance animations once
3. `useCountUp` uses `requestAnimationFrame` for animated stat numbers when in view

## Key Abstractions

**TawanoChatbot:**
- Purpose: Full-featured AI chat widget with session history, lead capture, and Supabase persistence
- Examples: `src/components/TawanoChatbot.tsx`
- Pattern: Single large component managing all chat UI state locally; calls `src/lib/supabase.ts` for persistence and `/.netlify/functions/chat` for inference

**Supabase data layer:**
- Purpose: All reads/writes to Supabase go through named exported functions
- Examples: `src/lib/supabase.ts` — `createSession`, `loadSessions`, `loadMessages`, `saveMessage`, `saveLead`, `updateSessionMeta`
- Pattern: Each function is async, catches exceptions, logs with `[Supabase]` prefix, and returns `null`/`false`/`[]` on failure (never throws to callers)

**ScrollReveal / motion primitives:**
- Purpose: Composable animation wrappers consumed inline in JSX
- Examples: `src/components/motion/ScrollReveal.tsx`, `src/components/motion/StaggerContainer.tsx`
- Pattern: Accept children + animation config props; use `useScrollReveal` hook internally

**Visitor identity:**
- Purpose: Anonymous persistent visitor ID survives tab close / refresh
- Location: `src/components/TawanoChatbot.tsx` — `getVisitorId()` function
- Pattern: `localStorage.getItem('tawano-visitor-id')` → generate UUID if absent

## Entry Points

**Browser entry:**
- Location: `src/main.tsx`
- Triggers: Vite module graph load in browser
- Responsibilities: Mount React app to `#root`

**Netlify Function entry:**
- Location: `netlify/functions/chat.ts` — exported `handler`
- Triggers: HTTP POST to `/.netlify/functions/chat`
- Responsibilities: Validate request, proxy to OpenAI, return `{ reply }`

**HTML shell:**
- Location: `index.html`
- Triggers: Browser navigation; Netlify serves this for all routes via SPA redirect
- Responsibilities: SEO meta tags, Open Graph, font preconnects, Supabase DNS prefetch, PWA manifest link

## Routing

**Client-side routes (react-router-dom v6):**

| Path | Component | Notes |
|------|-----------|-------|
| `/` | `src/pages/Index.tsx` | Main landing page, all sections |
| `/impressum` | `src/pages/Impressum.tsx` | Legal page |
| `/datenschutz` | `src/pages/Datenschutz.tsx` | Privacy policy |
| `/agb` | `src/pages/AGB.tsx` | Terms of service |
| `*` | `src/pages/NotFound.tsx` | 404 fallback |

**Netlify-level redirects** (defined in `netlify.toml`): `/impressum`, `/datenschutz`, `/agb` also redirect to `/#kontakt` at the CDN level — note this creates a conflict with the React router paths above.

**In-page navigation:** `Index.tsx` uses anchor IDs (`#home`, `#kostenrechner`, `#automation`, `#kontakt`) with `scrollIntoView({ behavior: 'smooth' })`. `Navigation.tsx` uses `IntersectionObserver` to track active section.

## Error Handling

**Strategy:** Defensive — Supabase and chat errors are caught, logged to console, and fail silently to the user. Contact form errors surface via `useToast`.

**Patterns:**
- `src/lib/supabase.ts`: Every async function wraps the Supabase call in `try/catch`, returns a typed fallback (`null`, `false`, `[]`), and logs with `[Supabase]` prefix
- `netlify/functions/chat.ts`: Returns structured `{ statusCode, headers, body }` for every error case including 400 (bad input), 405 (wrong method), 500 (missing key), 502 (OpenAI error)
- `src/components/TawanoChatbot.tsx`: Maps error message strings (`CHAT_NETWORK_ERROR`, `CHAT_ENDPOINT_NOT_FOUND`, `CHAT_SERVER_ERROR:*`) to German user-facing messages
- `src/components/ContactSection.tsx`: Validates required fields before submit; catches EmailJS errors and shows toast

## State Management

**No global state manager.** All state is component-local:
- `TawanoChatbot.tsx`: messages, sessions, current session ID, lead capture step, UI open/close state — all in `useState`
- `Index.tsx`: ROI calculator values (employees, salary), scroll progress, mobile menu — all in `useState`
- `Navigation.tsx`: active hash, scroll progress, mobile menu — all in `useState` + `useEffect`
- `ContactSection.tsx`: form fields, submission state — all in `useState`

TanStack Query (`QueryClient`) is wired in `App.tsx` but no `useQuery`/`useMutation` calls exist in the current codebase.

## Cross-Cutting Concerns

**Logging:** `console.log` / `console.error` with `[Supabase]` prefix in `src/lib/supabase.ts`. No structured logging library.

**Validation:** Input validated at component level (ContactSection) and at the serverless function boundary (chat.ts checks for array of messages).

**Authentication:** None. Supabase is accessed with the anon key; RLS policies on the Supabase side control access. Visitor identity is a self-generated localStorage UUID.

**Internationalisation:** German-language UI. No i18n library — strings are hardcoded in components. Number formatting uses `Intl.NumberFormat('de-DE')`.

---

*Architecture analysis: 2026-04-07*
