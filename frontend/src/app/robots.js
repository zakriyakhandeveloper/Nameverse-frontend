/** @type {import('next').MetadataRoute.Robots} */
export default function robots() {
  const base = (
    process.env.NEXT_PUBLIC_SITE_URL || "https://nameverse.com"
  ).replace(/\/$/, "");

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/_next/"],
    },
    sitemap: `${base}/sitemap.xml`,
  };
}
