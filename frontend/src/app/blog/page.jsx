// ==================== ArticleExplorer.jsx (Full ISR + SEO) ====================
import HeroSection from "./Herosection";
import ArticleGrid from "./articlegrid";
import {
  getLatestArticles,
  getAllCategories,
  getArticlesByCategory,
  searchArticles,
} from "@/lib/api/articles";

// ISR: Revalidate every 3600 seconds (1 hour)
export const revalidate = 3600;

// Pre-build popular category pages for ISR
export async function generateStaticParams() {
  const categories = await getAllCategories();
  const commonCategories = ["All Categories", ...categories];
  return commonCategories.map((cat) => ({
    searchParams: { category: cat },
  }));
}

// ---------------- Dynamic Metadata ----------------
export async function generateMetadata({ searchParams }) {
  const { category = "All Categories", query = "" } = searchParams || {};
  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://nameverse.com";
  
  const title = query
    ? `Search results for "${query}" | NameVerse Blog`
    : category !== "All Categories"
    ? `${category} Articles | NameVerse Blog`
    : "Latest Articles | NameVerse Blog";

  const description = query
    ? `Articles matching "${query}" from NameVerse Blog`
    : category !== "All Categories"
    ? `Latest articles in ${category} category`
    : "Explore latest articles and insights from NameVerse Blog.";

  const canonicalUrl = `${SITE_URL}/articles`;

  return {
    title,
    description,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "NameVerse Blog",
      type: "website",
      locale: "en_US",
      images: [
        { url: `${SITE_URL}/articles-og.png`, width: 1200, height: 630, alt: title },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      site: "@NameVerse",
      creator: "@NameVerse",
      images: [`${SITE_URL}/articles-og.png`],
    },
    robots: "index, follow, max-snippet:-1, max-image-preview:large",
  };
}

// ---------------- Fetch Articles ----------------
async function fetchArticles(searchParams = {}) {
  const { category = "All Categories", query = "" } = searchParams || {};
  let articles = [];
  let categories = [];

  try {
    // Fetch all categories
    const allCats = await getAllCategories();
    categories = [...new Set(allCats)];

    // Fetch articles based on category or query
    if (query?.trim()) {
      articles = await searchArticles(query);
    } else if (category && category !== "All Categories") {
      articles = await getArticlesByCategory(category, 12);
    } else {
      articles = await getLatestArticles(12);
    }
  } catch (error) {
    console.error("Error fetching articles for ISR:", error);
  }

  return { articles, categories };
}

// ---------------- Structured Data (JSON-LD) ----------------
function generateStructuredData(articles = []) {
  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://nameverse.com";

  const articleItems = (articles || []).slice(0, 20).map((article, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: article.title,
    url: `${SITE_URL}/articles/${article.slug}`,
  }));

  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Articles — NameVerse Blog",
    description: "Browse the latest articles, insights, and tips from NameVerse Blog.",
    url: `${SITE_URL}/articles`,
    isPartOf: { "@type": "WebSite", name: "NameVerse", url: SITE_URL },
    mainEntity: { "@type": "ItemList", itemListElement: articleItems },
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/search?query={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

// ---------------- Main ISR Page ----------------
export default async function ArticleExplorer({ searchParams }) {
  const { articles, categories } = await fetchArticles(searchParams);

  const categoryOptions = ["All Categories", ...categories];
  const selectedLabel = searchParams.query
    ? `Search: "${searchParams.query}"`
    : searchParams.category || "All Categories";

  const structuredData = generateStructuredData(articles);

  return (
    <>
      <StructuredData
        collectionPage={{
          name: "Articles — NameVerse Blog",
          description: "Browse the latest articles, insights, and tips from NameVerse Blog.",
          url: `${SITE_URL}/blog`,
          items: articles,
        }}
        breadcrumbs={[
          { name: "Home", url: SITE_URL },
          { name: "Blog", url: `${SITE_URL}/blog` },
        ]}
      />

      <PageLayout
        title="NameVerse Blog"
        subtitle="Latest Articles, Insights & Stories"
        bgColor="bg-gray-50"
      >
        {/* Hero Section */}
        <HeroSection
          article={articles[0] || null}
          categories={categoryOptions}
          selected={selectedLabel}
          query={searchParams.query}
        />

        {/* Article Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">
            {searchParams.query ? `Search Results for "${searchParams.query}"` : "Latest Articles"}
          </h2>
          <ArticleGrid articles={articles} isLoading={false} />
        </div>
      </PageLayout>
    </>
  );
}