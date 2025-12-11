/**
 * Articles API Client - Optimized for Backend Endpoints
 * Replaces Supabase with MongoDB backend API calls
 * Features:
 * - Full integration with backend API
 * - Response caching via apiClient
 * - Proper error handling
 * - Data transformation for frontend compatibility
 */

import { apiClient } from './client';
import { env } from '@/config/env';

const API_VERSION = '/api';
const API_BASE = env.api.baseUrl;

/**
 * Transform MongoDB article to match Supabase format for frontend compatibility
 */
function transformArticle(article) {
  return {
    id: article._id,
    slug: article.slug,
    title: article.title,
    subtitle: article.subtitle,
    author: article.author,
    category: article.category,
    tags: article.tags || [],
    seo_title: article.seo_title,
    seo_description: article.seo_description,
    seo_keywords: article.seo_keywords || [],
    cover_image_url: article.cover_image_url,
    image: article.cover_image_url, // Alias for compatibility
    excerpt: article.excerpt,
    summary: article.excerpt, // Alias for compatibility
    content: article.content,
    read_time_minutes: article.read_time_minutes,
    name_links: article.name_links || [],
    status: article.status,
    views: article.views || 0,
    likes: article.likes || 0,
    // Map MongoDB timestamps
    created_at: article.publishedAt || article.createdAt,
    updated_at: article.updatedAt || article.updatedAt,
  };
}

/**
 * Fetch latest articles
 * Backend endpoint: GET /api/articles/latest?limit=10
 * @param {number} limit - number of articles to fetch
 * @returns {Promise<Array>} articles
 */
export async function getLatestArticles(limit = 10) {
  try {
    const { data } = await apiClient.get(`${API_VERSION}/articles/latest`, {
      params: { limit },
    });

    const articles = data.success ? data.data : [];
    return articles.map(transformArticle);
  } catch (error) {
    console.error('Error fetching latest articles:', error);
    return [];
  }
}

/**
 * Fetch all articles with pagination
 * Backend endpoint: GET /api/articles?page=1&limit=50
 * @param {Object} options - pagination and filter options
 * @returns {Promise<Object>} articles with pagination
 */
export async function getAllArticles(options = {}) {
  try {
    const { page = 1, limit = 50, category, sort = 'recent' } = options;
    
    const params = { page, limit, sort };
    if (category) {
      params.category = category;
    }

    const { data } = await apiClient.get(`${API_VERSION}/articles`, { params });

    const articles = data.success ? data.data : [];
    return {
      articles: articles.map(transformArticle),
      pagination: data.pagination || { totalPages: 1, totalCount: 0, currentPage: page },
    };
  } catch (error) {
    console.error('Error fetching all articles:', error);
    return {
      articles: [],
      pagination: { totalPages: 1, totalCount: 0, currentPage: 1 },
    };
  }
}

/**
 * Fetch all unique article categories
 * Backend endpoint: GET /api/articles/categories
 * @returns {Promise<Array>} categories
 */
export async function getAllCategories() {
  try {
    const { data } = await apiClient.get(`${API_VERSION}/articles/categories`);

    return data.success ? data.data : [];
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

/**
 * Fetch articles by category
 * Backend endpoint: GET /api/articles?category=X&limit=10
 * @param {string} category - category name
 * @param {number} limit - number of articles to fetch
 * @returns {Promise<Array>} articles
 */
export async function getArticlesByCategory(category, limit = 10) {
  try {
    const { data } = await apiClient.get(`${API_VERSION}/articles/category/${encodeURIComponent(category)}`, {
      params: { limit },
    });

    const articles = data.success ? data.data : [];
    return articles.map(transformArticle);
  } catch (error) {
    console.error('Error fetching articles by category:', error);
    return [];
  }
}

/**
 * Fetch single article by slug
 * Backend endpoint: GET /api/articles/:slug
 * @param {string} slug - article slug
 * @returns {Promise<Object>} article
 */
export async function getArticleBySlug(slug) {
  try {
    const { data } = await apiClient.get(`${API_VERSION}/articles/${encodeURIComponent(slug)}`);

    const article = data.success ? data.data : null;
    return article ? transformArticle(article) : null;
  } catch (error) {
    if (error.status === 404) {
      return null;
    }
    console.error('Error fetching article by slug:', error);
    return null;
  }
}

/**
 * Search articles by keyword
 * Backend endpoint: GET /api/articles/search?q=keyword
 * @param {string} keyword - search keyword
 * @param {Object} options - search options
 * @returns {Promise<Array>} articles
 */
export async function searchArticles(keyword, options = {}) {
  try {
    const params = {
      q: keyword,
      ...options,
    };

    const { data } = await apiClient.get(`${API_VERSION}/articles/search`, { params });

    const articles = data.success ? data.data : [];
    return articles.map(transformArticle);
  } catch (error) {
    console.error('Error searching articles:', error);
    return [];
  }
}

/**
 * Count total articles
 * @returns {Promise<number>} total articles
 */
export async function countArticles() {
  try {
    const { data } = await apiClient.get(`${API_VERSION}/articles`, {
      params: { limit: 1 },
    });

    return data.pagination?.total || data.pagination?.totalCount || 0;
  } catch (error) {
    console.error('Error counting articles:', error);
    return 0;
  }
}

// Export all article functions
const articlesAPI = {
  getLatestArticles,
  getAllArticles,
  getAllCategories,
  getArticlesByCategory,
  getArticleBySlug,
  searchArticles,
  countArticles,
};

export default articlesAPI;

