import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  // Source lives in dist/src — make dist/ the Vite root so that
  // index.html's "/src/main.tsx" resolves correctly.
  root: path.resolve(__dirname, "dist"),
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
        manualChunks: {
          vendor: ["react", "react-dom", "react-router-dom"],
        },
      },
    },
    minify: "esbuild",
    sourcemap: false,
    chunkSizeWarningLimit: 1000,
  },
}));
