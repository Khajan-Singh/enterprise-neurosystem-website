import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Enterprise Neurosystem",
    template: "%s · Enterprise Neurosystem",
  },
  description:
    "Enterprise Neurosystem is an open source AI research community treating the planet's species and ecosystems as a single system — building a global-scale AI network to understand and respond to climate change.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} h-full antialiased`}>
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
