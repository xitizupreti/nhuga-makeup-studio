import Link from "next/link";
import {
  cheapestClassPrice,
  classMenus,
  discountedPrice,
  formatPrice,
  site,
} from "@/config/site";

/**
 * Home-page taster only — the full price lists live on /classes. Shows each
 * class track with its course count and the cheapest entry price.
 */
export default function ClassesTeaser() {
  const from = discountedPrice(cheapestClassPrice) ?? cheapestClassPrice;

  return (
    <section id="classes-teaser" className="section bg-blush-50">
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="eyebrow">Learn</p>
            <h2 className="heading mt-3">Classes</h2>
            <p className="mt-4 leading-relaxed text-ink/70">
              Train with us in makeup, nails and lash work — on their own or as a
              combined package. Courses start from{" "}
              <strong className="text-blush-700">{formatPrice(from)}</strong>{" "}
              with the opening offer.
            </p>
          </div>
          <Link href="/classes" className="btn-primary">
            See all classes & prices →
          </Link>
        </div>

        <ul className="mt-10 grid gap-5 sm:grid-cols-3">
          {classMenus.map((menu) => {
            const prices = menu.items
              .map((item) => item.price)
              .filter((price): price is number => price !== undefined);
            const lowest = prices.length ? Math.min(...prices) : undefined;
            const offer = lowest ? discountedPrice(lowest) : null;

            return (
              <li key={menu.id}>
                <Link
                  href="/classes"
                  className="flex h-full flex-col rounded-2xl border border-blush-100 bg-white p-6 transition hover:border-blush-300 hover:shadow-lg hover:shadow-blush-100"
                >
                  <h3 className="font-serif text-xl text-blush-900">
                    {menu.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-ink/65">
                    {menu.intro}
                  </p>
                  <div className="mt-5 flex items-center justify-between border-t border-blush-100 pt-4 text-sm">
                    <span className="text-ink/50">
                      {menu.items.length} courses
                    </span>
                    {lowest !== undefined && (
                      <span className="font-semibold text-blush-700">
                        from {formatPrice(offer ?? lowest)}
                      </span>
                    )}
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>

        {site.promo.active && (
          <p className="mt-6 text-xs text-ink/50">
            Prices shown include the {site.promo.discountPercent}% opening offer
            ({site.promo.offer}).
          </p>
        )}
      </div>
    </section>
  );
}
