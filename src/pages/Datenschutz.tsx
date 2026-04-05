import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

const Datenschutz = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="container px-4 py-16 md:py-24 max-w-4xl">
        <Link to="/" className="text-sm text-primary hover:underline">
          Zurück zur Startseite
        </Link>
        <div className="mt-8 premium-panel p-8 md:p-10">
          <h1 className="section-title mb-6">Datenschutz</h1>
          <div className="space-y-8 text-muted-foreground leading-7">
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-2">Verantwortlich</h2>
              <p>Tawano</p>
              <p>E-Mail: info.carrymio@gmail.com</p>
              <p>Telefon: +49 1631283971</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-2">Kontaktformular</h2>
              <p>
                Wenn Sie uns über das Kontaktformular schreiben, verarbeiten wir Ihre Angaben zur Bearbeitung Ihrer Anfrage.
                Dabei werden Name, E-Mail-Adresse und Nachricht benötigt. Weitere Angaben sind optional.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-2">Technische Dienstleister</h2>
              <p>
                Für den Versand von Formularanfragen wird EmailJS genutzt. Dabei werden die von Ihnen übermittelten Inhalte
                ausschließlich zur Bearbeitung Ihrer Anfrage verarbeitet.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-2">Ihre Rechte</h2>
              <p>
                Sie können jederzeit Auskunft über Ihre gespeicherten Daten verlangen sowie Berichtigung oder Löschung anfragen.
                Bitte wenden Sie sich dazu an info.carrymio@gmail.com.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Datenschutz;