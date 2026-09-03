import type { Metadata } from "next";
import { Spectral, Manrope } from "next/font/google";
import { Providers } from "./providers";
import "./globals.css";

// Spectral (serif) carries headings — an editorial, screening-room feel.
// Manrope (sans) handles UI and body text. Two families, clearly distinct.
const serif = Spectral({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-serif",
});

const sans = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Reelcue",
  description: "Fast, tokenized video review and approval for teams and clients.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body className="bg-paper font-sans text-ink antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}