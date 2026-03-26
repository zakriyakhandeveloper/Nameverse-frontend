/**
 * World-Class Articles API System
 * Enhanced features: World-class caching, SEO optimization, and performance
 */

// Advanced caching system with multiple strategies
class ArticleCache {
  constructor() {
    this.memoryCache = new Map();
    this.sessionCache = new Map();
    this.persistentCache = new Map();
    this.cacheStats = {
      hits: 0,
      misses: 0,
      memorySize: 0
    };
  }

  // Multi-level cache strategy
  get(key, options = {}) {
    const { useMemory = true, useSession = true, usePersistent = true } = options;
    
    // Try memory cache first (fastest)
    if (useMemory && this.memoryCache.has(key)) {
      this.cacheStats.hits++;
      return this.memoryCache.get(key);
    }

    // Try session cache (medium speed)
    if (useSession && typeof window !== 'undefined') {
      const sessionData = sessionStorage.getItem(`article_${key}`);
      if (sessionData) {
        const parsed = JSON.parse(sessionData);
        this.memoryCache.set(key, parsed); // Promote to memory
        this.cacheStats.hits++;
        return parsed;
      }
    }

    // Try persistent cache (slowest but persistent)
    if (usePersistent && typeof window !== 'undefined') {
      const persistentData = localStorage.getItem(`article_${key}`);
      if (persistentData) {
        const parsed = JSON.parse(persistentData);
        this.memoryCache.set(key, parsed); // Promote to memory
        this.sessionCache.set(key, parsed); // Promote to session
        this.cacheStats.hits++;
        return parsed;
      }
    }

    this.cacheStats.misses++;
    return null;
  }

  set(key, value, options = {}) {
    const { 
      useMemory = true, 
      useSession = true, 
      usePersistent = true,
      ttl = 300000 // 5 minutes default
    } = options;

    const cacheEntry = {
      data: value,
      timestamp: Date.now(),
      ttl: Date.now() + ttl
    };

    // Memory cache (immediate)
    if (useMemory) {
      this.memoryCache.set(key, cacheEntry);
      this.cacheStats.memorySize = this.memoryCache.size;
    }

    // Session cache (persists for session)
    if (useSession && typeof window !== 'undefined') {
      sessionStorage.setItem(`article_${key}`, JSON.stringify(cacheEntry));
      this.sessionCache.set(key, cacheEntry);
    }

    // Persistent cache (persists across sessions)
    if (usePersistent && typeof window !== 'undefined') {
      localStorage.setItem(`article_${key}`, JSON.stringify(cacheEntry));
      this.persistentCache.set(key, cacheEntry);
    }
  }

  clear() {
    this.memoryCache.clear();
    this.sessionCache.clear();
    this.persistentCache.clear();
    
    if (typeof window !== 'undefined') {
      // Clear all article-related storage
      Object.keys(sessionStorage).forEach(key => {
        if (key.startsWith('article_')) {
          sessionStorage.removeItem(key);
        }
      });
      
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith('article_')) {
          localStorage.removeItem(key);
        }
      });
    }
    
    this.cacheStats = { hits: 0, misses: 0, memorySize: 0 };
  }

  getStats() {
    return {
      ...this.cacheStats,
      hitRate: this.cacheStats.hits / (this.cacheStats.hits + this.cacheStats.misses) * 100
    };
  }
}

// Global cache instance
const articleCache = new ArticleCache();

function getBaseUrl() {
  if (typeof window !== 'undefined') return window.location.origin;
  if (process.env.NODE_ENV !== 'production') return 'http://localhost:5000';
  const vercelUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null;
  return process.env.NEXT_PUBLIC_SITE_URL || vercelUrl || 'http://localhost:5000';
}

// Enhanced article loader with error handling and retries
async function loadArticlesEnhanced(retries = 3) {
  const cacheKey = 'all_articles';
  
  // Check cache first
  const cached = articleCache.get(cacheKey);
  if (cached && cached.ttl > Date.now()) {
    return cached.data;
  }

  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

      let response = await fetch(`${getBaseUrl()}/articles-enhanced.json`, {
        signal: controller.signal,
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        }
      });

      // Graceful fallback when enhanced dataset is unavailable.
      if (response.status === 404) {
        response = await fetch(`${getBaseUrl()}/articles.json`, {
          signal: controller.signal,
          headers: {
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache'
          }
        });
      }

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      const data = await response.json();

      clearTimeout(timeoutId);
      
      // Validate data structure
      if (!data || !data.articles || !Array.isArray(data.articles)) {
        throw new Error('Invalid article data structure');
      }

      // Cache the valid data
      articleCache.set(cacheKey, data.articles, { ttl: 600000 }); // 10 minutes
      
      return data.articles;
    } catch (error) {
      const shouldLog = !(typeof error?.message === 'string' && error.message.includes('HTTP 404'));
      if (shouldLog) {
        console.error(`Attempt ${attempt + 1} failed:`, error.message);
      }
      
      if (attempt === retries - 1) {
        // Return fallback data on final failure
        return getFallbackArticles();
      }
      
      // Wait before retry
      await new Promise(resolve => setTimeout(resolve, 1000 * (attempt + 1)));
    }
  }
}

// Fallback articles for offline/error scenarios
function getFallbackArticles() {
  return [
    {
      id: 'fallback-1',
      slug: 'coming-soon',
      title: 'More Articles Coming Soon',
      subtitle: 'We\'re working on amazing content for you',
      summary: 'Check back soon for more beautiful baby names and naming guides.',
      content: '<p>We\'re currently preparing more amazing content for you. Please check back soon!</p>',
      category: 'Baby Naming Tips',
      tags: ['coming soon'],
      author: 'NameVerse Team',
      publishedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      readTimeMinutes: 2,
      featured: false,
      trending: false,
      coverImageUrl: '/images/articles/coming-soon.jpg',
      seo: {
        title: 'More Articles Coming Soon',
        description: 'Check back soon for more baby naming content',
        keywords: ['baby names', 'coming soon']
      },
      stats: { views: 0, likes: 0, shares: 0, comments: 0 },
      relatedNames: [],
      tableOfContents: [],
      faqs: []
    }
  ];
}

// Enhanced API functions with world-class features
export async function getAllArticlesEnhanced(options = {}) {
  const { 
    page = 1, 
    limit = 50, 
    category = null, 
    sort = 'publishedAt',
    order = 'desc',
    includeStats = false 
  } = options;

  const articles = await loadArticlesEnhanced();
  
  let filtered = articles;
  
  // Apply category filter
  if (category) {
    filtered = articles.filter(article => article.category === category);
  }
  
  // Apply sorting
  filtered.sort((a, b) => {
    let aValue = a[sort] || 0;
    let bValue = b[sort] || 0;
    
    if (sort === 'stats.views' || sort === 'stats.likes') {
      aValue = a.stats?.[sort.split('.')[1]] || 0;
      bValue = b.stats?.[sort.split('.')[1]] || 0;
    }
    
    if (order === 'desc') {
      return bValue > aValue ? 1 : bValue < aValue ? -1 : 0;
    } else {
      return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
    }
  });
  
  // Apply pagination
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedArticles = filtered.slice(startIndex, endIndex);
  
  const result = {
    articles: paginatedArticles,
    pagination: {
      currentPage: page,
      totalPages: Math.ceil(filtered.length / limit),
      totalArticles: filtered.length,
      hasNextPage: endIndex < filtered.length,
      hasPreviousPage: page > 1
    }
  };
  
  if (includeStats) {
    result.cacheStats = articleCache.getStats();
    result.performance = {
      loadTime: Date.now(),
      source: 'enhanced-api'
    };
  }
  
  return result;
}

// Get article by slug with enhanced caching
export async function getArticleBySlugEnhanced(slug, options = {}) {
  const { includeRelated = true, includeStats = false } = options;
  
  const cacheKey = `article_${slug}`;
  
  // Check cache first
  const cached = articleCache.get(cacheKey);
  if (cached && cached.ttl > Date.now()) {
    const article = cached.data;
    
    if (includeRelated) {
      article.related = await getRelatedArticlesEnhanced(slug, 4);
    }
    
    if (includeStats) {
      article.cacheStats = articleCache.getStats();
    }
    
    return article;
  }

  // Load all articles and find the one we need
  const allArticles = await loadArticlesEnhanced();
  const article = allArticles.find(a => a.slug === slug);
  
  if (article) {
    // Cache the found article
    articleCache.set(cacheKey, article, { ttl: 900000 }); // 15 minutes
    
    if (includeRelated) {
      article.related = await getRelatedArticlesEnhanced(slug, 4);
    }
    
    return article;
  }
  
  return null;
}

// Enhanced related articles with better matching algorithm
export async function getRelatedArticlesEnhanced(currentSlug, limit = 4) {
  const cacheKey = `related_${currentSlug}`;
  
  // Check cache
  const cached = articleCache.get(cacheKey);
  if (cached && cached.ttl > Date.now()) {
    return cached.data;
  }

  const allArticles = await loadArticlesEnhanced();
  const currentArticle = allArticles.find(a => a.slug === currentSlug);
  
  if (!currentArticle) {
    return [];
  }

  // Advanced related article algorithm
  const scored = allArticles
    .filter(article => article.slug !== currentSlug)
    .map(article => {
      let score = 0;
      
      // Same category (high weight)
      if (article.category === currentArticle.category) {
        score += 10;
      }
      
      // Shared tags (medium weight)
      const sharedTags = article.tags?.filter(tag => 
        currentArticle.tags?.includes(tag)
      ) || [];
      score += sharedTags.length * 5;
      
      // Similar title words (low weight)
      const currentWords = currentArticle.title.toLowerCase().split(' ');
      const articleWords = article.title.toLowerCase().split(' ');
      const sharedWords = currentWords.filter(word => 
        articleWords.includes(word) && word.length > 3
      );
      score += sharedWords.length * 2;
      
      // Recency bonus (very low weight)
      const daysDiff = (Date.now() - new Date(article.publishedAt)) / (1000 * 60 * 60 * 24);
      if (daysDiff < 30) score += 1;
      
      return { article, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.article);

  // Cache results
  articleCache.set(cacheKey, scored, { ttl: 600000 }); // 10 minutes
  
  return scored;
}

// Enhanced search with fuzzy matching and ranking
export async function searchArticlesEnhanced(query, options = {}) {
  const { 
    limit = 10, 
    category = null, 
    fuzzy = true,
    weights = {
      title: 3,
      content: 2,
      tags: 4,
      summary: 2.5
    }
  } = options;

  const cacheKey = `search_${query}_${category}_${limit}`;
  
  // Check cache
  const cached = articleCache.get(cacheKey);
  if (cached && cached.ttl > Date.now()) {
    return cached.data;
  }

  const allArticles = await loadArticlesEnhanced();
  const searchQuery = query.toLowerCase().trim();
  
  if (!searchQuery) {
    return { articles: [], total: 0, query };
  }

  let filtered = allArticles;
  
  // Apply category filter first
  if (category) {
    filtered = filtered.filter(article => article.category === category);
  }

  // Search with scoring
  const scored = filtered
    .map(article => {
      let score = 0;
      const title = article.title.toLowerCase();
      const content = article.content.toLowerCase();
      const summary = article.summary?.toLowerCase() || '';
      const tags = article.tags?.map(tag => tag.toLowerCase()) || [];
      
      // Exact title match (highest score)
      if (title === searchQuery) score += 100;
      
      // Title contains query
      if (title.includes(searchQuery)) {
        score += weights.title * 10;
      }
      
      // Fuzzy matching in title
      if (fuzzy) {
        const titleWords = title.split(' ');
        const queryWords = searchQuery.split(' ');
        queryWords.forEach(qWord => {
          titleWords.forEach(tWord => {
            if (tWord.includes(qWord) && qWord.length > 2) {
              score += weights.title * 2;
            }
          });
        });
      }
      
      // Content matching
      if (content.includes(searchQuery)) {
        score += weights.content * 5;
      }
      
      // Summary matching
      if (summary.includes(searchQuery)) {
        score += weights.summary * 3;
      }
      
      // Tag matching
      tags.forEach(tag => {
        if (tag.includes(searchQuery)) {
          score += weights.tags * 8;
        }
      });
      
      // Popularity boost
      const views = article.stats?.views || 0;
      const likes = article.stats?.likes || 0;
      score += Math.log(views + likes) * 0.1;
      
      return { article, score };
    })
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.article);

  const result = {
    articles: scored,
    total: scored.length,
    query,
    category,
    options
  };
  
  // Cache search results
  articleCache.set(cacheKey, result, { ttl: 180000 }); // 3 minutes
  
  return result;
}

// Get trending articles with advanced algorithm
export async function getTrendingArticlesEnhanced(limit = 8, timeWindow = 7) {
  const cacheKey = `trending_${limit}_${timeWindow}`;
  
  // Check cache
  const cached = articleCache.get(cacheKey);
  if (cached && cached.ttl > Date.now()) {
    return cached.data;
  }

  const allArticles = await loadArticlesEnhanced();
  const now = Date.now();
  const windowStart = now - (timeWindow * 24 * 60 * 60 * 1000);
  
  // Advanced trending algorithm
  const scored = allArticles
    .filter(article => {
      const publishedDate = new Date(article.publishedAt).getTime();
      return publishedDate >= windowStart;
    })
    .map(article => {
      const stats = article.stats || {};
      const views = stats.views || 0;
      const likes = stats.likes || 0;
      const shares = stats.shares || 0;
      const comments = stats.comments || 0;
      
      // Engagement score
      const engagementScore = (likes * 2) + (shares * 3) + (comments * 1);
      
      // Recency factor
      const ageInHours = (now - new Date(article.publishedAt).getTime()) / (1000 * 60 * 60);
      const recencyFactor = Math.max(0.1, 1 - (ageInHours / (24 * timeWindow)));
      
      // Final trending score
      const trendingScore = (views * 0.3) + (engagementScore * 0.5) * recencyFactor;
      
      return { article, score: trendingScore };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.article);

  // Cache results
  articleCache.set(cacheKey, scored, { ttl: 300000 }); // 5 minutes
  
  return scored;
}

// Clear cache utility
export function clearArticlesCacheEnhanced() {
  articleCache.clear();
}

// Get cache statistics
export function getArticlesCacheStats() {
  return articleCache.getStats();
}

// Preload popular articles for better UX
export async function preloadPopularArticles() {
  const allArticles = await loadArticlesEnhanced();
  const latest = [...allArticles]
    .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
    .slice(0, 6);
  const featured = [...allArticles]
    .filter((article) => article.featured)
    .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
    .slice(0, 4);
  const trending = await getTrendingArticlesEnhanced(6);
  
  return {
    latest,
    trending,
    featured,
    loadedAt: Date.now()
  };
}

// Default export
export default {
  getAllArticles: getAllArticlesEnhanced,
  getArticleBySlug: getArticleBySlugEnhanced,
  getRelatedArticles: getRelatedArticlesEnhanced,
  searchArticles: searchArticlesEnhanced,
  getTrendingArticles: getTrendingArticlesEnhanced,
  clearCache: clearArticlesCacheEnhanced,
  getCacheStats: getArticlesCacheStats,
  preloadPopular: preloadPopularArticles
};
