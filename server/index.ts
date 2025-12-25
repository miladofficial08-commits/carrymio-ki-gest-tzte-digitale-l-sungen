import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import nodemailer from "nodemailer";
import { z } from "zod";

dotenv.config();

const app = express();
const port = Number(process.env.API_PORT ?? 8787);

const defaultOrigins = [
  "http://localhost:8080",
  "http://127.0.0.1:8080",
  process.env.FRONTEND_URL ?? "",
].filter(Boolean);

const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: allowedOrigins?.length ? allowedOrigins : defaultOrigins,
    methods: ["POST", "OPTIONS", "GET"],
  })
);
app.use(express.json({ limit: "1mb" }));

const requiredEnv = ["SMTP_HOST", "SMTP_PORT", "SMTP_USER", "SMTP_PASS", "CONTACT_TO_EMAIL"];
const missing = requiredEnv.filter((key) => !process.env[key]);
if (missing.length) {
  console.error(`Missing required environment variables: ${missing.join(", ")}`);
  process.exit(1);
}

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: process.env.SMTP_SECURE === "true" || Number(process.env.SMTP_PORT) === 465,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const CONTACT_TO_EMAIL = process.env.CONTACT_TO_EMAIL as string;
const CONTACT_FROM_EMAIL =
  process.env.CONTACT_FROM_EMAIL || process.env.SMTP_USER || process.env.CONTACT_TO_EMAIL;
const SEND_CONFIRMATION = process.env.ENABLE_CONFIRMATION_EMAIL === "true";

const contactSchema = z.object({
  name: z.string().min(1, "Name ist erforderlich").max(200),
  email: z.string().email("Bitte eine gültige E-Mail-Adresse angeben").max(320),
  company: z.string().max(320).optional(),
  service: z.string().min(1, "Bitte ein Interesse auswählen").max(200),
  message: z.string().min(1, "Nachricht ist erforderlich").max(2000),
});

const formatHtml = (data: z.infer<typeof contactSchema>, formattedDate: string) => `
  <h2>Neue Anfrage</h2>
  <p><strong>Name:</strong> ${data.name}</p>
  <p><strong>Unternehmen:</strong> ${data.company || "-"}</p>
  <p><strong>E-Mail:</strong> ${data.email}</p>
  <p><strong>Interesse:</strong> ${data.service}</p>
  <p><strong>Nachricht:</strong></p>
  <p>${data.message.replace(/\n/g, "<br>")}</p>
  <p><strong>Datum & Uhrzeit:</strong> ${formattedDate}</p>
`;

const formatText = (data: z.infer<typeof contactSchema>, timestamp: Date) => {
  const lines = [
    "Neue Anfrage",
    `Name: ${data.name}`,
    `Unternehmen: ${data.company || "-"}`,
    `E-Mail: ${data.email}`,
    `Interesse: ${data.service}`,
    "Nachricht:",
    data.message,
    `Datum & Uhrzeit: ${timestamp.toISOString()}`,
  ];
  return lines.join("\n");
};

app.get("/health", (_req, res) => {
  res.json({ ok: true });
});

app.post("/api/contact", async (req, res) => {
  const parsed = contactSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      error: "Ungültige Eingaben",
      details: parsed.error.flatten().fieldErrors,
    });
  }

  const data = parsed.data;
  const now = new Date();
  const formattedDate = now.toLocaleString("de-DE", { timeZone: "Europe/Berlin" });

  try {
    await transporter.sendMail({
      from: CONTACT_FROM_EMAIL,
      to: CONTACT_TO_EMAIL,
      replyTo: data.email,
      subject: `Neue Anfrage (${data.service}) – ${data.name}`,
      text: formatText(data, now),
      html: formatHtml(data, formattedDate),
    });

    if (SEND_CONFIRMATION) {
      await transporter.sendMail({
        from: CONTACT_FROM_EMAIL,
        to: data.email,
        replyTo: CONTACT_TO_EMAIL,
        subject: "Vielen Dank für Ihre Anfrage",
        text: `Hallo ${data.name},\n\nwir haben Ihre Anfrage erhalten und melden uns innerhalb von 24–48 Stunden.\n\nIhr Carrymio Team`,
        html: `<p>Hallo ${data.name},</p><p>wir haben Ihre Anfrage erhalten und melden uns innerhalb von 24–48 Stunden.</p><p>Ihr Carrymio Team</p>`,
      });
    }

    res.json({ ok: true });
  } catch (error) {
    console.error("Fehler beim Senden der Anfrage", error);
    res.status(500).json({ error: "Versand fehlgeschlagen" });
  }
});

app.listen(port, async () => {
  try {
    await transporter.verify();
    console.log(`SMTP verbunden. Kontakt-API läuft auf Port ${port}`);
  } catch (err) {
    console.warn("SMTP-Verbindung konnte nicht verifiziert werden:", err);
  }
  console.log(`Healthcheck: http://localhost:${port}/health`);
});
