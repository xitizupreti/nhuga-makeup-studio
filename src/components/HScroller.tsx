"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Horizontal snap-scrolling row with arrows on wider screens. Children should
 * be `<li>` elements carrying their own widths — a partial next item is the
 * affordance that there's more to scroll.
 */
export default function HScroller({
  children,
  label,
}: {
  children: React.ReactNode;
  /** Describes the row for screen readers, e.g. "Services". */
  label: string;
}) {
  const ref = useRef<HTMLUListElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const sync = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 4);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    const el = ref.current;
    sync();
    el?.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    return () => {
      el?.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, [sync]);

  function nudge(direction: 1 | -1) {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({ left: direction * el.clientWidth * 0.8, behavior: "smooth" });
  }

  return (
    <div className="relative">
      <ul
        ref={ref}
        aria-label={label}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-3 sm:gap-5"
      >
        {children}
      </ul>

      {[-1, 1].map((direction) => {
        const disabled = direction === -1 ? atStart : atEnd;
        return (
          <button
            key={direction}
            type="button"
            onClick={() => nudge(direction as 1 | -1)}
            disabled={disabled}
            aria-label={
              direction === -1 ? `Scroll ${label} left` : `Scroll ${label} right`
            }
            className={`absolute top-1/2 hidden -translate-y-1/2 rounded-full border border-blush-200 bg-white/95 p-2.5 text-blush-700 shadow-md transition hover:border-blush-400 disabled:pointer-events-none disabled:opacity-0 sm:flex ${
              direction === -1 ? "left-1" : "right-1"
            }`}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d={direction === -1 ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"} />
            </svg>
          </button>
        );
      })}
    </div>
  );
}
