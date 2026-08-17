import Image from "next/image";
import Link from "next/link";
import type { Album } from "@/lib/gallery";

const PREVIEW_COUNT = 4;

/**
 * Home-page strip of the most recent few photos, linking through to /gallery.
 * Falls back to naming the albums while they're still empty, so the section
 * isn't a dead end before any photos exist.
 */
export default function GalleryTeaser({ albums }: { albums: Album[] }) {
  const photos = albums
    .flatMap((album) =>
      album.photos.map((photo) => ({ photo, title: album.title })),
    )
    .slice(0, PREVIEW_COUNT);

  if (albums.length === 0) return null;

  return (
    <section id="gallery-teaser" className="section bg-white">
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="eyebrow">Portfolio</p>
            <h2 className="heading mt-3">Our work</h2>
            <p className="mt-4 leading-relaxed text-ink/70">
              {photos.length > 0
                ? "A few recent looks from the studio."
                : "Albums are set up and the first photos are on their way."}
            </p>
          </div>
          <Link href="/gallery" className="btn-secondary">
            View the gallery →
          </Link>
        </div>

        {photos.length > 0 ? (
          <ul className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {photos.map(({ photo, title }) => (
              <li key={photo}>
                <Link
                  href="/gallery"
                  className="group relative block aspect-[3/4] overflow-hidden rounded-xl border border-blush-100 bg-blush-50"
                >
                  <Image
                    src={photo}
                    alt={title}
                    fill
                    sizes="(max-width: 640px) 50vw, 25vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <ul className="mt-10 flex flex-wrap gap-3">
            {albums.map((album) => (
              <li
                key={album.slug}
                className="rounded-full border border-blush-200 bg-blush-50 px-5 py-2 text-sm font-semibold text-blush-700"
              >
                {album.title}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
