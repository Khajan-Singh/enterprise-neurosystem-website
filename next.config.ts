import type { NextConfig } from "next";

/**
 * The one host that should ever serve a 200. Kept in sync with lib/site.ts
 * (`SITE_URL`) — the two must agree, or canonicals will name a host that
 * redirects. Imported by string rather than from lib/site.ts because
 * next.config.ts is evaluated before the TypeScript path aliases exist.
 */
const CANONICAL_HOST = "www.enterpriseneurosystem.org";

/**
 * Every other hostname the site answers on. `.com` and `.net` are owned as
 * defensive registrations and are meant to forward to `.org`. Vercel's
 * domain-level redirect only covers the *apex* of each — `www.` on the
 * alternates was added as a plain alias and served the full site with a 200,
 * so the same pages were live on three hosts. Matching them here makes the
 * app itself enforce one host no matter how the dashboard is configured.
 *
 * Next wraps the value in `^…$`. The outer group is what keeps that anchoring
 * around the whole alternation — without it, `enterpriseneurosystem\.org$`
 * also matches the www host and the site redirects to itself forever.
 */
const ALTERNATE_HOSTS =
  "(?:(?:www\\.)?enterpriseneurosystem\\.(?:com|net)|enterpriseneurosystem\\.org)";

/**
 * The previous site was WordPress, with trailing-slash permalinks. These are
 * the URLs that were live and indexed (per the Wayback Machine's CDX index)
 * and that have no 1:1 counterpart in the redesign. Everything that *does*
 * map 1:1 (`/mission/`, `/charter/`, `/board/`, `/projects/`, `/contact/`)
 * is already handled by Next's built-in trailing-slash redirect.
 *
 * `/test-page-for-layouts-etc-not-public/` and all `wp-*` paths are left to
 * 404 on purpose — nothing here should replace them.
 */
const LEGACY_REDIRECTS: { source: string; destination: string }[] = [
  { source: "/about", destination: "/mission" },
  { source: "/community", destination: "/contact" },
  { source: "/community/onboarding", destination: "/contact" },
  { source: "/community/press-releases", destination: "/press" },
  { source: "/community/workstreams", destination: "/projects" },
  { source: "/the-grand-challenge", destination: "/partners" },
  { source: "/code-of-conduct", destination: "/charter" },
  // Was planned for the redesign, then merged into /contact before launch.
  { source: "/get-involved", destination: "/contact" },
  // WordPress blog surfaces: the news index, its sample post, and the
  // per-author / per-category archives.
  { source: "/news", destination: "/blog" },
  { source: "/hello-world", destination: "/blog" },
  { source: "/author/:slug*", destination: "/blog" },
  { source: "/category/:slug*", destination: "/blog" },
  { source: "/feed", destination: "/blog/rss.xml" },
  { source: "/feed/:path*", destination: "/blog/rss.xml" },
];

/**
 * Sent on every response. None of these affect rendering; they close the
 * usual header-audit findings (MIME sniffing, clickjacking, referrer leakage,
 * unneeded browser features). HSTS is deliberately *not* set here — Vercel
 * already sends it for every custom domain, and two copies with different
 * `max-age` values is a lint warning, not extra security.
 */
const SECURITY_HEADERS = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
];

const nextConfig: NextConfig = {
  // `X-Powered-By: Next.js` is a fingerprint with no upside.
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    // default is 60s, which makes the optimizer re-derive every variant
    // over and over on a low-traffic site
    minimumCacheTTL: 31536000,
    // 64 for BoardCard thumbnails, 200 for the SensorGrid tiles
    imageSizes: [64, 128, 200, 256, 384],
  },
  async redirects() {
    return [
      // Host consolidation first: a legacy path on an alternate host should
      // land on the canonical host in one hop, not two. `:path*` plus the
      // automatic query passthrough keeps the full URL intact.
      {
        source: "/:path*",
        has: [{ type: "host", value: ALTERNATE_HOSTS }],
        destination: `https://${CANONICAL_HOST}/:path*`,
        permanent: true,
      },
      ...LEGACY_REDIRECTS.map((redirect) => ({ ...redirect, permanent: true })),
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: SECURITY_HEADERS,
      },
    ];
  },
};

export default nextConfig;
