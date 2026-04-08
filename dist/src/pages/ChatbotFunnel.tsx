import { FunnelLayout } from "./FunnelLayout";
import type { FunnelConfig } from "@/components/SolutionFunnel";

const config: FunnelConfig = {
  solution: "chatbot",
  solutionLabel: "Chatbot",
  title: "Ihr Chatbot in wenigen Minuten konfiguriert.",
  subtitle: "Beantworten Sie 4 kurze Fragen – wir erstellen ein Angebot, das genau passt.",
  questions: [
    {
      id: "zweck",
      question: "Wofür soll der Chatbot eingesetzt werden?",
      subtitle: "Frage 1",
      options: [
        { label: "Kundensupport", value: "support", emoji: "💬", description: "Anfragen automatisch beantworten" },
        { label: "Lead-Qualifizierung", value: "leads", emoji: "🎯", description: "Besucher zu Interessenten machen" },
        { label: "FAQ & Informationen", value: "faq", emoji: "📚", description: "Häufige Fragen sofort klären" },
        { label: "Internes Team-Tool", value: "intern", emoji: "🏢", description: "Mitarbeiter entlasten" },
      ],
    },
    {
      id: "volumen",
      question: "Wie viele Anfragen erhalten Sie ungefähr pro Monat?",
      subtitle: "Frage 2",
      options: [
        { label: "Unter 100", value: "unter_100", emoji: "📥" },
        { label: "100 – 500", value: "100_500", emoji: "📊" },
        { label: "500 – 2.000", value: "500_2000", emoji: "📈" },
        { label: "Über 2.000", value: "ueber_2000", emoji: "🚀" },
      ],
    },
    {
      id: "plattform",
      question: "Wo soll der Chatbot aktiv sein?",
      subtitle: "Frage 3",
      options: [
        { label: "Auf meiner Website", value: "website", emoji: "🌐" },
        { label: "WhatsApp", value: "whatsapp", emoji: "📱" },
        { label: "In einer App", value: "app", emoji: "📲" },
        { label: "Noch nicht sicher", value: "offen", emoji: "🤔" },
      ],
    },
    {
      id: "zeitplan",
      question: "Wann möchten Sie starten?",
      subtitle: "Frage 4",
      options: [
        { label: "So schnell wie möglich", value: "sofort", emoji: "⚡" },
        { label: "In 1–2 Monaten", value: "1_2_monate", emoji: "📅" },
        { label: "In 3–6 Monaten", value: "3_6_monate", emoji: "🗓️" },
        { label: "Noch kein fester Plan", value: "offen", emoji: "💭" },
      ],
    },
  ],
};

const ChatbotFunnel = () => <FunnelLayout config={config} />;
export default ChatbotFunnel;
