# Opening artwork

Shown behind the "See offer" button in the pink bar at the top.

```
public/promo/
  01-opening-soon.jpg   -> the "Opening Soon / 50% OFF" poster
  02-invitation.jpg     -> the Grand Opening invitation
```

Sorted by filename, so the number prefix sets the order. Arrow keys flip
between them.

Formats: `.svg` `.png` `.webp` `.jpg` `.jpeg` `.avif`

Without any images the bar still shows its text, just no button.

The wording and dates are in `site.promo` in `src/config/site.ts`.

Read at build time — redeploy after adding.
