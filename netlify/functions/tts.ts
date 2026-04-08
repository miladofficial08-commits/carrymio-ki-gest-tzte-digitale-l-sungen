export const handler = async (event: { httpMethod: string; body: string | null }) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };

  if (event.httpMethod === "OPTIONS") return { statusCode: 204, headers, body: "" };
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, headers, body: JSON.stringify({ error: "Method not allowed" }) };
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: "Missing OPENAI_API_KEY" }) };
  }

  let text: string;
  try {
    const body = JSON.parse(event.body || "{}");
    text = typeof body.text === "string" ? body.text.trim() : "";
  } catch {
    return { statusCode: 400, headers, body: JSON.stringify({ error: "Invalid JSON" }) };
  }

  if (!text || text.length > 4096) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: "Text is required and must be under 4096 characters" }),
    };
  }

  try {
    const response = await fetch("https://api.openai.com/v1/audio/speech", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "tts-1",
        input: text,
        voice: "onyx",
        response_format: "mp3",
        speed: 1.0,
      }),
    });

    if (!response.ok) {
      const errText = await response.text().catch(() => "unknown");
      console.error("OpenAI TTS error:", response.status, errText);
      return {
        statusCode: 502,
        headers,
        body: JSON.stringify({ error: "TTS generation failed" }),
      };
    }

    const arrayBuffer = await response.arrayBuffer();
    const base64Audio = Buffer.from(arrayBuffer).toString("base64");

    return {
      statusCode: 200,
      headers: {
        ...headers,
        "Content-Type": "audio/mpeg",
        "Content-Length": String(arrayBuffer.byteLength),
      },
      body: base64Audio,
      isBase64Encoded: true,
    };
  } catch (err) {
    console.error("TTS handler error:", err);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "Internal server error" }),
    };
  }
};
