"use client";

import { useEffect, useState } from "react";
import { daysLeftInOffer } from "@/lib/offer";

/**
 * "111 days left".
 *
 * Seeded with the server's figure so the first render matches the prerendered
 * HTML (no hydration mismatch), then recalculated on mount — and again whenever
 * the tab regains focus, so a tab left open overnight doesn't show yesterday's
 * count.
 */
export default function DaysLeft({ initial }: { initial: number }) {
  const [days, setDays] = useState(initial);

  useEffect(() => {
    const recount = () => setDays(daysLeftInOffer());
    recount();
    window.addEventListener("focus", recount);
    return () => window.removeEventListener("focus", recount);
  }, []);

  if (days <= 0) return null;

  return (
    <>
      {days} {days === 1 ? "day" : "days"} left
    </>
  );
}
