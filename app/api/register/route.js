import User from "@/app/lib/models/User";
import dbConnect from "@/app/lib/mongo";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import { Resend } from "resend";
import WelcomeEmail from "@/app/_components/email-template";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    await dbConnect();

    const body = await req.json();

    const { email, name, password } = body;

    if (!email || !name || !password) {
      return new NextResponse("Missing info", { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      name: name,
      email: email,
      hashedPassword,
      image: null,
      weight: null,
      height: null,
      gender: null,
    });

    const { data } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "lukastojkovic006.ls@gmail.com", // OVO MORA DA SE PROMENI NA DEPLOYMENT
      subject: "Welcome to Fit Flow!",
      react: WelcomeEmail({ firstName: name }),
    });

    return NextResponse.json({
      user,
      emailStatus: data ? "Email sent successfully" : "Email failed to send",
    });
  } catch (err) {
    console.log(err, "REGISTRATION_ERROR");
    return new NextResponse("Internal Error", { status: 500 });
  }
}
