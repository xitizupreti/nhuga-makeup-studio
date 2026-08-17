"use client";

import { useEffect, useState } from "react";

/**
 * Appears once you're well down the page. Sits below the enquiry dialog and the
 * lightbox in the stacking order so it can never cover them.
 */
export default function ScrollToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      title="Back to top"
      className={`fixed bottom-5 right-5 z-40 rounded-full border border-blush-200 bg-white/95 p-3 text-blush-700 shadow-lg shadow-blush-200/50 backdrop-blur transition hover:border-blush-400 hover:text-blush-900 ${
        show
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M12 19V5M5 12l7-7 7 7" />
      </svg>
    </button>
  );
}
