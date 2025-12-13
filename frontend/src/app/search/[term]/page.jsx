import { notFound } from 'next/navigation';
import SearchResultsClient from './ClientComponent';
import { searchNames } from '@/lib/api/names';

const DOMAIN = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';

// Fetch search results from API
const fetchSearchResults = async (term) => {
  try {
    const result = await searchNames(term.trim(), { limit: 50 });
    return {
      names: result.data || [],
      totalNames: result.count || result.data?.length || 0,
    };
  } catch (error) {
    console.error('Search fetch error:', error);
    return { names: [], totalNames: 0 };
  }
};

// ---------------- Metadata ----------------
export const generateMetadata = async ({ params }) => {
  const { term } = params;
  const decodedTerm = decodeURIComponent(term);
  const { names, totalNames } = await fetchSearchResults(decodedTerm);

  return {
    title: `${decodedTerm} - Best Names & Meanings | NameVerse`,
    description: `Discover ${totalNames} names for ${decodedTerm}. Expert meanings, origins, and inspiration for your search.`,
    keywords: [
      decodedTerm,
      `${decodedTerm} names`,
      `${decodedTerm} meanings`,
      'name meanings',
      'name origins',
      'baby names',
      'name inspiration',
      `${decodedTerm} etymology`,
    ].join(', '),
    authors: [{ name: 'NameVerse' }],
    openGraph: {
      title: `${decodedTerm} Names & Meanings`,
      description: `Discover ${totalNames} names for ${decodedTerm}`,
      type: 'website',
      url: `${DOMAIN}/search/${encodeURIComponent(decodedTerm)}`,
      siteName: 'NameVerse',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${decodedTerm} Names & Meanings`,
      description: `Discover ${totalNames} names for ${decodedTerm}`,
    },
    robots: { index: true, follow: true },
    alternates: { canonical: `${DOMAIN}/search/${encodeURIComponent(decodedTerm)}` },
  };
};

// ---------------- ISR Static Pre-render ----------------
export async function generateStaticParams() {
  const popular = ['muhammad', 'fatima', 'ali', 'aisha', 'omar'];
  return popular.map((term) => ({ term: encodeURIComponent(term) }));
}

export const revalidate = 300; // ISR every 5 minutes

// ---------------- Main Search Page ----------------
export default async function SearchPage({ params }) {
  const { term } = params;
  const decodedTerm = decodeURIComponent(term);
  const { names, totalNames } = await fetchSearchResults(decodedTerm);

  if (!names.length) {
    return notFound();
  }

  // Structured Data
  const searchSchema = {
    '@context': 'https://schema.org',
    '@type': 'SearchResultsPage',
    name: `Results for ${decodedTerm}`,
    url: `${DOMAIN}/search/${encodeURIComponent(decodedTerm)}`,
    description: `${totalNames} results for "${decodedTerm}"`,
  };

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    numberOfItems: totalNames,
    itemListElement: names.map((name, idx) => ({
      '@type': 'Thing',
      position: idx + 1,
      name: name.name || name.title,
      description: name.short_meaning || '',
      url: `${DOMAIN}/${name.slug || `names/${name._id}`}`,
    })),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: DOMAIN },
      { '@type': 'ListItem', position: 2, name: 'Search', item: `${DOMAIN}/search` },
      { '@type': 'ListItem', position: 3, name: decodedTerm, item: `${DOMAIN}/search/${encodeURIComponent(decodedTerm)}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(searchSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <SearchResultsClient
        initialNames={names}
        searchTerm={decodedTerm}
        totalNames={totalNames}
      />
    </>
  );
}
