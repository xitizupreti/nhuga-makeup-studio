# Nhuga Makeup Studio

Website for Nhuga Makeup Studio, Kalimati Chowk, Kathmandu.
Live at <https://nhuga-makeup-studio.vercel.app>

Next.js 14 (App Router) · TypeScript · Tailwind CSS

## Run it

```bash
npm install
cp .env.example .env.local   # fill in the Gmail values
npm run dev
```

<http://localhost:3000>

## Pages

| Route | What's on it |
| --- | --- |
| `/` | Hero, About, Services, Classes teaser, Gallery teaser, Opening offer, How it works, FAQ, Booking form, Contact + map |
| `/classes` | All three class price lists |
| `/gallery` | All photo albums |

## Edit content

Almost everything lives in **`src/config/site.ts`**: phone, email, address,
hours, Instagram, services, class prices, FAQ, booking steps, offer dates.

Colours are the `blush` scale in `tailwind.config.ts`.

## Add images

Drop files in and they appear — no code changes. Each folder has its own README
with the details.

| Put it here | Where it shows |
| --- | --- |
| `public/logo.*` | navbar, footer, tab icon, link previews |
| `public/gallery/<Album Name>/` | gallery albums, and the home hero |
| `public/menu/classes-makeup.*` | "View the makeup menu" button |
| `public/menu/classes-nails.*` | Nails tab |
| `public/menu/classes-combined.*` | Combined tab |
| `public/promo/` | "See offer" in the top bar |

Images are read at build time, so redeploy after adding them.

## Opening offer

`site.promo` in `src/config/site.ts` drives the pink top bar, the
struck-through prices and the countdown.

The discount **expires by itself** after `endsOn` (6 Dec 2026) — full prices
come back automatically. `active: false` ends it early.

`/` and `/classes` set `revalidate = 3600` so the countdown stays accurate.
Don't remove it.

## Enquiries

Every WhatsApp button opens a short form first (what it's about, date,
location), then hands off to WhatsApp with the details pre-typed.

The Booking section also emails, via Nodemailer over Gmail SMTP. That needs an
[App Password](https://myaccount.google.com/apppasswords) — a normal Gmail
password won't work. Without it the form shows an error and WhatsApp still
works.

## Deploy

Deploys to Vercel as-is. Set these environment variables:

| Variable | For |
| --- | --- |
| `GMAIL_USER` | sending the booking emails |
| `GMAIL_APP_PASSWORD` | as above |
| `BOOKING_TO` | where enquiries land (defaults to `GMAIL_USER`) |
| `NEXT_PUBLIC_SITE_URL` | only when moving to a custom domain |

## Still to do

- **Services list** (`serviceMenu` in `src/config/site.ts`) is a draft, not
  confirmed by the studio.
- **FAQ answers** are drafts too — see the `TODO` above `faqs`.
- Gallery albums exist but have no photos yet.
