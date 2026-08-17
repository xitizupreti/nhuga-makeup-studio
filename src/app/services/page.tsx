import type { Metadata } from "next";
import Link from "next/link";
import MenuSection, { type MenuWithPosters } from "@/components/MenuSection";
import PageHeader from "@/components/PageHeader";
import JsonLd from "@/components/JsonLd";
import { WhatsAppButton } from "@/components/WhatsAppDialog";
import { getMenuPosters } from "@/lib/assets";
import { getOffer } from "@/lib/offer";
import { breadcrumbSchema } from "@/lib/schema";
import { serviceMenu, site, type Menu } from "@/config/site";

/** See the note in src/app/page.tsx — keeps the countdown and discount honest. */
export const revalidate = 3600;

const description =
  "Bridal, engagement and party makeup, nail extension, lash and hair work at Nhuga Makeup Studio, Kalimati Chowk, Kathmandu — in the studio or at your venue.";

export const metadata: Metadata = {
  title: "Services",
  description,
  alternates: { canonical: "/services" },
  openGraph: { title: "Services", description, url: "/services" },
};

function withPosters(menu: Menu): MenuWithPosters {
  return { ...menu, posters: getMenuPosters(menu.id) };
}

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema("Services", "/services")} />

      <PageHeader eyebrow="Book" title="Services" intro={serviceMenu.intro} />

      <MenuSection
        id="services"
        eyebrow="Book"
        heading="Services"
        intro={serviceMenu.intro}
        tone="light"
        showHeading={false}
        offer={getOffer()}
        menus={[withPosters(serviceMenu)]}
      />

      <section className="section bg-blush-50">
        <div className="container-page rounded-3xl border border-blush-100 bg-white p-8 text-center sm:p-12">
          <h2 className="heading">Not sure what you need?</h2>
          <p className="mx-auto mt-4 max-w-lg leading-relaxed text-ink/70">
            Tell us the occasion, the date and the venue, and we&apos;ll suggest
            what fits — and confirm the price for exactly that.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <WhatsAppButton className="btn-primary">
              Ask on WhatsApp
            </WhatsAppButton>
            <Link href="/#booking" className="btn-secondary">
              Use the booking form
            </Link>
          </div>
          <p className="mt-6 text-xs text-ink/50">
            {site.address.line1}, {site.address.line2}
          </p>
        </div>
      </section>
    </>
  );
}
