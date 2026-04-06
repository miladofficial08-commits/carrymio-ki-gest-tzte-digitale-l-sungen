import type { Handler } from "@netlify/functions";
import OpenAI from "openai";
import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

// Load prompt and knowledge base from editable text files
const __dirname = dirname(fileURLToPath(import.meta.url));
const PROMPT = readFileSync(resolve(__dirname, "prompt.txt"), "utf-8");
const KNOWLEDGE = readFileSync(resolve(__dirname, "knowledge.txt"), "utf-8");

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

const handler: Handler = async (event) => {
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

  try {
    const { messages } = JSON.parse(event.body || "{}") as { messages: ChatMessage[] };

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

export { handler };
