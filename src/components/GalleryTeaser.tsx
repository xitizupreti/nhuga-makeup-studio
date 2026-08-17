"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Album } from "@/lib/gallery";
import HScroller from "./HScroller";
import Lightbox from "./Lightbox";

/** Plenty to swipe through without making the home page heavy. */
const PREVIEW_COUNT = 12;

/**
 * Home-page strip of recent photos. Tapping one opens it full screen rather
 * than jumping to /gallery — the "View the gallery" button is there for people
 * who want the full set. Falls back to naming the albums while they're still
 * empty, so the section isn't a dead end before any photos exist.
 */
export default function GalleryTeaser({ albums }: { albums: Album[] }) {
  const [lightbox, setLightbox] = useState<number | null>(null);

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
          <div className="mt-10">
            <HScroller label="Gallery">
              {photos.map(({ photo, title }, index) => (
                <li
                  key={photo}
                  className="w-[62%] shrink-0 snap-start sm:w-[38%] lg:w-[23%]"
                >
                  <button
                    type="button"
                    onClick={() => setLightbox(index)}
                    className="group relative block aspect-[3/4] w-full overflow-hidden rounded-xl border border-blush-100 bg-blush-50"
                  >
                    <Image
                      src={photo}
                      alt={title}
                      fill
                      sizes="(max-width: 640px) 62vw, (max-width: 1024px) 38vw, 23vw"
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                    {/* Gradient keeps the album name readable over any photo. */}
                    <span className="pointer-events-none absolute inset-x-0 bottom-0 block bg-gradient-to-t from-blush-900/75 via-blush-900/30 to-transparent px-3 pb-2.5 pt-10 text-left text-xs font-medium tracking-wide text-white/90">
                      {title}
                    </span>
                  </button>
                </li>
              ))}
            </HScroller>
          </div>
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

      {lightbox !== null && photos[lightbox] && (
        <Lightbox
          images={photos.map((entry) => entry.photo)}
          index={lightbox}
          onIndexChange={setLightbox}
          onClose={() => setLightbox(null)}
          label={photos[lightbox].title}
          // Recomputed each render, so the album name follows the arrows.
          caption={`${photos[lightbox].title} · ${lightbox + 1} / ${photos.length}`}
        />
      )}
    </section>
  );
}
