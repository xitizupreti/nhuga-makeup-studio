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
import { serviceMenu, site, type Menu } from "@/config/site";

/** Attaches whatever posters exist in public/menu for this menu's id. */
function withPosters(menu: Menu): MenuWithPosters {
  return { ...menu, posters: getMenuPosters(menu.id) };
}

export default function Home() {
  const albums = getAlbums();
  // First photo of the first album that actually has any — albums can exist
  // before their photos do.
  const heroImage = albums.find((album) => album.photos.length > 0)?.photos[0];

  return (
    <>
      <Hero image={heroImage} logo={getLogo()} />
      <About />
      <MenuSection
        id="services"
        eyebrow="Book"
        heading="Services"
        intro={serviceMenu.intro}
        tone="light"
        menus={[withPosters(serviceMenu)]}
      />
      <ClassesTeaser />
      <GalleryTeaser albums={albums} />
      {site.promo.active && <OpeningOffer images={getPromos()} />}
      <HowItWorks />
      <Faq />
      <Booking />
      <Contact />
    </>
  );
}
