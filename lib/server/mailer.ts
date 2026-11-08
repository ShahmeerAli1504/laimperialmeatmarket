import "server-only";
import nodemailer, { type Transporter } from "nodemailer";

let transporter: Transporter | null | undefined;

export function mailConfigured() {
  return Boolean(process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD);
}

/** Gmail SMTP transport (smtp.gmail.com:465, App Password auth). Null when not configured. */
export function getTransporter(): Transporter | null {
  if (transporter !== undefined) return transporter;
  transporter = mailConfigured()
    ? nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_APP_PASSWORD },
      })
    : null;
  return transporter;
}

export function contactRecipients(): string {
  return process.env.CONTACT_TO_EMAIL || process.env.GMAIL_USER || "";
}
