import { NextRequest, NextResponse } from "next/server";
import {
  SESSION_COOKIE_NAME,
  validateAdminCredentials,
  signSessionToken,
} from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password, rememberMe } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 }
      );
    }

    const isValid = validateAdminCredentials(email, password);
    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid staff email or password. Please verify your credentials." },
        { status: 401 }
      );
    }

    const durationDays = rememberMe ? 30 : 7;
    const token = await signSessionToken(email, durationDays);

    const response = NextResponse.json({
      success: true,
      message: "Authentication successful",
      redirect: "/admin/dashboard",
    });

    const isProduction = process.env.NODE_ENV === "production";

    response.cookies.set({
      name: SESSION_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: isProduction,
      sameSite: "lax",
      path: "/",
      maxAge: durationDays * 24 * 60 * 60,
    });

    return response;
  } catch (error) {
    console.error("Login API error:", error);
    return NextResponse.json(
      { error: "Internal server error during authentication." },
      { status: 500 }
    );
  }
}
