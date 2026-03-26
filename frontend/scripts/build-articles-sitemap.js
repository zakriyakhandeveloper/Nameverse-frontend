import fs from "fs";
import path from "path";

// ========================
// CONFIG
// ========================
const SITE_URL = "https://nameverse.vercel.app";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://nameverse-api.vercel.app";
const API_ENDPOINT = `${API_BASE_URL}/api/v1/articles`;
const PUBLIC_DIR = "public";
const ARTICLES_SITEMAP_FILE = path.join(PUBLIC_DIR, "sitemap-articles.xml");

// Fallback articles from the codebase
const FALLBACK_ARTICLES = [
  {
    slug: "top-100-islamic-names",
    updatedAt: new Date().toISOString(),
  },
  {
    slug: "top-100-christian-names",
    updatedAt: new Date().toISOString(),
  },
  {
    slug: "top-100-hindu-names",
    updatedAt: new Date().toISOString(),
  },
  {
    slug: "top-10-popular-ai-tools-2025",
    updatedAt: new Date().toISOString(),
  },
  {
    slug: "top-10-remote-jobs-2025-guide",
    updatedAt: new Date().toISOString(),
  },
  {
    slug: "easiest-countries-for-international-students-pr",
    updatedAt: new Date().toISOString(),
  },
  {
    slug: "genghis-khan-great-conqueror-history",
    updatedAt: new Date().toISOString(),
  },
  {
    slug: "independence-of-pakistan-1947",
    updatedAt: new Date().toISOString(),
  },
  {
    slug: "korean-war-first-major-cold-war-conflict",
    updatedAt: new Date().toISOString(),
  },
  {
    slug: "ottoman-empire-greatest-islamic-empire",
    updatedAt: new Date().toISOString(),
  },
  {
    slug: "second-sino-japanese-war-devastating-asia",
    updatedAt: new Date().toISOString(),
  },
  {
    slug: "studying-in-england-world-class-education",
    updatedAt: new Date().toISOString(),
  },
];

// Ensure /public exists
if (!fs.existsSync(PUBLIC_DIR)) fs.mkdirSync(PUBLIC_DIR);

// ========================
// SITEMAP WRITER
// ========================
function writeSitemap(filePath, urls) {
  const today = new Date().toISOString().split("T")[0];
  
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (article) => `<url>
  <loc>${SITE_URL}/blog/${article.slug}</loc>
  <lastmod>${article.updatedAt ? article.updatedAt.split("T")[0] : today}</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.9</priority>
</url>`
  )
  .join("\n")}
</urlset>`;

  fs.writeFileSync(filePath, xml);
  console.log(`✅ Created ${path.basename(filePath)} (${urls.length} articles)`);
}

// ========================
// MAIN SCRIPT
// ========================
async function generate() {
  console.log("🚀 Starting Articles Sitemap Generation...\n");

  let allArticles = [];
  let usedFallback = false;

  try {
    let page = 1;
    let hasMore = true;

    while (hasMore) {
      const apiUrl = `${API_ENDPOINT}?page=${page}&limit=100`;
      console.log(`📥 Fetching articles - Page ${page}...`);

      try {
        const response = await fetch(apiUrl, { timeout: 5000 });
        
        if (!response.ok) {
          if (page === 1) {
            console.warn(`⚠️  API returned ${response.status}`);
            throw new Error(`API Error: ${response.status}`);
          }
          break;
        }

        const data = await response.json();
        const articles = data.data || [];

        if (!articles || articles.length === 0) {
          console.log("✅ No more articles to fetch");
          hasMore = false;
          break;
        }

        allArticles.push(...articles);
        console.log(`   Added ${articles.length} articles (Total: ${allArticles.length})`);

        // Check if there are more pages
        const pagination = data.pagination || {};
        if (!pagination.hasNextPage && page >= (pagination.totalPages || page)) {
          hasMore = false;
        } else {
          page++;
        }

        // Add delay between requests to avoid rate limiting
        await new Promise((res) => setTimeout(res, 500));
      } catch (apiError) {
        console.warn(`⚠️  API Error on page ${page}: ${apiError.message}`);
        if (page === 1) {
          throw apiError;
        }
        break;
      }
    }
  } catch (fetchError) {
    console.warn(`\n⚠️  Could not fetch from API: ${fetchError.message}`);
    console.log(`   API URL: ${API_ENDPOINT}`);
    console.log("   Using fallback articles from codebase...\n");
    allArticles = FALLBACK_ARTICLES;
    usedFallback = true;
  }

  try {
    // Filter articles by status and ensure they have required fields
    const publishedArticles = allArticles
      .filter((article) => article.status === "published" || !article.status)
      .filter((article) => article.slug)
      .map((article) => ({
        slug: article.slug,
        updatedAt: article.updatedAt || new Date().toISOString(),
      }));

    // Remove duplicates based on slug
    const uniqueArticles = Array.from(
      new Map(publishedArticles.map((a) => [a.slug, a])).values()
    );

    if (uniqueArticles.length > 0) {
      writeSitemap(ARTICLES_SITEMAP_FILE, uniqueArticles);
    } else {
      console.warn("⚠️  No articles found for sitemap");
    }

    console.log(`\n📊 Summary:`);
    console.log(`   Total articles: ${allArticles.length}`);
    console.log(`   Published & unique: ${uniqueArticles.length}`);
    if (usedFallback) {
      console.log(`   ℹ️  Using fallback articles (API unavailable)`);
    }
    console.log("\n🎉 Articles sitemap generation complete!");
  } catch (err) {
    console.error("❌ Error during articles sitemap generation:", err.message);
    process.exit(1);
  }
}

// Run
generate();
