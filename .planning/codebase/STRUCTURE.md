# Codebase Structure

**Analysis Date:** 2026-04-07

## Directory Layout

```
project-root/
├── index.html                    # HTML shell — SEO meta, OG tags, manifest, font preconnects
├── netlify.toml                  # Netlify build config, SPA redirect, caching/security headers
├── vite.config.ts                # Vite build config, path alias @/, dev proxy for Netlify functions
├── tailwind.config.ts            # Tailwind theme (custom colours, animations, typography)
├── tsconfig.json                 # TypeScript project references
├── tsconfig.app.json             # App-specific TS config (paths, strict mode)
├── tsconfig.node.json            # Node/build tool TS config
├── package.json                  # Dependencies, scripts
├── components.json               # shadcn/ui CLI config (component install target)
├── postcss.config.js             # PostCSS (Tailwind + autoprefixer)
├── eslint.config.js              # ESLint flat config
├── supabase-setup.sql            # Legacy Supabase schema bootstrap
├── supabase-setup-v2.sql         # Current Supabase schema (chat_sessions, chat_messages, leads, RLS)
│
├── src/
│   ├── main.tsx                  # React entry point — createRoot
│   ├── App.tsx                   # Provider shell, router, global chatbot mount
│   ├── index.css                 # Global CSS — Tailwind layers, CSS variables, custom utilities
│   ├── App.css                   # App-level CSS (minimal)
│   ├── vite-env.d.ts             # Vite env type declarations
│   │
│   ├── pages/                    # Route-level components (1 file per route)
│   │   ├── Index.tsx             # Main landing page — all marketing sections inline
│   │   ├── Impressum.tsx         # Legal notice page
│   │   ├── Datenschutz.tsx       # Privacy policy page
│   │   ├── AGB.tsx               # Terms of service page
│   │   └── NotFound.tsx          # 404 page
│   │
│   ├── components/               # Feature and section components
│   │   ├── TawanoChatbot.tsx     # AI chat widget — full session/lead/persist logic
│   │   ├── Navigation.tsx        # Sticky top nav with IntersectionObserver section tracking
│   │   ├── Footer.tsx            # Site footer with legal links
│   │   ├── ContactSection.tsx    # Contact form using EmailJS
│   │   ├── FAQSection.tsx        # Accordion FAQ
│   │   ├── WorkflowAnimation.tsx # Animated step-by-step automation diagram
│   │   ├── FloatingCTA.tsx       # Floating call-to-action button
│   │   ├── NavLink.tsx           # Single nav link primitive
│   │   ├── HeroSection.tsx       # Hero section component
│   │   ├── ServicesSection.tsx   # Services overview section
│   │   ├── ProblemSection.tsx    # Problem/pain point section
│   │   ├── ProcessSection.tsx    # Process explanation section
│   │   ├── PackagesSection.tsx   # Pricing packages section
│   │   ├── ROISimulatorSection.tsx # ROI calculator section
│   │   ├── DigitalEmployeeSection.tsx # Digital employee feature section
│   │   ├── SocialProofSection.tsx # Testimonials / social proof
│   │   ├── ChatbotsDock.tsx      # Animated chatbot icon teasers dock
│   │   ├── ChatbotDeviceTeaser.tsx # Individual chatbot teaser device
│   │   ├── ChatbotModal.tsx      # Chatbot embed modal
│   │   └── ChatbotSidePanel.tsx  # Chatbot side panel variant
│   │
│   ├── components/motion/        # Reusable animation wrapper components
│   │   ├── ScrollReveal.tsx      # Entrance animation on scroll into view
│   │   ├── StaggerContainer.tsx  # Parent/child stagger animation
│   │   ├── GradientBlob.tsx      # Animated background gradient blob
│   │   ├── TypingHero.tsx        # Terminal-style typing intro sequence
│   │   ├── BackgroundActivity.tsx # Background ambient motion
│   │   └── ParallaxLayer.tsx     # Scroll parallax wrapper
│   │
│   ├── components/ui/            # shadcn/ui design system primitives (40+ components)
│   │   ├── button.tsx            # Button with variants (hero, outline, etc.)
│   │   ├── input.tsx             # Text input
│   │   ├── textarea.tsx          # Textarea
│   │   ├── dialog.tsx            # Modal dialog
│   │   ├── accordion.tsx         # Accordion (used in FAQ)
│   │   ├── toast.tsx / toaster.tsx / sonner.tsx  # Toast notification system
│   │   ├── slider.tsx            # Range slider (used in ROI calculator)
│   │   ├── card.tsx              # Card container
│   │   └── [35 more primitives] # Full shadcn/ui library
│   │
│   ├── hooks/                    # Custom React hooks
│   │   ├── useCountUp.ts         # Animates a number from 0 to target using rAF
│   │   ├── useScrollReveal.ts    # Wraps framer-motion useInView for entrance detection
│   │   ├── use-mobile.tsx        # Returns boolean for mobile breakpoint
│   │   └── use-toast.ts          # Toast state hook (shadcn pattern)
│   │
│   ├── lib/                      # Utilities and external service clients
│   │   ├── supabase.ts           # Supabase client singleton + all DB operation functions
│   │   └── utils.ts              # cn() — clsx + tailwind-merge helper
│   │
│   └── config/                   # Static app configuration
│       ├── chatbots.ts           # CHATBOTS map, TEASER_MODE, TEASER_TIMINGS
│       └── chat.ts               # (Reserved — currently minimal)
│
├── netlify/
│   └── functions/
│       ├── chat.ts               # Serverless function — OpenAI proxy (gpt-4o-mini)
│       ├── knowledge.txt         # Chatbot knowledge base document (loaded into system prompt)
│       └── prompt.txt            # System prompt draft file
│
├── public/                       # Static assets served at root
│   ├── tawano-logo.png           # Primary logo (referenced as /tawano-logo.png)
│   ├── favicon.ico               # Favicon
│   ├── manifest.json             # PWA manifest
│   ├── robots.txt                # SEO robots directives
│   ├── sitemap.xml               # XML sitemap
│   ├── _headers                  # Netlify static headers override
│   └── _redirects                # Netlify static redirects override
│
├── dist/                         # Build output (generated, not committed)
└── .planning/
    └── codebase/                 # GSD codebase analysis documents
```

## Directory Purposes

**`src/pages/`:**
- Purpose: One file per client-side route. Route components compose section components; they do not contain business logic themselves, with the exception of `Index.tsx` which is large and contains the inline navigation, ROI calculator logic, and motion setup.
- Key files: `src/pages/Index.tsx` (primary landing page, ~400+ lines)

**`src/components/`:**
- Purpose: All non-primitive UI components. Feature sections and interactive widgets live here at the flat root level.
- No subdirectory for "sections" vs "widgets" — all co-located at one level.

**`src/components/motion/`:**
- Purpose: Animation wrappers only. No business logic, no API calls. These are layout-level building blocks for scroll and entrance effects.

**`src/components/ui/`:**
- Purpose: shadcn/ui component library, installed and managed by the shadcn CLI. Do not manually edit these unless overriding a variant. Add new primitives by running the shadcn CLI.

**`src/lib/`:**
- Purpose: External service clients and pure utility functions. Currently: Supabase client + all DB functions (`supabase.ts`), and the `cn()` class merge utility (`utils.ts`).

**`src/hooks/`:**
- Purpose: Custom hooks extracted from components. Keep hooks free of component JSX.

**`src/config/`:**
- Purpose: Static, typed configuration objects. No async logic here.

**`netlify/functions/`:**
- Purpose: Netlify serverless functions. Each `.ts` file becomes a function endpoint at `/.netlify/functions/<filename>`. Currently only `chat.ts` is active.

**`public/`:**
- Purpose: Files served verbatim at the site root. Assets here are not processed by Vite. Reference them with absolute paths (`/tawano-logo.png`).

## Key File Locations

**Entry Points:**
- `src/main.tsx`: React mount
- `src/App.tsx`: Provider shell and router
- `index.html`: HTML shell with meta/SEO
- `netlify/functions/chat.ts`: Serverless function handler

**Configuration:**
- `vite.config.ts`: Vite, dev proxy, path alias `@/`
- `tailwind.config.ts`: Design tokens, custom animations
- `netlify.toml`: Deployment, redirects, security headers
- `components.json`: shadcn/ui install target
- `supabase-setup-v2.sql`: Authoritative database schema

**Core Logic:**
- `src/lib/supabase.ts`: All Supabase interactions
- `src/components/TawanoChatbot.tsx`: Chat widget with session/lead logic
- `src/components/ContactSection.tsx`: EmailJS contact form
- `netlify/functions/chat.ts`: OpenAI proxy

**Testing:**
- No test files present. No test runner configured.

## Naming Conventions

**Files:**
- React components: `PascalCase.tsx` — e.g., `TawanoChatbot.tsx`, `ScrollReveal.tsx`
- Hooks: `camelCase.ts` prefixed with `use` — e.g., `useCountUp.ts`, `useScrollReveal.ts`
- Config/lib modules: `camelCase.ts` — e.g., `chatbots.ts`, `supabase.ts`, `utils.ts`
- shadcn/ui primitives: `kebab-case.tsx` — e.g., `accordion.tsx`, `alert-dialog.tsx`
- Netlify functions: `kebab-case.ts` — e.g., `chat.ts`

**Directories:**
- All lowercase — `components`, `pages`, `hooks`, `lib`, `config`, `motion`, `ui`

**Exports:**
- Pages: `default export` — e.g., `export default Index`
- Feature components: named export — e.g., `export const TawanoChatbot`
- Hooks: named export — e.g., `export function useCountUp`
- Lib functions: named exports — e.g., `export async function createSession`
- Config objects: named exports — e.g., `export const CHATBOTS`

## Where to Add New Code

**New landing page section:**
- Create component: `src/components/<SectionName>Section.tsx` (named export)
- Import and place in: `src/pages/Index.tsx`

**New route/page:**
- Create page: `src/pages/<PageName>.tsx` (default export)
- Register route in: `src/App.tsx` inside `<Routes>`

**New animation wrapper:**
- Add to: `src/components/motion/<Name>.tsx`

**New Supabase table operation:**
- Add typed interface and async function to: `src/lib/supabase.ts`

**New custom hook:**
- Add to: `src/hooks/use<Name>.ts` (named export)

**New utility function:**
- Add to: `src/lib/utils.ts` if generic, or a new `src/lib/<domain>.ts` file if domain-specific

**New shadcn/ui primitive:**
- Run: `npx shadcn@latest add <component>` — installs to `src/components/ui/`

**New serverless function:**
- Create: `netlify/functions/<name>.ts` with an exported `handler` function
- Access at: `/.netlify/functions/<name>`
- Dev proxy is already configured in `vite.config.ts` for `/.netlify/functions/*`

**New static config:**
- Add to: `src/config/chatbots.ts` if chatbot-related, or create `src/config/<domain>.ts`

**New environment variable:**
- Client-side (exposed to browser): prefix with `VITE_` — reference as `import.meta.env.VITE_*`
- Server-side (Netlify function only): no prefix — reference as `process.env.*`
- Document in: `.env.example`

## Path Alias

The `@/` alias resolves to `src/`. Use it for all cross-directory imports:

```typescript
import { supabase } from "@/lib/supabase";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { useCountUp } from "@/hooks/useCountUp";
import { cn } from "@/lib/utils";
```

Never use relative `../` paths across directory boundaries.

## Special Directories

**`dist/`:**
- Purpose: Vite build output
- Generated: Yes
- Committed: No (in `.gitignore`)

**`node_modules/`:**
- Generated: Yes
- Committed: No

**`public/`:**
- Purpose: Static files copied verbatim to `dist/` root
- Generated: No
- Committed: Yes

**`.planning/`:**
- Purpose: GSD planning documents, roadmaps, phases
- Generated: By GSD commands
- Committed: Yes

**`netlify/functions/`:**
- Purpose: Serverless function source files
- Generated: No
- Committed: Yes
- Note: `knowledge.txt` and `prompt.txt` are source files bundled with the function — treat as code

---

*Structure analysis: 2026-04-07*
