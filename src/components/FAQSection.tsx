import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const faqs = [
  {
    question: "Welche Aufgaben kann ein digitaler Mitarbeiter übernehmen?",
    answer:
      "Typische Aufgaben sind Support-Antworten, E-Mails, Lead-Erkennung und einfache Abläufe im Backoffice.",
  },
  {
    question: "Wie schnell kann ein Unternehmen starten?",
    answer:
        "Ein erster Ablauf kann oft in wenigen Wochen starten. Das hängt vom Umfang und von Ihren Systemen ab.",
  },
  {
    question: "Für welche Firmen lohnt sich Automatisierung besonders?",
    answer:
      "Besonders für Firmen mit vielen wiederkehrenden Aufgaben, vielen Kundenanfragen oder langen Antwortzeiten.",
  },
  {
    question: "Kann das System bestehende Software integrieren?",
    answer:
      "Ja. Wir binden Ihr CRM, Ticketsystem oder andere Tools an, damit alles sauber zusammenarbeitet.",
  },
  {
    question: "Wie erkennt das System Support-Anfragen oder Leads?",
    answer:
      "Das System prüft Inhalte und Absicht der Nachricht und ordnet sie automatisch richtig ein.",
  },
];

export const FAQSection = () => {
  const scrollToContact = () => {
    const element = document.querySelector("#kontakt");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="faq" className="py-24 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/20 to-transparent" />

      <div className="container px-4 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-16 max-w-3xl mx-auto"
        >
          <span className="section-kicker mb-5">
            Häufige Fragen
          </span>
          <h2 className="section-title mb-4">
            Häufige Fragen, klar beantwortet
          </h2>
          <p className="section-copy">
            Hier finden Sie klare Antworten für eine schnelle Entscheidung.
            Wenn etwas offen bleibt, klären wir es direkt im Gespräch.
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <AccordionItem
                  value={`item-${index}`}
                  className="bg-card border border-border rounded-xl px-6 data-[state=open]:border-primary/50 transition-colors duration-200"
                >
                  <AccordionTrigger className="text-left hover:no-underline py-5 text-base font-medium">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-5">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-10 text-center"
          >
            <p className="text-sm text-muted-foreground mb-5">
              Sie haben einen konkreten Engpass? Wir geben Ihnen eine klare Empfehlung.
            </p>
            <Button variant="heroOutline" size="lg" onClick={scrollToContact}>
              Beratung anfragen
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
