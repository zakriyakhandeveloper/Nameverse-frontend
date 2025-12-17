import NameClient from '@/components/names/NameDetailClient';
import { fetchNameDetail, fetchNamesByLetter } from '@/lib/api/names';
import { notFound } from 'next/navigation';
import dynamic from 'next/dynamic';

// Dynamically import the letter page component
const NamesDatabaseClient = dynamic(() => import('../letter/[letter]/NameClientComponent'), {
  ssr: true,
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://nameverse.vercel.app';
export const revalidate = 3600;
export const dynamicParams = true;

export async function generateMetadata({ params }) {
  const { religion, slug } = await params;

  // If slug is a single letter, return metadata for letter page
  if (slug && slug.length === 1 && /^[a-zA-Z]$/.test(slug)) {
    const religionTitle = religion.charAt(0).toUpperCase() + religion.slice(1);
    const letter = slug.toUpperCase();
    return {
      title: `${religionTitle} Names Starting with ${letter} | NameVerse`,
      description: `Browse all ${religionTitle} names that start with the letter ${letter}. Discover meanings, origins, and more.`,
      alternates: { canonical: `/names/${religion}/${slug.toLowerCase()}` },
      openGraph: {
        title: `${religionTitle} Names - Letter ${letter}`,
        description: `Explore ${religionTitle} names starting with ${letter}`,
        type: 'website',
        siteName: 'NameVerse',
        images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630 }],
      },
      robots: { index: true, follow: true },
    };
  }

  const nameData = await fetchNameDetail(religion, slug);
  if (!nameData) {
    return { title: 'Name Not Found', description: 'The requested name could not be found.' };
  }
  const titleName = nameData.name || slug.replace(/[-_]/g, ' ');
  const religionTitle = religion.charAt(0).toUpperCase() + religion.slice(1);
  const desc = nameData.short_meaning || nameData.meaning || `Discover the meaning of ${titleName}.`;
  return {
    title: `${titleName} Meaning | ${religionTitle} Names`,
    description: desc,
    alternates: { canonical: `/names/${religion}/${slug}` },
    openGraph: {
      title: `${titleName} - ${religionTitle} Name Meaning`,
      description: desc,
      type: 'article',
      siteName: 'NameVerse',
      images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${titleName} - ${religionTitle} Name`,
      description: desc,
      images: [`${SITE_URL}/og-image.png`],
    },
    robots: { index: true, follow: true },
  };
}

export default async function NameSlugPage({ params }) {
  const { religion, slug } = await params;

  // If slug is a single letter, fetch names by letter and show letter page
  if (slug && slug.length === 1 && /^[a-zA-Z]$/.test(slug)) {
    const letter = slug.toUpperCase();
    const result = await fetchNamesByLetter(letter, { religion, limit: 100 });

    if (!result.success) {
      return notFound();
    }

    return (
      <NamesDatabaseClient
        initialNames={result.data || []}
        selectedReligion={religion}
        selectedLetter={letter}
        totalResults={result.count || 0}
      />
    );
  }

  // Regular name detail page
  const data = await fetchNameDetail(religion, slug);
  if (!data) return notFound();
  return <NameClient data={data} initialLanguage="english" />;
}
