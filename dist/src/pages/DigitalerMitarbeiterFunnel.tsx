import { FunnelLayout } from "./FunnelLayout";
import type { FunnelConfig } from "@/components/SolutionFunnel";

const config: FunnelConfig = {
  solution: "digitale-mitarbeiter",
  solutionLabel: "Digitaler Mitarbeiter",
  title: "Routinearbeit automatisieren – ohne IT-Abteilung.",
  subtitle: "4 kurze Fragen. Danach wissen wir, wie viel Ihrem Team abgenommen werden kann.",
  questions: [
    {
      id: "anfragen",
      question: "Wie viele Support-Anfragen erhalten Sie pro Monat?",
      subtitle: "Frage 1",
      options: [
        { label: "Unter 100", value: "unter_100", emoji: "📥", description: "Kleine, aber stetig wachsende Last" },
        { label: "100 – 500", value: "100_500", emoji: "📊", description: "Spürbare Belastung im Team" },
        { label: "500 – 2.000", value: "500_2000", emoji: "📈", description: "Hohe Routine, viel Potenzial" },
        { label: "Über 2.000", value: "ueber_2000", emoji: "🚀", description: "Klarer Fall für Automatisierung" },
      ],
    },
    {
      id: "mitarbeiter",
      question: "Wie viele Mitarbeiter bearbeiten das aktuell manuell?",
      subtitle: "Frage 2",
      options: [
        { label: "1–2 Personen", value: "1_2", emoji: "👤" },
        { label: "3–5 Personen", value: "3_5", emoji: "👥" },
        { label: "6–10 Personen", value: "6_10", emoji: "🏢" },
        { label: "Mehr als 10", value: "mehr_10", emoji: "🏭" },
      ],
    },
    {
      id: "kanaele",
      question: "Über welche Kanäle kommen die Anfragen rein?",
      subtitle: "Frage 3",
      options: [
        { label: "E-Mail", value: "email", emoji: "✉️" },
        { label: "Website / Kontaktformular", value: "website", emoji: "🌐" },
        { label: "WhatsApp / Chat", value: "whatsapp", emoji: "💬" },
        { label: "Mehrere Kanäle", value: "mehrere", emoji: "🔀" },
      ],
    },
    {
      id: "ziel",
      question: "Was soll hauptsächlich automatisiert werden?",
      subtitle: "Frage 4",
      options: [
        { label: "Kundensupport", value: "support", emoji: "🤝" },
        { label: "Lead-Qualifizierung", value: "leads", emoji: "🎯" },
        { label: "Interne Prozesse", value: "intern", emoji: "⚙️" },
        { label: "Alles davon", value: "alles", emoji: "🚀" },
      ],
    },
  ],
};

const DigitalerMitarbeiterFunnel = () => <FunnelLayout config={config} />;
export default DigitalerMitarbeiterFunnel;
