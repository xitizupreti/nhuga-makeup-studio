"use client";

import { useCallback, useEffect } from "react";
import Image from "next/image";

/**
 * Full-screen image viewer shared by the gallery, the menu posters and the
 * opening-offer bar. Handles Escape/arrow keys, scroll locking and the
 * backdrop click; the parent owns which image is showing.
 */
export default function Lightbox({
  images,
  index,
  onIndexChange,
  onClose,
  label,
  caption,
  fit = "contain",
}: {
  images: string[];
  index: number;
  onIndexChange: (index: number) => void;
  onClose: () => void;
  /** Used for the dialog label and image alt text. */
  label: string;
  /** Defaults to "n / total" when there's more than one image. */
  caption?: string;
  fit?: "contain" | "cover";
}) {
  const step = useCallback(
    (delta: number) =>
      onIndexChange((index + delta + images.length) % images.length),
    [index, images.length, onIndexChange],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };

    document.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose, step]);

  const src = images[index];
  if (!src) return null;

  const many = images.length > 1;
  const line = caption ?? (many ? `${index + 1} / ${images.length}` : undefined);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={label}
      onClick={onClose}
      className="fixed inset-0 z-[70] flex cursor-pointer items-center justify-center bg-blush-900/90 p-4 backdrop-blur-sm"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute right-5 top-5 rounded-full bg-white/15 p-2.5 text-white hover:bg-white/25"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>

      {many && (
        <>
          <button
            type="button"
            aria-label="Previous"
            onClick={(e) => {
              e.stopPropagation();
              step(-1);
            }}
            className="absolute left-4 rounded-full bg-white/15 p-3 text-white hover:bg-white/25"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 5l-7 7 7 7" />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Next"
            onClick={(e) => {
              e.stopPropagation();
              step(1);
            }}
            className="absolute right-4 rounded-full bg-white/15 p-3 text-white hover:bg-white/25"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      <div
        className="relative h-[85vh] w-full max-w-3xl cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={src}
          alt={many ? `${label} ${index + 1}` : label}
          fill
          sizes="100vw"
          className={fit === "cover" ? "object-cover" : "object-contain"}
        />
      </div>

      {line && (
        <p className="absolute bottom-5 text-sm text-white/70">{line}</p>
      )}
    </div>
  );
}
