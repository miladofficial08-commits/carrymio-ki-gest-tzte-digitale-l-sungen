const Footer = () => {

  return (
    <footer className="relative border-t border-border/40 bg-gradient-to-b from-muted/30 to-muted/60 py-14 overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] rounded-full bg-primary/3 blur-[120px] pointer-events-none" aria-hidden="true" />
      <div className="container px-4 relative z-10">
        <div className="grid gap-10 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
          <div>
            <img src="/tawano-logo.png" alt="Tawano Logo" className="h-8 w-auto" width="120" height="32" loading="lazy" />
            <p className="mt-4 max-w-md text-sm leading-6 text-muted-foreground">
              Wir bauen digitale Mitarbeiter, die Support, E-Mails und Routine-Aufgaben automatisch erledigen.
            </p>
            <p className="mt-3 text-sm text-foreground/90 font-medium">
              Klar. Verlässlich. Für den Alltag in Unternehmen.
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold text-foreground">Leistungen</p>
            <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
              {["Digitale Mitarbeiter", "Chatbots", "Webdesign", "Custom Automation"].map((item) => (
                <li key={item} className="group cursor-default flex items-center gap-2 transition-colors hover:text-foreground">
                  <span className="h-[2px] w-0 bg-primary transition-all duration-300 group-hover:w-3" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-foreground">Rechtliches</p>
            <nav className="mt-4 flex flex-col gap-2.5 text-sm text-muted-foreground" role="navigation" aria-label="Footer Navigation">
              {[
                { href: "/impressum", label: "Impressum" },
                { href: "/datenschutz", label: "Datenschutz" },
                { href: "/agb", label: "AGB" },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="group flex items-center gap-2 transition-colors hover:text-foreground"
                  rel="nofollow"
                >
                  <span className="h-[2px] w-0 bg-primary transition-all duration-300 group-hover:w-3" aria-hidden="true" />
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
        </div>

        <div className="mt-10 border-t border-border/50 pt-6 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Tawano. Alle Rechte vorbehalten.
          </p>
          <div className="hidden sm:flex items-center gap-1 text-xs text-muted-foreground/50">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            Alle Systeme aktiv
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
