const Footer = () => {

  return (
    <footer className="border-t border-border bg-muted/30 py-14">
      <div className="container px-4">
        <div className="grid gap-10 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
          <div>
            <img src="/tawano-logo.png" alt="Tawano Logo" className="h-8 w-auto" width="120" height="32" loading="lazy" />
            <p className="mt-4 max-w-md text-sm leading-6 text-muted-foreground">
              Wir bauen digitale Mitarbeiter, die Support, E-Mails und Routine-Aufgaben automatisch erledigen.
            </p>
            <p className="mt-3 text-sm text-foreground/90">
              Klar. Verlässlich. Für den Alltag in Unternehmen.
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold text-foreground">Leistungen</p>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>Digitale Mitarbeiter</li>
              <li>Chatbots</li>
              <li>Webdesign</li>
              <li>Custom Automation</li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-foreground">Rechtliches</p>
            <nav className="mt-4 flex flex-col gap-2 text-sm text-muted-foreground" role="navigation" aria-label="Footer Navigation">
              <a href="/impressum" className="transition-colors hover:text-foreground" rel="nofollow">
                Impressum
              </a>
              <a href="/datenschutz" className="transition-colors hover:text-foreground" rel="nofollow">
                Datenschutz
              </a>
              <a href="/agb" className="transition-colors hover:text-foreground" rel="nofollow">
                AGB
              </a>
            </nav>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-6">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Tawano. Alle Rechte vorbehalten.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
