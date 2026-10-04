import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE_NAME, verifySessionToken } from "@/lib/auth";

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Only protect /admin routes
  if (pathname.startsWith("/admin")) {
    const isLoginPage = pathname === "/admin/login";
    const sessionCookie = req.cookies.get(SESSION_COOKIE_NAME)?.value;
    const session = await verifySessionToken(sessionCookie);

    // If authenticated user tries to access /admin/login, redirect to dashboard
    if (isLoginPage) {
      if (session) {
        return NextResponse.redirect(new URL("/admin/dashboard", req.url));
      }
      return NextResponse.next();
    }

    // If user is not authenticated on any other /admin path, enforce login
    if (!session) {
      const loginUrl = new URL("/admin/login", req.url);
      if (pathname !== "/admin" && pathname !== "/admin/dashboard") {
        loginUrl.searchParams.set("from", pathname);
      }
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};

export default proxy;
