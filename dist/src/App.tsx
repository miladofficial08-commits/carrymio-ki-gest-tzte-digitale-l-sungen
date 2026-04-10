import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Index from "./pages/Index";
import { TawanoChatbot } from "./components/TawanoChatbot";

// Lazy-load non-critical routes — only downloaded when visited
const NotFound = lazy(() => import("./pages/NotFound"));
const Impressum = lazy(() => import("./pages/Impressum"));
const Datenschutz = lazy(() => import("./pages/Datenschutz"));
const AGB = lazy(() => import("./pages/AGB"));
const ChatbotFunnel = lazy(() => import("./pages/ChatbotFunnel"));
const WebdesignFunnel = lazy(() => import("./pages/WebdesignFunnel"));
const DigitalerMitarbeiterFunnel = lazy(() => import("./pages/DigitalerMitarbeiterFunnel"));
const CustomAutomationFunnel = lazy(() => import("./pages/CustomAutomationFunnel"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={null}>
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
        <TawanoChatbot />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
