
import { NextResponse } from 'next/server';

export function middleware(request) {
  const url = request.nextUrl.clone();
  // Redirect /names/:religion/:lang/:slug -> /names/:religion/:slug
  const match = url.pathname.match(/^\/names\/([^/]+)\/([^/]+)\/([^/]+)\/?$/);
  if (match) {
    const religion = match[1];
    const slug = match[3];
    url.pathname = `/names/${religion}/${slug}`;
    return NextResponse.redirect(url, { status: 308 });
  }
  const response = NextResponse.next();

  // Add security headers
  response.headers.set('X-DNS-Prefetch-Control', 'on');
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'origin-when-cross-origin');

  // Add caching headers for static assets
  if (request.nextUrl.pathname.startsWith('/_next/static/')) {
    response.headers.set(
      'Cache-Control',
      'public, max-age=31536000, immutable'
    );
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
