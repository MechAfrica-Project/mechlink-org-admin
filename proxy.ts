import { auth } from "./auth";
import { NextResponse } from "next/server";

// The PWA manifest and its icon must be fetchable without a session —
// browsers request these to decide whether to offer "install", including
// from the (logged-out) login screen.
const PUBLIC_ASSETS = new Set(["/manifest.webmanifest", "/icon-512"]);

export default auth((req) => {
  const { nextUrl } = req;
  if (PUBLIC_ASSETS.has(nextUrl.pathname)) return;

  const isLoggedIn = !!req.auth;
  const isLoginPage = nextUrl.pathname === "/login";

  if (!isLoggedIn && !isLoginPage) {
    return NextResponse.redirect(new URL("/login", nextUrl));
  }

  if (isLoggedIn && isLoginPage) {
    return NextResponse.redirect(new URL("/", nextUrl));
  }
});

export const config = {
  // Every route except Next internals, static assets, and Auth.js's own
  // endpoints — guarding /api/auth would redirect the sign-in callback and
  // session lookups, breaking login outright. This whole site is the admin
  // panel, so the guard defaults to "protected": a new page is private
  // unless explicitly excepted here.
  matcher: ["/((?!api/auth|_next/static|_next/image|favicon.ico|.*\\.png$).*)"],
};
