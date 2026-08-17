"use client";

import { useState } from "react";
import Image from "next/image";
import type { Album } from "@/lib/gallery";
import Lightbox from "./Lightbox";

type Selection = "all" | number;

/** Which album a lightbox photo belongs to, so arrows stay within that album. */
type LightboxTarget = { album: number; photo: number };

function AlbumGroup({
  album,
  showHeading,
  onOpen,
}: {
  album: Album;
  showHeading: boolean;
  onOpen: (photoIndex: number) => void;
}) {
  return (
    <div>
      {showHeading && (
        <div className="flex items-baseline justify-between gap-4 border-b border-blush-200 pb-3">
          <h3 className="font-serif text-2xl text-blush-900">{album.title}</h3>
          {album.photos.length > 0 && (
            <span className="shrink-0 text-xs uppercase tracking-wider text-ink/50">
              {album.photos.length}{" "}
              {album.photos.length === 1 ? "photo" : "photos"}
            </span>
          )}
        </div>
      )}

      {album.photos.length === 0 ? (
        <div className="mt-4 rounded-2xl border border-dashed border-blush-300 bg-blush-50/70 p-8 text-center">
          <p className="text-sm text-ink/60">Photos coming soon.</p>
        </div>
      ) : (
        <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {album.photos.map((photo, index) => (
            <li key={photo}>
              <button
                type="button"
                onClick={() => onOpen(index)}
                className="group relative block aspect-[3/4] w-full overflow-hidden rounded-xl border border-blush-100 bg-blush-50"
              >
                <Image
                  src={photo}
                  alt={`${album.title} ${index + 1}`}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
                <span className="absolute inset-0 bg-blush-900/0 transition group-hover:bg-blush-900/15" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function Gallery({
  albums,
  /** Off on /gallery, where PageHeader already carries the title. */
  showHeading = true,
}: {
  albums: Album[];
  showHeading?: boolean;
}) {
  const [selection, setSelection] = useState<Selection>("all");
  const [lightbox, setLightbox] = useState<LightboxTarget | null>(null);

  const shown =
    selection === "all"
      ? albums.map((album, index) => ({ album, index }))
      : albums[selection]
        ? [{ album: albums[selection], index: selection }]
        : [];

  const openAlbum = lightbox ? albums[lightbox.album] : null;

  return (
    <section
      id="gallery"
      // Without its own heading a PageHeader sits directly above, so the full
      // section padding would leave a big empty band between the two.
      className={`bg-white ${
        showHeading ? "section" : "scroll-mt-20 pb-20 pt-10 sm:pb-28 sm:pt-12"
      }`}
    >
      <div className="container-page">
        {showHeading && (
          <div className="max-w-2xl">
            <p className="eyebrow">Portfolio</p>
            <h2 className="heading mt-3">Gallery</h2>
            <p className="mt-4 leading-relaxed text-ink/70">
              Recent work from the studio, grouped by album.
            </p>
          </div>
        )}

        {albums.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-dashed border-blush-300 bg-blush-50/70 p-10 text-center">
            <p className="font-serif text-xl text-blush-800">
              No photos added yet
            </p>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-ink/60">
              Create a folder inside <code>public/gallery/</code> — for example{" "}
              <code>public/gallery/Bridal Looks/</code> — and drop the photos in.
              The folder name becomes the album name here automatically.
            </p>
          </div>
        ) : (
          <>
            {albums.length > 1 && (
              <div className="mt-8 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setSelection("all")}
                  aria-pressed={selection === "all"}
                  className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
                    selection === "all"
                      ? "bg-blush-600 text-white"
                      : "border border-blush-200 text-blush-700 hover:border-blush-400"
                  }`}
                >
                  All
                </button>
                {albums.map((item, index) => (
                  <button
                    key={item.slug}
                    type="button"
                    onClick={() => setSelection(index)}
                    aria-pressed={selection === index}
                    className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
                      selection === index
                        ? "bg-blush-600 text-white"
                        : "border border-blush-200 text-blush-700 hover:border-blush-400"
                    }`}
                  >
                    {item.title}
                    {item.photos.length > 0 && (
                      <span className="ml-2 text-xs opacity-60">
                        {item.photos.length}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            )}

            <div className="mt-10 space-y-12">
              {shown.map(({ album, index }) => (
                <AlbumGroup
                  key={album.slug}
                  album={album}
                  showHeading={albums.length > 1}
                  onOpen={(photo) => setLightbox({ album: index, photo })}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {lightbox && openAlbum && (
        <Lightbox
          images={openAlbum.photos}
          index={lightbox.photo}
          onIndexChange={(photo) => setLightbox({ ...lightbox, photo })}
          onClose={() => setLightbox(null)}
          label={openAlbum.title}
          caption={`${openAlbum.title} · ${lightbox.photo + 1} / ${openAlbum.photos.length}`}
        />
      )}
    </section>
  );
}
