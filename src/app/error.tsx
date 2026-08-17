"use client";

import { useEffect } from "react";
import Link from "next/link";
import { site } from "@/config/site";

/**
 * Catches runtime errors inside the page tree. The header and footer still
 * render, because this replaces the page rather than the whole layout.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Shows up in the Vercel runtime logs.
    console.error("Page error:", error);
  }, [error]);

  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-blush-100 to-cream" />

      <div className="container-page flex min-h-[60vh] flex-col items-center justify-center py-20 text-center sm:py-28">
        <p className="eyebrow">Something went wrong</p>
        <h1 className="heading mt-4">This page didn&apos;t load</h1>
        <p className="mt-4 max-w-md leading-relaxed text-ink/70">
          Sorry — that&apos;s on us, not you. Try again, and if it keeps
          happening please get in touch and we&apos;ll sort your booking out
          directly.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button type="button" onClick={reset} className="btn-primary">
            Try again
          </button>
          <Link href="/" className="btn-secondary">
            Back to home
          </Link>
        </div>

        <p className="mt-10 text-xs text-ink/50">
          Call{" "}
          <a href={`tel:+${site.phone}`} className="font-semibold text-blush-600">
            {site.phoneDisplay}
          </a>{" "}
          or email{" "}
          <a
            href={`mailto:${site.email}`}
            className="font-semibold text-blush-600"
          >
            {site.email}
          </a>
        </p>

        {error.digest && (
          <p className="mt-4 text-[0.7rem] text-ink/35">
            Reference: {error.digest}
          </p>
        )}
      </div>
    </section>
  );
}
