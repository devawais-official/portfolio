import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { locales, getLocaleFromHeaders } from "./i18n/config";
import crypto from "crypto";

const DEFAULT_LOCALE = locales[0] || "en";

export function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const hostname = request.headers.get("host") || request.nextUrl.hostname;

    // ── SEO: Redirect www → non-www (permanent 301) ──
    // if (hostname.startsWith("www.")) {
    //     const nonWwwUrl = new URL(request.url);
    //     nonWwwUrl.hostname = hostname.replace(/^www\./, "");
    //     return NextResponse.redirect(nonWwwUrl, 301);
    // }

    // Static assets aur APIs ko bypass karein
    if (
        pathname.startsWith("/_next") ||
        pathname.startsWith("/api") ||
        pathname.includes(".") ||
        pathname === "/og-image.png"
    ) {
        return NextResponse.next();
    }

    const segments = pathname.split("/");
    const currentLocale = segments[1];

    const hasLocale = (locales as readonly string[]).includes(currentLocale);

    // ── LOCALE REDIRECT LOGIC ──
    if (!hasLocale) {
        let targetLocale = request.cookies.get("NEXT_LOCALE")?.value;

        // Validating targetLocale from cookies
        if (!targetLocale || !(locales as readonly string[]).includes(targetLocale)) {
            const acceptLanguage = request.headers.get("accept-language");
            targetLocale = getLocaleFromHeaders(acceptLanguage) || DEFAULT_LOCALE;
        }

        if (targetLocale === DEFAULT_LOCALE) {
            // Default locale: rewrite internally to /en/[path] so [locale] segment resolves,
            // but keep the browser URL clean (no visible /en prefix).
            const rewritePath = pathname === "/" ? `/${DEFAULT_LOCALE}` : `/${DEFAULT_LOCALE}${pathname}`;
            const rewriteUrl = new URL(rewritePath, request.url);
            return NextResponse.rewrite(rewriteUrl);
        } else {
            // Non-default locale: redirect to /{locale}/[path]
            const redirectPath = pathname === "/" ? `/${targetLocale}` : `/${targetLocale}${pathname}`;
            const redirectUrl = new URL(redirectPath, request.url);

            const response = NextResponse.redirect(redirectUrl);
            response.cookies.set("NEXT_LOCALE", targetLocale, {
                path: "/",
                maxAge: 31536000,
                sameSite: "lax",
                secure: process.env.NODE_ENV === "production",
            });
            return response;
        }
    }

    // ── NONCE & CSP HEADERS ──
    const nonce = Buffer.from(crypto.randomUUID()).toString('base64');

    const cspHeader = `
        default-src 'self';
        script-src 'self' 'nonce-${nonce}' 'strict-dynamic' ${process.env.NODE_ENV === 'development' ? "'unsafe-eval'" : ""};
        style-src 'self' 'unsafe-inline';
        img-src 'self' blob: data:;
        font-src 'self';
        object-src 'none';
        base-uri 'self';
        form-action 'self';
        frame-ancestors 'none';
        upgrade-insecure-requests;
    `.replace(/\s{2,}/g, ' ').trim();

    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-nonce', nonce);
    requestHeaders.set('Content-Security-Policy', cspHeader);

    const response = NextResponse.next({
        request: {
            headers: requestHeaders,
        },
    });

    response.headers.set('Content-Security-Policy', cspHeader);

    return response;
}

export const config = {
    matcher: [
        "/",
        "/((?!_next/static|_next/image|favicon.ico|og-image.png|.*\\..*|api).*)",
    ],
};