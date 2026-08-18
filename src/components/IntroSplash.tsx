"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { site } from "@/config/site";

const BRAND = "Nhuga";
const REST = BRAND.slice(1).split("");

// Timeline (ms) — the whole thing is done in about 3.2s.
const REST_START_MS = 550;
const REST_STAGGER_MS = 55;
const HOLD_UNTIL_MS = 2800;
const FADE_OUT_MS = 400;

/**
 * Opening animation, adapted from the IntroSplash in kshitizupreti.com.np and
 * standup — same shape (ringed first letter, cascading rest, shine sweep) in
 * the studio's pink, with the logo above the wordmark.
 *
 * Plays on every full page load, including a refresh. It lives in the root
 * layout, which only remounts on a hard navigation — moving between pages
 * client-side keeps it mounted, so it never replays mid-browse.
 */
export default function IntroSplash({ logo }: { logo?: string | null }) {
  // Rendered on the server too, so the first paint is already the splash —
  // starting hidden would flash the real page underneath first.
  const [show, setShow] = useState(true);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const leaveTimer = setTimeout(() => setLeaving(true), HOLD_UNTIL_MS);
    const doneTimer = setTimeout(() => {
      setShow(false);
      document.body.style.overflow = previousOverflow;
    }, HOLD_UNTIL_MS + FADE_OUT_MS);

    return () => {
      clearTimeout(leaveTimer);
      clearTimeout(doneTimer);
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  if (!show) return null;

  return (
    <div
      aria-hidden="true"
      className={`intro-splash ${leaving ? "intro-splash--leaving" : ""}`}
    >
      <div className="intro-splash__grid" />
      <div className="intro-splash__glow" />

      <div className="intro-splash__content">
        {logo && (
          <Image
            src={logo}
            alt=""
            width={320}
            height={415}
            priority
            className="intro-splash__logo"
          />
        )}

        <div className="intro-splash__word">
          <span className="intro-splash__letter intro-splash__letter--first">
            {BRAND[0]}
          </span>
          {REST.map((char, i) => (
            <span
              key={i}
              className="intro-splash__letter"
              style={{
                animationDelay: `${REST_START_MS + i * REST_STAGGER_MS}ms`,
              }}
            >
              {char}
            </span>
          ))}
          <span className="intro-splash__sub">Makeup Studio</span>
          <span className="intro-splash__shine" />
        </div>

        <p className="intro-splash__tagline">{site.tagline}</p>
      </div>
    </div>
  );
}
