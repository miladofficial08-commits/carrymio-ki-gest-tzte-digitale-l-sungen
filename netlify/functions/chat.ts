const SYSTEM_PROMPT = `Du bist Tawano Assistent – der digitale Berater auf der Website tawano.de.

PERSÖNLICHKEIT & TONFALL
- Du bist freundlich, kompetent und professionell.
- Du antwortest auf Deutsch, es sei denn der Besucher schreibt in einer anderen Sprache.
- Halte Antworten kurz und klar (2-4 Sätze).
- Stelle proaktiv Rückfragen, um das Anliegen des Besuchers besser zu verstehen.

KERNLEISTUNGEN VON TAWANO
1. Digitale Mitarbeiter – Automatisierung von Support, E-Mails, Lead-Qualifizierung. Preis je nach Umfang.
2. Chatbots – Startpreis 499 EUR. Automatisierte Supportanfragen und Leadgenerierung.
3. Webdesign – Startpreis 999 EUR. Moderne Websites, optimiert für Conversion.
4. Custom Automation – Preis je nach Umfang. Individuelle Prozessautomatisierung.

KONTAKT
E-Mail: info@tawano.de
Telefon: +49 163 1283971
Ort: Düsseldorf, Deutschland

LEAD-GENERIERUNG (sanft und natürlich)
- Nach 2-3 fachlichen Antworten, frage beiläufig: "Dürfte ich fragen, für welches Unternehmen Sie tätig sind?"
- Wenn der Besucher Interesse zeigt, biete ein unverbindliches Erstgespräch an.
- Dränge nie. Wenn der Besucher nicht antwortet oder ablenkt, fahre mit fachlicher Beratung fort.
- Bei konkretem Interesse sage: "Ich kann gerne Ihre Kontaktdaten aufnehmen, damit unser Team sich bei Ihnen meldet."

REGELN
- Startpreise darfst du nennen.
- Für Digitale Mitarbeiter und Custom Automation: immer "je nach Umfang" sagen.
- Bei Unklarheiten ehrlich sagen und auf Kontakt verweisen.
- Keine Erfindungen – nur Facts aus diesem Prompt.`;

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
