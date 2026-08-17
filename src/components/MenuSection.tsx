"use client";

import { useState } from "react";
import {
  discountedPrice,
  formatPrice,
  site,
  type Menu,
  type MenuItem,
} from "@/config/site";
import type { Offer } from "@/lib/offer";
import MenuPoster from "./MenuPoster";
import OfferNote from "./OfferNote";
import { WhatsAppButton } from "./WhatsAppDialog";

export type MenuWithPosters = Menu & { posters: string[] };

type Selection = "all" | number;

function Price({ item, offer }: { item: MenuItem; offer: Offer }) {
  if (item.price === undefined) {
    return (
      <span className="text-sm font-semibold text-blush-700">
        Contact for pricing
      </span>
    );
  }

  const discounted = discountedPrice(item.price, offer.percent);

  if (discounted === null) {
    return (
      <span className="text-sm font-semibold text-blush-700">
        {formatPrice(item.price)}
      </span>
    );
  }

  return (
    <span className="flex flex-wrap items-baseline gap-x-2">
      <span className="text-base font-bold text-blush-700">
        {formatPrice(discounted)}
      </span>
      <s className="text-xs text-ink/40">{formatPrice(item.price)}</s>
    </span>
  );
}

function ItemCard({
  item,
  menuTitle,
  offer,
}: {
  item: MenuItem;
  menuTitle: string;
  offer: Offer;
}) {
  return (
    <li className="group flex flex-col rounded-2xl border border-blush-100 bg-white p-6 transition hover:border-blush-300 hover:shadow-lg hover:shadow-blush-100">
      <h4 className="font-serif text-xl text-blush-900">{item.name}</h4>
      {item.duration && (
        <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-blush-500">
          {item.duration}
        </p>
      )}
      {item.blurb && (
        <p className="mt-2 flex-1 text-sm leading-relaxed text-ink/65">
          {item.blurb}
        </p>
      )}
      <div className="mt-5 border-t border-blush-100 pt-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Price item={item} offer={offer} />
          <WhatsAppButton
            // Matches the enquiryOptions format so the dialog preselects it.
            subject={`${item.name}${item.duration ? ` — ${item.duration}` : ""} (${menuTitle})`}
            className="text-sm font-semibold text-blush-500 transition group-hover:text-blush-700"
          >
            Enquire →
          </WhatsAppButton>
        </div>
        {item.price !== undefined && (
          <OfferNote offer={offer} className="mt-2" />
        )}
      </div>
    </li>
  );
}

function MenuGroup({
  menu,
  showHeading,
  offer,
}: {
  menu: MenuWithPosters;
  showHeading: boolean;
  offer: Offer;
}) {
  return (
    <div>
      {showHeading && (
        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-blush-200 pb-3">
          <div>
            <h3 className="font-serif text-2xl text-blush-900">{menu.title}</h3>
            <p className="mt-1 max-w-xl text-sm text-ink/60">{menu.intro}</p>
          </div>
          <MenuPoster
            srcs={menu.posters}
            label={menu.title}
            className="btn-secondary shrink-0 !py-2 text-xs"
          />
        </div>
      )}

      <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {menu.items.map((item) => (
          <ItemCard
            key={`${item.name}-${item.duration ?? ""}`}
            item={item}
            menuTitle={menu.title}
            offer={offer}
          />
        ))}
      </ul>
    </div>
  );
}

/**
 * One menu renders as a plain grid. Several get an "All" tab (the default,
 * showing every menu under its own heading) plus a tab per menu to filter down.
 */
export default function MenuSection({
  id,
  eyebrow,
  heading,
  intro,
  menus,
  tone,
  offer,
  /** Off on /classes, where PageHeader already carries the title. */
  showHeading = true,
}: {
  id: string;
  eyebrow: string;
  heading: string;
  intro: string;
  menus: MenuWithPosters[];
  tone: "light" | "pink";
  offer: Offer;
  showHeading?: boolean;
}) {
  const [selection, setSelection] = useState<Selection>("all");

  if (menus.length === 0) return null;

  const tabbed = menus.length > 1;
  const shown =
    !tabbed || selection === "all"
      ? menus
      : menus[selection]
        ? [menus[selection]]
        : [];

  return (
    <section
      id={id}
      // Without its own heading a PageHeader sits directly above, so the full
      // section padding would leave a big empty band between the two.
      className={`${
        showHeading ? "section" : "scroll-mt-20 pb-20 pt-10 sm:pb-28 sm:pt-12"
      } ${tone === "pink" ? "bg-blush-50" : "bg-white"}`}
    >
      <div className="container-page">
        {showHeading ? (
          <div className="max-w-2xl">
            <p className="eyebrow">{eyebrow}</p>
            <h2 className="heading mt-3">{heading}</h2>
            <p className="mt-4 leading-relaxed text-ink/70">{intro}</p>
            {!tabbed && (
              <MenuPoster srcs={menus[0].posters} label={menus[0].title} />
            )}
          </div>
        ) : (
          !tabbed && (
            <MenuPoster srcs={menus[0].posters} label={menus[0].title} />
          )
        )}

        {tabbed && (
          <div className="mt-8 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setSelection("all")}
              aria-pressed={selection === "all"}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
                selection === "all"
                  ? "bg-blush-600 text-white"
                  : "border border-blush-200 bg-white text-blush-700 hover:border-blush-400"
              }`}
            >
              All
            </button>
            {menus.map((item, index) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelection(index)}
                aria-pressed={selection === index}
                className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
                  selection === index
                    ? "bg-blush-600 text-white"
                    : "border border-blush-200 bg-white text-blush-700 hover:border-blush-400"
                }`}
              >
                {item.title}
              </button>
            ))}
          </div>
        )}

        <div className={`${tabbed ? "mt-10 space-y-12" : "mt-8"}`}>
          {shown.map((menu) => (
            <MenuGroup
              key={menu.id}
              menu={menu}
              showHeading={tabbed}
              offer={offer}
            />
          ))}
        </div>

        {tabbed && offer.live && (
          <p className="mt-8 text-xs text-ink/50">
            Prices shown include the {offer.percent}% opening offer, running
            until {offer.endsOnLabel}. Original prices shown struck through.
          </p>
        )}
      </div>
    </section>
  );
}
