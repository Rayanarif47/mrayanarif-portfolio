import { NextResponse } from "next/server";
import { Resend } from "resend";

const TO_EMAIL = "rayanarif390@gmail.com";

export async function POST(request: Request) {
  const body = await request.json();
  const { name, email, phone, budget, projectType, details, referenceLinks, bookCall } = body;

  if (!name || !email || !projectType || !details) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Email service not configured" }, { status: 500 });
  }

  const resend = new Resend(apiKey);

  const { error } = await resend.emails.send({
    from: "Hire Form <onboarding@resend.dev>",
    to: TO_EMAIL,
    replyTo: email,
    subject: `New hire request from ${name}`,
    text: [
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone || "-"}`,
      `Budget: ${budget || "-"}`,
      `Engagement Type: ${projectType}`,
      `Reference Links: ${referenceLinks || "-"}`,
      `Wants intro call: ${bookCall ? "Yes" : "No"}`,
      "",
      "Project Details:",
      details,
    ].join("\n"),
  });

  if (error) {
    return NextResponse.json({ error: "Failed to send email" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
