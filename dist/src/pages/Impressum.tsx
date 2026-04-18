import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

const Impressum = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="container px-4 py-16 md:py-24 max-w-4xl">
        <Link to="/" className="text-sm text-primary hover:underline">
          ← Zurück zur Startseite
        </Link>

        <div className="mt-8 premium-panel p-8 md:p-10">
          <h1 className="section-title mb-2">Impressum</h1>
          <p className="text-sm text-muted-foreground mb-10">
            Angaben gemäß § 5 DDG
          </p>

          <div className="space-y-10 text-muted-foreground leading-7">

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">Anbieter dieser Website</h2>
              <div className="pl-4 border-l-2 border-primary/30 space-y-1">
                <p className="font-medium text-foreground">Jamal Kamal</p>
                <p>handelnd unter „Tawano"</p>
                <p>Erkrather Str. 401</p>
                <p>40231 Düsseldorf</p>
                <p>Deutschland</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">Kontakt</h2>
              <p>E-Mail: info@tawano.de</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">Hinweis zur Anbieterstellung</h2>
              <p>
                „Tawano" ist die Geschäftsbezeichnung des Website-Angebots. Vertragspartner und
                verantwortlicher Anbieter dieser Website ist Jamal Kamal.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV
              </h2>
              <div className="pl-4 border-l-2 border-primary/30 space-y-1">
                <p className="font-medium text-foreground">Jamal Kamal</p>
                <p>Erkrather Str. 401</p>
                <p>40231 Düsseldorf</p>
                <p>Deutschland</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">Hinweis zur Streitbeilegung</h2>
              <p>
                Unsere Leistungen richten sich ausschließlich an Unternehmer im Sinne des § 14 BGB.
                Wir sind nicht verpflichtet und nicht bereit, an Streitbeilegungsverfahren vor einer
                Verbraucherschlichtungsstelle teilzunehmen.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">Haftung für Inhalte</h2>
              <p>
                Als Diensteanbieter sind wir für eigene Inhalte auf diesen Seiten nach den
                allgemeinen Gesetzen verantwortlich. Eine Verpflichtung zur Überwachung
                übermittelter oder gespeicherter fremder Informationen besteht nur im Rahmen der
                gesetzlichen Vorschriften. Bei Bekanntwerden konkreter Rechtsverletzungen werden
                wir entsprechende Inhalte umgehend entfernen.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">Haftung für Links</h2>
              <p>
                Unsere Website kann Links zu externen Websites Dritter enthalten. Auf deren Inhalte
                haben wir keinen Einfluss. Für die Inhalte verlinkter Seiten ist stets der jeweilige
                Anbieter oder Betreiber verantwortlich. Bei Bekanntwerden von Rechtsverletzungen
                werden wir entsprechende Links umgehend entfernen.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">Urheberrecht</h2>
              <p>
                Die durch Tawano bzw. Jamal Kamal erstellten Inhalte und Werke auf dieser Website
                unterliegen dem deutschen Urheberrecht. Jede Verwertung außerhalb der Grenzen des
                Urheberrechts bedarf der vorherigen schriftlichen Zustimmung des jeweiligen
                Rechteinhabers.
              </p>
            </section>

          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Impressum;
