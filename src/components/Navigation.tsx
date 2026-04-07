import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "#digital-employees", label: "Digitale Mitarbeiter" },
  { href: "#automation-solutions", label: "Automationsloesungen" },
  { href: "#software-solutions", label: "Softwareloesungen" },
  { href: "#automation-consulting", label: "Automationsberatung" },
];

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeHash, setActiveHash] = useState("#digital-employees");
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const sections = navLinks
      .map((link) => document.querySelector(link.href))
      .filter(Boolean) as Element[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveHash(`#${entry.target.id}`);
          }
        });
      },
      {
        rootMargin: "-30% 0px -55% 0px",
        threshold: 0.1,
      }
    );

    sections.forEach((section) => observer.observe(section));

    const handleScroll = () => {
      const doc = document.documentElement;
      const total = doc.scrollHeight - doc.clientHeight;
      const progress = total > 0 ? (doc.scrollTop / total) * 100 : 0;
      setScrollProgress(Math.min(100, Math.max(0, progress)));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/8 bg-background/80 backdrop-blur-2xl" role="navigation" aria-label="Hauptnavigation">
      <div className="absolute left-0 top-0 h-[2px] bg-gradient-primary transition-all duration-200" style={{ width: `${scrollProgress}%` }} aria-hidden="true" />
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2" aria-label="Tawano - Startseite">
            <img src="/tawano-logo.png" alt="Tawano Logo" className="h-9 w-auto" width="135" height="36" fetchPriority="high" />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className={
                  link.href === activeHash
                    ? "text-foreground transition-colors duration-200 text-sm font-semibold px-3 py-1.5 rounded-full border border-primary/40 bg-primary/10 hover:bg-primary/20"
                    : "text-muted-foreground hover:text-foreground transition-colors duration-200 text-sm font-medium"
                }
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
              aria-label="Automations-Check anfragen"
            >
              Automations-Check
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
                aria-label="Automation-Check anfragen"
              >
                Automations-Check
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
