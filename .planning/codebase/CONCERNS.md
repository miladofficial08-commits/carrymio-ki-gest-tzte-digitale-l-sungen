# Codebase Concerns

**Analysis Date:** 2026-04-07

---

## Brand / Identity Inconsistencies

**Multiple conflicting brand names in active code:**
- Issue: The codebase simultaneously uses "Tawano", "Tabanu", "Carrymio", and "CARRY MIO" as brand names across UI components. These are not old code — they appear in rendered text and contact info.
- Files:
  - `src/components/HeroSection.tsx` lines 24, 35 — renders "Tabanu Digitale Mitarbeiter" and "Tabanu baut KI-gestützte..."
  - `src/components/DigitalEmployeeSection.tsx` lines 34, 71, 77, 99 — renders "Tabanu" as brand name
  - `src/components/FloatingCTA.tsx` line 16 — renders "Tabanu" label
  - `src/components/ProblemSection.tsx` line 31 — "Tabanu ersetzt..."
  - `src/components/ProcessSection.tsx` lines 23, 36 — "Tabanu begleitet..."
  - `src/components/PackagesSection.tsx` line 77 — "Tabanu passgenaue Systeme..."
  - `src/components/ServicesSection.tsx` lines 31, 59 — "Tabanu automatisiert... Tabanu entwickelt..."
  - `src/components/SocialProofSection.tsx` line 41 — "Tabanu fokussiert..."
  - `src/config/chatbots.ts` line 12 — title: "CARRY MIO Support"
- Impact: Visitors see inconsistent brand names. Damages trust and professionalism. Likely causes brand confusion with search engines.
- Fix approach: Global find/replace "Tabanu" → "Tawano" and "CARRY MIO" → "Tawano" across all `src/` files.

---

## SEO Issues

**robots.txt points to wrong domain:**
- Issue: `public/robots.txt` contains `Sitemap: https://carrymio.de/sitemap.xml` but the site is at `tawano.ai`. Google will discover the sitemap under the wrong domain.
- File: `public/robots.txt` line 3
- Impact: Sitemap discovery fails. Indexing may be incomplete.
- Fix approach: Change to `Sitemap: https://tawano.ai/sitemap.xml`.

**sitemap.xml uses wrong domain:**
- Issue: All URLs in `public/sitemap.xml` use `https://carrymio.de/` instead of `https://tawano.ai/`.
- File: `public/sitemap.xml` lines 4, 8, 12, 16
- Impact: Submitted sitemap contains URLs that resolve to a different or nonexistent domain. Google ignores them.
- Fix approach: Replace all `https://carrymio.de/` with `https://tawano.ai/` in sitemap.xml. Also add `<lastmod>` and `<changefreq>` tags to improve crawl efficiency.

**manifest.json uses wrong domain and brand name:**
- Issue: `public/manifest.json` has `name: "Carrymio – KI Chatbots & Digitale Lösungen"`, `short_name: "Carrymio"`, and all URLs pointing to `https://carrymio.de/`. This is the PWA manifest installed on user devices and read by Google.
- File: `public/manifest.json` lines 2, 3, 5, 51, 64, 75
- Impact: Installs with wrong brand name. Screenshot entries use `/logo.svg` which does not exist in `public/`.
- Fix approach: Update all fields to Tawano brand and `https://tawano.ai/` domain. Replace `/logo.svg` references with `/tawano-logo.png` or a proper icon set.

**Open Graph and Twitter Card images point to favicon.ico:**
- Issue: `og:image` and `twitter:image` both use `https://tawano.ai/favicon.ico`. Social sharing previews will show a 48KB ICO file (not a proper 1200x630 social share image). The declared `og:image:width` of 1200 and height of 630 are false.
- File: `index.html` lines 36–38, 46
- Impact: Sharing on LinkedIn, Twitter, WhatsApp shows a blurry icon instead of a branded preview card.
- Fix approach: Create a 1200x630 PNG (`public/og-image.png`) and update both tags to point to it.

**Impressum and Datenschutz pages are silently redirected by Netlify:**
- Issue: `netlify.toml` lines 88–99 redirect `/impressum`, `/datenschutz`, and `/agb` to `/#kontakt` with status 200. The actual React route components exist (`src/pages/Impressum.tsx`, `src/pages/Datenschutz.tsx`, `src/pages/AGB.tsx`) and render correctly client-side via React Router, but a direct browser load or crawler visit to those paths returns the home page HTML instead of the actual legal pages.
- File: `netlify.toml` lines 86–99
- Impact: Search engines and users who share or bookmark legal page URLs land on the homepage. DSGVO compliance risk: legal pages must be directly accessible.
- Fix approach: Remove those three `[[redirects]]` blocks from `netlify.toml`. The existing SPA fallback `/* → /index.html` handles client-side routing correctly.

**Sitemap missing `<lastmod>` and `<changefreq>`:**
- Issue: `public/sitemap.xml` has only `<loc>` and `<priority>`. No `<lastmod>` or `<changefreq>` signals.
- File: `public/sitemap.xml`
- Impact: Crawlers have less information for scheduling re-crawls.
- Fix approach: Add `<lastmod>` and `<changefreq>weekly` to the homepage entry.

**Structured data uses favicon.ico as logo image:**
- Issue: All three JSON-LD schemas in `index.html` (LocalBusiness, Organization, ProfessionalService) reference `https://tawano.ai/favicon.ico` as the `image` and `logo` property. Google's rich result guidelines require images that are not icons or favicons.
- File: `index.html` lines 68, 71, 86, 104
- Impact: Rich results may be rejected by Google Search Console.
- Fix approach: Create a proper logo image (`public/tawano-logo-schema.png`, at least 112x112px) and update all schema `image`/`logo` fields.

**`<title>` and `og:title` language mismatch:**
- Issue: `<title>` is German ("Tawano – Digitale Mitarbeiter"), `og:title` is English ("Tawano - Automate Your Business with Digital Employees"), and `twitter:title` is a third variant. All three should be consistent.
- File: `index.html` lines 8, 32, 44
- Impact: Inconsistent branding in search results vs. social sharing.
- Fix approach: Align all three to the same German value targeting the primary audience.

---

## Legal / Compliance Issues

**Impressum contains template placeholders — never filled in:**
- Issue: `src/pages/Impressum.tsx` contains multiple placeholder strings that were never replaced with real data: `[Vor- und Nachname des Inhabers / der vertretungsberechtigten Person]`, `[Straße und Hausnummer]`, `[HRB XXXXX]`, `[DE XXXXXXXXX]`, `[XX/XXX/XXXXX]`, `[Finanzamt Düsseldorf-...]`.
- File: `src/pages/Impressum.tsx` lines 24, 25, 55, 68, 70
- Impact: Legally invalid Impressum. §5 TMG requires complete, accurate information. Exposing placeholder text is an obvious compliance failure.
- Fix approach: Replace all `[...]` placeholders with real legal data before going live.

**AGB contains template placeholders:**
- Issue: `src/pages/AGB.tsx` line 27 contains `[Vor- und Nachname des Inhabers], [Anschrift], Düsseldorf`. AGB is legally binding and requires complete party identification.
- File: `src/pages/AGB.tsx`
- Impact: AGB without proper party identification is legally unenforceable.
- Fix approach: Fill in the actual person's name and address.

**Datenschutz contains template placeholders:**
- Issue: `src/pages/Datenschutz.tsx` lines 27–28 contain `[Vor- und Nachname des Inhabers]`, `[Straße und Hausnummer]`, `[Postleitzahl]`.
- File: `src/pages/Datenschutz.tsx`
- Impact: DSGVO Art. 13/14 requires the data controller's identity to be fully disclosed. Template text is not compliant.
- Fix approach: Replace all placeholders with real data.

**Contact email is a personal Gmail, not a business address:**
- Issue: The public-facing email shown to visitors is `info.carrymio@gmail.com` in `src/components/ContactSection.tsx`, `src/pages/Impressum.tsx`, and `src/pages/Datenschutz.tsx`. The chatbot system prompt and knowledge files use `info@tawano.de`. These are inconsistent, and using Gmail for a business erodes trust.
- Files: `src/components/ContactSection.tsx` line 191, `src/pages/Impressum.tsx` line 45, `src/pages/Datenschutz.tsx` line 30
- Impact: Brand credibility gap. Visitors see a Gmail address on a premium B2B product page.
- Fix approach: Replace all occurrences of `info.carrymio@gmail.com` with `info@tawano.de` (or `hello@tawano.ai` as used in JSON-LD).

---

## Security Issues

**Chat function uses wildcard CORS (`*`):**
- Issue: `netlify/functions/chat.ts` line 40 sets `Access-Control-Allow-Origin: "*"`. Any website can call the OpenAI-backed chat endpoint, consuming API quota and potentially leaking prompt/model behavior.
- File: `netlify/functions/chat.ts` line 40
- Impact: Unrestricted API abuse. OpenAI costs accumulate from external callers.
- Fix approach: Restrict origin to `https://tawano.ai` (and `http://localhost:8080` for dev): check `event.headers.origin` and only echo it back if it matches an allowlist.

**No rate limiting on the chat endpoint:**
- Issue: `netlify/functions/chat.ts` has no rate limiting or request throttling. The function directly proxies to OpenAI on every call with no per-IP or per-session limits.
- File: `netlify/functions/chat.ts`
- Impact: A single actor can exhaust the OpenAI API key's monthly budget with a script loop.
- Fix approach: Implement token-bucket rate limiting using a Supabase table or Netlify Edge Functions. At minimum, cap requests per visitor ID per minute.

**No input length validation on chat messages:**
- Issue: `netlify/functions/chat.ts` line 79–86 validates that `messages` is a non-empty array but does not validate message length. Each message's `content` field is passed directly to OpenAI.
- File: `netlify/functions/chat.ts` lines 79–106
- Impact: A caller can send extremely large message payloads, increasing OpenAI token costs per request.
- Fix approach: Add `content.length > 2000 → reject 400` guard on each message in the loop.

**`unsafe-inline` in Content-Security-Policy:**
- Issue: Both `public/_headers` and `netlify.toml` CSP include `script-src 'self' 'unsafe-inline'`. This negates XSS protection for inline scripts.
- Files: `public/_headers` line 23, `netlify.toml` line 67
- Impact: CSP header provides reduced XSS protection. Any injected inline script will execute.
- Fix approach: Replace `'unsafe-inline'` with nonce-based CSP. Vite supports nonce injection via plugin.

---

## Performance Issues

**`TawanoChatbot.tsx` is 1,402 lines — far exceeds the 500-line guideline:**
- Issue: `src/components/TawanoChatbot.tsx` is a monolithic 1,402-line file containing session management, API calls, lead capture flow, UI rendering, localStorage helpers, and utility functions.
- File: `src/components/TawanoChatbot.tsx`
- Impact: Hard to maintain, test, or extend. Any change risks regressions across unrelated logic. No unit test coverage is feasible at this size.
- Fix approach: Extract into: `hooks/useChatSession.ts`, `hooks/useLeadCapture.ts`, `lib/chatApi.ts`, `components/ChatWindow.tsx`, `components/ChatSessionList.tsx`.

**`Index.tsx` is 535 lines with mixed concerns:**
- Issue: `src/pages/Index.tsx` contains navigation state, ROI calculator logic, scroll animations, and section orchestration all in one file.
- File: `src/pages/Index.tsx`
- Impact: Difficult to navigate and modify individual page sections independently.
- Fix approach: Extract the ROI calculator into `components/ROISimulatorSection.tsx` (some already exists), move nav items config to a constants file.

**No OG image — social sharing shows favicon:**
- Issue: No `og-image.png` or equivalent social share card exists in `public/`. The favicon (48KB `.ico`) is referenced instead.
- Files: `public/` (missing file), `index.html` lines 36, 46
- Impact: Every social share link shows a tiny icon, not a branded preview. Reduces click-through rate from social media.
- Fix approach: Create `public/og-image.png` at 1200x630px and update `index.html`.

**PWA icons reference non-existent `/logo.svg`:**
- Issue: `public/manifest.json` references `/logo.svg` for all icon sizes (192x192, 512x512, maskable). That file does not exist in `public/`.
- File: `public/manifest.json` lines 13–43
- Impact: PWA install fails to show icon. Chrome shows a blank square. "Add to Home Screen" produces broken icon.
- Fix approach: Generate proper PNG icons at 192x192 and 512x512 from the existing `tawano-logo.png` and update manifest entries.

**No image optimization pipeline:**
- Issue: `public/tawano-logo.png` is 36KB as a general PNG. No WebP variant exists. No `<picture>` element is used in `src/components/Footer.tsx` where it is rendered.
- Files: `public/tawano-logo.png`, `src/components/Footer.tsx` line 8
- Impact: Modern browsers could load a ~5–10KB WebP instead of 36KB PNG. Marginal but real LCP improvement.
- Fix approach: Add WebP conversion to the build pipeline or add a WebP variant manually. Use `<picture>` with WebP source in `Footer.tsx`.

---

## Broken Patterns

**`netlify.toml` has duplicate redirect rules:**
- Issue: `/robots.txt`, `/sitemap.xml`, and `/manifest.json` redirects appear twice in `netlify.toml` — once at lines 8–17 ("MUST BE FIRST") and again at lines 73–80 ("Static Redirects").
- File: `netlify.toml` lines 8–17 and 73–80
- Impact: Netlify processes the first matching rule. Duplicates add confusion and maintenance risk of diverging settings.
- Fix approach: Remove the second set of duplicate redirect blocks (lines 73–80).

**`chatbots.ts` config is unused dead code:**
- Issue: `src/config/chatbots.ts` exports `CHATBOTS`, `TEASER_MODE`, and `TEASER_TIMINGS` with empty `embedUrl` fields and the old brand name "CARRY MIO Support". No component in `src/components/` imports from this file (the active chatbot is `TawanoChatbot.tsx` which uses its own config).
- File: `src/config/chatbots.ts`
- Impact: Dead code that references an old brand name. Misleading if someone reads it.
- Fix approach: Remove the file entirely, or update it to reflect the current chatbot architecture if it is intended for future use.

**`src/lib/supabase.ts` exports a legacy `ChatLog` type and `logChat` function:**
- Issue: Lines 51–56 define `ChatLog` with a comment "Legacy type kept for backward compat" and `logChat` at line 230 writes to a `chat_logs` table that no other code reads. The active flow uses `chat_sessions` + `chat_messages`.
- File: `src/lib/supabase.ts` lines 51–56, 230–236
- Impact: Dead database writes. The `chat_logs` table likely does not exist in the new schema (per `supabase-setup-v2.sql`), so every call silently fails.
- Fix approach: Remove `ChatLog`, `logChat`, and the related `chat_logs` table reference.

**`NotFound.tsx` is English in a German-language product:**
- Issue: `src/pages/NotFound.tsx` renders "Oops! Page not found" and "Return to Home" in English while the entire site is in German.
- File: `src/pages/NotFound.tsx` lines 14, 15, 16
- Impact: Jarring language switch for German users on broken links.
- Fix approach: Translate to German. Also add a proper `<title>` and meta description to the 404 page.

**`supabase.ts` client initialized without null-checking env vars:**
- Issue: `src/lib/supabase.ts` line 6 calls `createClient(supabaseUrl, supabaseAnonKey)` where both vars come from `import.meta.env`. If either env var is missing (e.g., in a preview deploy without env configured), `createClient` receives `undefined`, and all subsequent DB calls throw unhandled exceptions.
- File: `src/lib/supabase.ts` lines 3–6
- Impact: Silent runtime failure. The catch blocks return `null`/`[]`/`false` which masks the real cause.
- Fix approach: Add a guard: `if (!supabaseUrl || !supabaseAnonKey) throw new Error("Supabase env vars not configured")` and surface it clearly in dev.

---

## Test Coverage Gaps

**Zero test files exist:**
- What's not tested: The entire codebase — chatbot session logic, lead capture flow, contact form submission, ROI calculator, Supabase integration, chat API function.
- Files: All files in `src/`, `netlify/functions/`
- Risk: Any refactor, dependency update, or bug fix is made blind. The 1,402-line `TawanoChatbot.tsx` has branching session/lead logic that is impossible to verify without tests.
- Priority: High

---

*Concerns audit: 2026-04-07*
