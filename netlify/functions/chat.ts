import type { Handler } from "@netlify/functions";
import OpenAI from "openai";
import { readFileSync } from "fs";
import { resolve } from "path";

const DEFAULT_PROMPT =
  "Du bist der digitale Assistent von Tawano. Antworte freundlich, klar und professionell auf Deutsch.";

const DEFAULT_KNOWLEDGE =
  "Tawano bietet digitale Mitarbeiter, Chatbots, Webdesign und Custom Automation fuer Unternehmen.";

function loadTextFile(fileName: string, fallback: string): string {
  const candidates = [
    resolve(process.cwd(), "netlify/functions", fileName),
    resolve(process.cwd(), fileName),
    resolve(__dirname, fileName),
  ];

  for (const path of candidates) {
    try {
      return readFileSync(path, "utf-8");
    } catch {
      // Try next location.
    }
  }

  console.warn(`Could not load ${fileName}. Using fallback content.`);
  return fallback;
}

// Load prompt and knowledge base from editable text files
const PROMPT = loadTextFile("prompt.txt", DEFAULT_PROMPT);
const KNOWLEDGE = loadTextFile("knowledge.txt", DEFAULT_KNOWLEDGE);

const SYSTEM_PROMPT = `${PROMPT}

═══════════════════════════════════════
  WISSENSDATENBANK
═══════════════════════════════════════

${KNOWLEDGE}`;

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

export const handler: Handler = async (event) => {
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

  if (!process.env.OPENAI_API_KEY) {
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
    } catch {
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

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...recentMessages,
      ],
      max_tokens: 500,
      temperature: 0.7,
    });

    const reply = completion.choices[0]?.message?.content || "Entschuldigung, ich konnte keine Antwort generieren.";

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ reply }),
    };
  } catch (error: unknown) {
    console.error("Chat error:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "Fehler bei der Verarbeitung", details: message }),
    };
  }
};
