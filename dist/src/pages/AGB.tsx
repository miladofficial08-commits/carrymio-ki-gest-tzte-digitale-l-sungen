import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

const AGB = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="container px-4 py-16 md:py-24 max-w-4xl">
        <Link to="/" className="text-sm text-primary hover:underline">
          ← Zurück zur Startseite
        </Link>

        <div className="mt-8 premium-panel p-8 md:p-10">
          <h1 className="section-title mb-2">Allgemeine Geschäftsbedingungen</h1>
          <p className="text-sm text-muted-foreground mb-10">
            Tawano · Stand: April 2026
          </p>

          <div className="space-y-10 text-muted-foreground leading-7">

            {/* 1. Geltungsbereich */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                1. Geltungsbereich
              </h2>
              <p>
                1.1 Diese Allgemeinen Geschäftsbedingungen gelten für alle Leistungen von
                Jamal Kamal, handelnd unter „Tawano" (nachfolgend „Tawano"), gegenüber
                Unternehmern im Sinne des § 14 BGB.
              </p>
              <p className="mt-3">
                1.2 Verbraucher im Sinne des § 13 BGB sind von unserem Angebot ausgeschlossen.
                Unsere Leistungen richten sich ausschließlich an Geschäftskunden.
              </p>
              <p className="mt-3">
                1.3 Abweichende Allgemeine Geschäftsbedingungen des Auftraggebers gelten nur,
                wenn wir ihrer Geltung ausdrücklich in Textform zugestimmt haben.
              </p>
              <p className="mt-3">
                1.4 Individuelle Vereinbarungen im Angebot, Vertrag oder in einer ausdrücklich
                bestätigten Textnachricht gehen diesen AGB vor.
              </p>
            </section>

            {/* 2. Vertragspartner */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                2. Vertragspartner
              </h2>
              <p>Vertragspartner des Auftraggebers ist:</p>
              <div className="mt-3 pl-4 border-l-2 border-primary/30 space-y-1">
                <p className="font-medium text-foreground">Jamal Kamal</p>
                <p>handelnd unter „Tawano"</p>
                <p>Erkrather Str. 401</p>
                <p>40231 Düsseldorf</p>
                <p>Deutschland</p>
                <p className="mt-2">E-Mail: info@tawano.de</p>
              </div>
            </section>

            {/* 3. Leistungen */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">3. Leistungen</h2>
              <p>3.1 Tawano bietet insbesondere folgende Leistungen an:</p>
              <ul className="list-disc pl-5 space-y-1 mt-2">
                <li>Erstellung und Umsetzung von Websites und Landingpages</li>
                <li>Konzeption, Entwicklung und Integration von Chatbots</li>
                <li>Automatisierungen und Workflow-Lösungen</li>
                <li>Wartung und technische Betreuung</li>
                <li>Hosting-nahe technische Leistungen und Deployments</li>
                <li>Support- und Begleitleistungen</li>
              </ul>
              <p className="mt-3">
                3.2 Der konkrete Leistungsumfang ergibt sich ausschließlich aus dem individuellen
                Angebot, Projektvertrag oder einer ausdrücklich bestätigten Leistungsbeschreibung.
              </p>
              <p className="mt-3">
                3.3 Angaben auf der Website, in Präsentationen oder in Werbematerialien stellen
                keine verbindliche Beschaffenheitsvereinbarung dar.
              </p>
            </section>

            {/* 4. Vertragsschluss */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">4. Vertragsschluss</h2>
              <p>
                4.1 Angebote von Tawano sind freibleibend, sofern sie nicht ausdrücklich als
                verbindlich bezeichnet sind.
              </p>
              <p className="mt-3">4.2 Ein Vertrag kommt zustande durch:</p>
              <ul className="list-disc pl-5 space-y-1 mt-2">
                <li>ausdrückliche Annahme eines Angebots durch den Auftraggeber in Textform,</li>
                <li>unsere Auftragsbestätigung in Textform,</li>
                <li>oder den Beginn der Leistungserbringung nach Annahme des Angebots.</li>
              </ul>
              <p className="mt-3">
                4.3 Textform im Sinne dieser AGB umfasst insbesondere E-Mail und andere
                nachweisbare elektronische Kommunikation.
              </p>
            </section>

            {/* 5. Mitwirkungspflichten */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                5. Mitwirkungspflichten des Auftraggebers
              </h2>
              <p>
                5.1 Der Auftraggeber ist verpflichtet, alle für das Projekt erforderlichen
                Informationen, Inhalte, Materialien, Zugänge, Freigaben und Ansprechpartner
                rechtzeitig bereitzustellen.
              </p>
              <p className="mt-3">
                5.2 Der Auftraggeber stellt sicher, dass er über die erforderlichen Rechte an
                allen von ihm bereitgestellten Inhalten verfügt und deren Nutzung keine Rechte
                Dritter verletzt.
              </p>
              <p className="mt-3">
                5.3 Verzögerungen, Mehraufwand oder Fehler, die auf verspätete, unvollständige
                oder fehlerhafte Mitwirkung des Auftraggebers zurückzuführen sind, gehen nicht
                zu Lasten von Tawano.
              </p>
              <p className="mt-3">
                5.4 Der Auftraggeber hat Zwischenstände, Entwürfe und Freigabeversionen zeitnah
                zu prüfen und etwaige Beanstandungen vollständig und gebündelt mitzuteilen.
              </p>
            </section>

            {/* 6. Vergütung */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                6. Vergütung und Zahlungsbedingungen
              </h2>
              <p>
                6.1 Die Vergütung ergibt sich aus dem jeweiligen Angebot oder der individuellen
                Vereinbarung.
              </p>
              <p className="mt-3">
                6.2 Sofern nichts anderes vereinbart ist, sind 50 % der vereinbarten Vergütung
                vor Projektbeginn als Anzahlung fällig. Mit der Leistungserbringung beginnen wir
                grundsätzlich erst nach Zahlungseingang der Anzahlung.
              </p>
              <p className="mt-3">
                6.3 Der Restbetrag ist mit Abnahme bzw. bei laufenden Leistungen nach der
                jeweils vereinbarten Abrechnungsperiode fällig.
              </p>
              <p className="mt-3">
                6.4 Rechnungen sind ohne Abzug innerhalb von 7 Kalendertagen ab Rechnungsdatum
                zahlbar, sofern nichts anderes vereinbart ist.
              </p>
              <p className="mt-3">
                6.5 Bei Zahlungsverzug sind wir berechtigt, weitere Leistungen bis zum
                vollständigen Ausgleich offener Forderungen auszusetzen.
              </p>
            </section>

            {/* 7. Korrekturen */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                7. Korrekturen, Änderungswünsche und Change Requests
              </h2>
              <p>
                7.1 Sofern im Angebot nichts anderes geregelt ist, sind zwei Korrekturschleifen
                je Hauptliefergegenstand im vereinbarten Preis enthalten.
              </p>
              <p className="mt-3">
                7.2 Eine Korrekturschleife liegt vor, wenn der Auftraggeber seine Änderungswünsche
                gebündelt zu einem konkreten Zwischenstand mitteilt.
              </p>
              <p className="mt-3">
                7.3 Änderungswünsche, die über den ursprünglich vereinbarten Leistungsumfang
                hinausgehen, gelten als Zusatzleistung und werden gesondert vergütet.
              </p>
              <p className="mt-3">
                7.4 Mündliche Änderungsabreden sind nur verbindlich, wenn sie von uns in Textform
                bestätigt wurden.
              </p>
            </section>

            {/* 8. Abnahme */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">8. Abnahme</h2>
              <p>
                8.1 Nach Fertigstellung oder Lieferung eines vereinbarten Leistungsstands fordern
                wir den Auftraggeber zur Abnahme auf.
              </p>
              <p className="mt-3">
                8.2 Die Abnahme gilt als erfolgt, wenn der Auftraggeber nicht innerhalb von
                7 Werktagen nach Bereitstellung in Textform konkrete, nachvollziehbare und
                wesentliche Mängel mitteilt.
              </p>
              <p className="mt-3">
                8.3 Unwesentliche Mängel berechtigen nicht zur Verweigerung der Abnahme.
              </p>
              <p className="mt-3">
                8.4 Die produktive Nutzung, Live-Schaltung, Freigabe oder wirtschaftliche
                Verwendung der Leistung gilt ebenfalls als Abnahme.
              </p>
            </section>

            {/* 9. Laufende Leistungen */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                9. Laufende Leistungen
              </h2>
              <p>
                9.1 Laufende Leistungen wie Support, Wartung, Hosting-nahe Betreuung oder
                fortlaufende Automatisierungen bedürfen einer gesonderten Vereinbarung.
              </p>
              <p className="mt-3">
                9.2 Sofern nichts anderes vereinbart ist, können laufende Leistungen von beiden
                Parteien mit einer Frist von 4 Wochen zum Monatsende in Textform gekündigt werden.
              </p>
            </section>

            {/* 10. Nutzungsrechte */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">10. Nutzungsrechte</h2>
              <p>
                10.1 Nach vollständiger Zahlung der vereinbarten Vergütung erhält der Auftraggeber
                ein einfaches, nicht ausschließliches, nicht übertragbares Nutzungsrecht an den
                vertraglich vereinbarten Arbeitsergebnissen für den vereinbarten Zweck.
              </p>
              <p className="mt-3">
                10.2 Bis zur vollständigen Zahlung verbleiben sämtliche Nutzungsrechte bei Tawano.
              </p>
              <p className="mt-3">
                10.3 Rechte an Vorlagen, Konzepten, Entwürfen, generischen Modulen, internen
                Strukturen, Methoden, Bibliotheken, Snippets, Frameworks, Prompts, Systemlogiken
                und wiederverwendbaren Komponenten verbleiben bei Tawano, soweit nicht ausdrücklich
                etwas anderes vereinbart wurde.
              </p>
              <p className="mt-3">
                10.4 Open-Source-Komponenten und Drittanbieter-Software unterliegen den jeweiligen
                Lizenzbedingungen der jeweiligen Anbieter.
              </p>
            </section>

            {/* 11. Drittanbieter */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                11. Drittanbieter und Fremdsysteme
              </h2>
              <p>
                11.1 Unsere Leistungen können auf Drittanbietern, APIs, Hosting-Diensten,
                KI-Diensten, Datenbanken, Automatisierungssystemen oder sonstigen externen
                Plattformen aufbauen.
              </p>
              <p className="mt-3">
                11.2 Für Verfügbarkeit, Preisänderungen, API-Änderungen, Funktionsänderungen,
                Einschränkungen oder Ausfälle solcher Drittanbieter haften wir nicht, soweit
                diese Umstände außerhalb unseres Einflussbereichs liegen.
              </p>
              <p className="mt-3">
                11.3 Sofern Anpassungen wegen Änderungen von Drittanbietern erforderlich werden
                und diese nicht vom ursprünglich vereinbarten Leistungsumfang umfasst sind, gelten
                sie als gesondert zu beauftragende Zusatzleistung.
              </p>
            </section>

            {/* 12. KI-gestützte Leistungen */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                12. KI-gestützte Leistungen und Automatisierungen
              </h2>
              <p>
                12.1 Soweit unsere Leistungen KI-gestützte Systeme, Chatbots, Automatisierungen
                oder ähnliche technische Lösungen umfassen, schulden wir keine Garantie für einen
                bestimmten wirtschaftlichen Erfolg, eine bestimmte Conversion, bestimmte Umsätze,
                bestimmte Lead-Zahlen oder eine vollständige Fehlerfreiheit der Ergebnisse.
              </p>
              <p className="mt-3">
                12.2 KI-gestützte Systeme und Automatisierungen können fehlerhafte, unvollständige
                oder kontextuell unpassende Ergebnisse erzeugen. Der Auftraggeber bleibt
                verpflichtet, die Ergebnisse vor produktiver oder rechtlich relevanter Nutzung
                angemessen zu prüfen.
              </p>
              <p className="mt-3">
                12.3 Wir schulden, soweit nicht ausdrücklich anders vereinbart, die technische
                Erstellung bzw. Implementierung nach dem vereinbarten Leistungsumfang, nicht
                jedoch einen bestimmten Erfolg.
              </p>
            </section>

            {/* 13. Gewährleistung */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">13. Gewährleistung</h2>
              <p>
                13.1 Mängel sind uns unverzüglich in Textform unter möglichst genauer Beschreibung
                mitzuteilen.
              </p>
              <p className="mt-3">
                13.2 Wir erhalten zunächst das Recht zur Nacherfüllung innerhalb angemessener Frist.
              </p>
              <p className="mt-3">
                13.3 Die Gewährleistungsfrist beträgt bei Werkleistungen gegenüber Unternehmern
                12 Monate ab Abnahme, soweit gesetzlich zulässig.
              </p>
              <p className="mt-3">
                13.4 Keine Mängelansprüche bestehen insbesondere bei:
              </p>
              <ul className="list-disc pl-5 space-y-1 mt-2">
                <li>Änderungen durch den Auftraggeber oder Dritte ohne unsere Freigabe,</li>
                <li>ungeeigneter Nutzung,</li>
                <li>vom Auftraggeber bereitgestellten fehlerhaften Inhalten oder Vorgaben,</li>
                <li>Störungen durch Drittanbieter oder externe Plattformen,</li>
                <li>Umständen, die außerhalb unseres Einflussbereichs liegen.</li>
              </ul>
            </section>

            {/* 14. Haftung */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">14. Haftung</h2>
              <p>14.1 Wir haften unbeschränkt:</p>
              <ul className="list-disc pl-5 space-y-1 mt-2">
                <li>bei Vorsatz und grober Fahrlässigkeit,</li>
                <li>bei Schäden aus der Verletzung des Lebens, des Körpers oder der Gesundheit,</li>
                <li>soweit eine Haftung gesetzlich zwingend vorgeschrieben ist.</li>
              </ul>
              <p className="mt-3">
                14.2 Bei einfacher Fahrlässigkeit haften wir nur bei Verletzung einer wesentlichen
                Vertragspflicht. In diesem Fall ist unsere Haftung der Höhe nach auf den
                vertragstypischen, vorhersehbaren Schaden und maximal auf die vereinbarte
                Gesamtvergütung des betroffenen Projekts beschränkt.
              </p>
              <p className="mt-3">
                14.3 Eine weitergehende Haftung bei einfacher Fahrlässigkeit ist ausgeschlossen.
              </p>
              <p className="mt-3">14.4 Wir haften insbesondere nicht für:</p>
              <ul className="list-disc pl-5 space-y-1 mt-2">
                <li>entgangenen Gewinn,</li>
                <li>mittelbare Schäden,</li>
                <li>Folgeschäden,</li>
                <li>
                  Datenverluste, soweit diese bei ordnungsgemäßer Datensicherung vermeidbar
                  gewesen wären,
                </li>
                <li>Schäden aufgrund von Änderungen oder Ausfällen externer Dienste,</li>
                <li>
                  Schäden aufgrund von Handlungen, Weisungen oder Freigaben des Auftraggebers.
                </li>
              </ul>
              <p className="mt-3">
                14.5 Die vorstehenden Haftungsbeschränkungen gelten auch zugunsten unserer
                Mitarbeiter, Erfüllungsgehilfen und sonstigen eingesetzten Personen.
              </p>
            </section>

            {/* 15. Referenzen */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">15. Referenzen</h2>
              <p>
                15.1 Eine Veröffentlichung des Auftraggebers als Referenz erfolgt nur nach
                vorheriger ausdrücklicher Freigabe durch den Auftraggeber in Textform.
              </p>
              <p className="mt-3">
                15.2 Ohne Freigabe verwenden wir weder Namen, Logos, Screenshots noch
                Projektbeschreibungen des Auftraggebers zu Referenzzwecken.
              </p>
            </section>

            {/* 16. Vertraulichkeit */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                16. Vertraulichkeit
              </h2>
              <p>
                16.1 Beide Parteien verpflichten sich, vertrauliche Informationen der jeweils
                anderen Partei vertraulich zu behandeln.
              </p>
              <p className="mt-3">
                16.2 Dies gilt nicht für Informationen, die offenkundig sind, ohne Verstoß bekannt
                werden oder aufgrund gesetzlicher Verpflichtung offengelegt werden müssen.
              </p>
            </section>

            {/* 17. Datenschutz */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">17. Datenschutz</h2>
              <p>
                17.1 Soweit wir im Auftrag des Auftraggebers personenbezogene Daten verarbeiten,
                schließen die Parteien – soweit erforderlich – vor Beginn der Verarbeitung einen
                Auftragsverarbeitungsvertrag gemäß Art. 28 DSGVO.
              </p>
              <p className="mt-3">
                17.2 Der Auftraggeber bleibt für die Rechtmäßigkeit der von ihm veranlassten
                Datenverarbeitung verantwortlich, soweit wir als Auftragsverarbeiter tätig werden.
              </p>
            </section>

            {/* 18. Schlussbestimmungen */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                18. Schlussbestimmungen
              </h2>
              <p>
                18.1 Es gilt deutsches Recht unter Ausschluss des UN-Kaufrechts.
              </p>
              <p className="mt-3">
                18.2 Gerichtsstand für alle Streitigkeiten aus oder im Zusammenhang mit dem
                Vertragsverhältnis ist, soweit gesetzlich zulässig, Düsseldorf.
              </p>
              <p className="mt-3">
                18.3 Sollten einzelne Bestimmungen dieser AGB ganz oder teilweise unwirksam sein
                oder werden, bleibt die Wirksamkeit der übrigen Bestimmungen unberührt. An die
                Stelle der unwirksamen Bestimmung tritt die gesetzliche Regelung.
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