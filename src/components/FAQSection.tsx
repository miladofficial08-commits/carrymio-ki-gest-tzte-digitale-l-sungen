import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Wie läuft eine Zusammenarbeit mit Carrymio ab?",
    answer:
      "Nach Ihrer Anfrage melden wir uns innerhalb von 24 Stunden bei Ihnen. In einem Beratungsgespräch klären wir Ihre Anforderungen und erstellen Ihnen ein individuelles Angebot. Nach Ihrer Zusage starten wir mit der Umsetzung.",
  },
  {
    question: "Was kostet eine Website bei Carrymio?",
    answer:
      "Ab 179 € / Monat, Setup 999 € einmalig. Der finale Preis hängt vom Umfang und den gewünschten Funktionen ab. In einem Beratungsgespräch klären wir Ihren Bedarf und erstellen ein transparentes, individuelles Angebot.",
  },
  {
    question: "Sind die Lösungen DSGVO-konform?",
    answer:
      "Ja, alle unsere Lösungen werden nach den aktuellen Datenschutzrichtlinien erstellt. Wir berücksichtigen die DSGVO bei der Entwicklung und beraten Sie zu den notwendigen rechtlichen Hinweisen.",
  },
  {
    question: "Wie lange dauert die Umsetzung eines Projekts?",
    answer:
      "Eine Landingpage ist in der Regel innerhalb von 1-2 Wochen fertig. Chatbots können wir oft in wenigen Tagen einrichten. Bei Social-Media-Management starten wir nach der Content-Planung sofort mit dem Posting.",
  },
  {
    question: "Kann ich die Lösungen selbst verwalten?",
    answer:
      "Ja, wir übergeben Ihnen alle Zugänge und schulen Sie bei Bedarf in der Nutzung. Bei Websites erhalten Sie ein einfach zu bedienendes Content-Management-System.",
  },
  {
    question: "Bietet Carrymio auch laufenden Support?",
    answer:
      "Selbstverständlich. Nach der Projektübergabe stehen wir Ihnen für Fragen, Anpassungen und Erweiterungen zur Verfügung. Für Social-Media-Management und Chatbots bieten wir auch Wartungspakete an.",
  },
];

export const FAQSection = () => {
  return (
    <section id="faq" className="py-24 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/20 to-transparent" />

      <div className="container px-4 relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-primary text-sm font-medium mb-4">
            Häufige Fragen
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Antworten auf Ihre Fragen
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Hier finden Sie Antworten auf die häufigsten Fragen. 
            Haben Sie weitere Fragen? Kontaktieren Sie uns einfach.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
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
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};
