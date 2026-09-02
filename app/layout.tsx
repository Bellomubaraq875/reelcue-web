import type { Metadata } from "next";
// import "./globals.css";"

export const metadata: Metadata = {
  title: "Reelcue",
  description: "Fast, tokenized video review and approval for teams and clients.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-neutral-50 text-neutral-900 antialiased">{children}</body>
    </html>
  );
}