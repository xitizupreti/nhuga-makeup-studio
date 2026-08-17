# Gallery

**One folder = one album.** The folder name becomes the album name.

```
public/gallery/
  Bridal Looks/
    01.jpg
    02.jpg
  Party Makeup/
    01.jpg
```

- Photos must be **inside a folder** — loose files here are ignored.
- An **empty folder is fine**; it shows "Photos coming soon". But git can't track
  an empty directory, so it needs a `.gitkeep` file inside or it will never
  reach the deployed site:

  ```bash
  touch "public/gallery/New Album/.gitkeep"
  ```

  `.gitkeep` is ignored by the gallery itself — it's not counted as a photo.
- Sorted by filename, so use `01`, `02`, `03`… to set the order.
- Formats: `.jpg` `.jpeg` `.png` `.webp` `.avif` `.gif`
- Dashes become spaces (`bridal-looks` → "Bridal Looks").
- The first photo also becomes the home page hero.
- Keep files under ~500 KB.

Read at build time — redeploy after adding photos.
