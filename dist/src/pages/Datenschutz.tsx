import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

const Datenschutz = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="container px-4 py-16 md:py-24 max-w-4xl">
        <Link to="/" className="text-sm text-primary hover:underline">
          ← Zurück zur Startseite
        </Link>

        <div className="mt-8 premium-panel p-8 md:p-10">
          <h1 className="section-title mb-2">Datenschutzerklärung</h1>
          <p className="text-sm text-muted-foreground mb-10">Stand: April 2026</p>

          <div className="space-y-10 text-muted-foreground leading-7">

            {/* 1. Verantwortlicher */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">1. Verantwortlicher</h2>
              <p>
                Verantwortlicher für die Datenverarbeitung auf dieser Website im Sinne der
                Datenschutz-Grundverordnung (DSGVO) ist:
              </p>
              <div className="mt-3 pl-4 border-l-2 border-primary/30 space-y-1">
                <p className="font-medium text-foreground">Tawano</p>
                <p>[Vor- und Nachname des Inhabers]</p>
                <p>[Straße und Hausnummer]</p>
                <p>[Postleitzahl] Düsseldorf, Deutschland</p>
                <p className="mt-2">E-Mail: tawanoai@gmail.com</p>
              </div>
              <p className="mt-3">
                Für Anfragen zum Datenschutz wenden Sie sich bitte direkt an die oben genannte
                E-Mail-Adresse.
              </p>
            </section>

            {/* 2. Allgemeines */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                2. Allgemeines zur Datenverarbeitung
              </h2>
              <p>
                Wir verarbeiten personenbezogene Daten grundsätzlich nur, soweit dies zur
                Bereitstellung dieser Website und der darüber angebotenen Leistungen erforderlich
                ist. Eine darüber hinausgehende Verarbeitung findet nur statt, wenn Sie eine
                ausdrückliche Einwilligung erteilt haben oder eine andere Rechtsgrundlage nach
                Art. 6 DSGVO vorliegt.
              </p>
              <p className="mt-3">
                Maßgebliche Rechtsgrundlagen im Überblick:
              </p>
              <ul className="list-disc pl-5 space-y-2 mt-2">
                <li>
                  <span className="font-medium text-foreground">Art. 6 Abs. 1 lit. a DSGVO</span> —
                  Einwilligung der betroffenen Person
                </li>
                <li>
                  <span className="font-medium text-foreground">Art. 6 Abs. 1 lit. b DSGVO</span> —
                  Vertragserfüllung oder vorvertragliche Maßnahmen
                </li>
                <li>
                  <span className="font-medium text-foreground">Art. 6 Abs. 1 lit. c DSGVO</span> —
                  Erfüllung einer rechtlichen Verpflichtung
                </li>
                <li>
                  <span className="font-medium text-foreground">Art. 6 Abs. 1 lit. f DSGVO</span> —
                  Wahrung berechtigter Interessen des Verantwortlichen
                </li>
              </ul>
            </section>

            {/* 3. Hosting – Netlify */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                3. Hosting – Netlify
              </h2>
              <p>
                Diese Website wird bei Netlify, Inc. (44 Montgomery Street, Suite 300, San Francisco,
                California 94104, USA) gehostet. Beim Aufruf unserer Website werden vom Hosting-Anbieter
                automatisch Verbindungsdaten erfasst, darunter IP-Adresse des anfragenden Geräts,
                Browsertyp und -version, aufgerufene Seite, Datum und Uhrzeit des Abrufs sowie der
                HTTP-Statuscode der Antwort.
              </p>
              <p className="mt-3">
                Die Verarbeitung erfolgt auf Grundlage unseres berechtigten Interesses an einem
                sicheren und stabilen Betrieb der Website (Art. 6 Abs. 1 lit. f DSGVO). Da Netlify
                in den USA ansässig ist, werden Daten in die USA übermittelt. Die Übermittlung
                erfolgt auf Grundlage von Standardvertragsklauseln (SCCs) gemäß Art. 46 Abs. 2
                lit. c DSGVO. Mit Netlify besteht ein Auftragsverarbeitungsvertrag (AVV).
              </p>
              <p className="mt-3">
                Datenschutzerklärung Netlify:{" "}
                <a
                  href="https://www.netlify.com/privacy/"
                  className="text-primary hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://www.netlify.com/privacy/
                </a>
              </p>
            </section>

            {/* 4. Cloudflare */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                4. CDN und Netzwerksicherheit – Cloudflare
              </h2>
              <p>
                Diese Website nutzt Dienste der Cloudflare, Inc. (101 Townsend St., San Francisco,
                CA 94107, USA). Cloudflare ist zwischen Ihrem Browser und unserem Hosting-Anbieter
                geschaltet und übernimmt DNS-Auflösung, Schutz vor DDoS-Angriffen sowie die schnelle
                Auslieferung von Website-Inhalten. Sämtlicher Datenverkehr dieser Website wird über
                das Cloudflare-Netzwerk geleitet.
              </p>
              <p className="mt-3">
                Dabei werden unter anderem IP-Adressen, HTTP-Anfragen sowie gerätebezogene
                Informationen verarbeitet. Zur Erkennung automatisierter Zugriffe kann Cloudflare
                technisch notwendige Cookies setzen (insbesondere <em>__cf_bm</em> zur
                Bot-Erkennung). Diese Cookies dienen ausschließlich dem sicheren Betrieb und
                erfordern keine Einwilligung nach § 25 TTDSG.
              </p>
              <p className="mt-3">
                Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an sicherem
                und performantem Website-Betrieb). Die Datenübermittlung in die USA erfolgt auf
                Grundlage von Standardvertragsklauseln und — soweit Cloudflare hierunter
                zertifiziert ist — des EU-U.S. Data Privacy Framework (DPF).
              </p>
              <p className="mt-3">
                Datenschutzerklärung Cloudflare:{" "}
                <a
                  href="https://www.cloudflare.com/privacypolicy/"
                  className="text-primary hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://www.cloudflare.com/privacypolicy/
                </a>
              </p>
            </section>

            {/* 5. Kontaktformular */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                5. Kontaktformular
              </h2>
              <p>
                Auf unserer Website steht ein Kontaktformular zur Verfügung. Bei dessen Nutzung
                werden folgende Angaben erhoben:
              </p>
              <ul className="list-disc pl-5 space-y-1 mt-2">
                <li>Name (Pflichtfeld)</li>
                <li>E-Mail-Adresse (Pflichtfeld)</li>
                <li>Nachricht (Pflichtfeld)</li>
                <li>Telefonnummer (freiwillig)</li>
                <li>Unternehmen (freiwillig)</li>
                <li>Interessensgebiet (freiwillig, per Auswahl)</li>
              </ul>
              <p className="mt-3">
                Ihre Angaben werden ausschließlich zur Bearbeitung und Beantwortung Ihrer Anfrage
                verwendet. Eine Weitergabe an Dritte erfolgt nicht, es sei denn, dies ist zur
                Vertragserfüllung zwingend erforderlich oder gesetzlich vorgeschrieben.
              </p>
              <p className="mt-3">
                Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (vorvertragliche Maßnahmen) sowie
                unser berechtigtes Interesse an der Bearbeitung geschäftlicher Anfragen
                (Art. 6 Abs. 1 lit. f DSGVO). Die Daten werden gelöscht, sobald Ihre Anfrage
                abschließend bearbeitet ist und keine gesetzlichen Aufbewahrungspflichten
                entgegenstehen.
              </p>
            </section>

            {/* 6. E-Mail-Versand */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                6. E-Mail-Versand
              </h2>
              <p>
                Zur technischen Übermittlung von Formularinhalten nutzen wir einen eigenen
                serverseitigen E-Mail-Dienst über Netlify Functions und Gmail SMTP. Wenn Sie
                das Kontaktformular absenden, werden Ihre Eingaben über unseren Server direkt
                an unsere E-Mail-Adresse weitergeleitet.
              </p>
              <p className="mt-3">
                Dabei werden alle von Ihnen eingegebenen Daten (Name, E-Mail-Adresse, Telefon,
                Unternehmen, Nachricht) sowie technische Metadaten (Zeitstempel) serverseitig
                verarbeitet. Es werden keine Daten an Drittanbieter übermittelt.
              </p>
              <p className="mt-3">
                Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einer
                zuverlässigen technischen Zustellung von Kontaktanfragen).
              </p>
            </section>

            {/* 7. Server-Logfiles */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                7. Server-Logfiles
              </h2>
              <p>
                Beim Aufruf dieser Website werden automatisch Zugriffsdaten (Logfiles) erfasst,
                die Ihr Browser an unseren Hosting-Anbieter übermittelt. Diese umfassen:
              </p>
              <ul className="list-disc pl-5 space-y-1 mt-2">
                <li>IP-Adresse des anfragenden Geräts</li>
                <li>Datum und Uhrzeit der Anfrage</li>
                <li>Aufgerufene Seite (URL) und HTTP-Methode</li>
                <li>HTTP-Statuscode und übertragene Datenmenge</li>
                <li>Browsertyp, Betriebssystem und Spracheinstellung</li>
                <li>Referrer-URL (zuvor besuchte Seite, sofern übermittelt)</li>
              </ul>
              <p className="mt-3">
                Diese Daten werden nicht mit anderen Datenquellen zusammengeführt und dienen
                ausschließlich der Sicherstellung eines ordnungsgemäßen Betriebs sowie der Abwehr
                von Angriffen. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO. Logdaten werden
                in der Regel nach spätestens 30 Tagen automatisch gelöscht.
              </p>
            </section>

            {/* 8. Cookies */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">8. Cookies</h2>
              <p>
                Diese Website setzt von sich aus keine Marketing-, Analyse- oder
                Tracking-Cookies ein.
              </p>
              <p className="mt-3">
                Im Rahmen der Netzwerksicherheit durch Cloudflare können technisch notwendige
                Cookies gesetzt werden (z. B. <em>__cf_bm</em> zur Erkennung automatisierter
                Zugriffe). Diese Cookies sind für den sicheren Betrieb der Website funktional
                erforderlich und unterliegen keiner Einwilligungspflicht nach § 25 TTDSG, da sie
                ausschließlich der technischen Bereitstellung des Dienstes dienen.
              </p>
              <p className="mt-3">
                Sofern wir künftig Analyse- oder Marketing-Werkzeuge einsetzen, wird diese
                Datenschutzerklärung entsprechend aktualisiert und — soweit gesetzlich erforderlich
                — ein Einwilligungs-Management (Cookie-Banner) implementiert.
              </p>
            </section>

            {/* 9. Drittlandübermittlung */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                9. Datenübermittlung in Drittländer
              </h2>
              <p>
                Beim Betrieb dieser Website werden über Netlify und Cloudflare Daten in die USA
                übermittelt. Da die USA kein Land mit einem allgemeinen Angemessenheitsbeschluss
                der EU-Kommission sind, stützen wir Übermittlungen auf Standardvertragsklauseln
                (SCCs) gemäß Art. 46 Abs. 2 lit. c DSGVO sowie — soweit der jeweilige Anbieter
                zertifiziert ist — auf den EU-U.S. Data Privacy Framework (DPF).
              </p>
              <p className="mt-3">
                Wir haben den Zertifizierungs- und Vertragsstatus unserer Dienstleister geprüft
                und werden Änderungen in der Rechtslage und bei den Anbietern fortlaufend
                beobachten. Bei Bekanntwerden fehlender oder unzureichender Schutzmaßnahmen
                ergreifen wir unverzüglich geeignete Maßnahmen.
              </p>
            </section>

            {/* 10. Speicherdauer */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">10. Speicherdauer</h2>
              <p>
                Personenbezogene Daten werden gelöscht, sobald der Zweck ihrer Verarbeitung
                entfallen ist und keine gesetzlichen Aufbewahrungspflichten entgegenstehen.
                Kontaktanfragen werden nach abschließender Bearbeitung gelöscht, sofern keine
                weitergehenden Geschäftsbeziehungen entstanden sind.
              </p>
              <p className="mt-3">
                Gesetzliche Aufbewahrungspflichten nach Handels- und Steuerrecht (in der Regel
                6 bis 10 Jahre) bleiben in jedem Fall unberührt. Für die Dauer dieser Fristen
                werden betroffene Daten eingeschränkt verarbeitet und nicht für andere Zwecke
                genutzt.
              </p>
            </section>

            {/* 11. Betroffenenrechte */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                11. Ihre Rechte als betroffene Person
              </h2>
              <p>
                Ihnen stehen gegenüber Tawano in Bezug auf Ihre personenbezogenen Daten
                folgende Rechte zu:
              </p>
              <ul className="list-disc pl-5 space-y-3 mt-3">
                <li>
                  <span className="font-medium text-foreground">Auskunftsrecht (Art. 15 DSGVO):</span>{" "}
                  Sie können jederzeit Auskunft darüber verlangen, welche personenbezogenen Daten
                  wir über Sie verarbeiten, zu welchem Zweck und auf welcher Rechtsgrundlage.
                </li>
                <li>
                  <span className="font-medium text-foreground">
                    Recht auf Berichtigung (Art. 16 DSGVO):
                  </span>{" "}
                  Sie haben das Recht, die Berichtigung unrichtiger oder die Vervollständigung
                  unvollständiger Daten zu verlangen.
                </li>
                <li>
                  <span className="font-medium text-foreground">
                    Recht auf Löschung (Art. 17 DSGVO):
                  </span>{" "}
                  Sie können die Löschung Ihrer personenbezogenen Daten verlangen, soweit keine
                  gesetzlichen Aufbewahrungspflichten oder sonstige zwingende Gründe entgegenstehen.
                </li>
                <li>
                  <span className="font-medium text-foreground">
                    Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO):
                  </span>{" "}
                  In bestimmten Fällen können Sie verlangen, dass die Verarbeitung Ihrer Daten
                  vorübergehend eingeschränkt wird.
                </li>
                <li>
                  <span className="font-medium text-foreground">
                    Recht auf Datenübertragbarkeit (Art. 20 DSGVO):
                  </span>{" "}
                  Daten, die Sie uns auf Grundlage einer Einwilligung oder zur Vertragserfüllung
                  zur Verfügung gestellt haben, können Sie in einem strukturierten, gängigen und
                  maschinenlesbaren Format erhalten oder an einen anderen Verantwortlichen
                  übertragen lassen.
                </li>
                <li>
                  <span className="font-medium text-foreground">
                    Widerspruchsrecht (Art. 21 DSGVO):
                  </span>{" "}
                  Sie haben das Recht, der Verarbeitung Ihrer personenbezogenen Daten zu
                  widersprechen, soweit diese auf berechtigte Interessen gestützt wird. Wir
                  verarbeiten Ihre Daten in diesem Fall nicht mehr, es sei denn, wir können
                  zwingende schutzwürdige Gründe für die Verarbeitung nachweisen, die Ihre
                  Interessen überwiegen.
                </li>
              </ul>
              <p className="mt-4">
                Zur Ausübung Ihrer Rechte wenden Sie sich bitte per E-Mail an:{" "}
                <a
                  href="mailto:tawanoai@gmail.com"
                  className="text-primary hover:underline"
                >
                  tawanoai@gmail.com
                </a>
              </p>
            </section>

            {/* 12. Aufsichtsbehörde */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                12. Beschwerderecht bei der Aufsichtsbehörde
              </h2>
              <p>
                Unbeschadet anderweitiger Rechtsbehelfe haben Sie gemäß Art. 77 DSGVO das Recht,
                sich bei einer Datenschutz-Aufsichtsbehörde zu beschweren, wenn Sie der Ansicht
                sind, dass die Verarbeitung Ihrer personenbezogenen Daten gegen die DSGVO verstößt.
              </p>
              <p className="mt-3">
                Zuständige Aufsichtsbehörde für Tawano (Sitz in Düsseldorf, NRW) ist:
              </p>
              <div className="mt-3 pl-4 border-l-2 border-primary/30 space-y-1">
                <p className="font-medium text-foreground">
                  Landesbeauftragte für Datenschutz und Informationsfreiheit
                  Nordrhein-Westfalen (LDI NRW)
                </p>
                <p>Kavalleriestraße 2–4</p>
                <p>40213 Düsseldorf</p>
                <p className="mt-2">Telefon: 0211 / 38424-0</p>
                <p>E-Mail: poststelle@ldi.nrw.de</p>
                <p>
                  Web:{" "}
                  <a
                    href="https://www.ldi.nrw.de"
                    className="text-primary hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    https://www.ldi.nrw.de
                  </a>
                </p>
              </div>
            </section>

            {/* 13. Aktualität */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                13. Aktualität und Änderungen dieser Erklärung
              </h2>
              <p>
                Diese Datenschutzerklärung hat den Stand April 2026. Wir behalten uns vor, sie
                bei Änderungen in der Rechtslage, in der eingesetzten Technik oder beim Leistungsangebot
                anzupassen. Die jeweils aktuelle Fassung ist auf dieser Seite abrufbar. Bei
                wesentlichen Änderungen werden wir Sie — soweit möglich — gesondert informieren.
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
