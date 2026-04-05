import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

const Impressum = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="container px-4 py-16 md:py-24 max-w-4xl">
        <Link to="/" className="text-sm text-primary hover:underline">
          Zurück zur Startseite
        </Link>
        <div className="mt-8 premium-panel p-8 md:p-10">
          <h1 className="section-title mb-6">Impressum</h1>
          <div className="space-y-8 text-muted-foreground leading-7">
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-2">Angaben zum Anbieter</h2>
              <p>Tawano</p>
              <p>Düsseldorf, Deutschland</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-2">Kontakt</h2>
              <p>E-Mail: info.carrymio@gmail.com</p>
              <p>Telefon: +49 1631283971</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-2">Verantwortlich für Inhalte</h2>
              <p>Tawano</p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Impressum;