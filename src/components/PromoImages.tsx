"use client";

import { useState } from "react";
import Image from "next/image";
import { site } from "@/config/site";
import Lightbox from "./Lightbox";

/**
 * Labels are derived from the filename, not the position in the list. Ordering
 * comes from the number prefix, so a positional array silently mislabels every
 * image the moment files are renamed or a third one is added.
 */
function labelFor(src: string) {
  return /invitation/i.test(src)
    ? "Grand opening invitation"
    : `${site.promo.headline} — ${site.promo.offer}`;
}

/**
 * The opening poster and invitation in the offer band. They carry the date,
 * the offer and the address in small print, so they have to be openable —
 * at thumbnail size none of that is readable.
 */
export default function PromoImages({ images }: { images: string[] }) {
  const [lightbox, setLightbox] = useState<number | null>(null);

  if (images.length === 0) return null;

  const shown = images.slice(0, 2);

  return (
    <>
      <ul className="grid grid-cols-2 gap-4">
        {shown.map((image, index) => (
          <li key={image}>
            <button
              type="button"
              onClick={() => setLightbox(index)}
              aria-label={`View ${labelFor(image)} full screen`}
              className="group relative block aspect-[2/3] w-full overflow-hidden rounded-2xl border border-white/20 bg-white/10"
            >
              <Image
                src={image}
                alt={labelFor(image)}
                fill
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="object-cover transition duration-500 group-hover:scale-105"
              />
              <span
                aria-hidden
                className="absolute inset-0 flex items-end justify-center bg-blush-900/0 pb-4 text-xs font-semibold text-white/0 transition group-hover:bg-blush-900/30 group-hover:text-white"
              >
                Tap to view
              </span>
            </button>
          </li>
        ))}
      </ul>

      {lightbox !== null && (
        <Lightbox
          images={shown}
          index={lightbox}
          onIndexChange={setLightbox}
          onClose={() => setLightbox(null)}
          label={labelFor(shown[lightbox])}
          caption={`${labelFor(shown[lightbox])} · ${lightbox + 1} / ${shown.length}`}
        />
      )}
    </>
  );
}
