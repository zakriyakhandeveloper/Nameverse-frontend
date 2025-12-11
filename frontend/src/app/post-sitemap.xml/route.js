export async function GET() {
  const names = ["abdulrauf", "afsa", "aleem", "amaal", "ankeboot"];

  const urls = names.map((name) => `
    <url>
      <loc>https://nameverse.vercel.app/names/islamic/${name}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.8</priority>
    </url>
  `).join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "no-cache, no-store, must-revalidate", // disable caching
      "Pragma": "no-cache",
      "Expires": "0"
    },
  });
}
