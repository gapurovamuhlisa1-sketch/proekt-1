import type { Metadata, Viewport } from "next";
import { Manrope, Unbounded } from "next/font/google";
import { MetaPixel } from "@/components/MetaPixel";
import { site } from "@/lib/content";
import "./globals.css";

const body = Manrope({
  subsets: ["latin", "latin-ext"],
  variable: "--font-body",
  display: "swap",
});

const display = Unbounded({
  subsets: ["latin", "latin-ext"],
  variable: "--font-display",
  display: "swap",
});

const FALLBACK_URL = "https://targetcourse.uz";

/** .env dagi manzil noto'g'ri yozilsa ham build yiqilmasin. */
function siteUrl() {
  try {
    return new URL(process.env.NEXT_PUBLIC_SITE_URL || FALLBACK_URL);
  } catch {
    return new URL(FALLBACK_URL);
  }
}

export const metadata: Metadata = {
  metadataBase: siteUrl(),
  title: `${site.author} — 1 oylik target kursi`,
  description:
    "Facebook va Instagram reklamasini noldan o'rganing. 15 ta dars, jonli mashg'ulotlar, real byudjet bilan amaliyot va mijoz topish tizimi.",
  openGraph: {
    title: `${site.author} — 1 oylik target kursi`,
    description:
      "15 ta darsda targetolog kasbini egallang. Jonli mashg'ulotlar, real byudjet, kichik guruh.",
    locale: "uz_UZ",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#080B1F",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uz" className={`${body.variable} ${display.variable}`}>
      <body className="font-sans">
        <MetaPixel />
        {children}
      </body>
    </html>
  );
}
