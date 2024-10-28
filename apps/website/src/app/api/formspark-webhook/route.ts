import { NextResponse, NextRequest } from "next/server";
import { Resend } from "resend";
import JoinWaitlistEmail from "@/partials/emails/JoinWaitlistEmail";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  const body = await request.text();
  const bodyJson = JSON.parse(body);
  const { email } = bodyJson;
  const { data, error } = await resend.emails.send({
    from: "noreply@euterpe.finance",
    to: [email],
    subject: "You're on the waitlist for Euterpe 🚀",
    react: JoinWaitlistEmail(),
  });

  if (error) {
    return NextResponse.json({ error });
  }

  return NextResponse.json(data);
}
