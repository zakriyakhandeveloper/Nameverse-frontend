import { notFound } from 'next/navigation';
import ArticleClient from './Client';
import { getArticleBySlug, getLatestArticles } from '@/lib/api/articles';
import { getSiteUrl, absoluteUrl, DEFAULT_OG_PATH } from '@/lib/seo/site';

export const revalidate = 60;

function articleOgImage(article) {
  const raw =
    article.coverImageUrl ||
    article.cover_image_url ||
    article.seo?.openGraph?.image ||
    article.seo?.twitter?.image ||
    article.image;
  return raw ? absoluteUrl(raw) : absoluteUrl(DEFAULT_OG_PATH);
}

export async function generateMetadata({ params }) {
  const { slug } = await params;

  try {
    const article = await getArticleBySlug(slug);

    if (!article) {
      return {
        title: 'Article Not Found | NameVerse',
        description: 'The requested article does not exist.',
        robots: { index: false, follow: false },
      };
    }

    const title = article.seo?.title || article.title;
    const description =
      article.seo?.description ||
      article.seo?.meta_description ||
      article.summary ||
      article.subtitle ||
      article.title;

    const canonicalPath =
      article.seo?.canonicalUrl?.startsWith('/')
        ? article.seo.canonicalUrl
        : `/blog/${slug}`;
    const canonical = absoluteUrl(canonicalPath);

    const baseKeywords = [
      ...(article.seo?.keywords || []),
      ...(article.tags || []),
      'baby name articles',
      'baby naming tips',
      'name meaning guide',
      article.category ? `${article.category} baby names` : '',
      article.category ? `${article.category} naming` : '',
      'Islamic baby names guide',
      'Hindu baby names guide',
      'Christian baby names guide',
      'baby names with meanings',
      'popular baby names',
    ].filter(Boolean);

    const ogImage = articleOgImage(article);

    return {
      title: `${title} | NameVerse`,
      description,
      keywords: [...new Set(baseKeywords)].join(', '),
      alternates: {
        canonical,
        languages: { 'x-default': canonical, en: canonical },
      },
      openGraph: {
        title,
        description,
        url: canonical,
        siteName: 'NameVerse',
        type: 'article',
        locale: 'en_US',
        publishedTime: article.publishedAt || article.created_at,
        modifiedTime: article.updatedAt || article.updated_at,
        images: [
          {
            url: ogImage,
            width: 1200,
            height: 630,
            alt: article.title,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: [ogImage],
      },
      robots: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
    };
  } catch {
    return {
      title: 'Article | NameVerse',
      description: 'Read insightful articles on NameVerse.',
    };
  }
}

export default async function ArticlePage({ params }) {
  const { slug } = await params;
  const site = getSiteUrl();

  try {
    const article = await getArticleBySlug(slug);
    if (!article) return notFound();

    const latestArticles = await getLatestArticles(4);

    const imageUrl = articleOgImage(article);
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: article.title,
      description: article.summary || article.subtitle || article.title,
      author: {
        '@type': article.author ? 'Person' : 'Organization',
        name: article.author || 'NameVerse',
      },
      datePublished: article.publishedAt || article.created_at || new Date().toISOString(),
      dateModified: article.updatedAt || article.updated_at || article.publishedAt || new Date().toISOString(),
      image: imageUrl,
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `${site}/blog/${slug}`,
      },
      publisher: {
        '@type': 'Organization',
        name: 'NameVerse',
        url: site,
      },
    };

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <ArticleClient slug={slug} article={article} latestArticles={latestArticles} />
      </>
    );
  } catch {
    return (
      <div className="p-8 text-center text-red-600">
        <h1 className="text-2xl font-bold mb-2">Server Error</h1>
        <p>Something went wrong while loading the article. Please try again later.</p>
      </div>
    );
  }
}
