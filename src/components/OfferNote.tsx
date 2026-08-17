import type { Offer } from "@/lib/offer";
import DaysLeft from "./DaysLeft";

/**
 * The quiet one-liner that sits under a price: "50% off · ends 6 Dec 2026 ·
 * 111 days left". Renders nothing once the offer has lapsed, so cards fall back
 * to plain full prices on their own.
 */
export default function OfferNote({
  offer,
  className = "",
}: {
  offer: Offer;
  className?: string;
}) {
  if (!offer.live) return null;

  return (
    <p className={`text-[0.7rem] leading-relaxed text-ink/45 ${className}`}>
      {offer.percent}% off
      <span aria-hidden className="mx-1 text-blush-300">
        ·
      </span>
      ends {offer.endsOnLabel}
      <span aria-hidden className="mx-1 text-blush-300">
        ·
      </span>
      <span className="font-semibold text-blush-600">
        <DaysLeft initial={offer.daysLeft} />
      </span>
    </p>
  );
}
