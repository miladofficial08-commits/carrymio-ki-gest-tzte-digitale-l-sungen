import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send, Check, Mail, Phone, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);
    toast({
      title: "Anfrage erfolgreich gesendet!",
      description: "Wir melden uns innerhalb von 24 Stunden bei Ihnen.",
    });
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
      <section id="kontakt" className="py-24 relative">
        <div className="container px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-8 animate-pulse-glow">
              <Check className="w-10 h-10 text-primary" />
            </div>
            <h2 className="text-3xl font-bold mb-4">Vielen Dank für Ihre Anfrage!</h2>
            <p className="text-muted-foreground mb-8">
              Wir haben Ihre Nachricht erhalten und melden uns innerhalb von 24 Stunden bei Ihnen.
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
    <section id="kontakt" className="py-24 relative">
      <div className="container px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-primary text-sm font-medium mb-4">
            Kontakt
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Starten Sie jetzt – kostenlos und unverbindlich
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Schildern Sie uns Ihr Anliegen und wir erstellen Ihnen ein individuelles Angebot. 
            Die Erstberatung ist für Sie komplett kostenlos.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h3 className="text-xl font-bold mb-6">Direkter Kontakt</h3>
              <div className="space-y-4">
                <a
                  href="mailto:info@carrymio.de"
                  className="flex items-center gap-4 text-muted-foreground hover:text-foreground transition-colors group"
                >
                  <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <span>info@carrymio.de</span>
                </a>
                <a
                  href="tel:+4912345678900"
                  className="flex items-center gap-4 text-muted-foreground hover:text-foreground transition-colors group"
                >
                  <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <span>+49 123 456 789 00</span>
                </a>
                <div className="flex items-center gap-4 text-muted-foreground">
                  <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <span>Deutschland</span>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-card border border-border">
              <h4 className="font-semibold mb-2">Schnelle Antwort garantiert</h4>
              <p className="text-sm text-muted-foreground">
                Wir antworten auf alle Anfragen innerhalb von 24 Stunden – 
                meist sogar deutlich schneller.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <form
            onSubmit={handleSubmit}
            className="lg:col-span-3 bg-card border border-border rounded-2xl p-8"
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

            <div className="grid sm:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="company" className="block text-sm font-medium mb-2">
                  Unternehmen
                </label>
                <Input
                  id="company"
                  name="company"
                  placeholder="Ihr Unternehmen"
                  value={formData.company}
                  onChange={handleChange}
                  className="bg-background"
                />
              </div>
              <div>
                <label htmlFor="service" className="block text-sm font-medium mb-2">
                  Interesse an *
                </label>
                <select
                  id="service"
                  name="service"
                  required
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full h-10 px-3 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="">Bitte wählen...</option>
                  <option value="chatbot">Chatbot</option>
                  <option value="social-media">Social-Media-Management</option>
                  <option value="website">Website-Erstellung</option>
                  <option value="beratung">Allgemeine Beratung</option>
                </select>
              </div>
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
            >
              {isSubmitting ? (
                "Wird gesendet..."
              ) : (
                <>
                  Kostenlose Anfrage senden
                  <Send className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>

            <p className="text-xs text-muted-foreground text-center mt-4">
              Mit dem Absenden stimmen Sie unserer Datenschutzerklärung zu. 
              Ihre Daten werden vertraulich behandelt.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};
