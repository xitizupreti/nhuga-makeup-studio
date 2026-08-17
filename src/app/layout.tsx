import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import { site, siteUrl } from "@/config/site";
import { getLogo, getPromos } from "@/lib/assets";
import { businessSchema } from "@/lib/schema";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Promo from "@/components/Promo";
import JsonLd from "@/components/JsonLd";
import ScrollToTop from "@/components/ScrollToTop";
import { WhatsAppProvider } from "@/components/WhatsAppDialog";
import "./globals.css";

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

const logo = getLogo();
const promos = getPromos();

const title = `${site.name} — ${site.tagline}`;

export const metadata: Metadata = {
  // Makes every relative URL below absolute, which link previews require.
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "makeup studio Kathmandu",
    "bridal makeup Kathmandu",
    "makeup artist Kalimati",
    "makeup classes Nepal",
    "nail extension Kathmandu",
    "lash extension Kathmandu",
    "beauty parlour Kalimati",
    "Nhuga Makeup Studio",
  ],
  alternates: { canonical: "/" },
  icons: logo ? { icon: logo, apple: logo } : undefined,
  openGraph: {
    type: "website",
    siteName: site.name,
    title,
    description: site.description,
    url: "/",
    locale: "en_NP",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  category: "Beauty & Personal Care",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body className="font-sans">
        <JsonLd data={businessSchema()} />
        <WhatsAppProvider>
          {site.promo.active && <Promo images={promos} />}
          <Header logo={logo} />
          <main>{children}</main>
          <Footer logo={logo} />
          <ScrollToTop />
        </WhatsAppProvider>
      </body>
    </html>
  );
}
