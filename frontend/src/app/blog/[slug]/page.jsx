// app/[slug]/page.jsx
import { notFound } from 'next/navigation';
import ArticleClient from './Client';
import { getArticleBySlug, getLatestArticles } from '@/lib/api/articles';

export const revalidate = 60; // ISR every 60 seconds

// ---------------- METADATA ----------------
export async function generateMetadata({ params }) {
  const { slug } = params;

  try {
    const article = await getArticleBySlug(slug);

    if (!article) {
      return {
        title: 'Article Not Found | Nameverse',
        description: 'The requested article does not exist.',
        robots: 'noindex, nofollow',
      };
    }

    const DOMAIN = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';

    const title = article.seo?.title || article.title;
    const description =
      article.seo?.meta_description || article.summary || article.title;

    const canonical = `${DOMAIN}/articles/${slug}`;

    return {
      title,
      description,
      keywords: article.seo?.keywords?.join(', ') || 'articles, blog, nameverse',
      alternates: {
        canonical,
        languages: { 'x-default': canonical, en: canonical },
      },
      openGraph: {
        title,
        description,
        url: canonical,
        siteName: 'Nameverse',
        type: 'article',
        locale: 'en_US',
        images: [
          {
            url: article.image || '/default-og.jpg',
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
        images: [article.image || '/default-og.jpg'],
      },
      robots: { index: true, follow: true },
    };
  } catch (error) {
    console.error('❌ Error generating metadata:', error);
    return {
      title: 'Article | Nameverse',
      description: 'Read insightful articles on Nameverse.',
    };
  }
}

// ---------------- PAGE ----------------
export default async function ArticlePage({ params }) {
  const { slug } = params;

  try {
    // Fetch article
    const article = await getArticleBySlug(slug);
    if (!article) {
      console.warn(`⚠️ Article not found for slug: ${slug}`);
      return notFound();
    }

    // Fetch latest articles (sidebar)
    const latestArticles = await getLatestArticles(4);

    // Structured Data (Schema.org Article)
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: article.title,
      description: article.summary || article.title,
      author: {
        '@type': 'Organization',
        name: 'Nameverse',
      },
      datePublished: article.created_at || new Date().toISOString(),
      dateModified: article.updated_at || new Date().toISOString(),
      image: article.image || '/default-og.jpg',
    };

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <ArticleClient
          slug={slug}
          article={article}
          latestArticles={latestArticles}
        />
      </>
    );
  } catch (error) {
    console.error('❌ Error fetching article:', error);

    return (
      <div className="p-8 text-center text-red-600">
        <h1 className="text-2xl font-bold mb-2">Server Error</h1>
        <p>Something went wrong while loading the article. Please try again later.</p>
      </div>
    );
  }
}
