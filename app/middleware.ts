import { NextRequest, NextResponse } from "next/server";

const locales = ["en", "sr"] as const;
type Locale = (typeof locales)[number];
const defaultLocale: Locale = "en";

const PUBLIC_FILE = /\.[^/]+$/;

function getPreferredLocale(request: NextRequest): Locale {
  const host = (request.headers.get("host") ?? "").toLowerCase().split(":")[0];

  if (host.endsWith(".rs")) {
    return "sr";
  }

  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname === "/favicon.ico" ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml" ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  const firstSegment = pathname.split("/").filter(Boolean)[0] ?? "";

  if (locales.includes(firstSegment as Locale)) {
    return NextResponse.next();
  }

  const locale = getPreferredLocale(request);
  const url = request.nextUrl.clone();

  url.pathname = pathname === "/" ? `/${locale}` : `/${locale}${pathname}`;

  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)"]
};
