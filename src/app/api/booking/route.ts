import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { site } from "@/config/site";

export const runtime = "nodejs";

type Payload = Record<string, unknown>;

function text(payload: Payload, key: string, max = 2000) {
  const value = payload[key];
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(request: Request) {
  const { GMAIL_USER, GMAIL_APP_PASSWORD, BOOKING_TO } = process.env;

  if (!GMAIL_USER || !GMAIL_APP_PASSWORD) {
    console.error("Booking form: GMAIL_USER / GMAIL_APP_PASSWORD are not set.");
    return NextResponse.json(
      { error: "Email is not configured yet." },
      { status: 500 },
    );
  }

  let payload: Payload;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const name = text(payload, "name", 120);
  const phone = text(payload, "phone", 40);
  const email = text(payload, "email", 160);
  const service = text(payload, "service", 160);
  const location = text(payload, "location", 60);
  const date = text(payload, "date", 40);
  const message = text(payload, "message");

  if (!name || !phone) {
    return NextResponse.json(
      { error: "Name and phone are required." },
      { status: 400 },
    );
  }

  const rows: [string, string][] = [
    ["Name", name],
    ["Phone", phone],
    ["Email", email || "—"],
    ["Service", service || "—"],
    ["Location", location || "—"],
    ["Preferred date", date || "—"],
    ["Message", message || "—"],
  ];

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: GMAIL_USER, pass: GMAIL_APP_PASSWORD },
  });

  try {
    await transporter.sendMail({
      // Gmail rewrites From to the authenticated account, so send as the studio
      // and put the enquirer on Reply-To instead.
      from: `"${site.name} website" <${GMAIL_USER}>`,
      to: BOOKING_TO || GMAIL_USER,
      replyTo: email || undefined,
      subject: `New booking enquiry — ${name}${service ? ` · ${service}` : ""}`,
      text: rows.map(([label, value]) => `${label}: ${value}`).join("\n"),
      html: `
        <h2 style="font-family:Georgia,serif;color:#9c1d49;">New booking enquiry</h2>
        <table cellpadding="6" style="font-family:system-ui,sans-serif;font-size:14px;border-collapse:collapse;">
          ${rows
            .map(
              ([label, value]) =>
                `<tr><td style="color:#8a6b76;">${label}</td><td><strong>${escapeHtml(
                  value,
                )}</strong></td></tr>`,
            )
            .join("")}
        </table>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Booking form: sendMail failed", err);
    return NextResponse.json(
      { error: "Could not send the enquiry right now." },
      { status: 502 },
    );
  }
}
