import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Antbytelabs Construction — Where Plans Become Projects",
  description:
    "Family-owned construction & remodeling — framing, siding, custom decks, porches, and full-service remodels. Clear communication, upfront pricing, built to last.",
  metadataBase: new URL("http://localhost:3000"),
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${manrope.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-cream-soft text-ink">
        {children}
        {/* Umami analytics, self-hosted on the Oracle server */}
        <Script
          src="https://analytics.apps.antbytelabs.com/script.js"
          data-website-id="1e8e659a-e17e-4ce9-9fc7-b88dc15307d7"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
