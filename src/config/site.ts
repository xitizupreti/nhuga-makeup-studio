/**
 * Single source of truth for every real-world detail on the site.
 *
 * Contact details, class names and prices are transcribed from the studio's own
 * posters. Only the FAQ answers marked TODO are still unconfirmed.
 */

/**
 * Public base URL, used for canonical links, the sitemap and link previews.
 * Override with NEXT_PUBLIC_SITE_URL when the custom domain is ready — nothing
 * else needs to change.
 */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://nhuga-makeup-studio.vercel.app"
).replace(/\/$/, "");

export const site = {
  name: "Nhuga Makeup Studio",
  tagline: "From passion to profession",
  description:
    "Nhuga Makeup Studio in Kalimati, Kathmandu — bridal, party and occasion makeup, plus professional makeup, nails and lash extension classes. Opening Bhadra 21 (6 September 2026) with 50% off for 3 months.",

  /** International format, no "+". Drives the WhatsApp deep link. */
  phone: "9779862413094",
  phoneDisplay: "+977 9862413094",

  /** Listed alongside the first number, but not used for WhatsApp. */
  phoneAlt: "9779828859165",
  phoneAltDisplay: "+977 9828859165",

  email: "oshikamanandhar1027@gmail.com",

  address: {
    line1: "Prime Bank Building, 3rd Floor",
    line2: "Kalimati Chowk, Kathmandu",
  },

  maps: {
    /** The studio's own Google Maps listing. */
    placeUrl:
      "https://www.google.com/maps/place/Nhuga+Makeup+Studio/@27.698002,85.2995638,959m/data=!3m1!1e3!4m6!3m5!1s0x39eb19002fa95d29:0x2260b85917cdb2bf!8m2!3d27.698002!4d85.2995638!16s%2Fg%2F11zdz6ht2j",
    /**
     * Embed for the listing itself, so the pin carries the studio's name rather
     * than being a bare coordinate marker.
     *
     * `!5e0` near the end selects the standard road map — `!5e1` would switch
     * it back to satellite.
     */
    embedUrl:
      "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d4176.592366940473!2d85.2995638!3d27.698002!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19002fa95d29%3A0x2260b85917cdb2bf!2sNhuga%20Makeup%20Studio!5e0!3m2!1sen!2snp!4v1786991921607!5m2!1sen!2snp",
    lat: 27.698002,
    lng: 85.2995638,
  },

  hours: [
    { days: "Sunday – Friday", time: "10:00 AM – 7:00 PM" },
    { days: "Saturday", time: "By appointment" },
  ],

  /** Machine-readable version of `hours`, for search engines. Keep in sync. */
  hoursSpec: [
    {
      days: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
      ],
      opens: "10:00",
      closes: "19:00",
    },
  ],

  socials: {
    instagram: "https://www.instagram.com/nhugamakeupstudio/",
  },

  credit: {
    name: "Kshitiz Upreti",
    url: "https://kshitizupreti.com.np",
    instagram: "https://www.instagram.com/kshitizupreti/",
    whatsapp: "https://wa.me/9779869547209",
  },

  /**
   * Opening announcement and the opening discount.
   *
   * `discountPercent` drives the struck-through prices everywhere. The discount
   * expires on its own after `endsOn` — see src/lib/offer.ts — so nobody has to
   * remember to switch it off. `active: false` kills it early.
   */
  promo: {
    active: true,
    headline: "Opening soon",
    date: "Bhadra 21 · 6 Sep 2026",
    offer: "50% off for 3 months",
    discountPercent: 50,
    /** Opening day. ISO, Nepal time. */
    opensOn: "2026-09-06",
    /** Last day of the 3-month offer, inclusive. */
    endsOn: "2026-12-06",
    endsOnLabel: "6 Dec 2026",
  },
} as const;

export type MenuItem = {
  name: string;
  /** Course length, as printed on the poster. */
  duration?: string;
  /** NPR, full price before any opening discount. Omit to show "Contact for pricing". */
  price?: number;
  blurb?: string;
};

export type Menu = {
  /** Also the poster filename: public/menu/<id>.jpg — see public/menu/README.md */
  id: string;
  title: string;
  intro: string;
  items: MenuItem[];
};

/** Section-level intro for Services, above the tabs. */
export const servicesIntro =
  "Bridal, party and groom makeup, plus nails, lashes and everyday beauty treatments \u2014 in the studio, or at your venue when booked in advance.";

/** Printed on the studio's own service posters. */
export const servicePolicies = [
  {
    title: "Home service",
    body: "Available on booking. A 25% charge is added on top of the listed price.",
  },
  {
    title: "Payment",
    body: "50% in advance at the time of booking, and the remaining 50% after the service.",
  },
];

/** Transcribed from the studio's four service price lists. */
export const serviceMenus: Menu[] = [
  {
    id: "services-bridal",
    title: "Bridal & Party",
    intro: "Makeup and hairstyle with sari draping, unless noted otherwise.",
    items: [
      { name: "Bridal Makeup", price: 15000, blurb: "Makeup & hairstyle with sari draping." },
      { name: "Reception Bride", price: 13000, blurb: "Makeup & hairstyle with sari draping." },
      { name: "Engagement Bride", price: 10000, blurb: "Makeup & hairstyle with sari draping." },
      { name: "Mehendi Bride", price: 10000, blurb: "Makeup & hairstyle with sari draping." },
      { name: "Groom Makeup", price: 3000, blurb: "Makeup & hair styling." },
      { name: "Normal Party Makeup", price: 3000, blurb: "Makeup & hairstyle with sari draping." },
    ],
  },
  {
    id: "services-nails",
    title: "Nail Extensions",
    intro: "Extensions and overlays, finished with the nail art you choose.",
    items: [
      { name: "Overlay on both hands", price: 500 },
      { name: "Gel Extension", price: 1500, blurb: "Final price depends on the art." },
      { name: "Acrylic Extension", price: 2000, blurb: "Final price depends on the art." },
    ],
  },
  {
    id: "services-lashes",
    title: "Lash Extensions",
    intro: "From a natural set through to mega volume, plus lash lifting.",
    items: [
      { name: "Normal Lash Extension", price: 1000 },
      { name: "Volume Lash Extension", price: 1500 },
      { name: "Mega Volume Lash Extension", price: 2000 },
      { name: "Hybrid Volume Lash Extension", price: 2500 },
      { name: "Lash Lifting", price: 600 },
    ],
  },
  {
    id: "services-beauty",
    title: "Beauty & Grooming",
    intro: "Everyday treatments, on their own or alongside a makeup booking.",
    items: [
      { name: "Facial", price: 1000 },
      { name: "Normal Cleansing", price: 500 },
      { name: "Waxing \u2014 Full Body", price: 1500 },
      { name: "Underarms Waxing", price: 500 },
      { name: "Hair Oil Massage", price: 500 },
    ],
  },
];

/**
 * The person behind the studio.
 *
 * Every sentence below is drawn from something confirmed — the posters, the
 * class price lists, or Kshitiz. Nothing about her background is invented.
 *
 * TODO: this is the thin part of the page. Ask Oshika for:
 *   - how long she's been doing makeup, and where she trained
 *   - what she most enjoys working on / her signature style
 *   - any awards, brand training or certifications worth naming
 *   - one or two lines in her own voice about why she started the studio
 * Then add them as extra `bio` paragraphs.
 */
export const founder = {
  name: "Oshika Manandhar",
  role: "Founder & Lead Makeup Artist",
  bio: [
    `Nhuga Makeup Studio is Oshika Manandhar's studio, opening at Kalimati Chowk on 6 September 2026. The name carries the idea behind it — from passion to profession.`,
    `She works across bridal, engagement and party makeup, alongside nail extension and lash work, and teaches all of it as structured courses.`,
    `Courses run from five-day self-makeup sessions through to three-month professional packages covering makeup, nails and lash extension together.`,
  ],
  highlights: [
    { label: "Based at", value: "Kalimati Chowk, Kathmandu" },
    { label: "Works on", value: "Bridal, engagement & party" },
    { label: "Also teaches", value: "Makeup, nails & lashes" },
    { label: "Available", value: "In studio or on location" },
  ],
};

/** Section-level intro for Classes, above the All / Makeup / Nails tabs. */
export const classesIntro =
  "Hands-on training in small batches. Take makeup or nails on their own, or a combined package covering makeup, nails and lashes together.";

/** Transcribed from the studio's three class price lists. */
export const classMenus: Menu[] = [
  {
    id: "classes-makeup",
    title: "Makeup",
    intro: "Makeup-only courses, from self-grooming through to masters level.",
    items: [
      { name: "Self Makeup", duration: "5 days", price: 5000 },
      { name: "Advance Makeup", duration: "15 days", price: 10000 },
      { name: "Professional Makeup", duration: "30 days", price: 25000 },
      { name: "Masters Makeup", duration: "2 months", price: 50000 },
    ],
  },
  {
    id: "classes-nails",
    title: "Nails",
    intro: "Nail technician courses covering extensions, shaping and nail art.",
    items: [
      { name: "Basic Nails", duration: "10 days", price: 5000 },
      { name: "Advance Nails", duration: "20 days", price: 12000 },
      { name: "Professional Nails", duration: "30 days", price: 20000 },
      { name: "Masters Nails", duration: "50 days", price: 35000 },
    ],
  },
  {
    id: "classes-combined",
    title: "Makeup + Nails + Lashes",
    intro:
      "Combined packages covering makeup, nails and lash work in one course.",
    items: [
      { name: "Self Makeup", duration: "5 days", price: 5000 },
      { name: "Basic Makeup & Nails", duration: "15 days", price: 10000 },
      { name: "Advance Makeup & Nails", duration: "25 days", price: 20000 },
      { name: "Professional Makeup & Nails", duration: "30 days", price: 25000 },
      {
        name: "Makeup & Nails with Lash Lifting",
        duration: "45 days",
        price: 30000,
      },
      {
        name: "Makeup, Nails & Lashes Extension",
        duration: "2 months",
        price: 35000,
      },
      {
        name: "Makeup, Nails & Lashes Extension",
        duration: "3 months",
        price: 50000,
      },
    ],
  },
];

/** Every service and class, for the "what is this about?" dropdowns. */
export const enquiryOptions: string[] = [...serviceMenus, ...classMenus].flatMap(
  (menu) =>
    menu.items.map(
      (item) =>
        `${item.name}${item.duration ? ` — ${item.duration}` : ""} (${menu.title})`,
    ),
);

/** Cheapest service price, for the "from Rs …" line on the home teaser. */
export const cheapestServicePrice = Math.min(
  ...serviceMenus.flatMap((menu) =>
    menu.items.map((item) => item.price ?? Infinity),
  ),
);

/** Cheapest class price, for the "from Rs …" line on the home teaser. */
export const cheapestClassPrice = Math.min(
  ...classMenus.flatMap((menu) =>
    menu.items.map((item) => item.price ?? Infinity),
  ),
);

export const bookingSteps = [
  {
    title: "Send an enquiry",
    body: "Tell us the date, the occasion and where you need us. WhatsApp is fastest, or use the form.",
  },
  {
    title: "We confirm your date",
    body: "We check availability and reply with what's possible, along with the price for exactly what you need.",
  },
  {
    title: "Plan the look",
    body: "Share your outfit and any references. For bridal bookings we agree the look before the day.",
  },
  {
    title: "The day itself",
    body: "Come to the studio at Kalimati Chowk, or we arrive at your venue at the agreed time.",
  },
];

/**
 * Home service and payment are taken from the studio's own service posters.
 *
 * TODO: the bridal-trial and class-kit answers are still deliberately vague
 * because the studio hasn't confirmed them. Replace them with real answers.
 */
export const faqs = [
  {
    q: "Does the 50% opening offer apply to classes too?",
    a: "Yes. The prices shown on the Classes page already include the 50% opening discount, running for 3 months from our opening on 6 September 2026.",
  },
  {
    q: "How far in advance should I book?",
    a: "For bridal and wedding-season dates, as early as possible — popular dates fill first. For party and occasion makeup a few days' notice is usually enough. Message us and we'll tell you what's still open.",
  },
  {
    q: "Do you come to my home or venue?",
    a: "Yes — home and venue service is available on booking. A 25% charge is added on top of the listed price. Send us your venue and we'll confirm the timing.",
  },
  {
    q: "Is there a bridal trial before the wedding day?",
    a: "Mention it when you enquire and we'll arrange what's possible for your date.",
  },
  {
    q: "Do I need to bring my own products for a class?",
    a: "Ask us when you enquire about a course and we'll tell you exactly what to bring.",
  },
  {
    q: "How do I pay?",
    a: "50% in advance at the time of booking, and the remaining 50% after the service.",
  },
];

/** "Rs 5,000" */
export function formatPrice(amount: number) {
  return `Rs ${amount.toLocaleString("en-US")}`;
}

/**
 * Price after a discount. `percent` comes from getOffer() rather than straight
 * from config, so an expired offer stops discounting automatically.
 */
export function discountedPrice(amount: number, percent: number | null) {
  if (!percent) return null;
  return Math.round(amount * (1 - percent / 100));
}

/** Builds a WhatsApp deep link with the enquiry pre-typed. */
export function whatsappLink(message?: string) {
  const text = encodeURIComponent(
    message ?? `Hi ${site.name}, I'd like to book an appointment.`,
  );
  return `https://wa.me/${site.phone}?text=${text}`;
}
