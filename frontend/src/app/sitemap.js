/** @type {import('next').MetadataRoute.Sitemap} */
export default function sitemap() {
  const base = (
    process.env.NEXT_PUBLIC_SITE_URL || "https://nameverse.com"
  ).replace(/\/$/, "");
  const now = new Date();

  /** Prefer indexing primary hubs; vanity URLs that 308 are omitted to reduce duplicate hints. */
  const staticPaths = [
    "",
    "/blog",
    "/names",
    "/names/islamic",
    "/names/hindu",
    "/names/christian",
    "/search",
    "/about",
  ];

  return staticPaths.map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: path === "" ? "daily" : "weekly",
    priority: path === "" ? 1 : path.startsWith("/names") ? 0.9 : 0.8,
  }));
}
