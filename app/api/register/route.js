import User from "@/app/lib/models/User";
import dbConnect from "@/app/lib/mongo";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

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

    const msg = {
      to: email,
      from: "pictoramedia@gmail.com",
      subject: "Welcome to Fit Flow!",
      templateId: "d-212a0ee35af3408d819ccf8b2dad9196",
      dynamicTemplateData: {
        firstName: name,
      },
    };

    try {
      await sgMail.send(msg);
      console.log("Email sent successfully");
    } catch (error) {
      console.error("Error sending email", error);
    }

    return NextResponse.json({
      user,
    });
  } catch (err) {
    console.log(err, "REGISTRATION_ERROR");
    return new NextResponse("Internal Error", { status: 500 });
  }
}
