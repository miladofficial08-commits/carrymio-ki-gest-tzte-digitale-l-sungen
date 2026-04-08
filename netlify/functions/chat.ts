import * as fs from "fs";
import * as path from "path";

// ─── Load prompt + knowledge at cold-start ────────────────────
const SYSTEM_PROMPT = (() => {
  try {
    const prompt = fs.readFileSync(path.join(__dirname, "prompt.txt"), "utf8").trim();
    const knowledge = fs.readFileSync(path.join(__dirname, "knowledge.txt"), "utf8").trim();
    return `${prompt}\n\n${"─".repeat(60)}\nWISSENSDATENBANK (nur diese Fakten verwenden):\n${knowledge}`;
  } catch {
    return `Du bist Tawano Assistent. Antworte kurz, direkt, auf Deutsch. Max. 2 Sätze.`;
  }
})();

// ─── Lead extraction tool ─────────────────────────────────────
const TOOLS = [
  {
    type: "function" as const,
    function: {
      name: "save_lead",
      description:
        "Rufe diese Funktion auf, sobald der Besucher Kontaktdaten genannt hat (Name, E-Mail oder Telefon) ODER wenn er konkretes Kaufinteresse gezeigt hat UND du mindestens seinen Namen oder seine E-Mail kennst. Nicht aufrufen ohne echte Kontaktdaten.",
      parameters: {
        type: "object" as const,
        properties: {
          name:     { type: "string", description: "Vollständiger Name" },
          email:    { type: "string", description: "E-Mail-Adresse" },
          phone:    { type: "string", description: "Telefonnummer" },
          company:  { type: "string", description: "Firmenname" },
          interest: { type: "string", description: "Gesuchte Leistung (z.B. Digitale Mitarbeiter, Chatbot, Webdesign)" },
          note:     { type: "string", description: "Kurze Zusammenfassung des Anliegens" },
        },
        required: [],
      },
    },
  },
];

interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

interface LeadData {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  interest?: string;
  note?: string;
}

async function callOpenAI(apiKey: string, messages: ChatMessage[], useTools: boolean) {
  return fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
      ...(useTools ? { tools: TOOLS, tool_choice: "auto" } : {}),
      max_tokens: 200,
      temperature: 0.4,
    }),
  });
}

export const handler = async (event: { httpMethod: string; body: string | null }) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Content-Type": "application/json",
  };

  if (event.httpMethod === "OPTIONS") return { statusCode: 204, headers, body: "" };
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, headers, body: JSON.stringify({ error: "Method not allowed" }) };
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: "Missing OPENAI_API_KEY" }) };
  }

  let parsedBody: Record<string, unknown>;
  try {
    parsedBody = JSON.parse(event.body || "{}");
  } catch {
    return { statusCode: 400, headers, body: JSON.stringify({ error: "Invalid JSON" }) };
  }

  const messages = parsedBody.messages as ChatMessage[] | undefined;
  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return { statusCode: 400, headers, body: JSON.stringify({ error: "No messages provided" }) };
  }

  try {
    const recentMessages = messages.slice(-20);
    const openaiRes = await callOpenAI(apiKey, recentMessages, true);

    if (!openaiRes.ok) {
      const errBody = await openaiRes.text();
      return { statusCode: 502, headers, body: JSON.stringify({ error: "OpenAI error", details: errBody }) };
    }

    const data = await openaiRes.json();
    const choice = data.choices?.[0];

    let reply: string = choice?.message?.content ?? "";
    let leadData: LeadData | undefined;

    // ─── Handle tool calls ────────────────────────────────────
    const toolCalls = choice?.message?.tool_calls as Array<{
      function: { name: string; arguments: string };
    }> | undefined;

    if (toolCalls?.length) {
      for (const call of toolCalls) {
        if (call.function?.name === "save_lead") {
          try {
            const args = JSON.parse(call.function.arguments || "{}") as LeadData;
            // Only accept if we have at least one real contact field
            if (args.name || args.email || args.phone) {
              leadData = args;
            }
          } catch { /* ignore */ }
        }
      }

      // AI called a tool but may not have returned text — get reply separately
      if (!reply.trim()) {
        const followup = await callOpenAI(apiKey, recentMessages, false);
        if (followup.ok) {
          const fd = await followup.json();
          reply = fd.choices?.[0]?.message?.content ?? "";
        }
      }
    }

    if (!reply.trim()) {
      reply = "Entschuldigung, ich konnte keine Antwort generieren.";
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ reply, ...(leadData ? { leadData } : {}) }),
    };
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : String(error);
    return { statusCode: 500, headers, body: JSON.stringify({ error: msg }) };
  }
};
