import nodemailer from "nodemailer";

interface ContactPayload {
  type: "contact";
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service?: string;
  message: string;
}

interface FunnelPayload {
  type: "funnel";
  name: string;
  email: string;
  solution: string;
  solutionLabel: string;
  answersText: string;
}

type EmailPayload = ContactPayload | FunnelPayload;

const SENDER_EMAIL = process.env.GMAIL_SENDER_EMAIL!;
const SENDER_PASS = process.env.GMAIL_SENDER_APP_PASSWORD!;
const NOTIFICATION_TO = process.env.GMAIL_SENDER_EMAIL!;

function createTransport() {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: SENDER_EMAIL,
      pass: SENDER_PASS,
    },
  });
}

function buildInternalContactEmail(data: ContactPayload) {
  const now = new Date().toLocaleString("de-DE", {
    dateStyle: "short",
    timeStyle: "short",
    timeZone: "Europe/Berlin",
  });

  return {
    subject: `Neue Anfrage – ${data.service || "Kontaktformular"}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #2563eb; margin-bottom: 20px;">Neue Kontaktanfrage</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px 0; font-weight: bold; color: #374151;">Name:</td><td style="padding: 8px 0;">${escapeHtml(data.name)}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold; color: #374151;">E-Mail:</td><td style="padding: 8px 0;"><a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold; color: #374151;">Telefon:</td><td style="padding: 8px 0;">${escapeHtml(data.phone || "–")}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold; color: #374151;">Unternehmen:</td><td style="padding: 8px 0;">${escapeHtml(data.company || "–")}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold; color: #374151;">Interesse:</td><td style="padding: 8px 0;">${escapeHtml(data.service || "–")}</td></tr>
        </table>
        <div style="margin-top: 20px; padding: 16px; background-color: #f3f4f6; border-radius: 8px;">
          <p style="font-weight: bold; color: #374151; margin: 0 0 8px 0;">Nachricht:</p>
          <p style="margin: 0; white-space: pre-wrap; color: #1f2937;">${escapeHtml(data.message)}</p>
        </div>
        <p style="margin-top: 20px; font-size: 12px; color: #9ca3af;">Eingang: ${now}</p>
      </div>
    `,
  };
}

function buildInternalFunnelEmail(data: FunnelPayload) {
  const now = new Date().toLocaleString("de-DE", {
    dateStyle: "short",
    timeStyle: "short",
    timeZone: "Europe/Berlin",
  });

  return {
    subject: `Neue Anfrage – ${data.solutionLabel}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #2563eb; margin-bottom: 20px;">Neue Funnel-Anfrage: ${escapeHtml(data.solutionLabel)}</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px 0; font-weight: bold; color: #374151;">Name:</td><td style="padding: 8px 0;">${escapeHtml(data.name)}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold; color: #374151;">E-Mail:</td><td style="padding: 8px 0;"><a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></td></tr>
        </table>
        <div style="margin-top: 20px; padding: 16px; background-color: #f3f4f6; border-radius: 8px;">
          <p style="font-weight: bold; color: #374151; margin: 0 0 8px 0;">Antworten:</p>
          <pre style="margin: 0; white-space: pre-wrap; font-family: Arial, sans-serif; color: #1f2937;">${escapeHtml(data.answersText)}</pre>
        </div>
        <p style="margin-top: 20px; font-size: 12px; color: #9ca3af;">Eingang: ${now}</p>
      </div>
    `,
  };
}

function buildCustomerConfirmationEmail(name: string, type: "contact" | "funnel") {
  const firstName = name.split(" ")[0];

  return {
    subject: "Ihre Anfrage bei Tawano",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <p style="color: #1f2937; line-height: 1.7;">Guten Tag ${escapeHtml(firstName)},</p>
        <p style="color: #1f2937; line-height: 1.7;">
          vielen Dank für Ihre Anfrage und Ihr Interesse an Tawano.
        </p>
        <p style="color: #1f2937; line-height: 1.7;">
          Wir haben Ihre Anfrage erhalten und prüfen diese aktuell.<br/>
          Unser Team meldet sich in der Regel innerhalb von <strong>24 Stunden</strong> persönlich bei Ihnen.
        </p>
        <p style="color: #1f2937; line-height: 1.7;">
          Falls Sie weitere Informationen ergänzen möchten, können Sie einfach auf diese E-Mail antworten.
        </p>
        <p style="color: #1f2937; line-height: 1.7; margin-top: 24px;">
          Freundliche Grüße<br/>
          <strong>Tawano</strong><br/>
          <span style="color: #6b7280;">KI-gestützte digitale Lösungen</span>
        </p>
      </div>
    `,
  };
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
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

  if (!SENDER_EMAIL || !SENDER_PASS) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "Email configuration missing on server" }),
    };
  }

  let payload: EmailPayload;
  try {
    payload = JSON.parse(event.body || "{}");
  } catch {
    return { statusCode: 400, headers, body: JSON.stringify({ error: "Invalid JSON" }) };
  }

  if (!payload.type || !payload.name || !payload.email) {
    return { statusCode: 400, headers, body: JSON.stringify({ error: "Missing required fields" }) };
  }

  const transporter = createTransport();

  try {
    // Build internal notification email
    const internal =
      payload.type === "contact"
        ? buildInternalContactEmail(payload as ContactPayload)
        : buildInternalFunnelEmail(payload as FunnelPayload);

    // 1. Send internal notification
    await transporter.sendMail({
      from: `"Tawano Website" <${SENDER_EMAIL}>`,
      to: NOTIFICATION_TO,
      replyTo: payload.email,
      subject: internal.subject,
      html: internal.html,
    });

    // 2. Send customer confirmation
    const confirmation = buildCustomerConfirmationEmail(payload.name, payload.type);
    await transporter.sendMail({
      from: `"Tawano" <${SENDER_EMAIL}>`,
      to: payload.email,
      replyTo: SENDER_EMAIL,
      subject: confirmation.subject,
      html: confirmation.html,
    });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true }),
    };
  } catch (err: any) {
    console.error("[send-email] Error:", err);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "Failed to send email", details: err.message }),
    };
  }
};
