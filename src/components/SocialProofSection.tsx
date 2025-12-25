import { Star, Users, Briefcase, Clock } from "lucide-react";

const stats = [
  { icon: Users, value: "120+", label: "Zufriedene Kunden" },
  { icon: Briefcase, value: "200+", label: "Projekte abgeschlossen" },
  { icon: Star, value: "4.9", label: "Durchschnittsbewertung" },
  { icon: Clock, value: "1+ Jahr", label: "Erfahrung" },
];

const testimonials = [
  {
    name: "Michael Weber",
    company: "Weber Consulting GmbH",
    text: "Carrymio hat unseren Kundenservice revolutioniert. Der Chatbot beantwortet 70% der Anfragen automatisch – unsere Mitarbeiter können sich auf wichtigere Aufgaben konzentrieren.",
    rating: 5,
  },
  {
    name: "Sarah Müller",
    company: "Müller & Partner",
    text: "Endlich eine Agentur, die versteht was wir brauchen. Unsere neue Website hat die Anfragen verdreifacht. Absolute Empfehlung!",
    rating: 5,
  },
  {
    name: "Thomas Schmidt",
    company: "Schmidt Immobilien",
    text: "Das Social Media Management von Carrymio ist erstklassig. Unsere Reichweite hat sich in 6 Monaten verfünffacht. Professionell und zuverlässig.",
    rating: 5,
  },
];

export const SocialProofSection = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mb-4">
                <stat.icon className="w-7 h-7 text-primary" />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-foreground mb-1">
                {stat.value}
              </div>
              <div className="text-muted-foreground text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Das sagen unsere Kunden
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Über 120 Unternehmen vertrauen bereits auf unsere digitalen Lösungen
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6 animate-fade-in"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-primary text-primary"
                  />
                ))}
              </div>
              <p className="text-foreground/90 mb-6 leading-relaxed">
                "{testimonial.text}"
              </p>
              <div>
                <div className="font-semibold text-foreground">
                  {testimonial.name}
                </div>
                <div className="text-sm text-muted-foreground">
                  {testimonial.company}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
