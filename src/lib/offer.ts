import { site } from "@/config/site";

export type Offer = {
  /** True while the discount should be applied. */
  live: boolean;
  /** Discount to apply, or null when the offer isn't running. */
  percent: number | null;
  /** Human-readable last day, e.g. "6 Dec 2026". */
  endsOnLabel: string;
  /** Whole days from now until the end of the last day. 0 once it's over. */
  daysLeft: number;
};

/** Nepal is UTC+05:45; the offer ends at the close of its last day there. */
const NEPAL_OFFSET = "+05:45";

function endOfOffer() {
  return new Date(`${site.promo.endsOn}T23:59:59${NEPAL_OFFSET}`);
}

/**
 * Whole days remaining in the offer, counted from `now` to the end of the last
 * day. Shared by the server and the client so both agree on the arithmetic.
 */
export function daysLeftInOffer(now: Date = new Date()) {
  const remaining = endOfOffer().getTime() - now.getTime();
  if (remaining <= 0) return 0;
  return Math.ceil(remaining / 86_400_000);
}

/**
 * Current offer state.
 *
 * Call this per-request/render rather than caching it at module scope, so the
 * discount really does lapse after `endsOn`. The pages that use it set
 * `revalidate` so their static HTML is regenerated rather than frozen at build
 * time — otherwise an expired offer would keep showing half price.
 */
export function getOffer(now: Date = new Date()): Offer {
  const daysLeft = daysLeftInOffer(now);
  const live = site.promo.active && daysLeft > 0;

  return {
    live,
    percent: live ? site.promo.discountPercent : null,
    endsOnLabel: site.promo.endsOnLabel,
    daysLeft,
  };
}
