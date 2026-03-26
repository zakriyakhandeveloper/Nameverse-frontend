import { notFound } from 'next/navigation';
import SearchResultsClient from './ClientComponent';
import { searchNames } from '@/lib/api/names';
import { searchArticles } from '@/lib/api/articles';
import { getSiteUrl, absoluteUrl } from '@/lib/seo/site';

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

  // Build compelling CTR-focused description
  let description = `Discover ${totalResults} results for "${decodedTerm}"`;
  
  if (names.length > 0 && articles.length > 0) {
    description = `Find ${names.length}+ names and ${articles.length}+ articles about "${decodedTerm}". Get complete meanings, origins, numerology & cultural significance for ${decodedTerm}.`;
  } else if (names.length > 0) {
    const topName = names[0];
    description = `${decodedTerm} means "${topName.short_meaning || topName.meaning}". Find ${totalResults}+ related names with meanings, origins, and lucky attributes.`;
  }

  const base = getSiteUrl();
  const pageUrl = `${base}/search/${encodeURIComponent(decodedTerm)}`;
  const ogImage = absoluteUrl('/og-image.png');

  return {
    title: `${decodedTerm} - Baby Names & Articles | NameVerse`,
    description: description,
    keywords: [
      decodedTerm,
      `${decodedTerm} baby name`,
      `${decodedTerm} meaning`,
      `${decodedTerm} names`,
      `what does ${decodedTerm} mean`,
      `${decodedTerm} origin`,
      `${decodedTerm} name meaning`,
      'quranic names',
      'biblical names',
      'sanskrit baby names',
      'urdu name meanings',
      'name meanings',
      'name origins',
      'baby names',
      'name inspiration',
    ].join(', '),
    authors: [{ name: 'NameVerse' }],
    openGraph: {
      title: `${decodedTerm} - Baby Names & Meanings`,
      description: description,
      type: 'website',
      url: pageUrl,
      siteName: 'NameVerse',
      locale: 'en_US',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `Results for ${decodedTerm} on NameVerse`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${decodedTerm} - Baby Names`,
      description: description,
      images: [ogImage],
    },
    robots: { index: true, follow: true },
    alternates: { canonical: pageUrl },
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

  const base = getSiteUrl();
  const resultPageUrl = `${base}/search/${encodeURIComponent(decodedTerm)}`;

  const nameDetailUrl = (name) => {
    const rel = name.religion || 'islamic';
    const slug = name.slug || String(name._id || '');
    return slug ? `${base}/names/${rel}/${slug}` : base;
  };

  // Structured Data
  const searchSchema = {
    '@context': 'https://schema.org',
    '@type': 'SearchResultsPage',
    name: `Results for ${decodedTerm}`,
    url: resultPageUrl,
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
        url: nameDetailUrl(name),
      })),
      ...articles.map((article, idx) => ({
        '@type': 'Article',
        position: names.length + idx + 1,
        name: article.title,
        description: article.excerpt || article.summary || '',
        url: `${base}/blog/${article.slug}`,
      })),
    ],
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: base },
      { '@type': 'ListItem', position: 2, name: 'Search', item: `${base}/search` },
      { '@type': 'ListItem', position: 3, name: decodedTerm, item: resultPageUrl },
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
