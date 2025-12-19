import { notFound } from 'next/navigation';
import SearchResultsClient from './ClientComponent';
import { searchNames } from '@/lib/api/names';
import { searchArticles } from '@/lib/api/articles';

const DOMAIN = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';

// Fetch search results from API
const fetchSearchResults = async (term) => {
  try {
    const [namesResult, articlesResult] = await Promise.all([
      searchNames(term.trim(), { limit: 50 }),
      searchArticles(term.trim(), { limit: 50 })
    ]);

    const names = namesResult.data || [];
    const articles = Array.isArray(articlesResult) ? articlesResult : [];

    return {
      names,
      articles,
      totalNames: names.length,
      totalArticles: articles.length,
      totalResults: names.length + articles.length,
    };
  } catch (error) {
    console.error('Search fetch error:', error);
    return { names: [], articles: [], totalNames: 0, totalArticles: 0, totalResults: 0 };
  }
};

// ---------------- Metadata ----------------
export const generateMetadata = async ({ params }) => {
  const resolvedParams = await params;
  const { term } = resolvedParams;
  const decodedTerm = decodeURIComponent(term);
  const { names, articles, totalResults } = await fetchSearchResults(decodedTerm);

  return {
    title: `${decodedTerm} - Names & Articles | NameVerse`,
    description: `Discover ${totalResults} results for ${decodedTerm}. Expert meanings, origins, articles, and inspiration for your search.`,
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
      title: `${decodedTerm} - Names & Articles`,
      description: `Discover ${totalResults} results for ${decodedTerm}`,
      type: 'website',
      url: `${DOMAIN}/search/${encodeURIComponent(decodedTerm)}`,
      siteName: 'NameVerse',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${decodedTerm} - Names & Articles`,
      description: `Discover ${totalResults} results for ${decodedTerm}`,
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
  const resolvedParams = await params;
  const { term } = resolvedParams;
  const decodedTerm = decodeURIComponent(term);
  const { names, articles, totalNames, totalArticles, totalResults } = await fetchSearchResults(decodedTerm);

  if (!names.length && !articles.length) {
    return notFound();
  }

  // Structured Data
  const searchSchema = {
    '@context': 'https://schema.org',
    '@type': 'SearchResultsPage',
    name: `Results for ${decodedTerm}`,
    url: `${DOMAIN}/search/${encodeURIComponent(decodedTerm)}`,
    description: `${totalResults} results for "${decodedTerm}"`,
  };

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    numberOfItems: totalResults,
    itemListElement: [
      ...names.map((name, idx) => ({
        '@type': 'Thing',
        position: idx + 1,
        name: name.name || name.title,
        description: name.short_meaning || '',
        url: `${DOMAIN}/${name.slug || `names/${name._id}`}`,
      })),
      ...articles.map((article, idx) => ({
        '@type': 'Article',
        position: names.length + idx + 1,
        name: article.title,
        description: article.excerpt || article.summary || '',
        url: `${DOMAIN}/blog/${article.slug}`,
      })),
    ],
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
        initialArticles={articles}
        searchTerm={decodedTerm}
        totalNames={totalNames}
        totalArticles={totalArticles}
      />
    </>
  );
}
