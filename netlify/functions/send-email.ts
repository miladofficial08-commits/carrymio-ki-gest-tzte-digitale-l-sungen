import nodemailer from "nodemailer";

interface ContactPayload {
  type: "contact";
  name: string;
  email: string;
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
  answers?: Record<string, string>;
  questions?: Array<{ id: string; question: string }>;
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
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #1f2937;">
        <div style="background: #2563eb; color: #fff; padding: 16px 20px; border-radius: 8px 8px 0 0;">
          <h2 style="margin: 0; font-size: 18px;">Neue Kontaktanfrage</h2>
          <p style="margin: 4px 0 0; font-size: 13px; opacity: 0.9;">${now}</p>
        </div>
        <div style="border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px; padding: 20px;">
          <h3 style="margin: 0 0 12px; font-size: 14px; color: #6b7280; text-transform: uppercase; letter-spacing: 0.05em;">Kontaktdaten</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr style="border-bottom: 1px solid #f3f4f6;">
              <td style="padding: 10px 0; font-weight: 600; color: #374151; width: 140px;">Name</td>
              <td style="padding: 10px 0;">${escapeHtml(data.name)}</td>
            </tr>
            <tr style="border-bottom: 1px solid #f3f4f6;">
              <td style="padding: 10px 0; font-weight: 600; color: #374151;">E-Mail</td>
              <td style="padding: 10px 0;"><a href="mailto:${escapeHtml(data.email)}" style="color: #2563eb;">${escapeHtml(data.email)}</a></td>
            </tr>
            <tr style="border-bottom: 1px solid #f3f4f6;">
              <td style="padding: 10px 0; font-weight: 600; color: #374151;">Unternehmen</td>
              <td style="padding: 10px 0;">${escapeHtml(data.company || "–")}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; font-weight: 600; color: #374151;">Interesse</td>
              <td style="padding: 10px 0;"><span style="background: #dbeafe; color: #1d4ed8; padding: 2px 10px; border-radius: 12px; font-size: 13px;">${escapeHtml(data.service || "Allgemein")}</span></td>
            </tr>
          </table>

          <h3 style="margin: 24px 0 12px; font-size: 14px; color: #6b7280; text-transform: uppercase; letter-spacing: 0.05em;">Nachricht</h3>
          <div style="padding: 16px; background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px;">
            <p style="margin: 0; white-space: pre-wrap; line-height: 1.6;">${escapeHtml(data.message)}</p>
          </div>

          <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #e5e7eb;">
            <p style="margin: 0; font-size: 12px; color: #9ca3af;">
              Direkt antworten: <a href="mailto:${escapeHtml(data.email)}" style="color: #2563eb;">${escapeHtml(data.email)}</a>
            </p>
          </div>
        </div>
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

  // Build structured Q&A rows from questions + answers if available
  let answersHtml = "";
  if (data.questions && data.answers) {
    answersHtml = data.questions
      .map((q) => {
        const answer = data.answers?.[q.id] || "–";
        return `
          <tr style="border-bottom: 1px solid #e5e7eb;">
            <td style="padding: 12px 16px; color: #6b7280; font-size: 13px; vertical-align: top; width: 40%;">${escapeHtml(q.question)}</td>
            <td style="padding: 12px 16px; font-weight: 600; color: #1f2937;">${escapeHtml(answer)}</td>
          </tr>`;
      })
      .join("");
  } else {
    // Fallback to plain text
    answersHtml = `
      <tr>
        <td colspan="2" style="padding: 12px 16px;">
          <pre style="margin: 0; white-space: pre-wrap; font-family: Arial, sans-serif; color: #1f2937;">${escapeHtml(data.answersText)}</pre>
        </td>
      </tr>`;
  }

  return {
    subject: `Neue Anfrage – ${data.solutionLabel}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #1f2937;">
        <div style="background: #2563eb; color: #fff; padding: 16px 20px; border-radius: 8px 8px 0 0;">
          <h2 style="margin: 0; font-size: 18px;">Neue Funnel-Anfrage</h2>
          <p style="margin: 4px 0 0; font-size: 13px; opacity: 0.9;">${escapeHtml(data.solutionLabel)} · ${now}</p>
        </div>
        <div style="border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px; padding: 20px;">

          <h3 style="margin: 0 0 12px; font-size: 14px; color: #6b7280; text-transform: uppercase; letter-spacing: 0.05em;">Kontaktdaten</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr style="border-bottom: 1px solid #f3f4f6;">
              <td style="padding: 10px 0; font-weight: 600; color: #374151; width: 140px;">Name</td>
              <td style="padding: 10px 0;">${escapeHtml(data.name)}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; font-weight: 600; color: #374151;">E-Mail</td>
              <td style="padding: 10px 0;"><a href="mailto:${escapeHtml(data.email)}" style="color: #2563eb;">${escapeHtml(data.email)}</a></td>
            </tr>
          </table>

          <h3 style="margin: 24px 0 12px; font-size: 14px; color: #6b7280; text-transform: uppercase; letter-spacing: 0.05em;">Funnel-Antworten</h3>
          <table style="width: 100%; border-collapse: collapse; background: #f9fafb; border-radius: 8px;">
            ${answersHtml}
          </table>

          <div style="margin-top: 24px; padding: 12px 16px; background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 8px;">
            <p style="margin: 0; font-size: 13px; color: #1d4ed8;">
              <strong>Lösung:</strong> ${escapeHtml(data.solutionLabel)}<br/>
              <strong>Direkt antworten:</strong> <a href="mailto:${escapeHtml(data.email)}" style="color: #1d4ed8;">${escapeHtml(data.email)}</a>
            </p>
          </div>
        </div>
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
