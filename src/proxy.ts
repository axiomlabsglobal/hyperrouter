import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * OFAC Sanctioned Country Codes
 * Reference: https://ofac.treasury.gov/sanctions-programs-and-country-information
 *
 * Detection Strategy (vendor-agnostic):
 *   1. Check standard geo headers injected by upstream CDN/WAF
 *      — Azure Front Door:  x-azure-clientip, x-azure-ref
 *      — Cloudflare:        cf-ipcountry
 *      — AWS CloudFront:    cloudfront-viewer-country
 *      — Generic CDN/Proxy: x-country-code
 *      — Vercel (fallback):  x-vercel-ip-country
 *   2. If no geo header is present (e.g. local dev), the check is safely skipped.
 *   3. For production hardening, configure Azure Front Door WAF geo-filter rules
 *      to block sanctioned countries at the edge BEFORE traffic reaches the app.
 */
const BLOCKED_COUNTRIES = new Set([
  'RU', // Russia
  'IR', // Iran
  'SY', // Syria
  'KP', // North Korea
  'CU', // Cuba
]);

/**
 * Extract country code from any CDN/WAF geo header (vendor-agnostic).
 * Returns null if no geo header is available (e.g. local dev).
 */
function getCountryCode(request: NextRequest): string | null {
  // Azure Front Door custom header (configure in WAF rules)
  const azureCountry = request.headers.get('x-azure-country');
  if (azureCountry) return azureCountry.toUpperCase();

  // Cloudflare
  const cfCountry = request.headers.get('cf-ipcountry');
  if (cfCountry) return cfCountry.toUpperCase();

  // AWS CloudFront
  const awsCountry = request.headers.get('cloudfront-viewer-country');
  if (awsCountry) return awsCountry.toUpperCase();

  // Generic CDN / reverse proxy
  const genericCountry = request.headers.get('x-country-code');
  if (genericCountry) return genericCountry.toUpperCase();

  // Vercel (backward compat — will simply be absent on Azure)
  const vercelCountry = request.headers.get('x-vercel-ip-country');
  if (vercelCountry) return vercelCountry.toUpperCase();

  return null;
}

/**
 * Extract client IP from standard headers (vendor-agnostic).
 */
function getClientIp(request: NextRequest): string | null {
  // Azure-specific
  const azureIp = request.headers.get('x-azure-clientip')
    || request.headers.get('x-ms-client-principal-ip');
  if (azureIp) return azureIp;

  // Standard
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();

  const realIp = request.headers.get('x-real-ip');
  if (realIp) return realIp;

  return null;
}

/**
 * Security Headers — Production-grade CSP and hardening.
 * These are vendor-agnostic and work on Azure, AWS, Cloudflare, etc.
 */
const SECURITY_HEADERS: Record<string, string> = {
  'Content-Security-Policy': [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://accounts.google.com https://apis.google.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "img-src 'self' data: blob: https:",
    "font-src 'self' https://fonts.gstatic.com",
    "connect-src 'self' https://accounts.google.com https://*.googleapis.com",
    "frame-src https://accounts.google.com",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "upgrade-insecure-requests",
  ].join('; '),
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
  'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
  'X-DNS-Prefetch-Control': 'on',
};

export function proxy(request: NextRequest) {
  // ─── 1. OFAC Country Block (vendor-agnostic) ───
  const country = getCountryCode(request);
  if (country && BLOCKED_COUNTRIES.has(country)) {
    const blockedUrl = new URL('/blocked', request.url);
    return NextResponse.rewrite(blockedUrl, { status: 403 });
  }

  // ─── 2. Suspicious Proxy / Multi-hop Detection ───
  const forwarded = request.headers.get('x-forwarded-for');
  const via = request.headers.get('via');
  const multipleHops = forwarded ? forwarded.split(',').length > 3 : false;
  const isSuspiciousProxy = via && multipleHops;

  if (isSuspiciousProxy && country && BLOCKED_COUNTRIES.has(country)) {
    const blockedUrl = new URL('/blocked', request.url);
    return NextResponse.rewrite(blockedUrl, { status: 403 });
  }

  // ─── 3. Inject Security Headers ───
  const response = NextResponse.next();

  for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
    response.headers.set(key, value);
  }

  // Attach client metadata for downstream logging / Application Insights
  const clientIp = getClientIp(request);
  if (clientIp) {
    response.headers.set('X-Client-Ip', clientIp);
  }
  if (isSuspiciousProxy) {
    response.headers.set('X-Proxy-Flagged', 'suspicious-multi-hop');
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     * - The /blocked page itself (avoid infinite loop)
     */
    '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|blocked).*)',
  ],
};
