# Menu posters

Drop the studio's own menu images here and a "View the … menu" button appears on
that section automatically. No poster, no button.

The name must match the menu `id` in `src/config/site.ts`:

```
public/menu/
  classes-makeup.jpg     -> Classes → "Makeup" tab
  classes-nails.jpg      -> Classes → "Nails" tab
  classes-combined.jpg   -> Classes → "Makeup + Nails + Lashes" tab
  services.jpg           -> Services section
```

A folder works too, when one menu has several pages:

```
public/menu/
  classes-combined/
    01.jpg
    02.jpg
```

Supported: `.svg` `.png` `.webp` `.jpg` `.jpeg` `.avif`. Folder contents sort by
filename, so name them `01`, `02`, `03`… to control the order.

The text cards stay the main content — these posters are the branded version of
the same information. **Keep the prices in `src/config/site.ts` in sync with
whatever the posters say**, including when the opening discount ends.

Posters are read at build time, so run `npm run build` (or redeploy) after
adding them.
