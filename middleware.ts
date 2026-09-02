import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const isAdminRoute = req.nextUrl.pathname.startsWith("/admin");
    const role = (req.nextauth?.token as { role?: string })?.role;

    if (isAdminRoute && role !== "ADMIN") {
      return NextResponse.redirect(new URL("/projects", req.url));
    }
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ["/projects/:path*", "/admin/:path*", "/settings/:path*"],
};