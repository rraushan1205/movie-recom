import { NextRequest, NextResponse } from "next/server";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
interface CustomJwtPayload extends JwtPayload {
  id?: string;
}
export async function POST(request: NextRequest) {
  const params = await request.json();
  if (params.otp) {
    const token = request.cookies.get("userid")?.value;
    if (token) {
      try {
        const decoded = jwtDecode<CustomJwtPayload>(token);
        const getUser = await prisma.user.findUnique({
          where: {
            id: decoded?.id,
          },
          include: {
            Otp: true,
          },
        });
        const fetchedOtp = getUser?.Otp[0]?.otp;
        if (!fetchedOtp) {
          return NextResponse.json({ message: "otp expired" });
        }
        const expiry = getUser?.Otp[0].expireAt;
        const now = new Date();
        if (fetchedOtp == params.otp && expiry > now) {
          await prisma.otp.delete({
            where: {
              id: getUser?.Otp[0].id,
            },
          });
          return NextResponse.json({ message: "Otp Successfully verified" });
        }
      } catch (error) {
        console.error("Error decoding JWT:", error);
        return NextResponse.json({ error: "Invalid token" }, { status: 400 });
      }
    } else {
      return NextResponse.json({ message: "unregistered" }, { status: 401 });
    }

    return NextResponse.json({ message: "Incorrect otp" }, { status: 401 });
  }

  return NextResponse.json(
    { message: "Insufficient arguments" },
    { status: 400 }
  );
}
