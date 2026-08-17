"use client";

import { useState } from "react";
import Lightbox from "./Lightbox";

/**
 * "View the … menu" button that opens the studio's own menu posters full
 * screen. The text cards stay the primary content — these are the branded
 * version of the same information.
 */
export default function MenuPoster({
  srcs,
  label,
  className = "btn-secondary mt-6",
}: {
  srcs: string[];
  label: string;
  /** Lets the caller control spacing when the button sits in a flex row. */
  className?: string;
}) {
  const [index, setIndex] = useState<number | null>(null);

  if (srcs.length === 0) return null;

  return (
    <>
      <button type="button" onClick={() => setIndex(0)} className={className}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M3 15l5-5 4 4 3-3 6 6" />
        </svg>
        View the {label.toLowerCase()} menu
        {srcs.length > 1 && (
          <span className="text-xs opacity-60">({srcs.length})</span>
        )}
      </button>

      {index !== null && (
        <Lightbox
          images={srcs}
          index={index}
          onIndexChange={setIndex}
          onClose={() => setIndex(null)}
          label={`${label} menu`}
        />
      )}
    </>
  );
}
