import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * Standalone output mode — required for Azure App Service / Docker deployments.
   * Produces a self-contained `.next/standalone` folder with its own minimal
   * node_modules and a `server.js` entrypoint, eliminating the need for
   * `npm install` on the deployment target.
   *
   * Azure Static Web Apps (hybrid) also benefits from this mode when using
   * the Node.js SSR adapter.
   */
  output: "standalone",

  /**
   * Global HTTP headers — vendor-agnostic caching and security.
   * These work identically on Azure CDN, Cloudflare, AWS CloudFront, etc.
   */
  headers: async () => [
    {
      // API routes: short CDN cache with stale-while-revalidate for edge
      source: "/api/:path*",
      headers: [
        {
          key: "Cache-Control",
          value: "public, s-maxage=60, stale-while-revalidate=300",
        },
        {
          key: "CDN-Cache-Control",
          value: "public, s-maxage=60, stale-while-revalidate=300",
        },
      ],
    },
    {
      // HTML pages: short CDN cache with background revalidation
      source: "/:path*",
      headers: [
        {
          key: "Cache-Control",
          value: "public, s-maxage=3600, stale-while-revalidate=86400",
        },
      ],
    },
  ],

  /**
   * Disable x-powered-by header for security hardening.
   */
  poweredByHeader: false,

  /**
   * Enable gzip/brotli compression at the framework level.
   * Azure App Service also has built-in compression, but this ensures
   * it works in standalone Docker deployments too.
   */
  compress: true,
};

export default nextConfig;
