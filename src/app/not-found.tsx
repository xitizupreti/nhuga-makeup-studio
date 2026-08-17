import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Page not found",
  // A 404 has nothing worth ranking, and indexing it would compete with the
  // real pages.
  robots: { index: false, follow: true },
};

const suggestions = [
  { href: "/services", label: "Services" },
  { href: "/classes", label: "Classes & prices" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
];

export default function NotFound() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-blush-100 to-cream" />

      <div className="container-page flex min-h-[60vh] flex-col items-center justify-center py-20 text-center sm:py-28">
        <p className="font-serif text-6xl font-semibold text-blush-300 sm:text-7xl">
          404
        </p>
        <h1 className="heading mt-4">This page doesn&apos;t exist</h1>
        <p className="mt-4 max-w-md leading-relaxed text-ink/70">
          The link may be out of date, or the address slightly off. Everything
          below is still where it should be.
        </p>

        <ul className="mt-8 flex flex-wrap justify-center gap-2">
          {suggestions.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="inline-block rounded-full border border-blush-200 bg-white px-5 py-2 text-sm font-semibold text-blush-700 transition hover:border-blush-400 hover:text-blush-900"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn-primary">
            Back to home
          </Link>
          <Link href="/#booking" className="btn-secondary">
            Book an appointment
          </Link>
        </div>

        <p className="mt-10 text-xs text-ink/50">
          Or call us on{" "}
          <a href={`tel:+${site.phone}`} className="font-semibold text-blush-600">
            {site.phoneDisplay}
          </a>
        </p>
      </div>
    </section>
  );
}
