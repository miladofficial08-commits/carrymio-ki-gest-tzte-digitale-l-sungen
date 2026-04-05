# Carrymio Landing Page

## Projektbeschreibung

Diese Anwendung ist die Landingpage fuer Carrymio.
Der Fokus liegt auf drei Angeboten:

- CARRYMIO Inbox Sentinel als Hauptprodukt fuer Inbox Automation
- KI-Chatbots als unterstuetzende Loesung
- Websites als zweites Begleitangebot

Die Seite ist auf Conversion, Vertrauen und klare Positionierung ausgelegt.

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- React Router
- EmailJS

## Lokale Entwicklung

```bash
npm install
npm run dev
```

## Production Build

```bash
npm run build
npm run preview
```

## Umgebungsvariablen

Fuer das Kontaktformular werden folgende Variablen benoetigt:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

## Routing

Die SPA enthaelt derzeit diese zentralen Routen:

- /
- /impressum
- /datenschutz
- /agb

## SEO und technische Artefakte

Vorhanden im Projekt:

- index.html mit Meta-Tags, Open Graph und JSON-LD
- public/robots.txt
- public/sitemap.xml
- public/manifest.json
- netlify.toml

Eine kompakte SEO-Uebersicht steht in SEO-CONFIG.md.

## Kontaktangaben im aktuellen Stand

- E-Mail: info.carrymio@gmail.com
- Telefon: +49 1631283971
- Standort: Duesseldorf, Deutschland

## Deployment

Das Projekt ist fuer statisches Hosting ausgelegt, zum Beispiel ueber Netlify.

```bash
npm run build
```

Deploy-Verzeichnis:

```text
dist/
```
