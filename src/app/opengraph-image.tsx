import fs from "node:fs";
import path from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/config/site";

export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * The card shown when the link is shared on WhatsApp, Facebook, Viber etc.
 *
 * Deliberately on a cream background: the logo artwork has a white backdrop and
 * satori (what renders this) has no mix-blend-mode, so a pink background would
 * put a white box around the logo. No countdown either — platforms cache these
 * for a long time, so a "days left" figure would go stale in previews.
 */
function logoDataUri() {
  for (const name of ["logo.png", "logo.jpg", "logo.webp"]) {
    const file = path.join(process.cwd(), "public", name);
    if (fs.existsSync(file)) {
      const type = name.endsWith(".png")
        ? "image/png"
        : name.endsWith(".webp")
          ? "image/webp"
          : "image/jpeg";
      return `data:${type};base64,${fs.readFileSync(file).toString("base64")}`;
    }
  }
  return null;
}

export default async function Image() {
  const logo = logoDataUri();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          gap: 56,
          padding: "0 80px",
          background: "linear-gradient(135deg, #ffe8ef 0%, #fffafc 55%, #ffd0df 100%)",
        }}
      >
        {logo && (
          // The artwork's white backdrop can't be blended away here, so it's
          // presented as an intentional white tile instead.
          <div
            style={{
              display: "flex",
              flexShrink: 0,
              alignItems: "center",
              justifyContent: "center",
              background: "white",
              borderRadius: 40,
              padding: 28,
              boxShadow: "0 18px 50px rgba(130, 29, 65, 0.16)",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={logo} alt="" width={230} height={299} />
          </div>
        )}

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 26,
              letterSpacing: 6,
              textTransform: "uppercase",
              color: "#bd1f56",
            }}
          >
            Kalimati Chowk, Kathmandu
          </div>

          {/* satori needs an explicit display on any element with more than
              one child, and each text node kept whole. */}
          <div
            style={{
              marginTop: 18,
              display: "flex",
              flexDirection: "column",
              fontSize: 76,
              fontWeight: 700,
              lineHeight: 1.05,
              color: "#821d41",
            }}
          >
            <div style={{ display: "flex" }}>Nhuga</div>
            <div style={{ display: "flex" }}>Makeup Studio</div>
          </div>

          <div
            style={{
              marginTop: 18,
              display: "flex",
              fontSize: 32,
              color: "#9c1d49",
            }}
          >
            {site.tagline}
          </div>

          <div
            style={{
              marginTop: 34,
              display: "flex",
              alignSelf: "flex-start",
              borderRadius: 999,
              background: "#bd1f56",
              color: "white",
              padding: "14px 30px",
              fontSize: 28,
              fontWeight: 600,
            }}
          >
            {`Opening ${site.promo.date} · ${site.promo.offer}`}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
