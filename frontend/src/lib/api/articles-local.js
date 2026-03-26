// Local Articles API Service
// Reads articles from public/articles.json for fast loading

// Cache articles in memory for performance
let articlesCache = null;
let lastCacheTime = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

function getBaseUrl() {
  if (typeof window !== 'undefined') return window.location.origin;
  if (process.env.NODE_ENV !== 'production') return 'http://localhost:5000';
  const vercelUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null;
  return process.env.NEXT_PUBLIC_SITE_URL || vercelUrl || 'http://localhost:5000';
}

// Load articles from JSON file
async function loadArticles() {
  const now = Date.now();
  
  // Return cached data if still valid
  if (articlesCache && (now - lastCacheTime) < CACHE_DURATION) {
    return articlesCache;
  }

  try {
    const response = await fetch(`${getBaseUrl()}/articles.json`);
    if (!response.ok) {
      throw new Error(`Failed to load articles: ${response.status}`);
    }
    const data = await response.json();

    articlesCache = data.articles || [];
    lastCacheTime = now;
    
    return articlesCache;
  } catch (error) {
    console.error('Error loading articles:', error);
    return [];
  }
}

// Get all articles
export async function getAllArticles() {
  const articles = await loadArticles();
  return articles;
}

// Get latest articles (sorted by publishedAt)
export async function getLatestArticles(limit = 10) {
  const articles = await loadArticles();
  
  return articles
    .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
    .slice(0, limit);
}

// Get featured articles
export async function getFeaturedArticles(limit = 6) {
  const articles = await loadArticles();
  
  return articles
    .filter(article => article.featured)
    .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
    .slice(0, limit);
}

// Get trending articles (by views and recent activity)
export async function getTrendingArticles(limit = 8) {
  const articles = await loadArticles();
  
  return articles
    .filter(article => article.trending)
    .sort((a, b) => b.stats.views - a.stats.views)
    .slice(0, limit);
}

// Get article by slug
export async function getArticleBySlug(slug) {
  const articles = await loadArticles();
  return articles.find(article => article.slug === slug) || null;
}

// Get articles by category
export async function getArticlesByCategory(category, limit = 10) {
  const articles = await loadArticles();
  
  return articles
    .filter(article => article.category === category)
    .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
    .slice(0, limit);
}

// Get all categories
export async function getAllCategories() {
  const articles = await loadArticles();
  const categories = [...new Set(articles.map(article => article.category))];
  return categories.sort();
}

// Search articles
export async function searchArticles(query, options = {}) {
  const { limit = 10, category = null } = options;
  const articles = await loadArticles();
  
  const searchQuery = query.toLowerCase().trim();
  
  if (!searchQuery) {
    return getLatestArticles(limit);
  }
  
  let filtered = articles.filter(article => {
    const matchesSearch = 
      article.title.toLowerCase().includes(searchQuery) ||
      article.subtitle.toLowerCase().includes(searchQuery) ||
      article.summary.toLowerCase().includes(searchQuery) ||
      article.content.toLowerCase().includes(searchQuery) ||
      article.tags.some(tag => tag.toLowerCase().includes(searchQuery));
    
    const matchesCategory = !category || article.category === category;
    
    return matchesSearch && matchesCategory;
  });
  
  // Sort by relevance (title matches first, then by views)
  filtered.sort((a, b) => {
    const aTitleMatch = a.title.toLowerCase().includes(searchQuery);
    const bTitleMatch = b.title.toLowerCase().includes(searchQuery);
    
    if (aTitleMatch && !bTitleMatch) return -1;
    if (!aTitleMatch && bTitleMatch) return 1;
    
    return b.stats.views - a.stats.views;
  });
  
  return filtered.slice(0, limit);
}

// Get related articles (excluding current article)
export async function getRelatedArticles(currentSlug, limit = 4) {
  const articles = await loadArticles();
  const currentArticle = articles.find(a => a.slug === currentSlug);
  
  if (!currentArticle) {
    return getLatestArticles(limit);
  }
  
  // Find articles with same category or tags
  const related = articles.filter(article => {
    if (article.slug === currentSlug) return false;
    
    const sameCategory = article.category === currentArticle.category;
    const sharedTags = article.tags.some(tag => 
      currentArticle.tags.includes(tag)
    );
    
    return sameCategory || sharedTags;
  });
  
  // Sort by views and take top results
  return related
    .sort((a, b) => b.stats.views - a.stats.views)
    .slice(0, limit);
}

// Get articles by tag
export async function getArticlesByTag(tag, limit = 10) {
  const articles = await loadArticles();
  
  return articles
    .filter(article => article.tags.includes(tag))
    .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
    .slice(0, limit);
}

// Get popular tags
export async function getPopularTags(limit = 20) {
  const articles = await loadArticles();
  const tagCounts = {};
  
  articles.forEach(article => {
    article.tags.forEach(tag => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
  });
  
  return Object.entries(tagCounts)
    .sort(([,a], [,b]) => b - a)
    .slice(0, limit)
    .map(([tag, count]) => ({ tag, count }));
}

// Get article statistics
export async function getArticleStats() {
  const articles = await loadArticles();
  
  const totalArticles = articles.length;
  const totalViews = articles.reduce((sum, article) => sum + article.stats.views, 0);
  const totalLikes = articles.reduce((sum, article) => sum + article.stats.likes, 0);
  const totalShares = articles.reduce((sum, article) => sum + article.stats.shares, 0);
  
  const categoryStats = {};
  articles.forEach(article => {
    if (!categoryStats[article.category]) {
      categoryStats[article.category] = 0;
    }
    categoryStats[article.category]++;
  });
  
  return {
    totalArticles,
    totalViews,
    totalLikes,
    totalShares,
    categoryStats,
    averageViews: Math.round(totalViews / totalArticles),
    averageLikes: Math.round(totalLikes / totalArticles)
  };
}

// Clear cache (useful for development)
export function clearArticlesCache() {
  articlesCache = null;
  lastCacheTime = 0;
}

// Get articles for homepage (mix of latest, featured, and trending)
export async function getHomepageArticles() {
  const [latest, featured, trending] = await Promise.all([
    getLatestArticles(6),
    getFeaturedArticles(4),
    getTrendingArticles(4)
  ]);
  
  return {
    latest,
    featured,
    trending
  };
}
