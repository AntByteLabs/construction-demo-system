import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ADMIN_COOKIE } from "@/lib/auth";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const authed = req.cookies.get(ADMIN_COOKIE)?.value === "authenticated";

  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login") && !pathname.startsWith("/admin/forgot-password")) {
    if (!authed) {
      const url = req.nextUrl.clone();
      url.pathname = "/admin/login";
      return NextResponse.redirect(url);
    }
  }

  if ((pathname === "/admin/login" || pathname === "/admin/forgot-password") && authed) {
    const url = req.nextUrl.clone();
    url.pathname = "/admin";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
