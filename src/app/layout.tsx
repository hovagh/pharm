import type { Metadata } from "next";
import "./globals.css";

// NOTE: Inter / IBM Plex Mono are loaded via next/font/google in production.
// This sandbox has no network access to fonts.googleapis.com, so fonts here
// fall back to the system stack defined in globals.css (--font-sans /
// --font-mono). To re-enable Google Fonts once you have network access,
// restore:
//   import { Inter, IBM_Plex_Mono } from "next/font/google";
//   const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
//   const plexMono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400","500"], variable: "--font-plex-mono", display: "swap" });
// and add `${inter.variable} ${plexMono.variable}` to the body className.

export const metadata: Metadata = {
  title: "HovaPharm — Pharmacy Operations Platform",
  description: "Your pharmacy, intelligently managed.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
