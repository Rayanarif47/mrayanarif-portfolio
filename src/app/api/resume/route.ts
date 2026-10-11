import { NextResponse } from "next/server";

const RESUME_SOURCE_URL =
  "https://drive.google.com/uc?export=download&id=1ZvaTsMl4iefGdqCRIhuJNI6jytqE83kR";

export async function GET() {
  const res = await fetch(RESUME_SOURCE_URL);

  if (!res.ok || !res.body) {
    return NextResponse.json({ error: "Resume unavailable" }, { status: 502 });
  }

  return new NextResponse(res.body, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="Rayan_Arif_Resume.pdf"',
    },
  });
}
