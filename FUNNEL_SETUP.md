# Funnel Lead Generation System – Setup & Deployment Guide

## Overview
This document guides the implementation of the interactive solution funnel for Tawano's lead generation system. All components are built and integrated. You only need to configure EmailJS and do final testing.

---

## Architecture

### Solution Funnels (4 Pages)
1. **Chatbot Funnel** (`/chatbot`)
   - 4 questions: purpose, volume, platform, timeline
   - Price: Starting at 499 EUR

2. **Webdesign Funnel** (`/webdesign`)
   - 4 questions: type, page count, goal, deadline
   - Price: Starting at 999 EUR

3. **Digitaler Mitarbeiter Funnel** (`/digitale-mitarbeiter`) - Featured
   - 4 questions: support volume, staff count, channels, automation goals
   - **Visually highlighted** with glow effect and "Beliebteste Lösung" badge
   - Pricing: "Unverbindliches Angebot"

4. **Custom Automation Funnel** (`/custom-automation`)
   - 4 questions: automation area, tools, team size, urgency
   - Pricing: "Unverbindliches Angebot"

### Data Flow
```
User Interaction
    ↓
SolutionFunnel Component (min-h-[360px], smooth transitions)
    ↓
4 Interactive Questions (click-based, emoji badges, descriptions)
    ↓
Contact Collection (name + email only)
    ↓
Validation (email format check)
    ↓
Parallel Execution:
  ├─ Save to Supabase (funnel_leads table)
  ├─ Send Internal Notification (EmailJS template)
  └─ Send Auto-Response to User (EmailJS template)
    ↓
Success Screen (animated checkmark + messaging)
    ↓
ExitIntentPopup (triggers on mouseleave or back button)
```

---

## Supabase Setup ✅

### Table: `funnel_leads`
**Already created and configured:**
```sql
CREATE TABLE IF NOT EXISTS funnel_leads (
  id          uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
  name        text        NOT NULL,
  email       text        NOT NULL,
  solution    text        NOT NULL,
  answers     jsonb       NOT NULL DEFAULT '{}'::jsonb,
  created_at  timestamptz NOT NULL DEFAULT now()
);
```

**Row-Level Security (RLS):**
- ✅ Anonymous users can INSERT (website visitors)
- ✅ Service role can READ (internal access)

**Status:** Ready to use. No action needed.

---

## EmailJS Configuration ⚙️

### Current Setup
```
Service ID:     service_y96u1bg
Template ID:    template_dowl3hn (internal notifications)
Public Key:     rkul53dvYcwNeHzXI
```

### Action Required: Add Auto-Response Template

The `.env` file now includes:
```env
VITE_EMAILJS_AUTORESPONSE_TEMPLATE_ID=template_autoresponse_tawano
```

**To enable auto-responses:**

1. Go to **[EmailJS Dashboard](https://dashboard.emailjs.com/)**
2. Select your **Tawano** service
3. Create **New Template** with:
   - **Name:** "Tawano Funnel Auto-Response"
   - **Subject:** `Vielen Dank für Ihre Anfrage bei Tawano`
   - **Content:**
     ```
     Hallo {{to_name}},

     vielen Dank für Ihre Anfrage für {{solution}}.

     Wir haben folgende Informationen von Ihnen erhalten und werden diese gründlich prüfen:

     {{solution}} – {{more_details}}

     Unser Team wird sich in den nächsten 24 Stunden mit Ihnen in Verbindung setzen und Ihnen ein maßgeschneidertes Angebot zukommen lassen.

     Falls Sie dringende Fragen haben, erreichen Sie uns unter:
     📧 info@tawano.de
     ☎️ +49 163 1283971

     Beste Grüße,
     **Das Tawano Team**
     ```

4. **Note the Template ID** and update `.env`:
   ```env
   VITE_EMAILJS_AUTORESPONSE_TEMPLATE_ID=template_<your_id>
   ```

5. **Test the template** by submitting a funnel form

### Template Variables Used
```javascript
// SolutionFunnel sends these to EmailJS:
{
  to_name: contact.name.trim(),
  to_email: contact.email.trim(),
  solution: config.solutionLabel,
  reply_to: "info@tawano.de"
}
```

---

## Frontend Components

### SolutionFunnel Component
**File:** `dist/src/components/SolutionFunnel.tsx`

**Features:**
- ✅ Step-by-step questions with emoji + descriptions
- ✅ Smooth slide animations between questions
- ✅ Progress bar (visual feedback)
- ✅ Contact collection (name + email only)
- ✅ Email validation
- ✅ Supabase integration
- ✅ EmailJS notifications + auto-response
- ✅ Success screen with personalized message

**Key Functions:**
- `selectOption()` – Advance to next question
- `goBack()` – Go to previous question
- `validateContact()` – Validate name + email
- `handleSubmit()` – Save lead + send emails

### ExitIntentPopup Component
**File:** `dist/src/components/ExitIntentPopup.tsx`

**Features:**
- ✅ Triggers 3 seconds after page load
- ✅ Detects mouseleave (cursor exits from top)
- ✅ Detects back button press (popstate)
- ✅ Allows saving partial progress with just email
- ✅ Shows confirmation message before dismissing

**Copy:**
```
"Möchten Sie Ihre Auswahl speichern?
Hinterlassen Sie einfach Ihre E-Mail – wir senden Ihnen ein unverbindliches Angebot."
```

### FunnelLayout Component
**File:** `dist/src/pages/FunnelLayout.tsx`

**Structure:**
- Fixed header (logo + back button)
- Centered content area
- Hero text + hero subtitle
- SolutionFunnel component
- ExitIntentPopup (nested)

---

## Funnel Question Configurations

### Chatbot Funnel
```javascript
[
  { id: "zweck", question: "Wofür soll der Chatbot eingesetzt werden?", options: [
    { label: "Kundensupport", emoji: "💬" },
    { label: "Lead-Qualifizierung", emoji: "🎯" },
    { label: "FAQ & Informationen", emoji: "📚" },
    { label: "Internes Team-Tool", emoji: "🏢" }
  ]},
  { id: "volumen", question: "Wie viele Anfragen erhalten Sie ungefähr pro Monat?" },
  { id: "plattform", question: "Wo soll der Chatbot aktiv sein?" },
  { id: "zeitplan", question: "Wann möchten Sie starten?" }
]
```

### Webdesign Funnel
```javascript
[
  { id: "art", question: "Was benötigen Sie?" },
  { id: "seiten", question: "Wie viele Seiten soll die Website haben?" },
  { id: "ziel", question: "Was ist Ihr wichtigstes Ziel mit der Website?" },
  { id: "deadline", question: "Bis wann soll die Website live gehen?" }
]
```

### Digitale Mitarbeiter Funnel
```javascript
[
  { id: "anfragen", question: "Wie viele Support-Anfragen erhalten Sie pro Monat?" },
  { id: "mitarbeiter", question: "Wie viele Mitarbeiter bearbeiten das aktuell manuell?" },
  { id: "kanaele", question: "Über welche Kanäle kommen die Anfragen rein?" },
  { id: "ziel", question: "Was soll hauptsächlich automatisiert werden?" }
]
```

### Custom Automation Funnel
```javascript
[
  { id: "bereich", question: "Was möchten Sie automatisieren?" },
  { id: "tools", question: "Welche Tools nutzen Sie bereits?" },
  { id: "groesse", question: "Wie viele Mitarbeiter wären von der Automation betroffen?" },
  { id: "dringlichkeit", question: "Wie dringend ist das Projekt für Sie?" }
]
```

---

## Home Page Updates

### Solution Card Section
**Location:** `Index.tsx` – Solution cards section (line ~429)

**Changes Made:**
1. ✅ Updated "Digitale Mitarbeiter" pricing text to "Unverbindliches Angebot"
2. ✅ Updated "Custom Automation" pricing text to "Unverbindliches Angebot"
3. ✅ Digitale Mitarbeiter card already has:
   - Ring effect with glow animation (2.8s cycle)
   - "Beliebteste Lösung" badge
   - Enhanced hover state (y: -12, shadow: 80px)
   - Hero button variant (primary color)

**Card Structure Per Solution:**
```
[Icon] [Title] [Features checkmarks]
[Pricing text]
[Button]
```

**Visual Hierarchy:**
- Chatbot: Standard card
- Webdesign: Standard card
- **Digitale Mitarbeiter**: Premium card (ring + glow + badge)
- Custom Automation: Standard card

---

## Testing Checklist

### Pre-Deployment
- [ ] **EmailJS Template Created:** Auto-response template ID obtained and added to `.env`
- [ ] **Supabase Connection:** Run test in browser console:
  ```javascript
  import { testSupabaseConnection } from "@/lib/supabase";
  await testSupabaseConnection();
  ```
- [ ] **Environment Variables:** All 4 EmailJS vars + 2 Supabase vars in `.env`

### Funnel Flow Testing

#### Test 1: Complete Chatbot Funnel
1. Navigate to `/chatbot`
2. Answer all 4 questions
3. Enter name: "Test User"
4. Enter email: "your-email@example.com"
5. Click "Angebot anfordern"
6. **Expected:**
   - ✅ Data saved to Supabase (`funnel_leads` table)
   - ✅ Internal notification email received (template_dowl3hn)
   - ✅ Auto-response email received (template_autoresponse_tawano)
   - ✅ Success screen shows: "Anfrage eingegangen"
   - ✅ Personal greeting: "Vielen Dank, Test. Wir prüfen Ihre Angaben..."

#### Test 2: Exit Intent Popup
1. Go to `/digitale-mitarbeiter`
2. Answer 1–2 questions
3. Move mouse towards top (exit intent)
4. **Expected:**
   - Popup shows: "Möchten Sie Ihre Auswahl speichern?"
   - Enter email, click "Angebot zusenden"
   - Lead saved with partial answers

#### Test 3: Back Button
1. Go to `/webdesign`
2. Answer 2–3 questions
3. Click browser back button
4. **Expected:**
   - Exit intent popup triggers immediately
   - Option to save: "Weiter ausfüllen"

### Supabase Verification
1. Go to [Supabase Dashboard](https://app.supabase.com/) → Your Project
2. Navigate to **Table Editor** → `funnel_leads`
3. **Expected columns:**
   - `id` (UUID)
   - `name` (text)
   - `email` (text)
   - `solution` (text: "chatbot", "webdesign", "digitale-mitarbeiter", "custom-automation")
   - `answers` (JSONB: `{"zweck": "support", "volumen": "100_500", ...}`)
   - `created_at` (timestamp)

### Database Query Example
```sql
-- View all leads from past 24 hours
SELECT * FROM funnel_leads
WHERE created_at > now() - interval '24 hours'
ORDER BY created_at DESC;

-- Count leads by solution
SELECT solution, COUNT(*) as count
FROM funnel_leads
GROUP BY solution;
```

---

## Build & Deployment

### Local Development
```bash
npm run dev
# Navigate to http://localhost:8080
```

### Production Build
```bash
npm run build
# Output: dist/ directory with optimized bundle
```

### Netlify Deployment
```bash
npm run build:dev
# or use Netlify CLI
netlify deploy
```

**Required Environment Variables** (set in Netlify):
```env
VITE_EMAILJS_SERVICE_ID=service_y96u1bg
VITE_EMAILJS_TEMPLATE_ID=template_dowl3hn
VITE_EMAILJS_AUTORESPONSE_TEMPLATE_ID=template_autoresponse_tawano
VITE_EMAILJS_PUBLIC_KEY=rkul53dvYcwNeHzXI
VITE_SUPABASE_URL=https://fcjuqyrcehhtaejxpfey.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## Success Message Copy

### Funnel Success Screen
**Headline:** "Anfrage eingegangen"
**Body:** "Vielen Dank, {firstname}. Wir prüfen Ihre Angaben und melden uns in Kürze mit einem passenden Vorschlag."
**Contact:** "info@tawano.de · +49 163 1283971"

### Exit Intent Success
**Body:** "Gespeichert.\nWir melden uns in Kürze bei Ihnen."

---

## Key Metrics to Track

**In Supabase:**
- Total leads by solution
- Leads by day/week
- Average completion rate
- Email collection rate (exit intent vs. funnel completion)

```sql
-- Daily leads
SELECT DATE(created_at) as date, solution, COUNT(*) as count
FROM funnel_leads
GROUP BY DATE(created_at), solution
ORDER BY date DESC;

-- Completion rate (full funnel vs. exit intent)
SELECT solution,
       COUNT(CASE WHEN name != '–' THEN 1 END) as completed,
       COUNT(CASE WHEN name = '–' THEN 1 END) as partial,
       COUNT(*) as total
FROM funnel_leads
GROUP BY solution;
```

---

## Troubleshooting

### Issue: Leads not appearing in Supabase
**Cause:** RLS policies not applied
**Fix:** Run `funnel-leads-setup.sql` in Supabase dashboard

### Issue: Emails not being sent
**Cause:** EmailJS credentials wrong or EmailJS account limit exceeded
**Fix:**
- Verify Service ID, Template ID, Public Key in dashboard.emailjs.com
- Check EmailJS quota (free plan: 200/month)
- View error in browser console: `[Funnel] EmailJS notification failed`

### Issue: Auto-response not received
**Cause:** Template ID not configured or template missing required variables
**Fix:**
- Verify `VITE_EMAILJS_AUTORESPONSE_TEMPLATE_ID` in `.env`
- Create template with exact variable names: `{{to_name}}`, `{{to_email}}`, `{{solution}}`

### Issue: Exit intent popup not triggering
**Cause:** Dismissed permanently (ref tracks state)
**Fix:** This is intentional. Popup only shows once per page visit. Check browser console: `[ExitIntentPopup] visible: true`

---

## Next Steps

1. **Add EmailJS Auto-Response Template** (see section above)
2. **Update `.env`** with auto-response template ID
3. **Test complete funnel** (see testing checklist)
4. **Deploy to Netlify** with environment variables
5. **Monitor Supabase** for incoming leads
6. **Iterate** on questions/copy based on conversion data

---

## Support

For issues or questions:
- Check browser console for `[Supabase]`, `[Funnel]`, or `[EmailJS]` logs
- Verify `.env` matches Supabase & EmailJS dashboard
- Test each email template separately in EmailJS dashboard
