import { NextResponse } from "next/server";
import { Resend } from "resend";
import { parsePhoneNumberFromString } from "libphonenumber-js";

export const runtime = "nodejs";

type Body = {
  name?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
  // honeypot — should always be empty when a real human submits
  company?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escape(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(req: Request) {
  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const name = (body.name ?? "").trim();
  const email = (body.email ?? "").trim();
  const phoneRaw = (body.phone ?? "").trim();
  const subject = (body.subject ?? "").trim() || "New message via portfolio";
  const message = (body.message ?? "").trim();
  const honeypot = (body.company ?? "").trim();

  if (honeypot) {
    return NextResponse.json({ ok: true });
  }

  if (name.length < 2 || name.length > 120) {
    return NextResponse.json({ error: "Please enter a valid name." }, { status: 400 });
  }
  if (!EMAIL_RE.test(email) || email.length > 200) {
    return NextResponse.json({ error: "Please enter a valid email." }, { status: 400 });
  }

  let phoneFormatted = "";
  if (phoneRaw) {
    if (phoneRaw.length > 32) {
      return NextResponse.json({ error: "Phone number is too long." }, { status: 400 });
    }
    if (!phoneRaw.startsWith("+")) {
      return NextResponse.json(
        { error: "Phone number must start with the country code (e.g. +44 UK, +971 UAE, +966 KSA, +1 US)." },
        { status: 400 }
      );
    }
    const parsed = parsePhoneNumberFromString(phoneRaw);
    if (!parsed || !parsed.isValid()) {
      return NextResponse.json(
        { error: "That doesn't look like a valid phone number — please check and try again." },
        { status: 400 }
      );
    }
    phoneFormatted = parsed.formatInternational();
  }

  if (message.length < 10 || message.length > 5000) {
    return NextResponse.json(
      { error: "Message must be between 10 and 5000 characters." },
      { status: 400 }
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL ?? "onboarding@resend.dev";

  if (!apiKey || !to) {
    return NextResponse.json(
      {
        error:
          "Email is not configured on the server. Set RESEND_API_KEY and CONTACT_TO_EMAIL in .env.local."
      },
      { status: 503 }
    );
  }

  const resend = new Resend(apiKey);

  try {
    const phoneRow = phoneFormatted
      ? `<tr><td style="padding:4px 12px 4px 0;color:#666;">Phone</td><td><a href="tel:${escape(phoneFormatted.replace(/\s/g, ""))}" style="color:#0891b2;text-decoration:none;">${escape(phoneFormatted)}</a></td></tr>`
      : "";
    const phoneTextLine = phoneFormatted ? `Phone: ${phoneFormatted}\n` : "";

    const { error } = await resend.emails.send({
      from: `Portfolio Contact <${from}>`,
      to: [to],
      replyTo: email,
      subject: `[Portfolio] ${subject}`,
      text: `From: ${name} <${email}>\n${phoneTextLine}Subject: ${subject}\n\n${message}`,
      html: `
        <div style="font-family:system-ui,sans-serif;line-height:1.55;color:#0a0c14;">
          <h2 style="margin:0 0 16px;font-size:18px;">New portfolio enquiry</h2>
          <table style="border-collapse:collapse;font-size:14px;">
            <tr><td style="padding:4px 12px 4px 0;color:#666;">From</td><td><strong>${escape(name)}</strong> &lt;${escape(email)}&gt;</td></tr>
            ${phoneRow}
            <tr><td style="padding:4px 12px 4px 0;color:#666;">Subject</td><td>${escape(subject)}</td></tr>
          </table>
          <hr style="margin:16px 0;border:none;border-top:1px solid #eee;" />
          <pre style="white-space:pre-wrap;font:14px/1.55 system-ui,sans-serif;margin:0;">${escape(message)}</pre>
        </div>
      `
    });

    if (error) {
      return NextResponse.json(
        { error: error.message ?? "Failed to send email." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Unexpected error.";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
