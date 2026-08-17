import fs from "node:fs";
import path from "node:path";

const PUBLIC_DIR = path.join(process.cwd(), "public");
const EXTENSIONS = [".svg", ".png", ".webp", ".jpg", ".jpeg", ".avif"];

/**
 * Resolves a public asset by name without caring about its extension, so a file
 * can be dropped in as .png or .svg and still be found. Returns null when the
 * file isn't there, which lets callers hide the UI that depends on it rather
 * than render a broken image.
 *
 * Matches the extension case-insensitively but returns the filename exactly as
 * it is on disk. Building the URL from a guessed extension instead would appear
 * to work on macOS (case-insensitive filesystem) and then 404 in production on
 * Linux — e.g. a real "logo.JPG" served as "/logo.jpg".
 */
function findPublicAsset(relativePathWithoutExt: string): string | null {
  const dir = path.dirname(relativePathWithoutExt);
  const base = path.basename(relativePathWithoutExt).toLowerCase();
  const absoluteDir = path.join(PUBLIC_DIR, dir);

  if (!fs.existsSync(absoluteDir)) return null;

  const match = fs
    .readdirSync(absoluteDir)
    .filter((file) => {
      const ext = path.extname(file).toLowerCase();
      return (
        EXTENSIONS.includes(ext) &&
        path.basename(file, path.extname(file)).toLowerCase() === base
      );
    })
    // Keep the EXTENSIONS preference order (svg first) rather than readdir order.
    .sort(
      (a, b) =>
        EXTENSIONS.indexOf(path.extname(a).toLowerCase()) -
        EXTENSIONS.indexOf(path.extname(b).toLowerCase()),
    )[0];

  if (!match) return null;

  const urlDir = dir === "." ? "" : `/${dir.split(path.sep).join("/")}`;
  return `${urlDir}/${encodeURIComponent(match)}`;
}

/** public/logo.* — falls back to the text wordmark when absent. */
export function getLogo(): string | null {
  return findPublicAsset("logo");
}

/**
 * Resolves an image set that may be either a single file or a folder:
 *   public/menu/classes.jpg      -> one image
 *   public/menu/classes/01.jpg … -> several, flipped through in the lightbox
 *
 * Folder contents are sorted by filename, so name them 01, 02, 03… to control
 * the order. Returns [] when nothing is there, which hides the UI that uses it.
 */
function findImageSet(relativePathWithoutExt: string): string[] {
  const folder = path.join(PUBLIC_DIR, relativePathWithoutExt);

  if (fs.existsSync(folder) && fs.statSync(folder).isDirectory()) {
    const fromFolder = fs
      .readdirSync(folder)
      .filter(
        (file) =>
          !file.startsWith(".") &&
          EXTENSIONS.includes(path.extname(file).toLowerCase()),
      )
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
      .map(
        (file) =>
          `/${relativePathWithoutExt}/${encodeURIComponent(file)}`.replace(
            /\\/g,
            "/",
          ),
      );

    // A folder holding only a README shouldn't shadow a single-file asset
    // sitting next to it, so only return when it actually has images.
    if (fromFolder.length > 0) return fromFolder;
  }

  const single = findPublicAsset(relativePathWithoutExt);
  return single ? [single] : [];
}

/** public/menu/<menuId>.* or public/menu/<menuId>/* */
export function getMenuPosters(menuId: string): string[] {
  return findImageSet(path.join("menu", menuId));
}

/** public/promo.* or public/promo/* — opening poster, invitation card, etc. */
export function getPromos(): string[] {
  return findImageSet("promo");
}
