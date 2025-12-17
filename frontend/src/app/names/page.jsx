// ============================================
// FILE: app/names/page.js
// Global Baby Names Page — ISR with Static Generation
// ============================================

import BabyNamesClient from './ClientComponent';
import { fetchFilters, fetchNames } from '@/lib/api/names';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://nameverse.com';

// ✅ ISR Configuration - Revalidate every 24 hours
export const revalidate = 86400; // 24 hours in seconds

// ✅ Generate Dynamic Metadata (for Google, social, and rich snippets)
export async function generateMetadata({ searchParams }) {
  const resolvedParams = await searchParams;
  // Collect applied filters (like ?gender=boy&origin=arabic)
  const filters = Object.entries(resolvedParams || {})
    .filter(([key, value]) => value && key !== 'page')
    .map(([key, value]) => `${key}: ${value}`)
    .join(', ');

  // Dynamic title and meta
  const baseTitle = `All Baby Names`;
  const title = filters
    ? `${baseTitle} (${filters}) | Meaning, Origins & Lucky Traits`
    : `${baseTitle} with Meanings, Origins & Lucky Traits`;

  const description = filters
    ? `Discover beautiful baby names filtered by ${filters}. Each name includes meaning, origin, numerology, and lucky details.`
    : `Explore thousands of baby names from all religions and cultures with meanings, origins, numerology, and lucky traits. Find unique boy and girl names for your baby.`;

  const keywords = [
    'baby names',
    'boy names',
    'girl names',
    'unique baby names',
    'modern baby names',
    'baby name meanings',
    'baby name origins',
    'baby name finder',
    'baby name list'
  ].join(', ');

  const canonicalUrl = `${SITE_URL}/names`;

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "NameVerse — Baby Names & Meanings",
      type: "website",
      locale: "en_US",
      images: [
        {
          url: `${SITE_URL}/names-image.png`,
          width: 1200,
          height: 630,
          alt: "All Baby Names with Meanings and Origins",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      site: "@NameVerse",
      creator: "@NameVerse",
      images: [`${SITE_URL}/names-image.png`],
    },
    other: {
      "robots": "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
      "author": "NameVerse Team",
    },
  };
}

// ✅ Fetch Data from API (with ISR caching)
async function fetchInitialData(searchParams = {}) {
  try {
    // Get filters with ISR cache - this rarely changes
    const filters = await fetchFilters('islamic');

    const params = {
      page: searchParams?.page || '1',
      limit: '20',
      religion: searchParams?.religion || 'islamic',
      origin: searchParams?.origin || '',
      gender: searchParams?.gender || '',
    };

    // Fetch names with shorter revalidation for fresh data
    const namesData = await fetchNames(params);

    return {
      filters: filters,
      names: namesData.data || [],
      pagination: namesData.pagination || null,
    };
  } catch (error) {
    
    // Return fallback data that allows the page to render
    return { 
      filters: null, 
      names: [], 
      pagination: null 
    };
  }
}

// ✅ Generate static params for popular filter combinations
export async function generateStaticParams() {
  // Pre-build the most common pages for better performance
  const commonPages = [
    {}, // Base page
    { religion: 'islamic' },
    { religion: 'christian' }, 
    { religion: 'hindu' },
    { gender: 'boy' },
    { gender: 'girl' },
    { religion: 'islamic', gender: 'boy' },
    { religion: 'islamic', gender: 'girl' },
    { religion: 'christian', gender: 'boy' },
    { religion: 'christian', gender: 'girl' },
  ];

  return commonPages.map(params => ({
    searchParams: params
  }));
}

// ✅ Rich Structured Data (schema.org for Google Rich Results)
function generateStructuredData(names) {
  const nameItems = (names || []).slice(0, 20).map((n, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: n.name,
    url: `${SITE_URL}/names/${n.slug}`,
  }));

  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "All Baby Names — Meanings & Origins",
    "description": "Browse the top baby names from all cultures with meanings, numerology, and origin details.",
    "url": `${SITE_URL}/names`,
    "isPartOf": {
      "@type": "WebSite",
      "name": "NameVerse",
      "url": SITE_URL
    },
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": nameItems
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${SITE_URL}/search?query={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };
}

// ✅ Main Page - Now statically generated with ISR
export default async function AllNamesPage({ searchParams }) {
  const resolvedParams = await searchParams;
  // Fetch data for the initial render
  const initialData = await fetchInitialData(resolvedParams || {});
  const structuredData = generateStructuredData(initialData.names || []);

  return (
    <>
      {/* Inject structured data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <BabyNamesClient initialData={initialData} initialReligion="islamic" />
    </>
  );
}