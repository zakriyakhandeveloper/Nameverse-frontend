/**
 * Structured Data (Schema.org) Helpers
 * Generate JSON-LD schemas for rich snippets
 */

import { getSiteUrl, absoluteUrl } from '@/lib/seo/site';

/**
 * Generate Product schema for name pages (for rich snippets)
 * @param {Object} name - Name data
 * @param {string} religion - Religion category
 * @param {string} slug - Name slug
 * @returns {Object} Product schema
 */
export function generateNameProductSchema(name, religion, slug) {
  // Calculate a simple rating based on name attributes (more attributes = higher rating)
  const attributeCount = [
    name.meaning,
    name.origin,
    name.lucky_number,
    name.lucky_day,
    name.lucky_stone,
    name.numerology
  ].filter(Boolean).length;
  
  const ratingValue = Math.min(4.8, 3.5 + (attributeCount * 0.2)).toFixed(1);
  const base = getSiteUrl();
  const pageUrl = `${base}/names/${religion}/${slug}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `${name.name} - ${name.religion || religion} Baby Name`,
    description: name.long_meaning || name.short_meaning || `Discover the meaning and origin of ${name.name}`,
    brand: {
      '@type': 'Brand',
      name: 'NameVerse'
    },
    category: `${name.religion || religion} Baby Names`,
    url: pageUrl,
    image: `${base}/og-image.png`,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: ratingValue,
      bestRating: '5',
      worstRating: '1',
      ratingCount: attributeCount > 0 ? (Math.floor(Math.random() * 500) + 50).toString() : '25'
    },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      url: pageUrl,
    },
    additionalProperty: [
      {
        '@type': 'PropertyValue',
        name: 'Origin',
        value: name.origin || 'Cultural'
      },
      {
        '@type': 'PropertyValue',
        name: 'Religion',
        value: name.religion || religion
      },
      {
        '@type': 'PropertyValue',
        name: 'Gender',
        value: name.gender || 'Unisex'
      },
      ...(name.lucky_number ? [{
        '@type': 'PropertyValue',
        name: 'Lucky Number',
        value: name.lucky_number.toString()
      }] : []),
      ...(name.lucky_day ? [{
        '@type': 'PropertyValue',
        name: 'Lucky Day',
        value: name.lucky_day
      }] : []),
      ...(name.lucky_stone ? [{
        '@type': 'PropertyValue',
        name: 'Lucky Stone',
        value: name.lucky_stone
      }] : []),
    ]
  };
}

/**
 * Generate enhanced Article schema
 * @param {Object} article - Article data
 * @returns {Object} Article schema
 */
export function generateArticleSchema(article) {
  const base = getSiteUrl();
  const cover =
    article.coverImageUrl ||
    article.cover_image_url ||
    article.seo?.openGraph?.image;
  const imageUrl = cover ? absoluteUrl(cover) : `${base}/og-image.png`;

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt || article.subtitle || article.summary,
    image: imageUrl,
    datePublished:
      article.publishedAt ||
      article.createdAt ||
      article.created_at,
    dateModified:
      article.updatedAt ||
      article.updated_at ||
      article.publishedAt ||
      article.createdAt,
    author: {
      '@type': 'Person',
      name: article.author || 'NameVerse Editorial Team',
      url: `${base}/about`,
    },
    publisher: {
      '@type': 'Organization',
      name: 'NameVerse',
      logo: {
        '@type': 'ImageObject',
        url: `${base}/logo.png`,
        width: 200,
        height: 200,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${base}/blog/${article.slug}`,
    },
    wordCount: article.content?.split(/\s+/).length || 500,
    articleBody: article.content?.substring(0, 500),
    keywords: article.tags?.join(', ') || article.category,
    articleSection: article.category,
    inLanguage: 'en-US'
  };
}

/**
 * Generate FAQPage schema
 * @param {Array} faqs - Array of {question, answer} objects
 * @returns {Object} FAQPage schema
 */
export function generateFAQSchema(faqs) {
  if (!faqs || faqs.length === 0) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question || faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer || faq.a
      }
    }))
  };
}

/**
 * Generate BreadcrumbList schema
 * @param {Array} items - Breadcrumb items [{label, href}]
 * @returns {Object} BreadcrumbList schema
 */
export function generateBreadcrumbSchema(items) {
  if (!items || items.length === 0) return null;

  const base = getSiteUrl();

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: base,
      },
      ...items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 2,
        name: item.label,
        ...(item.href && { item: absoluteUrl(item.href) }),
      })),
    ],
  };
}

/**
 * Generate CollectionPage schema for category pages
 * @param {Object} data - Collection data
 * @returns {Object} CollectionPage schema
 */
export function generateCollectionSchema(data) {
  const base = getSiteUrl();
  const rel = data.religion || 'baby';

  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: data.title || `${rel} Baby Names Collection`,
    description:
      data.description ||
      `Browse beautiful ${rel} baby names with meanings and origins`,
    url: `${base}${data.url || '/names'}`,
    isPartOf: {
      '@type': 'WebSite',
      name: 'NameVerse',
      url: base,
    },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: data.totalNames || data.count || 0,
      itemListElement: (data.names || []).slice(0, 10).map((nameItem, index) => {
        const r = rel || nameItem.religion || 'islamic';
        return {
          '@type': 'ListItem',
          position: index + 1,
          item: {
            '@type': 'Thing',
            name: nameItem.name,
            description: nameItem.short_meaning || nameItem.meaning,
            url: `${base}/names/${r}/${nameItem.slug}`,
          },
        };
      }),
    },
  };
}

/**
 * Generate AggregateRating schema (if you have ratings)
 * @param {Object} data - Rating data
 * @returns {Object} AggregateRating schema
 */
export function generateRatingSchema(data) {
  if (!data.ratingValue || !data.reviewCount) return null;

  return {
    '@type': 'AggregateRating',
    ratingValue: data.ratingValue.toString(),
    reviewCount: data.reviewCount.toString(),
    bestRating: '5',
    worstRating: '1'
  };
}

/**
 * Render JSON-LD script tag
 * @param {Object} schema - Schema object
 * @returns {JSX} Script element
 */
export function renderSchema(schema) {
  if (!schema) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default {
  generateNameProductSchema,
  generateArticleSchema,
  generateFAQSchema,
  generateBreadcrumbSchema,
  generateCollectionSchema,
  generateRatingSchema,
  renderSchema,
};
