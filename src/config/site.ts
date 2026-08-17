/**
 * Single source of truth for every real-world detail on the site.
 *
 * Contact details, class names and prices are transcribed from the studio's own
 * posters. The Services list is still a draft — see the note above `serviceMenu`.
 */

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

  // Confirmed from the Google Maps link.
  maps: {
    placeUrl:
      "https://www.google.com/maps/place/Nhuga+Makeup+Studio/@27.698002,85.2995638,17z",
    lat: 27.698002,
    lng: 85.2995638,
  },

  hours: [
    { days: "Sunday – Friday", time: "10:00 AM – 7:00 PM" },
    { days: "Saturday", time: "By appointment" },
  ],

  socials: {
    instagram: "https://www.instagram.com/nhugamakeupstudio/",
  },

  credit: {
    name: "Kshitiz Upreti",
    url: "https://kshitizupreti.com.np",
  },

  /**
   * Opening announcement. `discountPercent` also drives the struck-through
   * original prices on the class cards — set `active: false` when the offer ends
   * and both the bar and the discounted prices disappear together.
   */
  promo: {
    active: true,
    headline: "Opening soon",
    date: "Bhadra 21 · 6 Sep 2026",
    offer: "50% off for 3 months",
    discountPercent: 50,
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

/**
 * TODO: not yet confirmed by the studio. These service names are a draft and
 * carry no prices — correct them before launch.
 */
export const serviceMenu: Menu = {
  id: "services",
  title: "Services",
  intro:
    "Available in the studio, or on location at your home or venue when booked in advance.",
  items: [
    {
      name: "Bridal Makeup",
      blurb:
        "Full bridal look for the wedding day, including hair styling and draping.",
    },
    {
      name: "Engagement & Reception",
      blurb: "Softer, camera-ready makeup for engagements and receptions.",
    },
    {
      name: "Party & Occasion Makeup",
      blurb: "Everyday glam for parties, shoots and family functions.",
    },
    {
      name: "Hair Styling",
      blurb: "Blow-dry, curls and updos, booked on its own or with makeup.",
    },
    {
      name: "Nail Extension",
      blurb: "Gel and acrylic extensions with custom nail art.",
    },
    {
      name: "Lash Lifting & Extension",
      blurb: "Lash lifts and extensions for a fuller, lifted eye.",
    },
    {
      name: "Outdoor / On-location Service",
      blurb:
        "The team travels to your venue. Booked in advance; travel charged by distance.",
    },
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
export const enquiryOptions: string[] = [serviceMenu, ...classMenus].flatMap(
  (menu) =>
    menu.items.map(
      (item) =>
        `${item.name}${item.duration ? ` — ${item.duration}` : ""} (${menu.title})`,
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
 * TODO: every answer below is a DRAFT written from general practice, not
 * confirmed by the studio. Read through and correct before this goes live —
 * especially anything touching trials, travel charges, kits or payment.
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
    a: "Yes — outdoor service is available on booking, in and around Kathmandu. Send us your venue and we'll confirm the timing and any travel cost.",
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
    a: "We'll confirm the amount and how to pay when we confirm your booking.",
  },
];

/** "Rs 5,000" */
export function formatPrice(amount: number) {
  return `Rs ${amount.toLocaleString("en-US")}`;
}

/** Price after the opening discount, or null when no offer is running. */
export function discountedPrice(amount: number) {
  if (!site.promo.active || !site.promo.discountPercent) return null;
  return Math.round(amount * (1 - site.promo.discountPercent / 100));
}

/** Builds a WhatsApp deep link with the enquiry pre-typed. */
export function whatsappLink(message?: string) {
  const text = encodeURIComponent(
    message ?? `Hi ${site.name}, I'd like to book an appointment.`,
  );
  return `https://wa.me/${site.phone}?text=${text}`;
}
