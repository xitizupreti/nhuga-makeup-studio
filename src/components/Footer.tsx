import Image from "next/image";
import Link from "next/link";
import { site } from "@/config/site";
import { InstagramIcon, WhatsAppIcon } from "./icons";

const links = [
  { href: "/services", label: "Services" },
  { href: "/classes", label: "Classes" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
  { href: "/#booking", label: "Book Now" },
  { href: "/#contact", label: "Visit" },
];

/**
 * Deliberately light on contact details — the Contact section directly above
 * already carries the phone numbers, email, address and map, so repeating them
 * here just doubled everything up.
 */
export default function Footer({ logo }: { logo?: string | null }) {
  return (
    <footer className="border-t border-blush-100 bg-blush-50">
      {/* Three columns need more than 640px to sit side by side without
          crowding, so this stacks until md rather than sm. */}
      <div className="container-page flex flex-col gap-8 py-12 md:flex-row md:items-center md:justify-between">
        <Link href="/" className="flex items-center gap-3">
          {logo && (
            <Image
              src={logo}
              alt=""
              width={64}
              height={64}
              className="h-16 w-auto mix-blend-multiply"
            />
          )}
          <div>
            <p className="font-serif text-xl text-blush-900">{site.name}</p>
            <p className="mt-1 text-sm italic text-ink/60">{site.tagline}</p>
          </div>
        </Link>

        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm md:justify-end">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-ink/70 transition hover:text-blush-700"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <a
          href={site.socials.instagram}
          target="_blank"
          rel="noreferrer"
          aria-label={`${site.name} on Instagram`}
          className="inline-flex shrink-0 items-center gap-2 rounded-full border border-blush-200 bg-white px-4 py-2 text-sm font-semibold text-blush-700 transition hover:border-blush-400 hover:text-blush-900"
        >
          <InstagramIcon className="h-4 w-4" />
          @nhugamakeupstudio
        </a>
      </div>

      {/* Extra room on the right (and below, when stacked) so the fixed
          back-to-top button never covers the credit. */}
      <div className="border-t border-blush-100 py-4 pb-20 sm:pb-4">
        <div className="container-page flex flex-col items-center justify-between gap-2 text-xs text-ink/50 sm:flex-row sm:pr-16">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
            <span>Built by</span>
            <a
              href={site.credit.url}
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-blush-600 underline decoration-blush-300 underline-offset-2 transition hover:text-blush-800 hover:decoration-blush-600"
            >
              {site.credit.name}
            </a>
            <a
              href={site.credit.instagram}
              target="_blank"
              rel="noreferrer"
              aria-label={`${site.credit.name} on Instagram`}
              title="@kshitizupreti on Instagram"
              className="text-blush-500 transition hover:text-blush-800"
            >
              <InstagramIcon className="h-4 w-4" />
            </a>
            <a
              href={site.credit.whatsapp}
              target="_blank"
              rel="noreferrer"
              aria-label={`${site.credit.name} on WhatsApp`}
              title="WhatsApp +977 9869547209"
              className="text-blush-500 transition hover:text-blush-800"
            >
              <WhatsAppIcon className="h-4 w-4" />
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
