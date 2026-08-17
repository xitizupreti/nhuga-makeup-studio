import Image from "next/image";
import Link from "next/link";
import { site } from "@/config/site";
import type { Offer } from "@/lib/offer";
import DaysLeft from "./DaysLeft";
import { WhatsAppButton } from "./WhatsAppDialog";

/**
 * The studio hasn't opened yet, so this is the page's main hook. Shows the
 * opening artwork when it exists in public/promo, otherwise stands on the text.
 */
export default function OpeningOffer({
  images,
  offer,
}: {
  images: string[];
  offer: Offer;
}) {
  return (
    <section id="opening" className="section bg-blush-700 text-white">
      <div className="container-page grid items-center gap-12 lg:grid-cols-2">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/70">
            {site.promo.headline}
          </p>
          <h2 className="mt-4 font-serif text-3xl leading-tight sm:text-4xl md:text-5xl">
            {site.promo.offer}
          </h2>
          <p className="mt-5 text-lg text-white/85">
            We open on{" "}
            <strong className="font-semibold text-white">
              {site.promo.date}
            </strong>{" "}
            at {site.address.line2}.
          </p>
          <p className="mt-4 max-w-md leading-relaxed text-white/75">
            Every service and course is half price for the first three months.
            Enquire now and we&apos;ll hold a date for you.
          </p>

          {offer.live && (
            <div className="mt-6 inline-flex flex-wrap items-center gap-x-3 gap-y-1 rounded-2xl bg-white/10 px-5 py-3 text-sm">
              <span className="font-serif text-2xl font-semibold text-white">
                <DaysLeft initial={offer.daysLeft} />
              </span>
              <span className="text-white/70">
                offer ends {offer.endsOnLabel}
              </span>
            </div>
          )}

          <div className="mt-8 flex flex-wrap gap-3">
            <WhatsAppButton className="btn bg-white text-blush-800 hover:bg-blush-50">
              Enquire about the offer
            </WhatsAppButton>
            <Link
              href="/classes"
              className="btn border border-white/40 text-white hover:bg-white/10"
            >
              See class prices
            </Link>
          </div>
        </div>

        {images.length > 0 && (
          <ul className="grid grid-cols-2 gap-4">
            {images.slice(0, 2).map((image, index) => (
              <li
                key={image}
                className="relative aspect-[2/3] overflow-hidden rounded-2xl border border-white/20 bg-white/10"
              >
                <Image
                  src={image}
                  alt={
                    index === 0
                      ? `${site.promo.headline} — ${site.promo.offer}`
                      : "Grand opening invitation"
                  }
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover"
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
