import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "#dienstleistungen", label: "Dienstleistungen" },
  { href: "#pakete", label: "Pakete" },
  { href: "#ablauf", label: "Ablauf" },
  { href: "#faq", label: "FAQ" },
  { href: "#kontakt", label: "Kontakt" },
];

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass" role="navigation" aria-label="Hauptnavigation">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="https://carrymio.de/" className="flex items-center" aria-label="Carrymio - Startseite">
            <span className="text-xl md:text-2xl font-bold text-foreground tracking-wide">Carrymio</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className="text-muted-foreground hover:text-foreground transition-colors duration-200 text-sm font-medium"
                aria-label={`Zu ${link.label} navigieren`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button
              variant="hero"
              size="default"
              onClick={() => scrollToSection("#kontakt")}
              aria-label="Kostenlose Anfrage stellen"
            >
              Kostenlose Anfrage
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Menü schließen" : "Menü öffnen"}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 animate-fade-in" id="mobile-menu" role="region" aria-label="Mobile Navigation">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollToSection(link.href)}
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200 py-2 text-left"
                  aria-label={`Zu ${link.label} navigieren`}
                >
                  {link.label}
                </button>
              ))}
              <Button
                variant="hero"
                className="mt-2"
                onClick={() => scrollToSection("#kontakt")}
                aria-label="Kostenlose Anfrage stellen"
              >
                Kostenlose Anfrage
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
