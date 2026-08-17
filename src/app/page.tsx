import Hero from "@/components/Hero";
import About from "@/components/About";
import MenuSection, { type MenuWithPosters } from "@/components/MenuSection";
import ClassesTeaser from "@/components/ClassesTeaser";
import GalleryTeaser from "@/components/GalleryTeaser";
import OpeningOffer from "@/components/OpeningOffer";
import HowItWorks from "@/components/HowItWorks";
import Faq from "@/components/Faq";
import Booking from "@/components/Booking";
import Contact from "@/components/Contact";
import { getAlbums } from "@/lib/gallery";
import { getLogo, getMenuPosters, getPromos } from "@/lib/assets";
import { getOffer } from "@/lib/offer";
import { faqSchema } from "@/lib/schema";
import JsonLd from "@/components/JsonLd";
import { serviceMenu, type Menu } from "@/config/site";

/**
 * Regenerate hourly. Without this the page would be frozen at build time, so
 * the "days left" countdown would drift and the discount would never lapse.
 */
export const revalidate = 3600;

/** Attaches whatever posters exist in public/menu for this menu's id. */
function withPosters(menu: Menu): MenuWithPosters {
  return { ...menu, posters: getMenuPosters(menu.id) };
}

export default function Home() {
  const albums = getAlbums();
  const offer = getOffer();
  // First photo of the first album that actually has any — albums can exist
  // before their photos do.
  const heroImage = albums.find((album) => album.photos.length > 0)?.photos[0];

  return (
    <>
      <JsonLd data={faqSchema()} />
      <Hero image={heroImage} logo={getLogo()} />
      <About />
      <MenuSection
        id="services"
        eyebrow="Book"
        heading="Services"
        intro={serviceMenu.intro}
        tone="light"
        offer={offer}
        menus={[withPosters(serviceMenu)]}
      />
      <ClassesTeaser offer={offer} />
      <GalleryTeaser albums={albums} />
      {offer.live && <OpeningOffer images={getPromos()} offer={offer} />}
      <HowItWorks />
      <Faq />
      <Booking />
      <Contact />
    </>
  );
}
