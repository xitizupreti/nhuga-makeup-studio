import type { Metadata } from "next";
import MenuSection, { type MenuWithPosters } from "@/components/MenuSection";
import PageHeader from "@/components/PageHeader";
import { getMenuPosters } from "@/lib/assets";
import { classMenus, classesIntro, type Menu } from "@/config/site";

export const metadata: Metadata = {
  title: "Classes & Prices",
  description:
    "Makeup, nails and lash extension courses at Nhuga Makeup Studio, Kalimati Chowk, Kathmandu — from 5-day self makeup to 3-month masters packages. 50% off for 3 months from opening.",
};

function withPosters(menu: Menu): MenuWithPosters {
  return { ...menu, posters: getMenuPosters(menu.id) };
}

export default function ClassesPage() {
  return (
    <>
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
        menus={classMenus.map(withPosters)}
      />
    </>
  );
}
