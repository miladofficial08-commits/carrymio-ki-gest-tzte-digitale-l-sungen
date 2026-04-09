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
            Angaben gemäß § 5 TMG und § 18 Abs. 2 MStV
          </p>

          <div className="space-y-10 text-muted-foreground leading-7">

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">Anbieter</h2>
              <div className="pl-4 border-l-2 border-primary/30 space-y-1">
                <p className="font-medium text-foreground">Tawano</p>
                <p>[Vor- und Nachname des Inhabers / der vertretungsberechtigten Person]</p>
                <p>[Straße und Hausnummer]</p>
                <p>[Postleitzahl] Düsseldorf</p>
                <p>Deutschland</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">Rechtsform und Vertretung</h2>
              <p>
                [Bitte entsprechend der tatsächlichen Rechtsform eintragen, z. B.: Einzelunternehmen /
                Gesellschaft bürgerlichen Rechts (GbR) / UG (haftungsbeschränkt) / GmbH]
              </p>
              <p className="mt-2">
                Inhaber / Geschäftsführer: [Vor- und Nachname]
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">Kontakt</h2>
              <p>E-Mail: tawanoai@gmail.com</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                Handelsregister
              </h2>
              <p>
                Registergericht: Amtsgericht Düsseldorf
              </p>
              <p>Handelsregisternummer: [HRB XXXXX]</p>
              <p className="text-sm mt-2 italic">
                Hinweis: Diesen Abschnitt nur eintragen, wenn das Unternehmen tatsächlich im
                Handelsregister eingetragen ist. Bei einem nicht eingetragenen Einzelunternehmen
                oder einer nicht eingetragenen GbR entfällt dieser Abschnitt.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">Steuerliche Angaben</h2>
              <p>
                Umsatzsteuer-Identifikationsnummer gemäß § 27a Umsatzsteuergesetz (UStG):
              </p>
              <p className="mt-1">[DE XXXXXXXXX – sofern vorhanden]</p>
              <p className="mt-2">
                Alternativ (sofern keine USt-IdNr. vergeben): Steuernummer [XX/XXX/XXXXX],
                ausstellendes Finanzamt: [Finanzamt Düsseldorf-...]
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                Inhaltlich Verantwortlicher
              </h2>
              <p>
                Verantwortlich für journalistisch-redaktionelle Inhalte gemäß § 18 Abs. 2
                Medienstaatsvertrag (MStV):
              </p>
              <div className="mt-3 pl-4 border-l-2 border-primary/30 space-y-1">
                <p>[Vor- und Nachname]</p>
                <p>[Straße und Hausnummer]</p>
                <p>[Postleitzahl] Düsseldorf, Deutschland</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">Online-Streitbeilegung</h2>
              <p>
                Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit,
                die unter folgendem Link erreichbar ist:{" "}
                <a
                  href="https://ec.europa.eu/consumers/odr/"
                  className="text-primary hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://ec.europa.eu/consumers/odr/
                </a>
              </p>
              <p className="mt-3">
                Tawano ist weder verpflichtet noch bereit, an Streitbeilegungsverfahren vor einer
                Verbraucherschlichtungsstelle teilzunehmen. Unsere Leistungen richten sich
                ausschließlich an Unternehmer im Sinne des § 14 BGB (gewerbliche Kunden, B2B).
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">Haftung für eigene Inhalte</h2>
              <p>
                Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen
                Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir
                nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen
                oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
              </p>
              <p className="mt-3">
                Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den
                allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch
                erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei
                Bekanntwerden entsprechender Rechtsverletzungen werden wir diese Inhalte umgehend
                entfernen.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">Haftung für externe Links</h2>
              <p>
                Diese Website kann Verknüpfungen zu externen Websites Dritter enthalten, auf deren
                Inhalte wir keinen Einfluss haben. Für diese fremden Inhalte können wir daher keine
                Gewähr übernehmen. Für den Inhalt der verlinkten Seiten sind stets deren jeweilige
                Betreiber verantwortlich.
              </p>
              <p className="mt-3">
                Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße
                überprüft. Rechtswidrige Inhalte waren dabei nicht erkennbar. Eine permanente
                inhaltliche Kontrolle der verlinkten Seiten ist ohne konkrete Anhaltspunkte einer
                Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir
                entsprechende Links umgehend entfernen.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">Urheberrecht</h2>
              <p>
                Die durch Tawano erstellten Inhalte und Werke auf diesen Seiten unterliegen dem
                deutschen Urheberrecht. Vervielfältigung, Bearbeitung, Verbreitung und jede Art
                der Verwertung außerhalb der Grenzen des Urheberrechts bedürfen der schriftlichen
                Zustimmung des jeweiligen Urhebers. Downloads und Kopien dieser Seite sind nur für
                den privaten, nicht kommerziellen Gebrauch gestattet.
              </p>
              <p className="mt-3">
                Soweit Inhalte auf dieser Seite nicht von Tawano erstellt wurden, werden die
                Urheberrechte Dritter beachtet und entsprechend gekennzeichnet. Sollten Sie auf
                eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden
                Hinweis — bei Bekanntwerden werden derartige Inhalte umgehend entfernt.
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
