import Link from 'next/link';
import { notFound } from 'next/navigation';
import { BookOpen, Heart, Clock, ArrowLeft, Share2, Calendar, User, Tag } from 'lucide-react';
import blogPostsData from '../../../../public/data/blog-posts.json';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://nameverse.com';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = blogPostsData.find(p => p.id === slug);
  
  if (!post) {
    return { title: 'Post Not Found | NameVerse' };
  }

  return {
    title: `${post.title} | NameVerse Blog`,
    description: post.excerpt,
    keywords: post.tags.join(', '),
    alternates: {
      canonical: `${SITE_URL}/blog/${post.id}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      url: `${SITE_URL}/blog/${post.id}`,
      publishedTime: post.publishDate,
      authors: [post.author],
      tags: post.tags,
    },
    robots: { index: true, follow: true },
  };
}

export async function generateStaticParams() {
  return blogPostsData.map((post) => ({
    slug: post.id,
  }));
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = blogPostsData.find(p => p.id === slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = blogPostsData
    .filter(p => p.category === post.category && p.id !== post.id)
    .slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.excerpt,
    "author": {
      "@type": "Person",
      "name": post.author,
      "jobTitle": post.authorCredentials
    },
    "publisher": {
      "@type": "Organization",
      "name": "NameVerse",
      "url": SITE_URL
    },
    "datePublished": post.publishDate,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blog/${post.id}`
    },
    "keywords": post.tags.join(', '),
    "articleSection": post.category
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <main className="min-h-screen bg-white">
        {/* Header */}
        <section className="py-8 px-4 border-b border-gray-200">
          <div className="max-w-3xl mx-auto">
            <Link 
              href="/blog"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>
            
            <div className="mb-4">
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded text-sm font-medium">
                {post.category}
              </span>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
              {post.title}
            </h1>
            
            <p className="text-lg text-gray-600 mb-6">
              {post.excerpt}
            </p>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{new Date(post.publishDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{post.readTime}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Content */}
        <article className="py-12 px-4">
          <div className="max-w-3xl mx-auto">
            {/* Author Box */}
            <div className="flex items-center gap-4 mb-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <div className="font-semibold text-gray-900">{post.author}</div>
                <div className="text-sm text-gray-500">{post.authorCredentials}</div>
              </div>
            </div>

            {/* Introduction */}
            <div className="prose max-w-none mb-8">
              <p className="text-gray-700 leading-relaxed text-lg">
                {post.content.introduction}
              </p>
            </div>

            {/* Sections */}
            {post.content.sections && post.content.sections.map((section, index) => (
              <section key={index} className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  {section.title}
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  {section.content}
                </p>
              </section>
            ))}

            {/* Tags */}
            <div className="mt-10 pt-6 border-t border-gray-200">
              <div className="flex items-center gap-2 mb-3">
                <Tag className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">Tags:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag, i) => (
                  <span key={i} className="bg-gray-100 text-gray-700 px-3 py-1 rounded text-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Share */}
            <div className="flex items-center gap-4 mt-6 pt-6 border-t border-gray-200">
              <span className="text-sm font-medium text-gray-700">Share:</span>
              <button className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors">
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </article>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="py-12 px-4 bg-gray-50">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <Link 
                    key={relatedPost.id}
                    href={`/blog/${relatedPost.id}`}
                    className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow"
                  >
                    <span className="text-xs text-blue-600 font-medium">
                      {relatedPost.category}
                    </span>
                    <h3 className="font-semibold text-gray-900 mt-2 mb-2 line-clamp-2">
                      {relatedPost.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {relatedPost.excerpt}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="py-12 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Find the Perfect Name?</h2>
            <p className="text-gray-600 mb-6">
              Explore our database of 65,000+ baby names with meanings, origins, and numerology.
            </p>
            <Link 
              href="/names"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Heart className="w-5 h-5" />
              Browse All Names
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}