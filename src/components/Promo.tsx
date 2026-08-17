"use client";

import { useState } from "react";
import { site } from "@/config/site";
import Lightbox from "./Lightbox";

/**
 * Slim bar above the header announcing the opening and the offer. When artwork
 * exists in public/promo, the bar also offers to show it full screen.
 */
export default function Promo({ images }: { images: string[] }) {
  const [index, setIndex] = useState<number | null>(null);

  return (
    <>
      <div className="bg-blush-700 text-white">
        <div className="container-page flex flex-wrap items-center justify-center gap-x-3 gap-y-1 py-2.5 text-center text-sm">
          <span className="font-semibold uppercase tracking-wider">
            {site.promo.headline}
          </span>
          {/* Separators hidden on phones, where the bar wraps and a dot would
              be left dangling at the end of a line. */}
          <span aria-hidden className="hidden text-white/40 sm:inline">
            •
          </span>
          <span className="text-white/90">{site.promo.date}</span>
          <span aria-hidden className="hidden text-white/40 sm:inline">
            •
          </span>
          <span className="font-semibold text-white">{site.promo.offer}</span>
          {images.length > 0 && (
            <button
              type="button"
              onClick={() => setIndex(0)}
              className="ml-1 rounded-full bg-white/15 px-3 py-0.5 text-xs font-semibold underline decoration-white/40 underline-offset-2 transition hover:bg-white/25"
            >
              See offer
            </button>
          )}
        </div>
      </div>

      {index !== null && (
        <Lightbox
          images={images}
          index={index}
          onIndexChange={setIndex}
          onClose={() => setIndex(null)}
          label={`${site.promo.headline} ${site.promo.date} — ${site.promo.offer}`}
        />
      )}
    </>
  );
}
