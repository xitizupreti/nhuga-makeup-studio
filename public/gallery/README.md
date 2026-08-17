# Gallery

Each **folder** in here becomes an **album** on the website, and every image
inside that folder becomes a photo in that album.

```
public/gallery/
  Bridal Looks/
    01.jpg
    02.jpg
  Party Makeup/
    01.jpg
  Nail Extension/
    01.jpg
```

That produces three albums named "Bridal Looks", "Party Makeup" and
"Nail Extension". Nothing in the code needs to change.

Notes:

- **An empty folder is fine.** The album name is listed with "Photos coming
  soon", so albums can be set up before the photos exist.
- Photos must be **inside a folder**. A loose image dropped straight into
  `public/gallery/` is ignored, because there'd be no album name for it.
- Supported formats: `.jpg` `.jpeg` `.png` `.webp` `.avif` `.gif`
- Photos are sorted by filename, so name them `01`, `02`, `03`… to control order.
- Dashes and underscores in a folder name are shown as spaces
  (`bridal-looks` → "Bridal Looks").
- The very first photo of the first album is also used as the homepage hero
  image.
- Albums are read when the site is built, so after adding photos run
  `npm run build` (or redeploy) for them to appear.
- Keep files under ~500 KB each where you can — large photos slow the page down.
