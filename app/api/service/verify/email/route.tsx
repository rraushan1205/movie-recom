import { NextRequest, NextResponse } from "next/server";
const nodemailer = require("nodemailer");
import { Prisma, PrismaClient } from "@prisma/client";
import { serialize } from "cookie";
import jwt from "jsonwebtoken";
const transporter = nodemailer.createTransport({
  host: process.env.HOST,
  service: "Gmail",
  port: process.env.PORT,
  secure: process.env.SECURE, // true for port 465, false for other ports
  auth: {
    user: process.env.USER,
    pass: process.env.PASS,
  },
});
const prisma = new PrismaClient();
const JWT_SECRET = "$secret";
export async function POST(request: NextRequest, response: NextResponse) {
  const params = await request.json();

  if (params.email) {
    const email = params.email;
    const name = params?.name;
    const existingEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    let userId = existingEmail?.id;
    if (!userId) {
      const newUser = await prisma.user.create({
        data: {
          email,
          name,
        },
      });
      userId = newUser.id;
    }
    const existing_otp = await prisma.otp.findFirst({
      where: {
        userId,
      },
    });
    let otp_generated: number | null = null;
    if (existing_otp) {
      const now = new Date();
      if (existing_otp.expireAt > now) {
        otp_generated = existing_otp.otp;
      } else {
        await prisma.otp.delete({
          where: {
            id: existing_otp.id,
          },
        });
      }
    }
    if (!otp_generated) {
      const GeneratedOTP = Math.floor(
        100000 + Math.random() * 900000
      ).toString();
      console.log(GeneratedOTP);

      const newOtp = await prisma.otp.create({
        data: {
          userId,
          expireAt: new Date(Date.now() + 5 * 60 * 1000),
          otp: Number(GeneratedOTP),
        },
      });
      otp_generated = Number(GeneratedOTP);
    }
    try {
      const info = await transporter.sendMail({
        from: '"Email Verification" <xyzemailsender@gmail.com>',
        to: email,
        subject: "Email Verification",
        text: otp_generated + " is otp for email verification",
      });
      if (info) {
      }
      console.log("Message sent: %s", info.messageId);
    } catch (error) {
      console.log(error);
    }
    const token = jwt.sign({ id: userId }, JWT_SECRET, {
      expiresIn: "10min",
    });
    const cookie = serialize("userid", token, {
      httpOnly: false,
      secure: false,
      maxAge: 10 * 60,
      path: "/",
    });
    return NextResponse.json(
      { message: "otp sent" },
      {
        headers: { "Set-Cookie": cookie },
      }
    );
  }
  return NextResponse.json({ message: "Nothing found" });
}
