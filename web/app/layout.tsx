import type { Metadata } from "next";
import "@fontsource-variable/inter";
import "@fontsource-variable/fraunces";
import "@fontsource-variable/jetbrains-mono";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lixx — Not a gummy. Not a pill. A ritual.",
  description:
    "Isomalt-based functional lollipops from Bangalore. Charge, Zen, Dream. Zero sugar, sublingual, dental-safe. Box of 15 for ₹499. On Blinkit, Zepto, Instamart.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-ink text-bone font-sans antialiased">{children}</body>
    </html>
  );
}
