const Footer = () => {

  return (
    <footer className="border-t border-border py-12">
      <div className="container px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center">
            <span className="text-xl font-bold">Carrymio</span>
          </div>

          {/* Links */}
          <nav className="flex items-center gap-6 text-sm text-muted-foreground" role="navigation" aria-label="Footer Navigation">
            <a href="/impressum" className="hover:text-foreground transition-colors" rel="nofollow">
              Impressum
            </a>
            <a href="/datenschutz" className="hover:text-foreground transition-colors" rel="nofollow">
              Datenschutz
            </a>
            <a href="/agb" className="hover:text-foreground transition-colors" rel="nofollow">
              AGB
            </a>
          </nav>

          {/* Copyright */}
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Carrymio. Alle Rechte vorbehalten. | Spezialist für Fahrdienst-Software und Chatbots in Düsseldorf.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
