import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  publicDir: path.resolve(__dirname, "public"),
  server: {
    host: "::",
    port: 8080,
    proxy: {
      "/.netlify/functions": {
        target: "http://localhost:8888",
        changeOrigin: true,
      },
    },
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./dist/src"),
    },
  },
  build: {
    // Write built output back into dist/ without deleting source files
    outDir: path.resolve(__dirname, "dist"),
    emptyOutDir: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Core React vendor chunk — cached long-term
          if (id.includes("node_modules/react/") || id.includes("node_modules/react-dom/") || id.includes("node_modules/react-router")) {
            return "vendor";
          }
          // Animation library — separate chunk so it doesn't block core render
          if (id.includes("node_modules/framer-motion")) {
            return "framer-motion";
          }
          // Icons — large module, lazy-cacheable
          if (id.includes("node_modules/lucide-react")) {
            return "icons";
          }
          // Radix UI primitives
          if (id.includes("node_modules/@radix-ui")) {
            return "radix-ui";
          }
          // Supabase — only needed for chatbot
          if (id.includes("node_modules/@supabase")) {
            return "supabase";
          }
        },
      },
    },
    minify: "esbuild",
    sourcemap: false,
    chunkSizeWarningLimit: 600,
    // Reduce CSS size through minification
    cssMinify: "esbuild",
    // Target modern browsers for smaller output
    target: "es2020",
  },
}));
