import { NextResponse, type NextRequest } from "next/server";
import { contactRecipients, getTransporter } from "@/lib/server/mailer";
import { getSupabase } from "@/lib/server/supabase";

export const runtime = "nodejs";

const STORES = ["Winnemucca Blvd", "South Bridge St", "Either"];
const TOPICS = ["Catering / Party order", "Custom cuts / Bulk meat", "Wild game processing", "Bakery order", "General question", "Feedback"];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Msg = { name: string; phone: string; email: string; store: string; topic: string; date: string; message: string; language: "en" | "es" };

function clean(v: unknown, max: number) {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

function esc(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}

/* very small per-instance rate limit: 5 messages / 10 minutes / IP */
const hits = new Map<string, number[]>();
function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < 10 * 60_000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 5;
}

function emailBody(m: Msg) {
  const rows: [string, string][] = [
    ["Name", m.name],
    ["Phone", m.phone],
    ["Email", m.email || "—"],
    ["Store", m.store],
    ["Topic", m.topic],
    ["Date needed", m.date || "—"],
    ["Language", m.language === "es" ? "Spanish" : "English"],
  ];
  const text = rows.map(([k, v]) => `${k}: ${v}`).join("\n") + `\n\nMessage:\n${m.message}\n`;
  const html = `
  <div style="font-family:Arial,sans-serif;font-size:15px;color:#1d150f;max-width:600px">
    <h2 style="margin:0 0 12px;color:#b5231b">New website message</h2>
    <table cellpadding="6" style="border-collapse:collapse">
      ${rows.map(([k, v]) => `<tr><td style="color:#8a7c68;padding-right:16px">${k}</td><td><b>${esc(v)}</b></td></tr>`).join("")}
    </table>
    <p style="margin:18px 0 6px;color:#8a7c68">Message</p>
    <div style="white-space:pre-wrap;background:#f5ecd9;padding:14px;border-radius:8px">${esc(m.message)}</div>
    <p style="margin-top:18px;font-size:13px;color:#8a7c68">
      Call back: <a href="tel:${esc(m.phone.replace(/[^\d+]/g, ""))}">${esc(m.phone)}</a>${m.email ? ` · Reply to this email to answer ${esc(m.name)} directly.` : ""}
    </p>
  </div>`;
  return { text, html };
}

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  // honeypot: pretend success for bots
  if (clean(body._gotcha, 200)) return NextResponse.json({ ok: true });

  const m: Msg = {
    name: clean(body.name, 120),
    phone: clean(body.phone, 40),
    email: clean(body.email, 200),
    store: STORES.includes(clean(body.store, 40)) ? clean(body.store, 40) : "Either",
    topic: TOPICS.includes(clean(body.topic, 60)) ? clean(body.topic, 60) : "General question",
    date: /^\d{4}-\d{2}-\d{2}$/.test(clean(body.date, 10)) ? clean(body.date, 10) : "",
    message: clean(body.message, 5000),
    language: body.language === "es" ? "es" : "en",
  };

  if (!m.name || !m.phone || !m.message) return NextResponse.json({ error: "missing_fields" }, { status: 400 });
  if (m.email && !EMAIL_RE.test(m.email)) m.email = "";

  const ip = (req.headers.get("x-forwarded-for") || "").split(",")[0].trim() || "unknown";
  if (limited(ip)) return NextResponse.json({ error: "rate_limited" }, { status: 429 });

  const mailer = getTransporter();
  const db = getSupabase();
  // Nothing set up yet → the page tells the customer to call instead.
  if (!mailer && !db) return NextResponse.json({ error: "not_configured" }, { status: 503 });

  // 1) save to Supabase
  let rowId: string | null = null;
  if (db) {
    const { data, error } = await db
      .from("contact_messages")
      .insert({
        name: m.name,
        phone: m.phone,
        email: m.email || null,
        store: m.store,
        topic: m.topic,
        date_needed: m.date || null,
        message: m.message,
        language: m.language,
        user_agent: (req.headers.get("user-agent") || "").slice(0, 300),
        ip,
      })
      .select("id")
      .single();
    if (error) console.error("[contact] supabase insert failed:", error.message);
    else rowId = data.id;
  }

  // 2) email the store via Gmail SMTP
  let sent = false;
  if (mailer) {
    const { text, html } = emailBody(m);
    try {
      await mailer.sendMail({
        from: { name: "La Imperial Website", address: process.env.GMAIL_USER! },
        to: contactRecipients(),
        replyTo: m.email ? { name: m.name, address: m.email } : undefined,
        subject: `Website message: ${m.topic} (${m.store}) — ${m.name}`,
        text,
        html,
      });
      sent = true;
    } catch (err) {
      console.error("[contact] gmail send failed:", err);
    }
    if (sent && db && rowId) {
      await db.from("contact_messages").update({ email_sent: true }).eq("id", rowId);
    }
  }

  // success if the message landed somewhere the store can see it
  if (sent || rowId) return NextResponse.json({ ok: true });
  return NextResponse.json({ error: "delivery_failed" }, { status: 502 });
}
