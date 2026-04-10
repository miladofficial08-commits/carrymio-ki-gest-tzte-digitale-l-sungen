import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";

// Lazy-load all non-critical routes
const NotFound = lazy(() => import("./pages/NotFound"));
const Impressum = lazy(() => import("./pages/Impressum"));
const Datenschutz = lazy(() => import("./pages/Datenschutz"));
const AGB = lazy(() => import("./pages/AGB"));
const ChatbotFunnel = lazy(() => import("./pages/ChatbotFunnel"));
const WebdesignFunnel = lazy(() => import("./pages/WebdesignFunnel"));
const DigitalerMitarbeiterFunnel = lazy(() => import("./pages/DigitalerMitarbeiterFunnel"));
const CustomAutomationFunnel = lazy(() => import("./pages/CustomAutomationFunnel"));

// Lazy-load chatbot — only fetched when component mounts
const TawanoChatbot = lazy(() =>
  import("./components/TawanoChatbot").then((m) => ({ default: m.TawanoChatbot }))
);

const queryClient = new QueryClient();

// Minimal loading fallback (invisible — avoids layout shift)
const PageFallback = () => (
  <div className="min-h-screen bg-background" />
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={<PageFallback />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/chatbot" element={<ChatbotFunnel />} />
            <Route path="/webdesign" element={<WebdesignFunnel />} />
            <Route path="/digitale-mitarbeiter" element={<DigitalerMitarbeiterFunnel />} />
            <Route path="/custom-automation" element={<CustomAutomationFunnel />} />
            <Route path="/impressum" element={<Impressum />} />
            <Route path="/datenschutz" element={<Datenschutz />} />
            <Route path="/agb" element={<AGB />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
        <Suspense fallback={null}>
          <TawanoChatbot />
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
