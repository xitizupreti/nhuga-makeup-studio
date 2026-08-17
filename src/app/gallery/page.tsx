import type { Metadata } from "next";
import Gallery from "@/components/Gallery";
import PageHeader from "@/components/PageHeader";
import JsonLd from "@/components/JsonLd";
import { getAlbums } from "@/lib/gallery";
import { breadcrumbSchema } from "@/lib/schema";

const description =
  "Bridal, party and nail work from Nhuga Makeup Studio, Kalimati Chowk, Kathmandu.";

export const metadata: Metadata = {
  title: "Gallery",
  description,
  alternates: { canonical: "/gallery" },
  openGraph: { title: "Gallery", description, url: "/gallery" },
};

export default function GalleryPage() {
  const albums = getAlbums();

  return (
    <>
      <JsonLd data={breadcrumbSchema("Gallery", "/gallery")} />
      <PageHeader
        eyebrow="Portfolio"
        title="Gallery"
        intro="Work from the studio, grouped by album."
      />
      <Gallery albums={albums} showHeading={false} />
    </>
  );
}
