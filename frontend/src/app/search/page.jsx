import GlobalSearchClient from './GlobalSearchClient';
import { Suspense } from 'react';
import { getSiteUrl, absoluteUrl } from '@/lib/seo/site';

const site = getSiteUrl();
const canonical = `${site}/search`;

export const metadata = {
  title: 'Search Baby Names & Articles | NameVerse',
  description:
    'Search NameVerse for Islamic, Hindu, and Christian baby names with meanings, plus parenting and naming articles. Find names A–Z, by origin, or by topic.',
  keywords: [
    'search baby names',
    'baby name search',
    'find baby name meaning',
    'muslim name search',
    'islamic names search',
    'hindu baby names search',
    'sanskrit names search',
    'christian biblical names search',
    'name meaning lookup',
    'search naming articles',
    'baby naming blog search',
  ].join(', '),
  alternates: { canonical },
  openGraph: {
    title: 'Search Baby Names & Articles | NameVerse',
    description:
      'Find baby names with meanings and browse naming guides across religions and cultures.',
    url: canonical,
    siteName: 'NameVerse',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: absoluteUrl('/og-image.png'),
        width: 1200,
        height: 630,
        alt: 'NameVerse — search baby names and articles',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Search Baby Names & Articles | NameVerse',
    description: 'Find meanings, origins, and naming guides in one search.',
    images: [absoluteUrl('/og-image.png')],
  },
  robots: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
};

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="p-6 text-center text-gray-600">Loading search…</div>}>
      <GlobalSearchClient />
    </Suspense>
  );
}
