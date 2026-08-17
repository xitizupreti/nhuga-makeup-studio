"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/config/site";
import { InstagramIcon, WhatsAppIcon } from "./icons";
import { WhatsAppButton } from "./WhatsAppDialog";

/**
 * `route` marks links that own their own page. `section` is the id on the home
 * page that highlights the link while it's in view — absolute hrefs so the home
 * anchors still work from the other pages.
 */
const links = [
  { href: "/", label: "Home", route: "/", section: "top" },
  { href: "/services", label: "Services", route: "/services", section: "services" },
  { href: "/classes", label: "Classes", route: "/classes", section: "classes-teaser" },
  { href: "/gallery", label: "Gallery", route: "/gallery", section: "gallery-teaser" },
  { href: "/about", label: "About", route: "/about" },
  // `cta` renders this one as a pink pill rather than a plain text link.
  { href: "/#booking", label: "Book Now", section: "booking", cta: true },
];

/** Home section ids in the order they appear down the page. */
const spySections = ["top", "services", "classes-teaser", "gallery-teaser", "booking"];

export default function Header({ logo }: { logo?: string | null }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("top");

  const onHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);

      if (!onHome) return;

      // The last section whose top has passed a line near the top of the
      // viewport is the one being read.
      const line = window.scrollY + window.innerHeight * 0.3;
      let current = "top";
      for (const id of spySections) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= line) current = id;
      }
      setActiveSection(current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [onHome]);

  function isActive(link: (typeof links)[number]) {
    // Off the home page, only the link owning this route is active.
    if (!onHome) return link.route === pathname;
    // On home, "Home" wins at the top and section links take over as you scroll.
    return link.section === activeSection;
  }

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
          {/* Smaller on the narrowest phones so the wordmark, logo and
              hamburger still fit on one line at 320px. */}
          <span className="whitespace-nowrap font-serif text-base font-semibold leading-tight text-blush-900 sm:text-lg">
            Nhuga <span className="text-blush-500">Makeup Studio</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {links.map((link) => {
            const active = isActive(link);

            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                // `cta` is pink and bold, but still plain text — only the
                // WhatsApp control should read as a button up here.
                className={`relative py-1 text-sm transition ${
                  link.cta
                    ? `font-bold ${active ? "text-blush-700" : "text-blush-600 hover:text-blush-800"}`
                    : active
                      ? "font-semibold text-blush-700"
                      : "text-ink/70 hover:text-blush-600"
                }`}
              >
                {link.label}
                <span
                  aria-hidden
                  className={`absolute -bottom-0.5 left-0 h-0.5 w-full rounded-full bg-blush-500 transition-opacity ${
                    active ? "opacity-100" : "opacity-0"
                  }`}
                />
              </Link>
            );
          })}
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
          className="rounded-lg border border-blush-200 p-2 text-blush-700 lg:hidden"
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
        <nav className="border-t border-blush-100 bg-cream lg:hidden">
          <div className="container-page flex flex-col py-3">
            {links.map((link) => {
              const active = isActive(link);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  aria-current={active ? "page" : undefined}
                  className={`border-l-2 py-2.5 pl-3 text-sm transition ${
                    link.cta ? "font-bold text-blush-700" : ""
                  } ${
                    active
                      ? "border-blush-500 font-semibold text-blush-700"
                      : "border-transparent text-ink/80"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <a
              href={site.socials.instagram}
              target="_blank"
              rel="noreferrer"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 border-l-2 border-transparent py-2.5 pl-3 text-sm text-ink/80"
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
