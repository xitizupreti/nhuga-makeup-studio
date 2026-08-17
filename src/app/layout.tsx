import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import { site } from "@/config/site";
import { getLogo, getPromos } from "@/lib/assets";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Promo from "@/components/Promo";
import { WhatsAppProvider } from "@/components/WhatsAppDialog";
import "./globals.css";

const logo = getLogo();
const promos = getPromos();

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-serif",
  display: "swap",
});

const sans = Jost({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  // Drives the browser tab icon. Falls back to Next's default until
  // public/logo.* exists.
  icons: logo ? { icon: logo, apple: logo } : undefined,
  openGraph: {
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    type: "website",
    locale: "en_NP",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body className="font-sans">
        <WhatsAppProvider>
          {site.promo.active && <Promo images={promos} />}
          <Header logo={logo} />
          <main>{children}</main>
          <Footer logo={logo} />
        </WhatsAppProvider>
      </body>
    </html>
  );
}
