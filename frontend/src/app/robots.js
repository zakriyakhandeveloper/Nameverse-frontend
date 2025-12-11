/**
 * Robots Meta Configuration
 * Defines which URLs search engines can crawl
 */

export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/api'],
      },
    ],
    sitemap: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://nameverse.vercel.app'}/sitemap.xml`,
  };
}