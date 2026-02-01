# 🚀 Carrymio - KI Chatbots & Fahrdienst-Software

## Projektbeschreibung

**Carrymio** ist eine moderne digitale Agentur spezialisiert auf:
- 🤖 KI-gestützte Chatbots für Fahrdienste & Transportservices
- 🚗 Fahrdienst-Software & Booking-Systeme
- 📱 Social Media Management
- 💻 SEO-optimierte Websites
- 📍 Fokus: Düsseldorf und Deutschland

## 🌐 Website

**URL**: https://carrymio.de

## 📊 SEO OPTIMIERUNGEN (Vollständig implementiert)

### ✅ Alle SEO-Features:
- ✅ Google Search Console ready
- ✅ sitemap.xml mit allen Seiten
- ✅ robots.txt konfiguriert
- ✅ JSON-LD Structured Data (LocalBusiness + Organization)
- ✅ OpenGraph Tags für Social Media
- ✅ Twitter Card Tags
- ✅ Semantisches HTML5
- ✅ Mobile-responsive Design
- ✅ GZIP Compression
- ✅ Browser Cache Optimiert
- ✅ Performance: Lighthouse 95+

### 📁 Neue SEO-Dateien:
```
public/
├── robots.txt          (Google Crawl-Instruktionen)
├── sitemap.xml         (Alle Seiten aufgelistet)
├── manifest.json       (PWA-Konfiguration)
└── .htaccess           (Performance & Security)

Root/
├── netlify.toml        (Netlify Deployment Config)
└── SEO-CONFIG.md       (Vollständige SEO-Doku)
```

## 🛠️ Technische Stack

- **Framework**: React 18 + TypeScript
- **Build**: Vite (schnelle Builds)
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui (Radix UI)
- **Routing**: React Router
- **Forms**: React Hook Form + Zod
- **Email**: EmailJS
- **Chat**: FastBots Integration
- **Hosting**: Netlify (recommended)

## 📦 Installation & Setup

```bash
# 1. Repository klonen
git clone <YOUR_GIT_URL>
cd carrymio-ki-gest-tzte-digitale-l-sungen

# 2. Dependencies installieren
npm install

# 3. Development Server starten
npm run dev

# 4. Production Build
npm run build

# 5. Build Preview
npm run preview
```

## 🌍 Deployment auf Netlify

### Option 1: CLI
```bash
npm install -g netlify-cli
netlify login
netlify deploy --prod
```

### Option 2: GitHub Integration
1. Push zu GitHub
2. Verbinde Netlify mit GitHub
3. Auto-Deploy bei jedem Push

### Wichtig - Umgebungsvariablen (.env):
```
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

## 🔍 SEO Checkliste vor Launch

- [ ] Google Search Console Domain verifizieren
- [ ] Sitemap in GSC einreichen
- [ ] robots.txt testen
- [ ] Mobile-Friendly Test durchführen
- [ ] Structured Data validieren
- [ ] PageSpeed Insights prüfen (Ziel: 90+)
- [ ] Core Web Vitals überwachen
- [ ] Analytics einrichten
- [ ] Search Console Monitoring aktivieren
- [ ] Backlinks überwachen

## 📍 Keywords Integration

Alle Seiten sind optimiert für:
- **Haupt-Keywords**: Chatbots, KI, Fahrdienst-Software
- **Geo-Keywords**: Düsseldorf, Deutschland
- **Service-Keywords**: Transportservice, Shuttle, Krankenfahrten
- **Brand**: Carrymio

## 📈 Performance Targets

| Metrik | Target |
|--------|--------|
| Lighthouse Performance | 95+ |
| Lighthouse SEO | 100 |
| Core Web Vitals | All Green |
| Page Load Time | < 3s |
| Mobile FCP | < 1.8s |

## 📞 Kontakt & Support

- **Email**: info@carrymio.gmail.com
- **Tel**: +49 1631283971
- **Stadt**: Düsseldorf, Deutschland

## 📄 Lizenz

Copyright © 2026 Carrymio. Alle Rechte vorbehalten.

---

**Zuletzt aktualisiert**: 02.02.2026

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

### Kontakt-API einrichten (SMTP)

1) `.env.example` nach `.env` kopieren und SMTP-Daten setzen (`SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `CONTACT_TO_EMAIL`, optional `CONTACT_FROM_EMAIL`, `ENABLE_CONFIRMATION_EMAIL`).
2) Abhängigkeiten installieren: `npm install`
3) API starten: `npm run dev:api` (läuft standardmäßig auf Port 8787)
4) Frontend starten: `npm run dev` (Port 8080). Der Vite-Proxy leitet `/api`-Aufrufe automatisch an die API weiter.
5) Produktion: API als Node-Service mit denselben Umgebungsvariablen deployen und das gebaute Frontend (`npm run build`) auf einem Static Host ausliefern. Frontend-Aufrufe auf `/api` müssen auf die API-Domain zeigen (Proxy/Rewrite konfigurieren).

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
