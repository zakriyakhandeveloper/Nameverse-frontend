// This route handler has been disabled.
// Sitemap is now served directly from public/sitemap.xml
// Delete this file to complete the migration.

export async function GET() {
  return new Response(null, { status: 410 });
}