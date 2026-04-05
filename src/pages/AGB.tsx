import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

const AGB = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="container px-4 py-16 md:py-24 max-w-4xl">
        <Link to="/" className="text-sm text-primary hover:underline">
          Zurück zur Startseite
        </Link>
        <div className="mt-8 premium-panel p-8 md:p-10">
          <h1 className="section-title mb-6">AGB</h1>
          <div className="space-y-8 text-muted-foreground leading-7">
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-2">Projektgrundlage</h2>
              <p>
                Für Leistungen von Tawano gelten die Bedingungen, die im jeweiligen Angebot und im zugehörigen Vertrag
                schriftlich festgehalten werden.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-2">Leistungsumfang und Vergütung</h2>
              <p>
                Vor Projektstart erhalten Sie einen klaren Leistungsumfang, den vereinbarten Preis sowie die nächsten Schritte.
                So ist für beide Seiten nachvollziehbar, was umgesetzt wird.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-2">Fragen zu Vertragsbedingungen</h2>
              <p>
                Wenn Sie vorab Fragen zu unseren Bedingungen haben, erreichen Sie uns unter info.carrymio@gmail.com.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AGB;