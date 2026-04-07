# Coding Conventions

**Analysis Date:** 2026-04-07

## Naming Patterns

**Files:**
- React components: PascalCase `.tsx` — `HeroSection.tsx`, `ROISimulatorSection.tsx`, `ScrollReveal.tsx`
- Hooks: camelCase prefixed with `use` — `useScrollReveal.ts`, `useCountUp.ts`, `use-mobile.tsx`, `use-toast.ts`
- Note: shadcn/ui-generated hooks use kebab-case (`use-mobile.tsx`, `use-toast.ts`); project-authored hooks use camelCase (`useScrollReveal.ts`, `useCountUp.ts`)
- Config/data files: camelCase `.ts` — `chatbots.ts`
- Utility files: kebab-case `.ts` — `utils.ts`
- Pages: PascalCase `.tsx` matching route — `Index.tsx`, `NotFound.tsx`, `Impressum.tsx`

**Components/Functions:**
- React components: PascalCase named exports — `export const HeroSection = () => ...`
- Hooks: camelCase with `use` prefix — `export function useScrollReveal(...)`
- Utility functions: camelCase — `export function cn(...)`
- Event handlers inside components: camelCase descriptive verbs — `scrollToSection`, `scrollToContact`
- Type unions: PascalCase — `type Direction = "up" | "down" | ...`, `type LeadStep = "idle" | "name" | ...`

**Variables:**
- camelCase throughout — `weeklyHours`, `hourlyCost`, `automationRate`
- Constants exported from config: SCREAMING_SNAKE_CASE — `CHATBOTS`, `TEASER_MODE`, `TEASER_TIMINGS`
- Framer Motion variant keys: lowercase strings — `"hidden"`, `"visible"`

**Interfaces/Types:**
- PascalCase with `interface` keyword for object shapes — `interface ScrollRevealProps`, `interface ChatSession`
- `type` keyword for unions and aliases — `type Direction`, `type LeadStep`
- Props interfaces named `[Component]Props` — `interface ButtonProps`, `interface ScrollRevealProps`

## TypeScript Usage

**Strictness:** Permissive. Key settings in `tsconfig.app.json` and `tsconfig.json`:
- `"strict": false`
- `"noImplicitAny": false`
- `"strictNullChecks": false`
- `"noUnusedLocals": false`
- `"noUnusedParameters": false`

**Practical implications:**
- Types are used for documentation and IDE support, not as a strict safety net
- `null` returns are not caught by the compiler (e.g., Supabase functions return `T | null`)
- Unused imports do not cause build errors (ESLint rule `@typescript-eslint/no-unused-vars` is also `"off"`)
- Type assertions like `data as ChatSession` are used without runtime validation

**Path Alias:**
- `@/*` maps to `./src/*` — use `@/components/...`, `@/lib/...`, `@/hooks/...` for all internal imports

**Type exports:**
- Interfaces for public data shapes are co-located with their module and exported — see `src/lib/supabase.ts`
- Props interfaces defined at the top of the component file

## Component Patterns

**Structure:**
- All page-level and feature components are named exports (not default) — `export const HeroSection = () => ...`
- Default exports used only for page components — `export default App`, `export default Index`
- Functional components only — no class components

**Props pattern:**
```tsx
interface ScrollRevealProps {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  // ...
}

export const ScrollReveal = ({
  children,
  direction = "up",
  delay = 0,
}: ScrollRevealProps) => { ... };
```

**shadcn/ui components** (`src/components/ui/`):
- Use `cva` (class-variance-authority) for variant-based styling — see `src/components/ui/button.tsx`
- Always use `cn()` from `src/lib/utils.ts` to merge Tailwind classes
- Use `React.forwardRef` for components that need ref forwarding
- Set `displayName` explicitly on forwarded ref components

**Motion components** (`src/components/motion/`):
- Wrap `framer-motion` primitives with project-specific defaults
- Use `useScrollReveal` hook for scroll-triggered animations
- Variants defined inline as object literals, not extracted to constants

**Data/config separation:**
- Static configuration extracted to `src/config/` — `src/config/chatbots.ts`
- Inline `const` arrays/objects for component-local data (e.g., `navLinks` in `Navigation.tsx`, `scenarios` in `Index.tsx`)

## CSS Approach

**Primary:** Tailwind CSS utility classes directly in JSX `className` props.

**CSS custom properties:** Design tokens defined in `src/index.css` `@layer base` as HSL variables:
```css
--primary: 217 91% 50%;
--background: 0 0% 100%;
--radius: 0.75rem;
```

**Custom utility classes** defined in `src/index.css`:
- `@layer utilities` for reusable visual patterns: `.text-gradient`, `.premium-panel`, `.glass`, `.surface-elevated`, `.section-kicker`, `.section-title`, `.section-copy`, `.data-pill`, `.hover-lift`, `.interactive-ring`, `.soft-grid`, `.float-slow`, `.float-slower`
- `@layer components` for animation variants: `.animate-fade-up`, `.animate-fade-up-delay-1` through `-delay-4`

**Class merging:**
- Always use `cn()` from `src/lib/utils.ts` when conditionally applying classes
- `cn()` is a wrapper around `clsx` + `tailwind-merge`

**Font system:**
- Body: `Inter` (Google Fonts, weights 300–800)
- Display/headings: `Fraunces` variable font with `.display-serif` class
- Applied via Tailwind `fontFamily.sans` extension in `tailwind.config.ts`

**Animation:**
- Tailwind custom keyframes + animations defined in `tailwind.config.ts` for component use
- Raw `@keyframes` in `src/index.css` for CSS class animations (`fadeUp`, `float`, `flowPulse`, etc.)
- Framer Motion used for scroll-triggered and interaction animations
- Respects `prefers-reduced-motion` — animations disabled via media query in `src/index.css`

**Dark mode:**
- Configured as `darkMode: ["class"]` in `tailwind.config.ts` but only light theme tokens are defined in `src/index.css`. Dark mode is not implemented.

## Import Organization

**Order used in files:**
1. React and core library imports — `import { useState, useEffect } from "react"`
2. Third-party libraries — `import { motion, AnimatePresence } from "framer-motion"`
3. Internal components via `@/` alias — `import { Button } from "@/components/ui/button"`
4. Internal hooks — `import { useScrollReveal } from "@/hooks/useScrollReveal"`
5. Internal lib/config — `import { cn } from "@/lib/utils"`
6. Type-only imports interleaved with value imports (no strict separation)

No import sorting tool is configured — order is informal.

## Error Handling

**Client-side data (Supabase):**
- All async Supabase functions wrapped in `try/catch`
- On error: `console.error(...)` and return a safe empty value (`null`, `[]`, `false`)
- No user-facing error UI for data failures; the chatbot silently degrades
- Pattern in `src/lib/supabase.ts`:
```ts
try {
  const { data, error } = await supabase.from(...).select();
  if (error) { console.error("[Supabase] ...", error.message); return null; }
  return data;
} catch (e) {
  console.error("[Supabase] EXCEPTION:", e);
  return null;
}
```

**UI components:**
- No React Error Boundaries present
- No global error handling wrapper in `src/App.tsx`

## Logging

- `console.log` and `console.error` used directly — no logging library
- Supabase operations use structured prefixes: `[Supabase] functionName ...`
- Logs are for development debugging; no log levels or production suppression

## Comments

**Style:**
- Section dividers in large files using ASCII rule: `// ─── Section Name ─────`
- Inline comments for non-obvious logic only — e.g., `// ease-out cubic` in `useCountUp.ts`
- Config comments explain intent: `// FAQ Bot noch nicht konfiguriert`
- No JSDoc/TSDoc on any functions — types serve as documentation

## Function Design

**Size:** Functions are generally compact. `TawanoChatbot.tsx` is the largest component (> 300 lines of JSX + logic). Most components are 50–150 lines.

**React hooks:**
- `useMemo` used for expensive derived state — `ROISimulatorSection.tsx` metric calculations
- `useCallback` used on event handlers in complex components — `TawanoChatbot.tsx`
- `useEffect` with explicit dependency arrays throughout

**Module exports:**
- Named exports for all components and utilities
- No barrel `index.ts` files — import directly from the file path
- `src/lib/utils.ts` exports only `cn`; `src/lib/supabase.ts` exports the client + all typed functions

---

*Convention analysis: 2026-04-07*
