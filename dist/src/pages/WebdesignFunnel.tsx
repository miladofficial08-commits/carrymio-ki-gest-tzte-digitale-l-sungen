import { FunnelLayout } from "./FunnelLayout";
import type { FunnelConfig } from "@/components/SolutionFunnel";

const config: FunnelConfig = {
  solution: "webdesign",
  solutionLabel: "Webdesign",
  title: "Ihre neue Website – präzise geplant.",
  subtitle: "4 Fragen. Kein Formular-Chaos. Direkt ein passendes Angebot.",
  questions: [
    {
      id: "art",
      question: "Was benötigen Sie?",
      subtitle: "Frage 1",
      options: [
        { label: "Komplett neue Website", value: "neu", emoji: "✨", description: "Von Grund auf neu aufgebaut" },
        { label: "Redesign der bestehenden", value: "redesign", emoji: "🎨", description: "Besseres Design, gleicher Inhalt" },
        { label: "Landing Page", value: "landing", emoji: "🎯", description: "Fokussiert auf ein Ziel" },
        { label: "Online-Shop", value: "shop", emoji: "🛍️", description: "Produkte oder Services verkaufen" },
      ],
    },
    {
      id: "seiten",
      question: "Wie viele Seiten soll die Website haben?",
      subtitle: "Frage 2",
      options: [
        { label: "1–3 Seiten", value: "1_3", emoji: "📄" },
        { label: "5–10 Seiten", value: "5_10", emoji: "📑" },
        { label: "10–20 Seiten", value: "10_20", emoji: "📋" },
        { label: "Mehr als 20", value: "mehr_20", emoji: "📚" },
      ],
    },
    {
      id: "ziel",
      question: "Was ist Ihr wichtigstes Ziel mit der Website?",
      subtitle: "Frage 3",
      options: [
        { label: "Mehr Leads generieren", value: "leads", emoji: "🎯" },
        { label: "Professioneller Auftritt", value: "branding", emoji: "💼" },
        { label: "Bessere Performance", value: "performance", emoji: "⚡" },
        { label: "Mehr Verkäufe erzielen", value: "sales", emoji: "💰" },
      ],
    },
    {
      id: "deadline",
      question: "Bis wann soll die Website live gehen?",
      subtitle: "Frage 4",
      options: [
        { label: "In 4 Wochen", value: "4_wochen", emoji: "🔥" },
        { label: "In 2–3 Monaten", value: "2_3_monate", emoji: "📅" },
        { label: "Bis Ende des Jahres", value: "jahresende", emoji: "🗓️" },
        { label: "Kein konkretes Datum", value: "offen", emoji: "💭" },
      ],
    },
  ],
};

const WebdesignFunnel = () => <FunnelLayout config={config} />;
export default WebdesignFunnel;
