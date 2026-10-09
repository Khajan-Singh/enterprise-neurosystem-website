import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { OG_IMAGE } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { organizationSchema, websiteSchema } from "@/lib/schema";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

/**
 * `themeColor` is --color-nav from app/globals.css (the same value the
 * manifest declares), so mobile browser chrome matches the nav bar. Next
 * requires this to live in a `viewport` export, not `metadata`.
 */
export const viewport: Viewport = {
  themeColor: "#ddeeff",
};

export const metadata: Metadata = {
  // Required before any relative URL may appear in a metadata field — without
  // it, a relative canonical or OG image is a build error.
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Enterprise Neurosystem",
    template: "%s · Enterprise Neurosystem",
  },
  description:
    "Enterprise Neurosystem is an open source AI research community treating the planet's species and ecosystems as a single system — building a global-scale AI network to understand and respond to climate change.",
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  // Deliberately no `alternates.canonical` here: metadata is inherited by
  // every child page, so a canonical set on the layout would point the whole
  // site at the homepage. Each page sets its own via lib/seo.ts.
  alternates: {
    types: { "application/rss+xml": "/blog/rss.xml" },
  },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "en_US",
    url: "/",
    title: "Enterprise Neurosystem",
    description:
      "An open source AI research community building a global-scale AI network to understand and respond to climate change.",
    images: [OG_IMAGE],
  },
  twitter: {
    // No `site`/`creator` handle — the org has no X account linked anywhere
    // on the site, and a wrong handle attributes the card to a stranger.
    card: "summary_large_image",
    title: "Enterprise Neurosystem",
    description:
      "An open source AI research community building a global-scale AI network to understand and respond to climate change.",
    images: [OG_IMAGE.url],
  },
  robots: {
    // Deliberately no `index: true` / `follow: true`. That is already the
    // default with no robots tag at all, and asserting it here would also
    // render it on app/not-found.tsx — where Next injects its own `noindex`,
    // leaving a 404 serving two contradictory robots directives.
    //
    // These three only widen how a result may be *presented*; without
    // max-image-preview:large Google caps result thumbnails, which is what
    // makes the share card eligible for a large image in search results.
    googleBot: {
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // `data-scroll-behavior="smooth"` is required because globals.css sets
    // `scroll-behavior: smooth` on <html> for in-page anchor links. Next 15 and
    // earlier silently forced that to `auto` for the duration of a route
    // transition; Next 16 stopped doing so, which left the scroll-to-top being
    // *animated* — and because the page height changes as the new route paints,
    // the animation settles short and drops you ~100px down the new page
    // instead of at the top. This attribute opts back into the old override.
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} h-full antialiased`}
    >
      <head>
        {/*
          The ambient shadow's mask is referenced from an inline style, so the
          browser can't discover it until the CSSOM is built — and it sits in the
          above-the-fold header band on every page. Preload it.
          `crossOrigin` is required: CSS masks are always fetched in CORS mode,
          and a preload whose mode doesn't match is discarded, so without it the
          browser downloads the image twice.
        */}
        <link
          rel="preload"
          as="image"
          href="/ambient-shadow-shape.webp"
          type="image/webp"
          crossOrigin="anonymous"
        />
        {/*
          The org and site entities, declared once for the whole site. Page-
          specific types (BlogPosting, BreadcrumbList) reference these by @id
          from their own routes rather than restating them.
        */}
        <JsonLd data={organizationSchema} />
        <JsonLd data={websiteSchema} />
      </head>
      <body
        className="flex min-h-full flex-col bg-bg text-ink"
        suppressHydrationWarning
      >
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
