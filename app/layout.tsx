import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

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
  alternates: {
    types: { "application/rss+xml": "/blog/rss.xml" },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} h-full antialiased`}>
      <head>
        {/*
          The ambient shadow's mask is referenced from an inline style, so the
          browser can't discover it until the CSSOM is built — and it sits in the
          above-the-fold header band on every page. Preload it.
        */}
        <link
          rel="preload"
          as="image"
          href="/ambient-shadow-shape.webp"
          type="image/webp"
        />
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
