# Opening announcement artwork

Images here appear behind the "See offer" button in the pink bar at the top of
the page. Without them the bar still shows its text, just no button.

```
public/promo/
  01-opening-soon.jpg   -> the "Opening Soon / 50% OFF" poster
  02-invitation.jpg     -> the Grand Opening invitation card
```

Sorted by filename, so the number prefixes decide which shows first. Arrows and
the left/right keys flip between them.

Supported: `.svg` `.png` `.webp` `.jpg` `.jpeg` `.avif`

The bar's wording lives in `site.promo` in `src/config/site.ts`. Setting
`active: false` there hides the bar **and** removes the discounted prices from
the class cards — do both together when the offer ends.

Read at build time, so run `npm run build` (or redeploy) after adding images.
