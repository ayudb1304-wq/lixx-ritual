import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/react";
import "@fontsource-variable/inter";
import "@fontsource-variable/fraunces";
import "@fontsource-variable/jetbrains-mono";
import "./globals.css";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://lixx.in";

const TITLE = "Lixx — Not a gummy. Not a pill. A ritual.";
const DESCRIPTION =
  "Isomalt-based functional lollipops from Bangalore. Charge, Zen, Dream. Zero sugar, sublingual, dental-safe. Box of 15 for ₹499. On Blinkit, Zepto, Instamart.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  applicationName: "Lixx",
  keywords: [
    "functional lollipop",
    "nutraceutical confectionery",
    "sugar-free candy",
    "isomalt",
    "Bangalore",
    "sleep",
    "focus",
    "calm",
    "L-theanine",
    "melatonin",
    "ashwagandha",
  ],
  authors: [{ name: "Lixx" }],
  creator: "Lixx",
  publisher: "Lixx",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Lixx",
    title: TITLE,
    description: DESCRIPTION,
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0c",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-ink text-bone font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
