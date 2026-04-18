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
                Verantwortlicher für die Datenverarbeitung auf dieser Website ist:
              </p>
              <div className="mt-3 pl-4 border-l-2 border-primary/30 space-y-1">
                <p className="font-medium text-foreground">Jamal Kamal</p>
                <p>handelnd unter „Tawano"</p>
                <p>Erkrather Str. 401</p>
                <p>40231 Düsseldorf</p>
                <p>Deutschland</p>
                <p className="mt-2">E-Mail: info@tawano.de</p>
              </div>
            </section>

            {/* 2. Allgemeine Hinweise */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                2. Allgemeine Hinweise zur Datenverarbeitung
              </h2>
              <p>
                Wir verarbeiten personenbezogene Daten nur, soweit dies zur Bereitstellung unserer
                Website, zur Bearbeitung von Anfragen und zur Erbringung unserer Leistungen
                erforderlich ist.
              </p>
              <p className="mt-3">Rechtsgrundlagen sind insbesondere:</p>
              <ul className="list-disc pl-5 space-y-1 mt-2">
                <li>Art. 6 Abs. 1 lit. a DSGVO (Einwilligung)</li>
                <li>Art. 6 Abs. 1 lit. b DSGVO (vorvertragliche Maßnahmen und Vertragserfüllung)</li>
                <li>Art. 6 Abs. 1 lit. c DSGVO (rechtliche Verpflichtung)</li>
                <li>Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse)</li>
              </ul>
              <p className="mt-3">
                Unser berechtigtes Interesse liegt insbesondere in dem sicheren Betrieb der Website,
                der zuverlässigen Bearbeitung von Anfragen sowie der technisch notwendigen
                Bereitstellung unserer Online-Angebote.
              </p>
            </section>

            {/* 3. Hosting */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">3. Hosting</h2>
              <p>
                Unsere Website wird über Netlify bereitgestellt. Beim Aufruf der Website werden
                technisch erforderliche Verbindungs- und Zugriffsdaten verarbeitet, insbesondere
                IP-Adresse, Datum und Uhrzeit des Abrufs, Browser-Informationen, aufgerufene
                Seiten und technische Statusdaten.
              </p>
              <p className="mt-3">
                Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO zum Zweck
                des sicheren und stabilen Website-Betriebs.
              </p>
            </section>

            {/* 4. CDN, DNS und Sicherheit */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                4. CDN, DNS und Sicherheit
              </h2>
              <p>
                Zur Absicherung und beschleunigten Auslieferung unserer Website nutzen wir
                Cloudflare. Dabei kann der Datenverkehr unserer Website über die Systeme von
                Cloudflare geleitet werden. Hierbei können insbesondere IP-Adressen, technische
                Verbindungsdaten sowie sicherheitsrelevante Informationen verarbeitet werden.
              </p>
              <p className="mt-3">
                Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO aufgrund
                unseres berechtigten Interesses an IT-Sicherheit, DDoS-Schutz und einer stabilen
                Bereitstellung der Website.
              </p>
              <p className="mt-3">
                Soweit Cloudflare technisch notwendige Sicherheits-Cookies oder ähnliche technisch
                erforderliche Mechanismen einsetzt, geschieht dies ausschließlich zur sicheren
                Bereitstellung der Website.
              </p>
            </section>

            {/* 5. Kontaktformular */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">5. Kontaktformular</h2>
              <p>
                Auf unserer Website können Sie uns über ein Kontaktformular kontaktieren. Dabei
                verarbeiten wir die von Ihnen eingegebenen Daten zur Bearbeitung Ihrer Anfrage.
              </p>
              <p className="mt-3">Je nach Formular können dies insbesondere sein:</p>
              <ul className="list-disc pl-5 space-y-1 mt-2">
                <li>Name</li>
                <li>E-Mail-Adresse</li>
                <li>Unternehmen</li>
                <li>gewünschte Leistung / Auswahlfeld</li>
                <li>Nachricht</li>
              </ul>
              <p className="mt-3">
                Pflichtangaben sind als solche gekennzeichnet. Ohne diese Angaben kann Ihre Anfrage
                gegebenenfalls nicht bearbeitet werden.
              </p>
              <p className="mt-3">Die Verarbeitung erfolgt:</p>
              <ul className="list-disc pl-5 space-y-2 mt-2">
                <li>
                  auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO, soweit Ihre Anfrage auf den
                  Abschluss eines Vertrags oder vorvertragliche Maßnahmen gerichtet ist,
                </li>
                <li>
                  hilfsweise auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO aufgrund unseres
                  berechtigten Interesses an einer effizienten Kommunikation mit Interessenten
                  und Geschäftskunden.
                </li>
              </ul>
            </section>

            {/* 6. Technische Verarbeitung */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                6. Technische Verarbeitung von Formularanfragen
              </h2>
              <p>
                Formularanfragen werden serverseitig verarbeitet und an unser geschäftliches
                E-Mail-Postfach weitergeleitet. Dabei können wir zur technischen Entgegennahme,
                Weiterleitung, Zwischenspeicherung und internen Workflow-Steuerung insbesondere
                folgende Systeme einsetzen:
              </p>
              <ul className="list-disc pl-5 space-y-1 mt-2">
                <li>Netlify / serverseitige Website-Funktionen</li>
                <li>Supabase</li>
                <li>n8n</li>
                <li>unser geschäftliches E-Mail-Postfach</li>
              </ul>
              <p className="mt-3">
                Die Verarbeitung erfolgt ausschließlich zur Entgegennahme, Strukturierung,
                Weiterleitung und Bearbeitung Ihrer Anfrage.
              </p>
              <p className="mt-3">
                Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO bzw. Art. 6 Abs. 1 lit. f DSGVO.
              </p>
            </section>

            {/* 7. Chatbot */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">7. Chatbot</h2>
              <p>
                Auf unserer Website stellen wir einen Chatbot zur Verfügung, über den Sie mit uns
                in Kontakt treten können. Im Rahmen der Nutzung des Chatbots verarbeiten wir die
                von Ihnen eingegebenen Inhalte sowie technische Metadaten, soweit dies für die
                Bereitstellung, Bearbeitung und Verbesserung der Kommunikation erforderlich ist.
              </p>
              <p className="mt-3">
                Dabei können insbesondere folgende Daten verarbeitet werden:
              </p>
              <ul className="list-disc pl-5 space-y-1 mt-2">
                <li>eingegebene Nachrichten</li>
                <li>Zeitpunkte der Kommunikation</li>
                <li>technische Sitzungs- und Verbindungsdaten</li>
                <li>ggf. freiwillig von Ihnen genannte Kontaktdaten</li>
              </ul>
              <p className="mt-3">
                Chatverläufe werden gespeichert, soweit dies für die Bearbeitung Ihrer Anfrage,
                die Fortführung des Gesprächs, die technische Bereitstellung und die
                Nachvollziehbarkeit geschäftlicher Kommunikation erforderlich ist.
              </p>
              <p className="mt-3">
                Für den Betrieb des Chatbots und die Speicherung chatbezogener Daten nutzen wir
                insbesondere Supabase.
              </p>
              <p className="mt-3">
                Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO, soweit die Kommunikation auf
                vorvertragliche Maßnahmen oder die Anbahnung eines Vertrags gerichtet ist, sowie
                Art. 6 Abs. 1 lit. f DSGVO auf Grundlage unseres berechtigten Interesses an
                einer effizienten, nachvollziehbaren und nutzerfreundlichen Kommunikation.
              </p>
              <p className="mt-3">
                Bitte übermitteln Sie über den Chatbot keine sensiblen Informationen, sofern dies
                nicht zwingend erforderlich ist.
              </p>
            </section>

            {/* 8. Supabase */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">8. Supabase</h2>
              <p>
                Wir nutzen Supabase für datenbankbezogene Funktionen und zur technischen
                Speicherung bestimmter anfrage- oder chatbezogener Daten. Dabei können
                personenbezogene Daten verarbeitet werden, soweit dies zur Bereitstellung unserer
                Website-Funktionen, zur Bearbeitung von Anfragen oder zum Betrieb des Chatbots
                erforderlich ist.
              </p>
              <p className="mt-3">
                Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO bzw.
                Art. 6 Abs. 1 lit. f DSGVO.
              </p>
            </section>

            {/* 9. Server-Logfiles */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">9. Server-Logfiles</h2>
              <p>
                Beim Aufruf unserer Website werden automatisch technische Informationen erfasst,
                die Ihr Browser bzw. Ihr Endgerät übermittelt. Dazu können insbesondere gehören:
              </p>
              <ul className="list-disc pl-5 space-y-1 mt-2">
                <li>IP-Adresse</li>
                <li>Datum und Uhrzeit des Zugriffs</li>
                <li>angeforderte Seite / URL</li>
                <li>Browsertyp und Browserversion</li>
                <li>Betriebssystem</li>
                <li>Referrer-URL</li>
                <li>Statuscodes und technische Protokolldaten</li>
              </ul>
              <p className="mt-3">
                Diese Daten dienen der technischen Bereitstellung, Stabilität, Sicherheit und
                Fehleranalyse unserer Website.
              </p>
              <p className="mt-3">Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO.</p>
            </section>

            {/* 10. Cookies */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                10. Cookies und ähnliche Technologien
              </h2>
              <p>
                Auf unserer Website setzen wir derzeit keine Analyse-, Marketing- oder
                Remarketing-Tools ein.
              </p>
              <p className="mt-3">
                Soweit auf unserer Website technisch notwendige Cookies oder vergleichbare
                Technologien verwendet werden, erfolgt dies ausschließlich, soweit dies für die
                sichere und technisch ordnungsgemäße Bereitstellung der Website erforderlich ist.
              </p>
              <p className="mt-3">
                Sofern wir künftig Analyse-, Marketing-, Remarketing- oder sonstige
                einwilligungspflichtige Technologien einsetzen, werden wir diese
                Datenschutzerklärung entsprechend anpassen und – soweit gesetzlich erforderlich –
                ein Einwilligungs-/Consent-Management implementieren.
              </p>
            </section>

            {/* 11. Keine Login-/Upload-Funktionen */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                11. Keine Login- oder Upload-Funktionen
              </h2>
              <p>
                Derzeit bieten wir auf dieser Website keine Registrierung, kein Benutzerkonto und
                keine Datei-Upload-Funktion an.
              </p>
            </section>

            {/* 12. Empfänger */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                12. Empfänger von Daten
              </h2>
              <p>
                Personenbezogene Daten können an technische Dienstleister und Systeme weitergegeben
                werden, soweit dies zur Bereitstellung der Website, zur Bearbeitung von Anfragen
                oder zum Betrieb des Chatbots erforderlich ist. Hierzu können insbesondere gehören:
              </p>
              <ul className="list-disc pl-5 space-y-1 mt-2">
                <li>Hosting- und Infrastruktur-Dienstleister</li>
                <li>Sicherheits- und CDN-Dienstleister</li>
                <li>Datenbank- und Backend-Dienstleister</li>
                <li>interne Automatisierungs- und Workflow-Systeme</li>
                <li>E-Mail-Dienstleister</li>
              </ul>
              <p className="mt-3">
                Eine darüber hinausgehende Weitergabe erfolgt nur, wenn dies gesetzlich erlaubt
                ist, Sie eingewilligt haben oder wir rechtlich dazu verpflichtet sind.
              </p>
            </section>

            {/* 13. Drittlandübermittlung */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                13. Drittlandübermittlung
              </h2>
              <p>
                Im Rahmen der Nutzung einzelner technischer Dienstleister kann eine Verarbeitung
                personenbezogener Daten auch in Drittländern, insbesondere in den USA, nicht
                ausgeschlossen werden.
              </p>
              <p className="mt-3">
                Soweit dabei kein Angemessenheitsbeschluss oder keine unmittelbare gesetzliche
                Erlaubnis greift, achten wir auf geeignete Garantien, insbesondere vertragliche
                Schutzmechanismen nach Art. 46 DSGVO, soweit erforderlich.
              </p>
            </section>

            {/* 14. Speicherdauer */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">14. Speicherdauer</h2>
              <p>
                Wir speichern personenbezogene Daten nur so lange, wie dies für die jeweiligen
                Zwecke erforderlich ist.
              </p>
              <p className="mt-3">Für Kontakt- und Chatanfragen bedeutet dies:</p>
              <ul className="list-disc pl-5 space-y-2 mt-2">
                <li>
                  Wir speichern Anfragen und Chatverläufe grundsätzlich nur so lange, wie dies zur
                  Bearbeitung, Fortführung der Kommunikation, Dokumentation von Geschäftsanbahnungen
                  oder Erfüllung gesetzlicher Pflichten erforderlich ist.
                </li>
                <li>
                  Wenn sich aus einer Anfrage kein Vertragsverhältnis ergibt, löschen oder
                  anonymisieren wir die Daten in der Regel nach Wegfall des Zwecks, sofern keine
                  gesetzlichen Aufbewahrungspflichten entgegenstehen.
                </li>
                <li>
                  Geschäfts- und steuerrechtlich relevante Unterlagen können aufgrund gesetzlicher
                  Aufbewahrungspflichten länger gespeichert werden.
                </li>
              </ul>
            </section>

            {/* 15. Ihre Rechte */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">15. Ihre Rechte</h2>
              <p>
                Sie haben im Rahmen der gesetzlichen Voraussetzungen insbesondere folgende Rechte:
              </p>
              <ul className="list-disc pl-5 space-y-1 mt-2">
                <li>Recht auf Auskunft nach Art. 15 DSGVO</li>
                <li>Recht auf Berichtigung nach Art. 16 DSGVO</li>
                <li>Recht auf Löschung nach Art. 17 DSGVO</li>
                <li>Recht auf Einschränkung der Verarbeitung nach Art. 18 DSGVO</li>
                <li>Recht auf Datenübertragbarkeit nach Art. 20 DSGVO</li>
                <li>Recht auf Widerspruch nach Art. 21 DSGVO</li>
                <li>Recht auf Widerruf einer erteilten Einwilligung mit Wirkung für die Zukunft</li>
              </ul>
              <p className="mt-4">
                Zur Ausübung Ihrer Rechte genügt eine Nachricht an:{" "}
                <a
                  href="mailto:info@tawano.de"
                  className="text-primary hover:underline"
                >
                  info@tawano.de
                </a>
              </p>
            </section>

            {/* 16. Beschwerderecht */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                16. Beschwerderecht bei einer Aufsichtsbehörde
              </h2>
              <p>
                Sie haben das Recht, sich bei einer Datenschutz-Aufsichtsbehörde zu beschweren,
                wenn Sie der Ansicht sind, dass die Verarbeitung Ihrer personenbezogenen Daten
                gegen Datenschutzrecht verstößt.
              </p>
              <p className="mt-3">
                Zuständige Aufsichtsbehörde für Nordrhein-Westfalen ist insbesondere:
              </p>
              <div className="mt-3 pl-4 border-l-2 border-primary/30 space-y-1">
                <p className="font-medium text-foreground">
                  Landesbeauftragte für Datenschutz und Informationsfreiheit
                  Nordrhein-Westfalen
                </p>
                <p>Kavalleriestraße 2–4</p>
                <p>40213 Düsseldorf</p>
                <p>Deutschland</p>
                <p className="mt-2">E-Mail: poststelle@ldi.nrw.de</p>
              </div>
            </section>

            {/* 17. Aktualität */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                17. Aktualität dieser Datenschutzerklärung
              </h2>
              <p>
                Wir behalten uns vor, diese Datenschutzerklärung anzupassen, wenn sich unsere
                Website, unsere Prozesse, die eingesetzten Technologien oder die Rechtslage
                ändern. Es gilt jeweils die auf dieser Website veröffentlichte aktuelle Fassung.
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