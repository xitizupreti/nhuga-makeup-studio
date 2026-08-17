# Nhuga Makeup Studio

Website for Nhuga Makeup Studio, Kathmandu — built with Next.js 14 (App Router),
TypeScript and Tailwind CSS.

## Running it

```bash
npm install
cp .env.example .env.local   # then fill in the Gmail values
npm run dev
```

Open http://localhost:3000

## Pages

| Route | What's on it |
| --- | --- |
| `/` | Hero, About, Services, Classes teaser, Gallery teaser, Opening offer, How it works, FAQ, Booking form, Contact + map |
| `/classes` | All three class price lists with tabs (`All` by default) and the menu posters |
| `/gallery` | All albums with tabs (`All` by default) and the lightbox |

Classes and Gallery are deliberately *not* full sections on the home page — home
only teases them and links across. Nav links use absolute hrefs (`/#services`)
so the home anchors still work from the other two pages.

## Enquiries

Every WhatsApp call-to-action opens a short dialog first (name, what it's about,
date, location, notes) and only then hands off to WhatsApp with those details
pre-typed — see `src/components/WhatsAppDialog.tsx`. The one exception is the
"Send this on WhatsApp" button inside the Booking section, which already has a
filled-in form next to it.

Course and service cards pass their own name as the dialog's subject, so it
arrives preselected.

## Where to edit things

| What | File |
| --- | --- |
| Phone, email, address, hours, socials | `src/config/site.ts` |
| Services menu & Classes menus (and prices) | `src/config/site.ts` |
| FAQ answers, booking steps | `src/config/site.ts` |
| Colours | `tailwind.config.ts` (the `blush` scale) |
| Photos | `public/gallery/<Album Name>/` — see `public/gallery/README.md` |
| Page order | `src/app/page.tsx` |

## Still to fill in

Contact details in `src/config/site.ts` are real: phone, email, address, hours
and Instagram. What's still outstanding:

- **Service and class names** are a first draft, not confirmed by the studio.
  Correct them and add prices — leave `price` off an item and it shows
  "Contact for pricing".
- **Images.** All optional; each one is hidden until its file exists, so nothing
  breaks while they're missing.

| Drop in | Shows up as |
| --- | --- |
| `public/logo.*` | navbar logo, footer logo, browser tab icon |
| `public/promo/*` | "See offer" button in the top announcement bar |
| `public/menu/classes-makeup.*` | "View the makeup menu" button, Classes → Makeup tab |
| `public/menu/classes-nails.*` | Classes → Nails tab |
| `public/menu/classes-combined.*` | Classes → Makeup + Nails + Lashes tab |
| `public/gallery/<Album>/*` | gallery albums + hero image (see `public/gallery/README.md`) |

Each `public/*/README.md` documents its own folder in more detail.

## Opening offer bar

The pink strip at the top comes from `site.promo` in `src/config/site.ts`. Set
`active: false` to remove it once the studio is open and the offer has ended.

## Booking enquiries

Two paths, both on the same form:

1. **WhatsApp** — a `wa.me` deep link pre-filled with whatever the visitor has
   typed. Needs no configuration beyond `site.phone`.
2. **Email** — `POST /api/booking` sends via Nodemailer over Gmail SMTP.

For the email path, the Gmail account needs 2-Step Verification on and an
[App Password](https://myaccount.google.com/apppasswords) — a normal Gmail
password will be rejected. Put it in `.env.local` as `GMAIL_APP_PASSWORD`.

Without those env vars the form returns a clear error and the WhatsApp button
still works.

## Deploying

Deploys to Vercel as-is. Add `GMAIL_USER`, `GMAIL_APP_PASSWORD` and `BOOKING_TO`
as environment variables in the project settings, otherwise the contact form
will fail in production.

The gallery is read from disk at build time, so new photos need a rebuild
(pushing to the connected branch triggers one).
