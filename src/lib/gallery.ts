import fs from "node:fs";
import path from "node:path";

const GALLERY_DIR = path.join(process.cwd(), "public", "gallery");
const IMAGE_EXTENSIONS = new Set([
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".avif",
  ".gif",
]);

/** Album slugs forced to the end of the list, whatever their name. */
const PINNED_LAST = ["certificates"];

export type Album = {
  /** URL-safe id derived from the folder name. */
  slug: string;
  /** Folder name, tidied up for display. */
  title: string;
  /** Public paths, e.g. /gallery/Bridal Looks/01.jpg */
  photos: string[];
};

/** "bridal-looks" or "Bridal_Looks" -> "Bridal Looks" */
function toTitle(folderName: string) {
  return folderName
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function toSlug(folderName: string) {
  return folderName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function isImage(fileName: string) {
  return IMAGE_EXTENSIONS.has(path.extname(fileName).toLowerCase());
}

/**
 * Every folder inside public/gallery becomes an album, and every image inside
 * that folder becomes a photo in it. Drop a folder in, it shows up — no code
 * change needed.
 *
 * Empty folders are kept deliberately: the album name is listed with a
 * "photos coming soon" note, so albums can be set up before the photos exist.
 */
export function getAlbums(): Album[] {
  if (!fs.existsSync(GALLERY_DIR)) return [];

  return fs
    .readdirSync(GALLERY_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && !entry.name.startsWith("."))
    .map((dir) => {
      const photos = fs
        .readdirSync(path.join(GALLERY_DIR, dir.name))
        .filter((file) => isImage(file) && !file.startsWith("."))
        .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
        .map((file) => `/gallery/${encodeURIComponent(dir.name)}/${encodeURIComponent(file)}`);

      return { slug: toSlug(dir.name), title: toTitle(dir.name), photos };
    })
    .sort((a, b) => {
      // Certificates aren't portfolio work, so they sit after the looks.
      const aLast = PINNED_LAST.includes(a.slug) ? 1 : 0;
      const bLast = PINNED_LAST.includes(b.slug) ? 1 : 0;
      if (aLast !== bLast) return aLast - bLast;
      return a.title.localeCompare(b.title);
    });
}
