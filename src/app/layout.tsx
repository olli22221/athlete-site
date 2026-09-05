import type { Metadata } from "next";
import { Archivo, IBM_Plex_Mono, Public_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PlaceholderNotice from "@/components/PlaceholderNotice";
import { siteConfig } from "@/lib/site-config";
import { siteUrl } from "@/lib/site-url";

// Archivo is loaded with its width axis so the display face can run wide.
// Sports brands reach for condensed type by reflex; the board in the hall is
// wide, and the whole identity hangs off that inversion.
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  axes: ["wdth"],
});

const publicSans = Public_Sans({
  variable: "--font-public",
  subsets: ["latin"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  weight: ["400", "500", "600"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} — ${siteConfig.athlete.name}`,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.intro,
  metadataBase: new URL(siteUrl()),
  openGraph: {
    title: `${siteConfig.name} — ${siteConfig.athlete.name}`,
    description: siteConfig.intro,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${archivo.variable} ${publicSans.variable} ${plexMono.variable} antialiased`}
      >
        <PlaceholderNotice />
        {/* The homepage nav floats absolute over the hero. This wrapper is the
            box it floats in, so it lands below the notice instead of on it. */}
        <div className="relative">
          <Navbar />
          <main>{children}</main>
        </div>
        <Footer />
      </body>
    </html>
  );
}
