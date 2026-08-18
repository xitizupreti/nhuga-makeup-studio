import type { Metadata } from "next";
import MenuSection, { type MenuWithPosters } from "@/components/MenuSection";
import PageHeader from "@/components/PageHeader";
import JsonLd from "@/components/JsonLd";
import AskForMore from "@/components/AskForMore";
import { getMenuPosters } from "@/lib/assets";
import { getOffer } from "@/lib/offer";
import { breadcrumbSchema } from "@/lib/schema";
import {
  serviceMenus,
  servicePolicies,
  servicesIntro,
  type Menu,
} from "@/config/site";

/** See the note in src/app/page.tsx — keeps the countdown and discount honest. */
export const revalidate = 3600;

const description =
  "Bridal, reception, mehendi and party makeup, groom makeup, nail extensions, lash extensions and beauty treatments at Nhuga Makeup Studio, Kalimati Chowk, Kathmandu. 50% off for 3 months from opening.";

export const metadata: Metadata = {
  title: "Services & Prices",
  description,
  alternates: { canonical: "/services" },
  openGraph: { title: "Services & Prices", description, url: "/services" },
};

function withPosters(menu: Menu): MenuWithPosters {
  return { ...menu, posters: getMenuPosters(menu.id) };
}

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema("Services & Prices", "/services")} />

      <PageHeader
        eyebrow="Book"
        title="Services & Prices"
        intro={servicesIntro}
      />

      <MenuSection
        id="services"
        eyebrow="Book"
        heading="Price lists"
        intro={servicesIntro}
        tone="light"
        showHeading={false}
        offer={getOffer()}
        menus={serviceMenus.map(withPosters)}
      />

      <section className="section bg-blush-50">
        <div className="container-page">
          <h2 className="heading">Good to know</h2>
          <dl className="mt-8 grid gap-6 sm:grid-cols-2">
            {servicePolicies.map((policy) => (
              <div
                key={policy.title}
                className="rounded-2xl border border-blush-100 bg-white p-6"
              >
                <dt className="font-serif text-xl text-blush-900">
                  {policy.title}
                </dt>
                <dd className="mt-2 text-sm leading-relaxed text-ink/70">
                  {policy.body}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <AskForMore
        heading="Need a service we haven't listed?"
        body="These lists cover what we're asked for most often. If you want something else — a combined bridal package, a group booking, or a treatment not shown here — message us and we'll tell you what's possible and what it costs."
        tone="light"
      />
    </>
  );
}
