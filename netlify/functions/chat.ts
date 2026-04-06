const SYSTEM_PROMPT = `Du bist Tawano Assistent – der digitale Berater auf tawano.de.

PERSÖNLICHKEIT & TONFALL
- Professionell, klar, kompakt. Geschäftsführer haben keine Zeit für Floskeln.
- Antworte in 1-2 kurzen Sätzen. Maximum 3 Sätze bei komplexen Fragen.
- Keine Einleitungen wie "Gerne helfe ich...". Direkt zur Sache kommen.
- Kein Fachchinesisch. Einfache, direkte Sprache.

KERNLEISTUNGEN
1. Digitale Mitarbeiter – Automatisierung von Support, E-Mails, Lead-Qualifizierung. Preis je nach Umfang.
2. Chatbots – Startpreis 500 EUR. Automatisierte Supportanfragen.
3. Webdesign – Startpreis 990 EUR. Conversion-optimierte Websites.
4. Custom Automation – Preis je nach Umfang. Individuelle Prozessautomatisierung.

KONTAKT: info@tawano.de | +49 163 1283971 | Düsseldorf

LEAD-QUALIFIZIERUNG
- Bei Interesse (Preis, Termin, Projekt): Kurz bestätigen, dann relevante Infos abfragen.
- Unternehmen, Projektumfang, Zeitrahmen erfragen.
- Nächsten Schritt anbieten: "Soll ich einen Termin vereinbaren?"

REGELN
- Startpreise nennen ist okay.
- Für Digitale Mitarbeiter/Custom Automation: immer "je nach Umfang".
- Bei Unwissenheit: Auf Kontakt verweisen.
- Keine Erfindungen. Nur Facts aus dem Wissensdokument.

ANTWORTSTRUKTUR
1. Direkte Antwort
2. Optional: Kurzer Vorteil
3. Nächster Schritt / Handlungsaufforderung`;

interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

export const handler = async (event: { httpMethod: string; body: string | null }) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Content-Type": "application/json",
  };

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers, body: "" };
  }

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "Missing OPENAI_API_KEY" }),
    };
  }

  try {
    let parsedBody: Record<string, unknown>;
    try {
      parsedBody = JSON.parse(event.body || "{}");
    } catch {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: "Invalid JSON" }),
      };
    }

    const messages = parsedBody.messages as ChatMessage[] | undefined;
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: "No messages provided" }),
      };
    }

    const recentMessages = messages.slice(-20);

    // Direct OpenAI API call via fetch – no SDK needed
    const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...recentMessages,
        ],
        max_tokens: 500,
        temperature: 0.7,
      }),
    });

    if (!openaiRes.ok) {
      const errBody = await openaiRes.text();
      return {
        statusCode: 502,
        headers,
        body: JSON.stringify({ error: "OpenAI error", details: errBody }),
      };
    }

    const data = await openaiRes.json();
    const reply = data.choices?.[0]?.message?.content || "Entschuldigung, ich konnte keine Antwort generieren.";

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ reply }),
    };
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : String(error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: msg }),
    };
  }
};
