import type { Handler } from "@netlify/functions";
import OpenAI from "openai";
const SYSTEM_PROMPT = `Du bist der digitale Assistent von Tawano auf der Website tawano.de.

REGELN:
- Antworte freundlich, klar und professionell.
- Standard-Sprache ist Deutsch (wenn der Nutzer anders schreibt, antworte in seiner Sprache).
- Halte Antworten kurz (2-4 Saetze), konkret und hilfreich.
- Fuer den Digitalen Mitarbeiter und Custom Automation: Preis je nach Umfang.
- Startpreise, die genannt werden duerfen: Chatbots ab 500 EUR, Webdesign ab 990 EUR.
- Wenn unklar: ehrlich sagen und auf info@tawano.de verweisen.

WISSEN:
- Tawano entwickelt digitale Mitarbeiter, Chatbots, Webdesign und individuelle Automationsloesungen.
- Leistungen: Support-Automatisierung, E-Mail-Bearbeitung, Lead-Qualifizierung, Prozessautomatisierung.
- Typische Wirkung: schnellere Reaktionszeiten, weniger manuelle Routine, bessere Skalierbarkeit.
- Kontakt: info@tawano.de, +49 163 1283971, Standort Duesseldorf.`;

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

export const handler: Handler = async (event) => {
  console.log("[chat] function started");
  console.log(`[chat] request method: ${event.httpMethod}`);

  // CORS headers
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
    return { statusCode: 405, headers, body: JSON.stringify({ error: "Method not allowed" }) };
  }

  const hasApiKey = Boolean(process.env.OPENAI_API_KEY);
  console.log(`[chat] openai key exists: ${hasApiKey ? "yes" : "no"}`);

  if (!hasApiKey) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "OPENAI_API_KEY is not set" }),
    };
  }

  try {
    let parsedBody: { messages?: ChatMessage[] };
    try {
      parsedBody = JSON.parse(event.body || "{}");
      console.log("[chat] body parsed: yes");
    } catch {
      console.log("[chat] body parsed: no");
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: "Invalid JSON body" }),
      };
    }

    const { messages } = parsedBody;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: "Messages required" }) };
    }

    // Sanitize: only keep last 20 messages to avoid token overflow
    const recentMessages = messages.slice(-20);

    console.log("[chat] openai request started");
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...recentMessages,
      ],
      max_tokens: 500,
      temperature: 0.7,
    });
    console.log("[chat] openai response received");

    const reply = completion.choices[0]?.message?.content || "Entschuldigung, ich konnte keine Antwort generieren.";

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ reply }),
    };
  } catch (error: unknown) {
    console.error("[chat] catch error exact message:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "Fehler bei der Verarbeitung", details: message }),
    };
  }
};
