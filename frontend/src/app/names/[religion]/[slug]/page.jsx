import NameClient from '@/components/names/NameDetailClient';
import { fetchNameDetail, fetchNamesByLetter } from '@/lib/api/names';
import { notFound } from 'next/navigation';
import dynamic from 'next/dynamic';
import { validateMetaDescription, generateNameMetaDescription } from '@/lib/seo/meta-helpers';
import { generateNameProductSchema, generateFAQSchema } from '@/lib/seo/structured-data';
import { generateNameFAQ } from '@/lib/seo/content-helpers';
import { validateAndSanitizeSlug, isSingleLetter } from '@/lib/utils/slugValidation';

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
  if (isSingleLetter(slug)) {
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

  // Validate and sanitize the slug
  const sanitizedSlug = validateAndSanitizeSlug(slug);
  if (!sanitizedSlug) {
    return {
      title: 'Invalid Name URL',
      description: 'The requested name URL is invalid.',
      robots: { index: false, follow: false }
    };
  }

  const nameData = await fetchNameDetail(religion, sanitizedSlug);
  if (!nameData) {
    return { title: 'Name Not Found', description: 'The requested name could not be found.' };
  }
  const titleName = nameData.name || slug.replace(/[-_]/g, ' ');
  const religionTitle = religion.charAt(0).toUpperCase() + religion.slice(1);

  // Generate SEO-optimized description
  const desc = validateMetaDescription(generateNameMetaDescription(nameData));

  // Enhanced keywords for better SEO
  const keywords = [
    // Core name keywords
    titleName,
    `${titleName} name meaning`,
    `${titleName} meaning`,
    `${titleName} name meaning in English`,
    `${titleName} name meaning in Urdu`,

    // Name-specific searches
    `${titleName} ${religionTitle} name`,
    `${titleName} origin`,
    `${titleName} baby name`,
    `${titleName} pronunciation`,
    `what does ${titleName} mean`,
    `meaning of ${titleName}`,
    `${titleName} name origin`,

    // Name quality/decision keywords
    `is ${titleName} a good name`,
    `${titleName} name popularity`,
    `${titleName} lucky number`,
    `${titleName} numerology`,
    `${titleName} lucky stone`,
    `${titleName} lucky color`,

    // Gender + religion combinations
    nameData.gender ? `${nameData.gender} names` : 'baby names',
    nameData.gender ? `${religionTitle} ${nameData.gender} names` : `${religionTitle} names`,
    `${religionTitle} names`,
    `${religionTitle} baby names`,

    // Origin-specific
    nameData.origin ? `${nameData.origin} names` : '',
    nameData.origin ? `${nameData.origin} baby names` : '',
    nameData.origin ? `${nameData.origin} name meanings` : '',

    // General categories
    'baby name meanings',
    'name origins',
    'cultural baby names',
    'baby names with meanings',
    'religious baby names',
    'traditional baby names',

    // Theme-based (if available)
    nameData.themes && nameData.themes.length > 0 ? nameData.themes.join(', ') : ''
  ].filter(Boolean).join(', ');

  return {
    title: `${titleName} Name Meaning & Origin | ${religionTitle} ${nameData.gender || ''} Baby Name`,
    description: desc,
    keywords,
    authors: [{ name: 'NameVerse' }],
    alternates: { canonical: `https://nameverse.vercel.app/names/${religion}/${sanitizedSlug}` },
    openGraph: {
      title: `${titleName} - ${religionTitle} Name Meaning & Origin`,
      description: desc,
      type: 'article',
      url: `https://nameverse.vercel.app/names/${religion}/${sanitizedSlug}`,
      siteName: 'NameVerse',
      images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: `${titleName} - ${religionTitle} baby name meaning` }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${titleName} - ${religionTitle} Name`,
      description: desc,
      images: [`${SITE_URL}/og-image.png`],
    },
    robots: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  };
}

export default async function NameSlugPage({ params }) {
  const { religion, slug } = await params;

  // If slug is a single letter, fetch names by letter and show letter page
  if (isSingleLetter(slug)) {
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

  // Validate and sanitize the slug
  const sanitizedSlug = validateAndSanitizeSlug(slug);
  if (!sanitizedSlug) {
    return notFound();
  }

  // Regular name detail page
  const data = await fetchNameDetail(religion, sanitizedSlug);
  if (!data) return notFound();

  // Generate structured data schemas
  const productSchema = generateNameProductSchema(data, religion, sanitizedSlug);
  const faqSchema = generateFAQSchema(generateNameFAQ(data));

  return (
    <>
      {/* Product Schema for Rich Snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />

      {/* FAQ Schema */}
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <NameClient data={data} initialLanguage="english" />
    </>
  );
}
