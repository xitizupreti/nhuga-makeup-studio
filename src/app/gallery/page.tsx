import type { Metadata } from "next";
import Gallery from "@/components/Gallery";
import PageHeader from "@/components/PageHeader";
import { getAlbums } from "@/lib/gallery";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Bridal, party and nail work from Nhuga Makeup Studio, Kalimati Chowk, Kathmandu.",
};

export default function GalleryPage() {
  const albums = getAlbums();

  return (
    <>
      <PageHeader
        eyebrow="Portfolio"
        title="Gallery"
        intro="Work from the studio, grouped by album."
      />
      <Gallery albums={albums} showHeading={false} />
    </>
  );
}
