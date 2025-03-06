import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const userToken = req.cookies.get("user-token");

  if (!userToken) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
