import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://aiva-rose.com"),
  title: {
    default: "Aiva Rose — Dark Romance",
    template: "%s · Aiva Rose",
  },
  description:
    "Aiva Rose writes dark romance about dangerous men and the women who are more dangerous still. Author of the Bound Hearts series.",
  openGraph: {
    title: "Aiva Rose — Dark Romance",
    description:
      "Dark romance. Dangerous men. Women who are more dangerous still.",
    url: "https://aiva-rose.com",
    siteName: "Aiva Rose",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aiva Rose — Dark Romance",
    description:
      "Dark romance. Dangerous men. Women who are more dangerous still.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="min-h-screen bg-ink text-parchment">{children}</body>
    </html>
  );
}
