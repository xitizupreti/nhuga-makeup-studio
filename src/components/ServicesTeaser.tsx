import Link from "next/link";
import {
  cheapestServicePrice,
  discountedPrice,
  formatPrice,
  serviceMenus,
} from "@/config/site";
import type { Offer } from "@/lib/offer";
import DaysLeft from "./DaysLeft";
import HScroller from "./HScroller";
import OfferNote from "./OfferNote";

/**
 * Home-page taster only — the full price lists live on /services. One card per
 * service category, swipeable, so the home page doesn't carry all 19 items.
 */
export default function ServicesTeaser({ offer }: { offer: Offer }) {
  const from =
    discountedPrice(cheapestServicePrice, offer.percent) ?? cheapestServicePrice;

  return (
    <section id="services" className="section bg-white">
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="eyebrow">Book</p>
            <h2 className="heading mt-3">Services</h2>
            <p className="mt-4 leading-relaxed text-ink/70">
              Bridal, party and groom makeup, plus nails, lashes and everyday
              beauty treatments. From{" "}
              <strong className="text-blush-700">{formatPrice(from)}</strong>
              {offer.live && (
                <>
                  {" "}
                  with the {offer.percent}% opening offer, which ends{" "}
                  {offer.endsOnLabel} —{" "}
                  <strong className="text-blush-700">
                    <DaysLeft initial={offer.daysLeft} />
                  </strong>
                </>
              )}
              .
            </p>
          </div>
          <Link href="/services" className="btn-primary">
            See all services & prices →
          </Link>
        </div>

        <div className="mt-10">
          <HScroller label="Services">
            {serviceMenus.map((menu) => {
              const prices = menu.items
                .map((item) => item.price)
                .filter((price): price is number => price !== undefined);
              const lowest = prices.length ? Math.min(...prices) : undefined;
              const discounted =
                lowest !== undefined
                  ? discountedPrice(lowest, offer.percent)
                  : null;

              return (
                <li
                  key={menu.id}
                  className="w-[78%] shrink-0 snap-start sm:w-[45%] lg:w-[31%]"
                >
                  <Link
                    href="/services"
                    className="flex h-full flex-col rounded-2xl border border-blush-100 bg-white p-6 transition hover:border-blush-300 hover:shadow-lg hover:shadow-blush-100"
                  >
                    <h3 className="font-serif text-xl text-blush-900">
                      {menu.title}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-ink/65">
                      {menu.intro}
                    </p>
                    <div className="mt-5 border-t border-blush-100 pt-4">
                      <div className="flex items-baseline justify-between gap-3 text-sm">
                        <span className="text-ink/50">
                          {menu.items.length} services
                        </span>
                        {lowest !== undefined && (
                          <span className="flex flex-wrap items-baseline gap-x-2">
                            <span className="font-semibold text-blush-700">
                              from {formatPrice(discounted ?? lowest)}
                            </span>
                            {discounted !== null && (
                              <s className="text-xs text-ink/40">
                                {formatPrice(lowest)}
                              </s>
                            )}
                          </span>
                        )}
                      </div>
                      <OfferNote offer={offer} className="mt-2" />
                    </div>
                  </Link>
                </li>
              );
            })}
          </HScroller>
        </div>
      </div>
    </section>
  );
}
