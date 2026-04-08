import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Impressum from "./pages/Impressum";
import Datenschutz from "./pages/Datenschutz";
import AGB from "./pages/AGB";
import ChatbotFunnel from "./pages/ChatbotFunnel";
import WebdesignFunnel from "./pages/WebdesignFunnel";
import DigitalerMitarbeiterFunnel from "./pages/DigitalerMitarbeiterFunnel";
import CustomAutomationFunnel from "./pages/CustomAutomationFunnel";
import { TawanoChatbot } from "./components/TawanoChatbot";
import { AIAssistant } from "./components/ai-assistant/AIAssistant";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
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
        <TawanoChatbot />
        <AIAssistant />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
