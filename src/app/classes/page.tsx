import type { Metadata } from "next";
import MenuSection, { type MenuWithPosters } from "@/components/MenuSection";
import PageHeader from "@/components/PageHeader";
import { getMenuPosters } from "@/lib/assets";
import { getOffer } from "@/lib/offer";
import { breadcrumbSchema } from "@/lib/schema";
import JsonLd from "@/components/JsonLd";
import { classMenus, classesIntro, type Menu } from "@/config/site";

/** See the note in src/app/page.tsx — keeps the countdown and discount honest. */
export const revalidate = 3600;

const description =
  "Makeup, nails and lash extension courses at Nhuga Makeup Studio, Kalimati Chowk, Kathmandu — from 5-day self makeup to 3-month masters packages. 50% off for 3 months from opening.";

export const metadata: Metadata = {
  title: "Classes & Prices",
  description,
  alternates: { canonical: "/classes" },
  openGraph: {
    title: "Classes & Prices",
    description,
    url: "/classes",
  },
};

function withPosters(menu: Menu): MenuWithPosters {
  return { ...menu, posters: getMenuPosters(menu.id) };
}

export default function ClassesPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema("Classes & Prices", "/classes")} />
      <PageHeader
        eyebrow="Learn"
        title="Classes & Prices"
        intro={classesIntro}
      />
      <MenuSection
        id="classes"
        eyebrow="Courses"
        heading="Price lists"
        intro={classesIntro}
        tone="light"
        showHeading={false}
        offer={getOffer()}
        menus={classMenus.map(withPosters)}
      />
    </>
  );
}
