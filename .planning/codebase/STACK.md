# Technology Stack

**Analysis Date:** 2026-04-07

## Languages

**Primary:**
- TypeScript 5.8 - All application source code (`src/`) and Netlify functions (`netlify/functions/`)
- TSX - React component files throughout `src/components/` and `src/pages/`

**Secondary:**
- CSS - Global styles in `src/index.css` and `src/App.css`

## Runtime

**Environment:**
- Node.js (v22 types via `@types/node ^22.16.5`)
- Browser (SPA, no SSR)
- Netlify Functions (serverless, Node.js-based)

**Package Manager:**
- npm (primary — `package-lock.json` present)
- bun lockfile also present (`bun.lockb`) — dual lockfile situation
- Lockfile: Both `package-lock.json` and `bun.lockb` committed

## Frameworks

**Core:**
- React 18.3 - UI framework, SPA architecture
- React Router DOM 6.30 - Client-side routing (`src/App.tsx`)
- TanStack React Query 5.83 - Server state management (`src/App.tsx`)

**UI Component System:**
- shadcn/ui - Component library scaffolded via `components.json`
  - Config: `components.json` (style: default, base: slate, CSS variables enabled)
  - Components live in `src/components/ui/`
- Radix UI - Primitive headless components (full suite: accordion, dialog, dropdown, tooltip, etc.)
- Framer Motion 12.38 - Animations (`src/components/` throughout)
- Lucide React 0.462 - Icon library

**Styling:**
- Tailwind CSS 3.4 - Utility-first CSS, config: `tailwind.config.ts`
  - Dark mode: class-based
  - Custom animations: fade-up, float, pulse-glow, shimmer, gradient-shift
  - Font: Inter (system-ui fallback)
- tailwindcss-animate - Animation plugin
- PostCSS + Autoprefixer - CSS processing, config: `postcss.config.js`
- class-variance-authority 0.7 - Component variant management
- clsx + tailwind-merge - Conditional classname utilities

**Forms:**
- React Hook Form 7.61 - Form state management
- @hookform/resolvers 3.10 - Validation schema integration

**Testing:**
- Not detected — no test framework configured

**Build/Dev:**
- Vite 5.4 - Build tool and dev server, config: `vite.config.ts`
  - Plugin: `@vitejs/plugin-react-swc` (SWC-based React transform, faster than Babel)
  - Plugin: `lovable-tagger` (dev-only component tagging for Lovable platform)
  - Dev server: port 8080, proxy `/.netlify/functions` → localhost:8888
  - Build: esbuild minifier, no sourcemaps, manual chunk splitting (vendor chunk)
  - Path alias: `@` → `./src`
- ESLint 9.32 - Linting, config: `eslint.config.js`
  - Plugins: `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`
  - TypeScript ESLint 8.38

## Key Dependencies

**Critical:**
- `@supabase/supabase-js ^2.101.1` - Database client (chat sessions, messages, leads) — `src/lib/supabase.ts`
- `openai ^6.33.0` - OpenAI SDK installed but NOT used directly; the Netlify function calls OpenAI REST API via native `fetch` instead
- `@emailjs/browser ^4.4.1` - Client-side email sending for contact form — `src/components/ContactSection.tsx`
- `@netlify/functions ^5.1.5` - Serverless function handler types — `netlify/functions/chat.ts`

**Infrastructure:**
- `framer-motion ^12.38.0` - Used throughout all major components for scroll/enter animations
- `@tanstack/react-query ^5.83.0` - Installed and wired in `src/App.tsx`; no explicit query hooks found in explored source, available for data fetching
- `recharts ^2.15.4` - Chart library (present in deps, used in ROI simulator)
- `react-hook-form ^7.61.1` - Form handling
- `date-fns ^3.6.0` - Date utilities
- `embla-carousel-react ^8.6.0` - Carousel component
- `next-themes ^0.3.0` - Theme (dark/light) management
- `sonner ^1.7.4` - Toast notifications (alongside Radix toast)
- `vaul ^0.9.9` - Drawer component
- `cmdk ^1.1.1` - Command palette
- `react-resizable-panels ^2.1.9` - Resizable panel layouts
- `input-otp ^1.4.2` - OTP input component
- `react-day-picker ^8.10.1` - Date picker

## Configuration

**Environment:**
- Vite env vars prefixed with `VITE_` are exposed to the browser
- `OPENAI_API_KEY` is a server-side secret (Netlify environment variable, not prefixed)
- `.env.example` present at project root documenting EmailJS vars only
- `.env` file present (never read — contains live secrets)

**Build:**
- `vite.config.ts` — Vite build and dev configuration
- `tailwind.config.ts` — Tailwind theme and plugin configuration
- `postcss.config.js` — PostCSS pipeline
- `tsconfig.json` — Root TypeScript config (references app + node configs)
- `tsconfig.app.json` — App TypeScript config (target ES2020, strict: false)
- `tsconfig.node.json` — Node/config-files TypeScript config
- `eslint.config.js` — ESLint flat config
- `components.json` — shadcn/ui component generator config
- `netlify.toml` — Netlify deployment, redirect rules, security headers, cache policy

## Platform Requirements

**Development:**
- Node.js (v22 compatible)
- npm or bun
- Netlify CLI for local function development (`npx netlify dev` on port 8888)
- Vite dev server proxies `/.netlify/functions` to port 8888

**Production:**
- Netlify (static hosting + serverless functions)
- Build output: `dist/` directory
- Functions directory: `netlify/functions/`
- SPA fallback configured: all routes → `/index.html`

---

*Stack analysis: 2026-04-07*
