import { faqs, site, siteUrl } from "@/config/site";

/**
 * Structured data for search engines. Kept to the types Google actually renders
 * — a local business panel, FAQ rich results and breadcrumbs — rather than
 * emitting speculative markup that only risks validation warnings.
 */

export function businessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    "@id": `${siteUrl}/#business`,
    name: site.name,
    description: site.description,
    slogan: site.tagline,
    url: siteUrl,
    image: `${siteUrl}/logo.png`,
    logo: `${siteUrl}/logo.png`,
    telephone: `+${site.phone}`,
    email: site.email,
    priceRange: "$$",
    currenciesAccepted: "NPR",
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.line1,
      addressLocality: "Kathmandu",
      addressRegion: "Bagmati",
      addressCountry: "NP",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.maps.lat,
      longitude: site.maps.lng,
    },
    hasMap: site.maps.placeUrl,
    openingHoursSpecification: site.hoursSpec.map((entry) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: entry.days,
      opens: entry.opens,
      closes: entry.closes,
    })),
    sameAs: [site.socials.instagram].filter(Boolean),
    areaServed: { "@type": "City", name: "Kathmandu" },
    knowsAbout: [
      "Bridal makeup",
      "Party makeup",
      "Nail extension",
      "Lash extension",
      "Makeup classes",
    ],
  };
}

export function faqSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

export function breadcrumbSchema(name: string, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name,
        item: `${siteUrl}${path}`,
      },
    ],
  };
}
