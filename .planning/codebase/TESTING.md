# Testing Patterns

**Analysis Date:** 2026-04-07

## Test Framework

**Runner:** None configured.

No test runner, no test configuration file. The following were checked and are absent:
- `vitest.config.*`
- `jest.config.*`
- `playwright.config.*`
- `cypress.config.*`

No test dependencies in `package.json` (`devDependencies` contains only Vite, ESLint, TypeScript, and type packages).

**Run Commands:**
```bash
# No test commands available.
# package.json scripts: dev, dev:netlify, build, build:dev, lint, preview
```

## Test File Organization

**Test files:** None exist in the repository. The search for `*.test.*` and `*.spec.*` files returned zero results across the entire codebase.

## Test Coverage

**Coverage:** 0%. No tests of any kind are present.

**What is untested:**
- All UI components (`src/components/`)
- All motion/animation components (`src/components/motion/`)
- All Supabase data layer functions (`src/lib/supabase.ts`) — create/load/save/update operations, error paths
- All custom hooks (`src/hooks/useScrollReveal.ts`, `src/hooks/useCountUp.ts`)
- ROI calculator logic in `src/components/ROISimulatorSection.tsx` — the `useMemo` metric calculations are pure functions but untested
- Page routing (`src/App.tsx`)
- Chatbot state machine and lead capture flow (`src/components/TawanoChatbot.tsx`)
- Config values (`src/config/chatbots.ts`)

## What Exists Instead of Tests

**Linting only:** The sole automated code quality tool is ESLint (`eslint.config.js`), configured with:
- `@eslint/js` recommended rules
- `typescript-eslint` recommended rules
- `eslint-plugin-react-hooks` recommended rules
- `eslint-plugin-react-refresh`
- `@typescript-eslint/no-unused-vars` is explicitly turned **off**

Run linting with:
```bash
npm run lint
```

**Manual verification only:** All functional correctness is verified by running the dev server:
```bash
npm run dev
```

**Supabase diagnostic function:** `testSupabaseConnection()` in `src/lib/supabase.ts` is a runtime connectivity check (not a test), callable from the browser console or component code.

## Adding Tests — Recommended Setup

Since the stack is Vite + React + TypeScript, Vitest is the natural choice as it shares the Vite config and requires minimal setup.

**Install:**
```bash
npm install -D vitest @testing-library/react @testing-library/user-event @testing-library/jest-dom jsdom
```

**Minimal `vitest.config.ts`:**
```ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/test/setup.ts"],
  },
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
});
```

**`src/test/setup.ts`:**
```ts
import "@testing-library/jest-dom";
```

**Highest-value tests to write first (priority order):**

1. **ROI metric calculations** — pure logic, no mocking needed:
   ```ts
   // src/components/ROISimulatorSection.test.ts
   // Test: monthlyGrossSavings = weeklyHours * hourlyCost * 4.33 * (rate/100)
   // Test: paybackMonths = null when netSavings === 0
   ```

2. **`useCountUp` hook** — animation frame logic:
   ```ts
   // src/hooks/useCountUp.test.ts
   // Test: returns 0 when isActive is false
   // Test: reaches target value when isActive is true
   ```

3. **Supabase functions in `src/lib/supabase.ts`** — mock the Supabase client:
   ```ts
   // Test: createSession returns null on error, not throws
   // Test: loadSessions returns [] on error
   ```

4. **`cn()` utility** in `src/lib/utils.ts` — trivial but establishes test infra:
   ```ts
   // src/lib/utils.test.ts
   // Test: merges conflicting Tailwind classes correctly
   ```

## Test Types

**Unit Tests:** Not present. Recommended for pure functions and hooks.

**Integration Tests:** Not present. Recommended for the Supabase data layer with mocked client.

**E2E Tests:** Not present. Playwright would cover the chatbot flow and ROI simulator interaction.

**Component Tests:** Not present. React Testing Library would cover Navigation, HeroSection, ROISimulatorSection rendering.

---

*Testing analysis: 2026-04-07*
