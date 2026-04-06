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
            Tawano · Stand: April 2026 · Gültig für alle Leistungen ab diesem Datum
          </p>

          <div className="space-y-10 text-muted-foreground leading-7">

            {/* § 1 */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                § 1 Geltungsbereich und Vertragspartner
              </h2>
              <p>
                (1) Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle Leistungen,
                die Tawano, [Vor- und Nachname des Inhabers], [Anschrift], Düsseldorf
                (nachfolgend „Tawano" oder „Auftragnehmer") gegenüber ihren Auftraggebern erbringt.
              </p>
              <p className="mt-3">
                (2) Die AGB gelten ausschließlich im Verhältnis zu Unternehmern im Sinne des § 14 BGB,
                d. h. natürlichen oder juristischen Personen oder rechtsfähigen
                Personengesellschaften, die bei Vertragsschluss in Ausübung ihrer gewerblichen oder
                selbständigen beruflichen Tätigkeit handeln (B2B). Verbraucher im Sinne des § 13 BGB
                sind nicht Vertragspartner.
              </p>
              <p className="mt-3">
                (3) Abweichende, entgegenstehende oder ergänzende AGB des Auftraggebers werden nicht
                Vertragsbestandteil, es sei denn, Tawano stimmt ihrer Geltung ausdrücklich und
                schriftlich zu. Dies gilt auch dann, wenn Tawano in Kenntnis der AGB des Auftraggebers
                die Leistung vorbehaltlos erbringt.
              </p>
              <p className="mt-3">
                (4) Individuelle Vereinbarungen (z. B. im Angebot, Projektvertrag oder per E-Mail
                schriftlich bestätigt) haben stets Vorrang vor diesen AGB.
              </p>
            </section>

            {/* § 2 */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                § 2 Leistungsangebot
              </h2>
              <p>
                (1) Tawano bietet digitale Dienstleistungen für Unternehmen an, insbesondere:
              </p>
              <ul className="list-disc pl-5 space-y-1 mt-2">
                <li>
                  Konzeption, Gestaltung und technische Umsetzung von Unternehmenswebsites
                  und Landing Pages
                </li>
                <li>
                  Entwicklung und Einrichtung von Chatbot-Lösungen auf Basis externer Plattformen
                  oder eigener Implementierungen
                </li>
                <li>
                  Erstellung von Automatisierungsworkflows und digitalen Assistenzlösungen
                  (sog. „digitale Mitarbeiter") zur Unterstützung betrieblicher Prozesse
                </li>
                <li>
                  Verwandte digitale Dienstleistungen, Beratung und technische Unterstützung
                </li>
              </ul>
              <p className="mt-3">
                (2) Der genaue Leistungsumfang, die vereinbarten Liefergegenstände sowie die
                Vergütung ergeben sich aus dem jeweiligen individuellen Angebot. Allgemeine
                Beschreibungen auf der Website oder in Marketingmaterialien stellen keine
                verbindliche Leistungszusage dar.
              </p>
              <p className="mt-3">
                (3) Tawano ist berechtigt, Leistungen ganz oder teilweise durch qualifizierte
                Unterauftragnehmer erbringen zu lassen, soweit dies dem Auftraggeber zumutbar ist
                und der Datenschutz gewährleistet bleibt.
              </p>
            </section>

            {/* § 3 */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                § 3 Angebot und Vertragsschluss
              </h2>
              <p>
                (1) Angebote von Tawano sind freibleibend und unverbindlich, solange sie nicht
                ausdrücklich als verbindlich gekennzeichnet sind.
              </p>
              <p className="mt-3">
                (2) Ein Vertrag kommt zustande durch schriftliche Auftragsbestätigung von Tawano
                oder durch den Beginn der Leistungserbringung nach Annahme des Angebots durch den
                Auftraggeber. Die Übermittlung per E-Mail genügt dem Schriftformerfordernis dieser
                AGB.
              </p>
              <p className="mt-3">
                (3) Angebote gelten, sofern keine andere Frist angegeben ist, für 14 Tage ab
                Ausstellungsdatum als annahmefähig. Danach verlieren sie ihre Gültigkeit, ohne dass
                es einer gesonderten Erklärung bedarf.
              </p>
              <p className="mt-3">
                (4) Änderungen des Leistungsumfangs gegenüber dem ursprünglichen Angebot bedürfen
                einer schriftlichen Vereinbarung (sog. Change Request). Tawano ist nicht
                verpflichtet, mündlich vereinbarte Leistungsänderungen ohne schriftliche Bestätigung
                auszuführen.
              </p>
            </section>

            {/* § 4 */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                § 4 Mitwirkungspflichten des Auftraggebers
              </h2>
              <p>
                (1) Der Auftraggeber ist verpflichtet, alle für die Projektdurchführung
                erforderlichen Informationen, Materialien, Inhalte (Texte, Bilder, Logos,
                Zugangsdaten etc.) sowie Freigaben rechtzeitig und vollständig bereitzustellen.
              </p>
              <p className="mt-3">
                (2) Der Auftraggeber ist dafür verantwortlich, dass er über alle erforderlichen
                Nutzungsrechte an den von ihm bereitgestellten Materialien verfügt und dass deren
                Verwendung keine Rechte Dritter verletzt. Tawano haftet nicht für Rechtsverletzungen,
                die auf vom Auftraggeber bereitgestellten Inhalten beruhen.
              </p>
              <p className="mt-3">
                (3) Verzögerungen im Projektablauf, die auf fehlende oder verspätete Zuarbeit des
                Auftraggebers zurückzuführen sind, gehen nicht zu Lasten von Tawano. Vereinbarte
                Liefertermine verlängern sich in diesem Fall um mindestens die Dauer der
                Verzögerung. Zusätzlicher Aufwand, der durch fehlende Zuarbeit oder nachträgliche
                Änderungswünsche entsteht, kann gesondert in Rechnung gestellt werden.
              </p>
              <p className="mt-3">
                (4) Erreichbarkeit: Der Auftraggeber benennt eine verantwortliche Ansprechperson,
                die für Rückfragen, Freigaben und Abstimmungen mit Tawano zur Verfügung steht.
                Anfragen von Tawano sollen innerhalb von 3 Werktagen beantwortet werden. Bleibt
                eine Rückmeldung ohne triftigen Grund aus, kann Tawano das Projekt vorübergehend
                pausieren oder eine Neuterminierung und zusätzlichen Aufwand in Rechnung stellen.
              </p>
            </section>

            {/* § 5 */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                § 5 Vergütung und Zahlungsbedingungen
              </h2>
              <p>
                (1) Die Vergütung ergibt sich aus dem jeweiligen Angebot. Alle Preise verstehen sich
                zuzüglich der gesetzlichen Umsatzsteuer, sofern Tawano umsatzsteuerpflichtig ist.
              </p>
              <p className="mt-3">
                (2) Rechnungen sind innerhalb von 14 Tagen ab Rechnungsdatum ohne Abzug zur Zahlung
                fällig, sofern im Angebot nicht abweichend geregelt.
              </p>
              <p className="mt-3">
                (3) Bei Projekten mit einem Gesamtvolumen ab [Schwellenwert, z. B. 1.000 EUR netto]
                ist Tawano berechtigt, eine Anzahlung von bis zu 50 % des Projektpreises vor
                Projektbeginn zu verlangen. Die Restfälligkeit tritt mit Abnahme oder Lieferung ein.
              </p>
              <p className="mt-3">
                (4) Im Zahlungsverzug — d. h. wenn eine Zahlung nicht innerhalb der vereinbarten
                Frist eingeht — ist Tawano berechtigt, Verzugszinsen in Höhe von 9 Prozentpunkten
                über dem jeweils gültigen Basiszinssatz gemäß § 288 Abs. 2 BGB zu berechnen sowie
                eine Mahngebühr gemäß § 280 BGB geltend zu machen. Die Geltendmachung weitergehender
                Schäden bleibt vorbehalten.
              </p>
              <p className="mt-3">
                (5) Tawano behält sich vor, bei andauerndem Zahlungsverzug die Erbringung weiterer
                Leistungen bis zum Ausgleich offener Forderungen einzustellen, ohne dass daraus
                Schadensersatzansprüche des Auftraggebers entstehen.
              </p>
              <p className="mt-3">
                (6) Aufrechnung und Zurückbehaltung: Der Auftraggeber ist zur Aufrechnung oder
                Ausübung eines Zurückbehaltungsrechts nur berechtigt, soweit seine Gegenforderung
                rechtskräftig festgestellt, unbestritten oder von Tawano schriftlich anerkannt ist.
              </p>
            </section>

            {/* § 6 */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                § 6 Projektabwicklung, Korrekturschleifen und Abnahme
              </h2>
              <p>
                (1) Tawano erbringt Leistungen auf Basis des vereinbarten Projektumfangs.
                Zwischenstände werden dem Auftraggeber zur Ansicht und Freigabe bereitgestellt.
              </p>
              <p className="mt-3">
                (2) Korrekturschleifen: Im Projektpreis ist eine im Angebot festgelegte Anzahl an
                Korrekturschleifen enthalten. Als Korrekturschleife gilt die Rückmeldung des
                Auftraggebers mit konkreten, zusammengefassten Änderungswünschen zu einem
                Lieferstand. Darüber hinausgehende Korrekturläufe sowie Änderungswünsche, die über
                den ursprünglich vereinbarten Leistungsumfang hinausgehen, werden nach Aufwand
                gesondert berechnet. Tawano informiert den Auftraggeber rechtzeitig, wenn eine
                Anfrage über den vereinbarten Umfang hinausgeht.
              </p>
              <p className="mt-3">
                (3) Abnahme: Nach Fertigstellung der Leistung wird der Auftraggeber zur Abnahme
                aufgefordert. Die Abnahme gilt als erteilt, wenn der Auftraggeber nicht innerhalb
                von 7 Werktagen nach Übergabe schriftlich konkrete und nachvollziehbare Mängel
                benennt. Unwesentliche Mängel, die den vertragsgemäßen Gebrauch nicht erheblich
                beeinträchtigen, berechtigen nicht zur Abnahmeverweigerung.
              </p>
              <p className="mt-3">
                (4) Die Inbetriebnahme (Veröffentlichung, Produktivschaltung) durch den
                Auftraggeber gilt in jedem Fall als Abnahme.
              </p>
            </section>

            {/* § 7 */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                § 7 Nutzungsrechte
              </h2>
              <p>
                (1) Nach vollständiger Bezahlung der vereinbarten Vergütung räumt Tawano dem
                Auftraggeber ein einfaches, nicht übertragbares Nutzungsrecht an den vereinbarten
                Lieferergebnissen (z. B. Website-Code, Designs, Automatisierungsworkflows) für den
                vertraglich vereinbarten Verwendungszweck ein.
              </p>
              <p className="mt-3">
                (2) Das Urheberrecht sowie alle weiteren Schutzrechte an den erstellten Werken
                verbleiben bei Tawano bzw. den jeweiligen Urhebern, soweit nicht ausdrücklich
                etwas anderes schriftlich vereinbart wurde.
              </p>
              <p className="mt-3">
                (3) Soweit in den Leistungen Open-Source-Software, Drittanbieter-Frameworks oder
                lizenzpflichtige Bibliotheken eingesetzt werden, gelten für diese die jeweiligen
                Lizenzbedingungen der Rechteinhaber. Tawano weist den Auftraggeber auf bekannte
                wesentliche Lizenzpflichten hin.
              </p>
              <p className="mt-3">
                (4) Bilder, Grafiken, Schriftarten und sonstige Drittinhalte, die nicht im
                Leistungsumfang ausdrücklich enthalten sind, werden nicht automatisch mitlizenziert.
                Die Beschaffung der erforderlichen Nutzungsrechte ist Aufgabe des Auftraggebers,
                sofern nicht ausdrücklich anders vereinbart.
              </p>
              <p className="mt-3">
                (5) Eine Weiterentwicklung der gelieferten Leistungen durch den Auftraggeber ist
                erlaubt, soweit dadurch keine Schutzrechte Dritter verletzt werden. Tawano
                übernimmt für weiterbearbeitete Leistungen keine Gewährleistung.
              </p>
            </section>

            {/* § 8 */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                § 8 Drittanbieter, externe Plattformen und APIs
              </h2>
              <p>
                (1) Tawano setzt zur Leistungserbringung externe Dienste, Plattformen und
                Programmierschnittstellen (APIs) ein, darunter je nach Projekt: Hosting- und
                CDN-Dienste, Chatbot-Plattformen, KI-Modelle externer Anbieter, Automatisierungstools
                sowie Datenbanklösungen.
              </p>
              <p className="mt-3">
                (2) Verfügbarkeit und Leistungsfähigkeit externer Dienste liegen außerhalb der
                Kontrolle von Tawano. Tawano übernimmt keine Haftung für Ausfälle, Störungen,
                Leistungsminderungen oder Datenverluste, die auf externe Anbieter zurückzuführen
                sind.
              </p>
              <p className="mt-3">
                (3) Externe Anbieter können ihre Dienste, APIs, Preismodelle oder Nutzungs-
                bedingungen ändern oder einstellen. Tawano ist nicht verpflichtet, Leistungen
                auf eigene Kosten anzupassen, wenn Drittanbieter Änderungen vornehmen, die über
                den ursprünglich vereinbarten Leistungsumfang hinausgehen. Notwendige Anpassungen
                in diesem Fall werden als gesonderter Auftrag behandelt und vergütet.
              </p>
              <p className="mt-3">
                (4) Soweit der Auftraggeber selbst Verträge mit Drittanbietern abschließt
                (z. B. Hosting, Domainregistrierung, API-Zugänge), gelten hierfür die AGB
                des jeweiligen Anbieters. Tawano übernimmt keine Verantwortung für
                Vertragsbedingungen, Kosten oder Einschränkungen durch Drittanbieter.
              </p>
            </section>

            {/* § 9 */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                § 9 KI-gestützte Leistungen und Automatisierungssysteme
              </h2>
              <p>
                (1) Tawano entwickelt und implementiert Automatisierungslösungen und KI-gestützte
                Systeme (z. B. digitale Mitarbeiter, automatisierte E-Mail-Verarbeitung, Chatbots),
                die auf KI-Modellen und Drittanbieter-APIs basieren. Diese Systeme arbeiten mit
                hoher, aber nicht vollständiger Zuverlässigkeit.
              </p>
              <p className="mt-3">
                (2) Tawano übernimmt keine Garantie für die vollständige Fehlerfreiheit, Richtigkeit
                oder Vollständigkeit von Ausgaben KI-basierter Systeme. KI-Modelle können
                fehlerhafte, unvollständige oder nicht kontextgerechte Ergebnisse liefern.
              </p>
              <p className="mt-3">
                (3) Automatisierte Systeme erfordern eine regelmäßige Überwachung durch den
                Auftraggeber oder von diesem beauftragte Personen. Der Auftraggeber ist
                verantwortlich dafür, dass für Vorgänge, die kritische Geschäftsentscheidungen,
                sensible Daten oder rechtlich relevante Handlungen betreffen, geeignete menschliche
                Kontrollmechanismen vorgesehen sind.
              </p>
              <p className="mt-3">
                (4) Tawano haftet nicht für Schäden, die dadurch entstehen, dass der Auftraggeber
                automatisch generierte Ausgaben ohne ausreichende menschliche Prüfung übernimmt
                oder in kritischen Prozessen einsetzt.
              </p>
              <p className="mt-3">
                (5) KI-Modelle und deren Fähigkeiten können sich durch Aktualisierungen externer
                Anbieter verändern. Tawano ist nicht verpflichtet, implementierte Systeme bei
                solchen Änderungen kostenfrei anzupassen, sofern die Grundfunktionalität erhalten
                bleibt.
              </p>
              <p className="mt-3">
                (6) Für automatisierte Kommunikation (z. B. automatisch generierte E-Mail-Antworten)
                liegt die inhaltliche Verantwortung gegenüber Dritten beim Auftraggeber. Der
                Auftraggeber ist dafür verantwortlich, dass automatisierte Antworten den
                rechtlichen Anforderungen — insbesondere im Hinblick auf Vertragsrecht, Datenschutz
                und etwaige Branchenvorschriften — entsprechen.
              </p>
            </section>

            {/* § 10 */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                § 10 Verfügbarkeit und Wartung
              </h2>
              <p>
                (1) Für laufende Dienste (z. B. gehostete Systeme, Automatisierungsworkflows)
                strebt Tawano eine hohe Verfügbarkeit an, kann jedoch keine unterbrechungsfreie
                Verfügbarkeit garantieren. Ausfälle durch Drittanbieter, höhere Gewalt,
                notwendige Wartungsarbeiten oder technische Störungen außerhalb des
                Einflussbereichs von Tawano begründen keine Haftung.
              </p>
              <p className="mt-3">
                (2) Geplante Wartungsarbeiten werden dem Auftraggeber nach Möglichkeit rechtzeitig
                angekündigt. Tawano wird geplante Wartungsfenster so legen, dass Beeinträchtigungen
                des Auftraggebers möglichst gering ausfallen.
              </p>
              <p className="mt-3">
                (3) Sofern keine gesonderte Vereinbarung über laufenden Support oder Wartung
                getroffen wurde, umfasst die Projektleistung keine fortlaufende Überwachung,
                Fehlerbeseitigung oder Systemaktualisierung nach Abnahme.
              </p>
            </section>

            {/* § 11 */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                § 11 Gewährleistung und Mängel
              </h2>
              <p>
                (1) Tawano erbringt Leistungen mit der Sorgfalt eines ordentlichen Fachunternehmens
                und auf Basis des bei Vertragsschluss vereinbarten Leistungsumfangs.
              </p>
              <p className="mt-3">
                (2) Mängel sind schriftlich und mit konkreter Beschreibung zu rügen. Tawano hat
                das Recht zur Nacherfüllung, d. h. zur Wahl zwischen Nachbesserung oder
                Neuherstellung innerhalb einer angemessenen Frist.
              </p>
              <p className="mt-3">
                (3) Die Gewährleistungsfrist beträgt 12 Monate ab Abnahme. Diese Verkürzung gilt
                zwischen Unternehmern gemäß § 438 Abs. 1 Nr. 3 BGB.
              </p>
              <p className="mt-3">
                (4) Von der Gewährleistung ausgenommen sind Mängel, die verursacht wurden durch:
              </p>
              <ul className="list-disc pl-5 space-y-1 mt-2">
                <li>Eingriffe oder Änderungen am Liefergegenstand durch den Auftraggeber oder
                  beauftragte Dritte ohne vorherige Abstimmung mit Tawano</li>
                <li>Unsachgemäße Nutzung oder Bedienung durch den Auftraggeber</li>
                <li>Änderungen oder Ausfälle externer Dienste und APIs</li>
                <li>Inhalte oder Materialien, die vom Auftraggeber bereitgestellt wurden</li>
                <li>Unzureichende Systemvoraussetzungen auf Seiten des Auftraggebers</li>
              </ul>
              <p className="mt-3">
                (5) Schlägt die Nacherfüllung zweimal fehl oder verweigert Tawano sie endgültig,
                kann der Auftraggeber nach seiner Wahl Minderung der Vergütung oder — bei
                erheblichen Mängeln — Rücktritt vom Vertrag verlangen.
              </p>
            </section>

            {/* § 12 */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">§ 12 Haftung</h2>
              <p>
                (1) Tawano haftet uneingeschränkt für Schäden aus der Verletzung des Lebens,
                des Körpers oder der Gesundheit sowie für Schäden, die auf Vorsatz oder grober
                Fahrlässigkeit beruhen.
              </p>
              <p className="mt-3">
                (2) Bei einfacher Fahrlässigkeit haftet Tawano nur bei Verletzung einer
                wesentlichen Vertragspflicht (Kardinalpflicht), d. h. einer Pflicht, deren
                Erfüllung die ordnungsgemäße Vertragsdurchführung überhaupt erst ermöglicht und
                auf deren Einhaltung der Auftraggeber regelmäßig vertrauen darf. In diesen Fällen
                ist die Haftung der Höhe nach begrenzt auf den typischen, bei Vertragsschluss
                vorhersehbaren Schaden, maximal jedoch auf den Nettowert des Auftragsvolumens
                des betroffenen Projekts.
              </p>
              <p className="mt-3">
                (3) Für einfach fahrlässig verursachte mittelbare Schäden, insbesondere
                entgangenen Gewinn, nicht realisierte Einsparungen, Datenverlust oder
                Produktionsausfälle, haftet Tawano — soweit keine Kardinalpflicht verletzt ist
                — nicht.
              </p>
              <p className="mt-3">
                (4) Tawano haftet nicht für Schäden, die auf Handlungen oder Unterlassungen von
                Drittanbietern (z. B. Hosting-Dienste, KI-Modellanbieter, Chatbot-Plattformen)
                zurückzuführen sind, sofern Tawano diese sorgfältig ausgewählt hat.
              </p>
              <p className="mt-3">
                (5) Soweit die Haftung von Tawano ausgeschlossen oder beschränkt ist, gilt dies
                auch für die persönliche Haftung von Mitarbeitern, Vertretern und
                Erfüllungsgehilfen.
              </p>
              <p className="mt-3">
                (6) Eine weitergehende Haftung, insbesondere nach dem Produkthaftungsgesetz
                (ProdHaftG), bleibt unberührt.
              </p>
            </section>

            {/* § 13 */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">§ 13 Vertraulichkeit</h2>
              <p>
                (1) Beide Parteien verpflichten sich, vertrauliche Informationen der jeweils
                anderen Partei — insbesondere Geschäftsdaten, technische Konzepte, Preiskalkulationen,
                Kundendaten und interne Abläufe — streng vertraulich zu behandeln und nicht ohne
                vorherige schriftliche Zustimmung der anderen Partei an Dritte weiterzugeben.
              </p>
              <p className="mt-3">
                (2) Diese Pflicht gilt nicht für Informationen, die öffentlich bekannt sind, der
                empfangenden Partei bereits bekannt waren, von einem Dritten ohne Vertraulichkeitspflicht
                mitgeteilt wurden oder aufgrund gesetzlicher Pflicht offenbart werden müssen.
              </p>
              <p className="mt-3">
                (3) Die Vertraulichkeitspflicht gilt während der Zusammenarbeit und für einen Zeitraum
                von 3 Jahren nach Vertragsende.
              </p>
            </section>

            {/* § 14 */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">§ 14 Referenznennung</h2>
              <p>
                (1) Tawano ist berechtigt, das realisierte Projekt zu Referenzzwecken zu benennen
                und dabei den Namen des Auftraggebers, einen Screenshot, einen Link sowie eine kurze
                Leistungsbeschreibung zu verwenden — beispielsweise auf der eigenen Website,
                in Angeboten oder in sozialen Netzwerken.
              </p>
              <p className="mt-3">
                (2) Der Auftraggeber kann dieser Referenznutzung jederzeit schriftlich widersprechen.
                In diesem Fall wird Tawano die betreffenden Inhalte innerhalb angemessener Zeit
                entfernen. Der Widerspruch berührt nicht die übrigen Vertragsbestandteile.
              </p>
            </section>

            {/* § 15 */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                § 15 Laufzeit und Kündigung
              </h2>
              <p>
                (1) Einmalprojekte (z. B. Website-Erstellung, Workflow-Einrichtung) enden mit
                der Abnahme der vereinbarten Leistung und vollständiger Zahlung der Vergütung.
              </p>
              <p className="mt-3">
                (2) Laufende Dienstleistungsvereinbarungen (z. B. Wartung, Hosting, fortlaufende
                Automatisierungsbetreuung) können von beiden Parteien mit einer Frist von
                4 Wochen zum Monatsende ordentlich gekündigt werden, sofern keine andere Laufzeit
                vereinbart wurde.
              </p>
              <p className="mt-3">
                (3) Das Recht zur außerordentlichen Kündigung aus wichtigem Grund bleibt unberührt.
                Ein wichtiger Grund liegt für Tawano insbesondere vor, wenn der Auftraggeber
                trotz Mahnung und Fristsetzung mit der Zahlung fälliger Vergütung in Verzug bleibt
                oder wesentliche Mitwirkungspflichten verletzt und dadurch die Erbringung der
                Leistung erheblich erschwert.
              </p>
              <p className="mt-3">
                (4) Die Kündigung bedarf der Schriftform (E-Mail genügt).
              </p>
            </section>

            {/* § 16 */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                § 16 Datenschutz im Rahmen der Leistungserbringung
              </h2>
              <p>
                (1) Tawano verarbeitet personenbezogene Daten im Rahmen der Geschäftsbeziehung
                gemäß den Anforderungen der Datenschutz-Grundverordnung (DSGVO) und des
                Bundesdatenschutzgesetzes (BDSG).
              </p>
              <p className="mt-3">
                (2) Soweit Tawano im Rahmen eines Projekts auf personenbezogene Daten des
                Auftraggebers oder von dessen Kunden zugreifen kann oder Daten in dessen Auftrag
                verarbeitet, wird ein gesonderter Auftragsverarbeitungsvertrag gemäß Art. 28 DSGVO
                abgeschlossen. Der Auftraggeber wird Tawano auf Anfrage die dafür notwendigen
                Informationen zur Verfügung stellen.
              </p>
              <p className="mt-3">
                (3) Die Datenschutzerklärung für Besucher der Website von Tawano ist gesondert
                unter <Link to="/datenschutz" className="text-primary hover:underline">tawano.de/datenschutz</Link> abrufbar.
              </p>
            </section>

            {/* § 17 */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                § 17 Schlussbestimmungen
              </h2>
              <p>
                (1) Es gilt deutsches Recht unter Ausschluss des UN-Kaufrechts (CISG).
              </p>
              <p className="mt-3">
                (2) Ausschließlicher Gerichtsstand für alle Streitigkeiten aus oder im Zusammenhang
                mit diesem Vertrag ist Düsseldorf, sofern der Auftraggeber Kaufmann, juristische
                Person des öffentlichen Rechts oder öffentlich-rechtliches Sondervermögen ist.
                Tawano ist darüber hinaus berechtigt, den Auftraggeber an seinem allgemeinen
                Gerichtsstand zu verklagen.
              </p>
              <p className="mt-3">
                (3) Sollten einzelne Bestimmungen dieser AGB ganz oder teilweise unwirksam sein oder
                werden, berührt dies die Wirksamkeit der übrigen Bestimmungen nicht. An die Stelle
                unwirksamer Regelungen tritt die gesetzliche Regelung, die dem wirtschaftlichen
                Zweck der unwirksamen Klausel am nächsten kommt.
              </p>
              <p className="mt-3">
                (4) Änderungen und Ergänzungen dieses Vertrages bedürfen der Schriftform.
                Die Übermittlung per E-Mail genügt. Mündliche Nebenabreden bestehen nicht.
              </p>
              <p className="mt-3">
                (5) Tawano behält sich vor, diese AGB mit angemessener Vorankündigungsfrist zu
                ändern. Bei wesentlichen Änderungen werden bestehende Auftraggeber rechtzeitig
                informiert. Für bereits laufende Projekte gelten die AGB in der zum Zeitpunkt des
                Vertragsschlusses geltenden Fassung.
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
