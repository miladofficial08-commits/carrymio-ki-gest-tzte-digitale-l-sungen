import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send, Check, Mail, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

export const ContactSection = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    service: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Frontend-Validierung für Pflichtfelder
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast({
        variant: "destructive",
        title: "Unvollständige Eingaben",
        description: "Bitte füllen Sie Name, E-Mail und Nachricht aus.",
      });
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch("/.netlify/functions/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "contact",
          name: formData.name.trim(),
          email: formData.email.trim(),
          company: formData.company.trim() || undefined,
          service: formData.service || "Gesprächsanfrage",
          message: formData.message.trim(),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Server error");
      }

      setIsSubmitted(true);
      setFormData({
        name: "",
        email: "",
        company: "",
        service: "",
        message: "",
      });
      toast({
        title: "Anfrage erfolgreich gesendet!",
        description: "Wir melden uns innerhalb von 24 Stunden bei Ihnen.",
      });
    } catch (error: any) {
      console.error("Kontaktanfrage fehlgeschlagen", error);
      toast({
        variant: "destructive",
        title: "Senden fehlgeschlagen",
        description: "Bitte versuchen Sie es in Kürze erneut.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  if (isSubmitted) {
    return (
    <section id="kontakt" className="py-16 relative md:py-24">
        <div className="container px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-8 animate-pulse-glow">
              <Check className="w-10 h-10 text-primary" aria-hidden="true" />
            </div>
            <h2 className="text-3xl font-bold mb-4">Vielen Dank für Ihre Anfrage!</h2>
            <p className="text-muted-foreground mb-8">
              Wir haben Ihre Nachricht erhalten und melden uns schnellstmöglich bei Ihnen.
              Ihr Vorhaben wird persönlich geprüft und mit klaren nächsten Schritten beantwortet.
            </p>
            <Button variant="outline" onClick={() => setIsSubmitted(false)}>
              Neue Anfrage senden
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="kontakt" className="py-16 relative md:py-24">
      <div className="container px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-10 max-w-3xl mx-auto md:mb-16">
          <span className="section-kicker mb-5">
            Kontakt
          </span>
          <h2 className="section-title mb-4">
            Lassen Sie uns Ihre Automation priorisieren
          </h2>
          <p className="section-copy">
            Schreiben Sie uns kurz, welche Prozesse aktuell Zeit oder Geld kosten.
            Tawano zeigt Ihnen, wo ein digitaler Mitarbeiter den größten Hebel hat.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8 max-w-6xl mx-auto lg:gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="lg:col-span-2 space-y-8"
          >
            <div>
              <h3 className="text-xl font-bold mb-6">Direkter Kontakt</h3>
              <div className="space-y-4">
                <a
                  href="mailto:tawanoai@gmail.com"
                  className="flex items-center gap-4 text-muted-foreground hover:text-foreground transition-colors group"
                  aria-label="E-Mail an tawanoai@gmail.com senden"
                >
                  <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Mail className="w-5 h-5 text-primary" aria-hidden="true" />
                  </div>
                  <span>tawanoai@gmail.com</span>
                </a>
                <div className="flex items-center gap-4 text-muted-foreground">
                  <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-primary" aria-hidden="true" />
                  </div>
                  <span>Düsseldorf, Deutschland</span>
                </div>
              </div>
            </div>

            <article className="p-6 rounded-2xl border border-primary/30 bg-primary/10 relative overflow-hidden group">
              <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-primary/10 blur-[60px] group-hover:bg-primary/15 transition-all duration-500 pointer-events-none" aria-hidden="true" />
              <h4 className="font-semibold mb-3 relative z-10">Schneller Weg zum Termin</h4>
              <p className="text-sm text-foreground/85 leading-6 relative z-10">
                Schreiben Sie uns kurz Ihr Ziel. Wir melden uns in der Regel innerhalb von 24 Stunden per E-Mail.
              </p>
              <Button variant="hero" size="sm" className="mt-4 w-full glow-ring relative z-10" onClick={() => window.open("mailto:tawanoai@gmail.com", "_self")}>
                Jetzt E-Mail senden
              </Button>
            </article>

            <article className="p-6 rounded-2xl surface-elevated">
              <h4 className="font-semibold mb-3">Was Sie nach der Anfrage erhalten</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                {[
                  "Antwort in der Regel innerhalb von 24 Stunden",
                  "Konkrete Priorisierung Ihrer besten Automationshebel",
                  "Transparente Einordnung zu Aufwand, Nutzen und nächsten Schritten",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
            onSubmit={handleSubmit}
            className="lg:col-span-3 surface-elevated rounded-2xl p-8 hover-lift spotlight-glow"
            noValidate
            aria-label="Kontaktformular für Anfragen"
          >
            <div className="grid sm:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Name *
                </label>
                <Input
                  id="name"
                  name="name"
                  required
                  placeholder="Ihr Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="bg-background"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  E-Mail *
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="ihre@email.de"
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-background"
                />
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="company" className="block text-sm font-medium mb-2">
                Unternehmen
              </label>
              <Input
                id="company"
                name="company"
                placeholder="Optional"
                value={formData.company}
                onChange={handleChange}
                className="bg-background"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="service" className="block text-sm font-medium mb-2">
                Interesse an
              </label>
              <select
                id="service"
                name="service"
                value={formData.service}
                onChange={handleChange}
                className="w-full h-10 px-3 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                aria-label="Wählen Sie den Service, an dem Sie interessiert sind"
              >
                <option value="">Bitte wählen...</option>
                <option value="Digitale Mitarbeiter">Digitale Mitarbeiter</option>
                <option value="Automationslösungen">Automationslösungen</option>
                <option value="Softwarelösungen">Softwarelösungen</option>
                <option value="Automationsberatung">Automationsberatung</option>
              </select>
            </div>

            <div className="mb-6">
              <label htmlFor="message" className="block text-sm font-medium mb-2">
                Ihre Nachricht *
              </label>
              <Textarea
                id="message"
                name="message"
                required
                placeholder="Beschreiben Sie kurz Ihr Anliegen..."
                rows={5}
                value={formData.message}
                onChange={handleChange}
                className="bg-background resize-none"
              />
            </div>

            <Button
              type="submit"
              variant="hero"
              size="lg"
              className="w-full"
              disabled={isSubmitting}
              aria-busy={isSubmitting}
            >
              {isSubmitting ? (
                "Wird gesendet..."
              ) : (
                <>
                  Automations-Check anfragen
                  <Send className="w-4 h-4 ml-2" aria-hidden="true" />
                </>
              )}
            </Button>

            <p className="text-xs text-muted-foreground text-center mt-4">
              Mit dem Absenden stimmen Sie unserer <a href="/datenschutz" className="hover:underline" rel="nofollow">Datenschutzerklärung</a> zu. 
              Ihre Daten werden vertraulich behandelt.
            </p>
            <p className="text-xs text-muted-foreground text-center mt-2">
              Kostenloses Erstgespräch, kein Newsletter, kein Spam.
            </p>
          </motion.form>
        </div>
      </div>
    </section>
  );
};
