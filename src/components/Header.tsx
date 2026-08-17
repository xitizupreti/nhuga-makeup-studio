"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { site } from "@/config/site";
import { InstagramIcon, WhatsAppIcon } from "./icons";
import { WhatsAppButton } from "./WhatsAppDialog";

// Absolute hrefs so the on-home anchors still work from /classes and /gallery.
const links = [
  { href: "/#services", label: "Services" },
  { href: "/classes", label: "Classes" },
  { href: "/gallery", label: "Gallery" },
  { href: "/#about", label: "About" },
  { href: "/#booking", label: "Book" },
];

export default function Header({ logo }: { logo?: string | null }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition ${
        scrolled
          ? "border-b border-blush-100 bg-cream/90 backdrop-blur"
          : "bg-cream"
      }`}
    >
      <div className="container-page flex h-16 items-center justify-between gap-4 sm:h-20">
        <Link
          href="/"
          aria-label={`${site.name} — home`}
          className="flex items-center gap-2.5"
        >
          {logo && (
            <Image
              src={logo}
              alt=""
              width={110}
              height={143}
              priority
              // The logo artwork is on a white background; multiply drops the
              // white into the cream page so it reads as transparent. Harmless
              // if a transparent PNG/SVG is supplied later.
              className="h-12 w-auto mix-blend-multiply sm:h-16"
            />
          )}
          <span className="font-serif text-lg font-semibold text-blush-900">
            Nhuga <span className="text-blush-500">Makeup Studio</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-ink/70 transition hover:text-blush-600"
            >
              {link.label}
            </Link>
          ))}
          <a
            href={site.socials.instagram}
            target="_blank"
            rel="noreferrer"
            aria-label={`${site.name} on Instagram`}
            title="Instagram"
            className="text-blush-600 transition hover:text-blush-800"
          >
            <InstagramIcon className="h-5 w-5" />
          </a>
          <WhatsAppButton className="btn-primary !px-5 !py-2">
            <WhatsAppIcon className="h-4 w-4" />
            WhatsApp
          </WhatsAppButton>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Toggle menu"
          className="rounded-lg border border-blush-200 p-2 text-blush-700 md:hidden"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <nav className="border-t border-blush-100 bg-cream md:hidden">
          <div className="container-page flex flex-col py-3">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="py-2.5 text-sm text-ink/80"
              >
                {link.label}
              </Link>
            ))}
            <a
              href={site.socials.instagram}
              target="_blank"
              rel="noreferrer"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 py-2.5 text-sm text-ink/80"
            >
              <InstagramIcon className="h-4 w-4 text-blush-600" />
              Instagram
            </a>
            <WhatsAppButton className="btn-primary mt-2">
              <WhatsAppIcon className="h-4 w-4" />
              WhatsApp {site.phoneDisplay}
            </WhatsAppButton>
          </div>
        </nav>
      )}
    </header>
  );
}
