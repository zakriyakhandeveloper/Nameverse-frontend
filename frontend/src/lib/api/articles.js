/**
 * World-Class Articles API System
 * Enhanced with advanced caching, SEO optimization, and performance
 * 
 * Features:
 * - Multi-level caching strategy (memory, session, persistent)
 * - Advanced search with fuzzy matching and scoring
 * - Intelligent trending algorithm
 * - Enhanced error handling and retries
 * - SEO-optimized article structure
 * - User interaction features
 */

import * as articlesLocal from './articles-local';
import * as articlesEnhanced from './articles-enhanced';

// Choose API mode based on environment or preference
const USE_ENHANCED_API = process.env.NODE_ENV === 'production';

const normalizeArticle = (article = {}) => {
  const publishedAt = article.publishedAt || article.published_at || article.created_at || article.createdAt;
  const updatedAt = article.updatedAt || article.updated_at;
  const coverImageUrl = article.coverImageUrl || article.cover_image_url || article.image || null;
  const readTimeMinutes = article.readTimeMinutes || article.read_time_minutes || null;
  const excerpt = article.excerpt || article.summary || article.subtitle || '';
  const stats = article.stats || {};
  const views = article.views ?? stats.views ?? 0;
  const likes = article.likes ?? stats.likes ?? 0;
  const shares = article.shares ?? stats.shares ?? 0;
  const comments = article.comments ?? stats.comments ?? 0;

  return {
    ...article,
    excerpt,
    summary: article.summary || excerpt,
    publishedAt,
    updatedAt,
    coverImageUrl,
    readTimeMinutes,
    created_at: article.created_at || publishedAt,
    updated_at: article.updated_at || updatedAt,
    cover_image_url: article.cover_image_url || coverImageUrl,
    read_time_minutes: article.read_time_minutes || readTimeMinutes,
    // Backward-compatible aliases for UI components.
    views,
    likes,
    shares,
    comments,
    stats,
  };
};

const normalizeArticles = (items) => (Array.isArray(items) ? items.map(normalizeArticle) : []);

// Define all functions unconditionally to avoid ReferenceError
const getAllArticles = async (options = {}) => {
  if (USE_ENHANCED_API) {
    const result = await articlesEnhanced.getAllArticlesEnhanced(options);
    return normalizeArticles(result?.articles || []);
  }
  return normalizeArticles(await articlesLocal.getAllArticles());
};
const getLatestArticles = async (...args) => normalizeArticles(await articlesLocal.getLatestArticles(...args));
const getFeaturedArticles = async (...args) => normalizeArticles(await articlesLocal.getFeaturedArticles(...args));
const getArticleBySlug = async (...args) => {
  const article = USE_ENHANCED_API
    ? await articlesEnhanced.getArticleBySlugEnhanced(...args)
    : await articlesLocal.getArticleBySlug(...args);
  return article ? normalizeArticle(article) : null;
};
const getRelatedArticles = async (...args) => {
  const data = USE_ENHANCED_API
    ? await articlesEnhanced.getRelatedArticlesEnhanced(...args)
    : await articlesLocal.getRelatedArticles(...args);
  return normalizeArticles(data);
};
const searchArticles = async (...args) => {
  if (USE_ENHANCED_API) {
    const result = await articlesEnhanced.searchArticlesEnhanced(...args);
    return normalizeArticles(result?.articles || []);
  }
  return normalizeArticles(await articlesLocal.searchArticles(...args));
};
const getTrendingArticles = async (...args) => {
  const data = USE_ENHANCED_API
    ? await articlesEnhanced.getTrendingArticlesEnhanced(...args)
    : await articlesLocal.getTrendingArticles(...args);
  return normalizeArticles(data);
};
const clearArticlesCache = USE_ENHANCED_API ? articlesEnhanced.clearArticlesCacheEnhanced : articlesLocal.clearArticlesCache;
const getArticlesCacheStats = USE_ENHANCED_API
  ? articlesEnhanced.getArticlesCacheStats
  : () => ({ hitRate: 0, hits: 0, misses: 0 });
const preloadPopularArticles = USE_ENHANCED_API
  ? articlesEnhanced.preloadPopularArticles
  : () => Promise.resolve({});
const getArticlesByCategory = async (...args) => normalizeArticles(await articlesLocal.getArticlesByCategory(...args));
const getAllCategories = articlesLocal.getAllCategories;
const getArticlesByTag = async (...args) => normalizeArticles(await articlesLocal.getArticlesByTag(...args));
const getPopularTags = articlesLocal.getPopularTags;
const getArticleStats = articlesLocal.getArticleStats;
const getHomepageArticles = async (...args) => {
  const result = await articlesLocal.getHomepageArticles(...args);
  return {
    latest: normalizeArticles(result?.latest),
    featured: normalizeArticles(result?.featured),
    trending: normalizeArticles(result?.trending),
  };
};

// Export all functions
export {
  // Enhanced API functions
  getAllArticles,
  getArticleBySlug,
  getRelatedArticles,
  searchArticles,
  getTrendingArticles,
  clearArticlesCache,
  getArticlesCacheStats,
  preloadPopularArticles,
  
  // Local API functions
  getLatestArticles,
  getFeaturedArticles,
  getArticlesByCategory,
  getAllCategories,
  getArticlesByTag,
  getPopularTags,
  getArticleStats,
  getHomepageArticles
};

// Legacy function for backward compatibility
export async function countArticles() {
  const stats = await getArticleStats();
  return stats.totalArticles;
}

// Default export for backward compatibility
const articlesAPI = {
  getAllArticles,
  getLatestArticles,
  getFeaturedArticles,
  getTrendingArticles,
  getArticleBySlug,
  getArticlesByCategory,
  getAllCategories,
  searchArticles,
  getRelatedArticles,
  getArticlesByTag,
  getPopularTags,
  getArticleStats,
  getHomepageArticles,
  countArticles,
  clearArticlesCache,
  getCacheStats: getArticlesCacheStats,
  preloadPopularArticles
};

export default articlesAPI;
