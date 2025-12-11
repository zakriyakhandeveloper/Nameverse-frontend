/**
 * Stories API Module - World-Class Implementation
 * Comprehensive integration with all backend story endpoints
 *
 * Backend Endpoints:
 * - GET /api/stories?page=1&limit=30
 * - GET /api/stories/trending?limit=10
 * - GET /api/stories/new?limit=10
 * - GET /api/stories/category/:category?page=1&limit=20
 * - GET /api/stories/tags?tags=France,Medieval&page=1&limit=20
 * - GET /api/stories/search?q=adventure
 * - GET /api/stories/:locale/:slug
 * - GET /api/stories/:locale/chapter/:chapterId
 * - PUT /api/stories/:slug/view
 */

import { apiClient } from './client';

/**
 * Fetch all stories with pagination
 * @param {Object} params - Query parameters
 * @param {number} params.page - Page number (default: 1)
 * @param {number} params.limit - Items per page (default: 30)
 * @returns {Promise<Object>} Stories data with pagination
 */
export async function fetchStories(params = {}) {
  try {
    const { page = 1, limit = 30 } = params;

    const { data } = await apiClient.get('/stories', {
      params: { page, limit }
    });

    return {
      data: data.data || data.stories || [],
      pagination: data.pagination || {
        page,
        limit,
        total: 0,
        totalPages: 0,
      },
      success: data.success !== false,
    };
  } catch (error) {
    console.error('[Stories API] Error fetching stories:', error);
    return {
      data: [],
      pagination: { page: 1, limit: 30, total: 0, totalPages: 0 },
      success: false,
      error: error.message,
    };
  }
}

/**
 * Fetch trending stories
 * @param {number} limit - Number of stories to fetch (default: 10)
 * @returns {Promise<Object>} Trending stories
 */
export async function fetchTrendingStories(limit = 10) {
  try {
    const { data } = await apiClient.get('/stories/trending', {
      params: { limit }
    });

    return {
      data: data.data || data.stories || [],
      success: data.success !== false,
    };
  } catch (error) {
    console.error('[Stories API] Error fetching trending stories:', error);
    return {
      data: [],
      success: false,
      error: error.message,
    };
  }
}

/**
 * Fetch new/latest stories
 * @param {number} limit - Number of stories to fetch (default: 10)
 * @returns {Promise<Object>} Latest stories
 */
export async function fetchNewStories(limit = 10) {
  try {
    const { data } = await apiClient.get('/stories/new', {
      params: { limit }
    });

    return {
      data: data.data || data.stories || [],
      success: data.success !== false,
    };
  } catch (error) {
    console.error('[Stories API] Error fetching new stories:', error);
    return {
      data: [],
      success: false,
      error: error.message,
    };
  }
}

/**
 * Fetch stories by category
 * @param {string} category - Story category
 * @param {Object} params - Query parameters
 * @param {number} params.page - Page number (default: 1)
 * @param {number} params.limit - Items per page (default: 20)
 * @returns {Promise<Object>} Stories in category with pagination
 */
export async function fetchStoriesByCategory(category, params = {}) {
  try {
    if (!category) {
      console.warn('[Stories API] Category is required');
      return {
        data: [],
        pagination: { page: 1, limit: 20, total: 0, totalPages: 0 },
        success: false,
      };
    }

    const { page = 1, limit = 20 } = params;

    const { data } = await apiClient.get(`/stories/category/${category}`, {
      params: { page, limit }
    });

    return {
      data: data.data || data.stories || [],
      pagination: data.pagination || {
        page,
        limit,
        total: 0,
        totalPages: 0,
      },
      category,
      success: data.success !== false,
    };
  } catch (error) {
    console.error('[Stories API] Error fetching stories by category:', error);
    return {
      data: [],
      pagination: { page: 1, limit: 20, total: 0, totalPages: 0 },
      success: false,
      error: error.message,
    };
  }
}

/**
 * Fetch stories by tags
 * @param {Array<string>} tags - Array of tags
 * @param {Object} params - Query parameters
 * @param {number} params.page - Page number (default: 1)
 * @param {number} params.limit - Items per page (default: 20)
 * @returns {Promise<Object>} Stories matching tags with pagination
 */
export async function fetchStoriesByTags(tags, params = {}) {
  try {
    if (!tags || tags.length === 0) {
      console.warn('[Stories API] Tags are required');
      return {
        data: [],
        pagination: { page: 1, limit: 20, total: 0, totalPages: 0 },
        success: false,
      };
    }

    const { page = 1, limit = 20 } = params;
    const tagsString = Array.isArray(tags) ? tags.join(',') : tags;

    const { data } = await apiClient.get('/stories/tags', {
      params: { tags: tagsString, page, limit }
    });

    return {
      data: data.data || data.stories || [],
      pagination: data.pagination || {
        page,
        limit,
        total: 0,
        totalPages: 0,
      },
      tags: tags,
      success: data.success !== false,
    };
  } catch (error) {
    console.error('[Stories API] Error fetching stories by tags:', error);
    return {
      data: [],
      pagination: { page: 1, limit: 20, total: 0, totalPages: 0 },
      success: false,
      error: error.message,
    };
  }
}

/**
 * Search stories
 * @param {string} query - Search query
 * @param {Object} options - Search options
 * @returns {Promise<Object>} Search results
 */
export async function searchStories(query, options = {}) {
  try {
    if (!query || query.trim().length < 2) {
      return {
        data: [],
        count: 0,
        success: false,
        message: 'Query must be at least 2 characters',
      };
    }

    const { data } = await apiClient.get('/stories/search', {
      params: { q: query.trim(), ...options }
    });

    return {
      data: data.data || data.results || [],
      count: data.count || 0,
      success: data.success !== false,
      query,
    };
  } catch (error) {
    console.error('[Stories API] Error searching stories:', error);
    return {
      data: [],
      count: 0,
      success: false,
      error: error.message,
    };
  }
}

/**
 * Fetch story by locale and slug
 * @param {string} locale - Story locale (e.g., 'en', 'ur')
 * @param {string} slug - Story slug
 * @returns {Promise<Object|null>} Story details or null
 */
export async function fetchStoryBySlug(locale, slug) {
  try {
    if (!locale || !slug) {
      console.warn('[Stories API] Locale and slug are required');
      return null;
    }

    const { data } = await apiClient.get(`/stories/${locale}/${slug}`);

    if (data.success && data.data) {
      return data.data;
    }

    return data.story || null;
  } catch (error) {
    console.error('[Stories API] Error fetching story:', error);
    return null;
  }
}

/**
 * Fetch story chapter
 * @param {string} locale - Story locale
 * @param {string} chapterId - Chapter ID
 * @returns {Promise<Object|null>} Chapter details or null
 */
export async function fetchStoryChapter(locale, chapterId) {
  try {
    if (!locale || !chapterId) {
      console.warn('[Stories API] Locale and chapterId are required');
      return null;
    }

    const { data } = await apiClient.get(`/stories/${locale}/chapter/${chapterId}`);

    if (data.success && data.data) {
      return data.data;
    }

    return data.chapter || null;
  } catch (error) {
    console.error('[Stories API] Error fetching chapter:', error);
    return null;
  }
}

/**
 * Increment story view count
 * @param {string} slug - Story slug
 * @returns {Promise<Object>} Updated view count
 */
export async function incrementStoryView(slug) {
  try {
    if (!slug) {
      console.warn('[Stories API] Slug is required');
      return { success: false };
    }

    const { data } = await apiClient.put(`/stories/${slug}/view`);

    return {
      success: data.success !== false,
      views: data.views || 0,
    };
  } catch (error) {
    console.error('[Stories API] Error incrementing view:', error);
    return {
      success: false,
      error: error.message,
    };
  }
}

/**
 * Get story categories (helper function)
 * @returns {Array<string>} List of story categories
 */
export function getStoryCategories() {
  return [
    'Adventure',
    'Fantasy',
    'Mystery',
    'Historical',
    'Religious',
    'Moral',
    'Educational',
    'Folklore',
    'Biography',
    'Science',
  ];
}

// Export all functions
const storiesAPI = {
  fetchStories,
  fetchTrendingStories,
  fetchNewStories,
  fetchStoriesByCategory,
  fetchStoriesByTags,
  searchStories,
  fetchStoryBySlug,
  fetchStoryChapter,
  incrementStoryView,
  getStoryCategories,
};

export default storiesAPI;
