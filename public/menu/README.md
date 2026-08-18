# Menu posters

Add a poster and a "View the … menu" button appears on that section.

```
public/menu/
  services-bridal.jpg     -> Services, Bridal & Party tab
  services-nails.jpg      -> Services, Nail Extensions tab
  services-lashes.jpg     -> Services, Lash Extensions tab
  services-beauty.jpg     -> Services, Beauty & Grooming tab
  classes-makeup.jpg      -> Classes, Makeup tab
  classes-nails.jpg       -> Classes, Nails tab
  classes-combined.jpg    -> Classes, Makeup + Nails + Lashes tab
```

Filenames must match the menu `id` in `src/config/site.ts`.

For several pages of one menu, use a folder instead:

```
public/menu/classes-combined/01.jpg, 02.jpg
```

Formats: `.svg` `.png` `.webp` `.jpg` `.jpeg` `.avif`

**Keep the prices in `src/config/site.ts` matching the posters** — the text
cards are the main content, these are just the branded version.

Read at build time — redeploy after adding.
