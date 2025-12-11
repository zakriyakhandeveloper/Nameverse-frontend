/**
 * Names API Module - World-Class Implementation
 * Comprehensive integration with ALL backend name endpoints
 *
 * Backend Endpoints:
 * - GET /api/names?religion=islamic&limit=20&page=1
 * - GET /api/name/letter/:letter?religion=islamic&page=1&perPage=150
 * - GET /api/names/:religion/:slug
 * - GET /api/category/:religion/:category?page=1&perPage=20
 * - GET /api/gender/:gender/:religion?page=1&perPage=50
 * - GET /api/origin/:religion/:origin?page=1&perPage=50
 * - GET /api/language/:religion/:language?page=1&perPage=50
 * - GET /api/trending?religion=global&page=1&limit=20
 * - GET /api/search?q=ali&religion=islamic&limit=50
 * - GET /api/filters
 * - GET /api/religion/:religion/filters
 */

import { apiClient } from './client';

/**
 * Fetch filters for a specific religion
 * Backend: GET /api/filters/:religion
 * @param {string} religion - Religion category (islamic, christian, hindu)
 * @returns {Promise<Object>} Filters object with genders, origins, letters
 */
export async function fetchFilters(religion) {
  try {
    if (!religion) {
      console.warn('[API] Religion is required for fetching filters');
      return {
        genders: [],
        origins: [],
        letters: [],
        totalNames: 0,
      };
    }

    const { data } = await apiClient.get(`/filters/${religion}`);

    if (data.success && data.filters) {
      return {
        genders: data.filters.genders || [],
        origins: data.filters.origins || [],
        letters: data.filters.letters || [],
        totalNames: data.totalNames || 0,
      };
    }

    return {
      genders: [],
      origins: [],
      letters: [],
      totalNames: 0,
    };
  } catch (error) {
    console.error('[API] Error fetching filters:', error);
    return {
      genders: [],
      origins: [],
      letters: [],
      totalNames: 0,
    };
  }
}

/**
 * Fetch names with pagination and filtering
 * Backend: GET /api/names
 * @param {Object} params - Query parameters
 * @param {string} params.religion - Religion (required)
 * @param {number} params.page - Page number (default: 1)
 * @param {number} params.limit - Items per page (default: 50)
 * @param {string} params.gender - Filter by gender
 * @param {string} params.origin - Filter by origin
 * @param {string} params.startsWith - Filter by starting letter
 * @param {string} params.search - Search query
 * @param {string} params.sort - Sort order (asc/desc)
 * @returns {Promise<Object>} Names data with pagination
 */
export async function fetchNames(params = {}) {
  try {
    const { religion, page = 1, limit = 50, ...filters } = params;

    if (!religion) {
      console.warn('[API] Religion is required for fetching names');
      return {
        data: [],
        pagination: {
          page: 1,
          limit: 50,
          total: 0,
          totalPages: 0,
        },
        success: false,
      };
    }

    const queryParams = {
      religion,
      page,
      limit,
      ...filters,
    };

    const { data } = await apiClient.get('/names', { params: queryParams });

    return {
      data: data.data || [],
      pagination: data.pagination || {
        page: 1,
        limit: 50,
        total: 0,
        totalPages: 0,
      },
      success: data.success !== false,
    };
  } catch (error) {
    console.error('[API] Error fetching names:', error);
    return {
      data: [],
      pagination: {
        page: 1,
        limit: 50,
        total: 0,
        totalPages: 0,
      },
      success: false,
    };
  }
}

/**
 * Fetch single name by religion and slug
 * Backend: GET /api/names/:religion/:slug
 * @param {string} religion - Religion category
 * @param {string} slug - Name slug
 * @returns {Promise<Object|null>} Name details or null
 */
export async function fetchNameDetail(religion, slug) {
  try {
    if (!religion || !slug) {
      console.warn('[API] Religion and slug are required');
      return null;
    }

    const { data } = await apiClient.get(`/names/${religion}/${slug}`);

    if (data.success && data.data) {
      return data.data;
    }

    return null;
  } catch (error) {
    console.error('[API] Error fetching name detail:', error);
    return null;
  }
}

/**
 * Search names across religions
 * Backend: GET /api/search?q=query&religion=X&limit=20
 * @param {string} query - Search query (min 2 characters)
 * @param {Object} options - Search options
 * @param {string} options.religion - Filter by religion (optional)
 * @param {number} options.limit - Results limit (default: 20)
 * @returns {Promise<Object>} Search results
 */
export async function searchNames(query, options = {}) {
  try {
    if (!query || query.trim().length < 2) {
      return {
        data: [],
        count: 0,
        success: false,
        message: 'Query must be at least 2 characters',
      };
    }

    const params = {
      q: query.trim(),
      limit: options.limit || 20,
      ...(options.religion && { religion: options.religion }),
    };

    const { data } = await apiClient.get('/search', { params });

    return {
      data: data.data || [],
      count: data.count || 0,
      success: data.success !== false,
      query: data.query || query,
    };
  } catch (error) {
    console.error('[API] Error searching names:', error);
    return {
      data: [],
      count: 0,
      success: false,
      error: error.message,
    };
  }
}

/**
 * Legacy: Fetch names using old endpoint
 * Backend: GET /api/religion/:religion
 * @deprecated Use fetchNames() instead
 */
export async function fetchNamesLegacy(params = {}) {
  try {
    const { religion, ...rest } = params;

    if (!religion) {
      console.warn('[API] Religion is required');
      return {
        data: [],
        pagination: { page: 1, limit: 50, totalCount: 0, totalPages: 0 },
        success: false,
      };
    }

    const { data } = await apiClient.get(`/religion/${religion}`, { params: rest });

    return {
      data: data.data || [],
      pagination: data.pagination || { page: 1, limit: 50, totalCount: 0, totalPages: 0 },
      success: data.success !== false,
    };
  } catch (error) {
    console.error('[API] Error fetching names (legacy):', error);
    return {
      data: [],
      pagination: { page: 1, limit: 50, totalCount: 0, totalPages: 0 },
      success: false,
    };
  }
}

/**
 * Legacy: Fetch filters using old endpoint
 * Backend: GET /api/religion/:religion/filters
 * @deprecated Use fetchFilters() instead
 */
export async function fetchFiltersLegacy(religion) {
  try {
    if (!religion) {
      return { genders: [], origins: [], firstLetters: [], totalNames: 0 };
    }

    const { data } = await apiClient.get(`/religion/${religion}/filters`);

    if (data.success && data.filters) {
      return {
        genders: data.filters.genders || [],
        origins: data.filters.origins || [],
        firstLetters: data.filters.firstLetters || [],
        totalNames: data.totalNames || 0,
      };
    }

    return { genders: [], origins: [], firstLetters: [], totalNames: 0 };
  } catch (error) {
    console.error('[API] Error fetching filters (legacy):', error);
    return { genders: [], origins: [], firstLetters: [], totalNames: 0 };
  }
}

/**
 * Legacy: Fetch single name using old endpoint
 * Backend: GET /api/names/:religion/:slug
 * @deprecated Use fetchNameDetail() instead
 */
export async function fetchNameDetailLegacy(religion, slug) {
  try {
    if (!religion || !slug) {
      return null;
    }

    const { data } = await apiClient.get(`/names/${religion}/${slug}`);

    if (data.success && data.data) {
      return data.data;
    }

    return null;
  } catch (error) {
    console.error('[API] Error fetching name detail (legacy):', error);
    return null;
  }
}

/**
 * Fetch names by letter
 * Backend: GET /api/name/letter/:letter?religion=islamic&page=1&perPage=150
 * @param {string} letter - First letter of names
 * @param {Object} params - Query parameters
 * @returns {Promise<Object>} Names starting with letter
 */
export async function fetchNamesByLetter(letter, params = {}) {
  try {
    if (!letter) {
      console.warn('[API] Letter is required');
      return {
        data: [],
        pagination: { page: 1, perPage: 150, total: 0, totalPages: 0 },
        success: false,
      };
    }

    const { religion = 'islamic', page = 1, perPage = 150 } = params;

    const { data } = await apiClient.get(`/name/letter/${letter}`, {
      params: { religion, page, perPage }
    });

    return {
      data: data.data || data.names || [],
      pagination: data.pagination || {
        page,
        perPage,
        total: 0,
        totalPages: 0,
      },
      letter,
      success: data.success !== false,
    };
  } catch (error) {
    console.error('[API] Error fetching names by letter:', error);
    return {
      data: [],
      pagination: { page: 1, perPage: 150, total: 0, totalPages: 0 },
      success: false,
    };
  }
}

/**
 * Fetch names by category
 * Backend: GET /api/category/:religion/:category?page=1&perPage=20
 * @param {string} religion - Religion category
 * @param {string} category - Name category
 * @param {Object} params - Query parameters
 * @returns {Promise<Object>} Names in category
 */
export async function fetchNamesByCategory(religion, category, params = {}) {
  try {
    if (!religion || !category) {
      console.warn('[API] Religion and category are required');
      return {
        data: [],
        pagination: { page: 1, perPage: 20, total: 0, totalPages: 0 },
        success: false,
      };
    }

    const { page = 1, perPage = 20 } = params;

    const { data } = await apiClient.get(`/category/${religion}/${category}`, {
      params: { page, perPage }
    });

    return {
      data: data.data || data.names || [],
      pagination: data.pagination || {
        page,
        perPage,
        total: 0,
        totalPages: 0,
      },
      category,
      success: data.success !== false,
    };
  } catch (error) {
    console.error('[API] Error fetching names by category:', error);
    return {
      data: [],
      pagination: { page: 1, perPage: 20, total: 0, totalPages: 0 },
      success: false,
    };
  }
}

/**
 * Fetch names by gender
 * Backend: GET /api/gender/:gender/:religion?page=1&perPage=50
 * @param {string} gender - Gender (Male/Female)
 * @param {string} religion - Religion category
 * @param {Object} params - Query parameters
 * @returns {Promise<Object>} Names by gender
 */
export async function fetchNamesByGender(gender, religion, params = {}) {
  try {
    if (!gender || !religion) {
      console.warn('[API] Gender and religion are required');
      return {
        data: [],
        pagination: { page: 1, perPage: 50, total: 0, totalPages: 0 },
        success: false,
      };
    }

    const { page = 1, perPage = 50 } = params;

    const { data } = await apiClient.get(`/gender/${gender}/${religion}`, {
      params: { page, perPage }
    });

    return {
      data: data.data || data.names || [],
      pagination: data.pagination || {
        page,
        perPage,
        total: 0,
        totalPages: 0,
      },
      gender,
      success: data.success !== false,
    };
  } catch (error) {
    console.error('[API] Error fetching names by gender:', error);
    return {
      data: [],
      pagination: { page: 1, perPage: 50, total: 0, totalPages: 0 },
      success: false,
    };
  }
}

/**
 * Fetch names by origin
 * Backend: GET /api/origin/:religion/:origin?page=1&perPage=50
 * @param {string} religion - Religion category
 * @param {string} origin - Name origin
 * @param {Object} params - Query parameters
 * @returns {Promise<Object>} Names by origin
 */
export async function fetchNamesByOrigin(religion, origin, params = {}) {
  try {
    if (!religion || !origin) {
      console.warn('[API] Religion and origin are required');
      return {
        data: [],
        pagination: { page: 1, perPage: 50, total: 0, totalPages: 0 },
        success: false,
      };
    }

    const { page = 1, perPage = 50 } = params;

    const { data } = await apiClient.get(`/origin/${religion}/${origin}`, {
      params: { page, perPage }
    });

    return {
      data: data.data || data.names || [],
      pagination: data.pagination || {
        page,
        perPage,
        total: 0,
        totalPages: 0,
      },
      origin,
      success: data.success !== false,
    };
  } catch (error) {
    console.error('[API] Error fetching names by origin:', error);
    return {
      data: [],
      pagination: { page: 1, perPage: 50, total: 0, totalPages: 0 },
      success: false,
    };
  }
}

/**
 * Fetch names by language
 * Backend: GET /api/language/:religion/:language?page=1&perPage=50
 * @param {string} religion - Religion category
 * @param {string} language - Name language
 * @param {Object} params - Query parameters
 * @returns {Promise<Object>} Names by language
 */
export async function fetchNamesByLanguage(religion, language, params = {}) {
  try {
    if (!religion || !language) {
      console.warn('[API] Religion and language are required');
      return {
        data: [],
        pagination: { page: 1, perPage: 50, total: 0, totalPages: 0 },
        success: false,
      };
    }

    const { page = 1, perPage = 50 } = params;

    const { data } = await apiClient.get(`/language/${religion}/${language}`, {
      params: { page, perPage }
    });

    return {
      data: data.data || data.names || [],
      pagination: data.pagination || {
        page,
        perPage,
        total: 0,
        totalPages: 0,
      },
      language,
      success: data.success !== false,
    };
  } catch (error) {
    console.error('[API] Error fetching names by language:', error);
    return {
      data: [],
      pagination: { page: 1, perPage: 50, total: 0, totalPages: 0 },
      success: false,
    };
  }
}

/**
 * Fetch trending names
 * Backend: GET /api/trending?religion=global&page=1&limit=20
 * @param {Object} params - Query parameters
 * @returns {Promise<Object>} Trending names
 */
export async function fetchTrendingNames(params = {}) {
  try {
    const { religion = 'global', page = 1, limit = 20 } = params;

    const { data } = await apiClient.get('/trending', {
      params: { religion, page, limit }
    });

    return {
      data: data.data || data.names || [],
      pagination: data.pagination || {
        page,
        limit,
        total: 0,
        totalPages: 0,
      },
      religion,
      success: data.success !== false,
    };
  } catch (error) {
    console.error('[API] Error fetching trending names:', error);
    return {
      data: [],
      pagination: { page: 1, limit: 20, total: 0, totalPages: 0 },
      success: false,
    };
  }
}

/**
 * Fetch all filter options
 * Backend: GET /api/filters
 * @returns {Promise<Object>} All available filters
 */
export async function fetchAllFilters() {
  try {
    const { data } = await apiClient.get('/filters');

    return {
      filters: data.filters || data.data || {},
      success: data.success !== false,
    };
  } catch (error) {
    console.error('[API] Error fetching all filters:', error);
    return {
      filters: {},
      success: false,
    };
  }
}

/**
 * Fetch religion-specific filters
 * Backend: GET /api/religion/:religion/filters
 * @param {string} religion - Religion category
 * @returns {Promise<Object>} Religion-specific filters
 */
export async function fetchReligionFilters(religion) {
  try {
    if (!religion) {
      console.warn('[API] Religion is required');
      return {
        filters: {},
        success: false,
      };
    }

    const { data } = await apiClient.get(`/religion/${religion}/filters`);

    return {
      filters: data.filters || data.data || {},
      religion,
      success: data.success !== false,
    };
  } catch (error) {
    console.error('[API] Error fetching religion filters:', error);
    return {
      filters: {},
      success: false,
    };
  }
}

/**
 * Fetch names with advanced filters including lucky attributes
 * Backend: GET /api/names with multiple query params
 * @param {Object} filters - Advanced filter options
 * @returns {Promise<Object>} Filtered names
 */
export async function fetchNamesWithAdvancedFilters(filters = {}) {
  try {
    const {
      religion,
      gender,
      origin,
      language,
      category,
      alphabet,
      luckyDay,
      luckyColor,
      luckyStone,
      page = 1,
      limit = 50,
    } = filters;

    if (!religion) {
      console.warn('[API] Religion is required');
      return {
        data: [],
        pagination: { page: 1, limit: 50, total: 0, totalPages: 0 },
        success: false,
      };
    }

    const params = {
      religion,
      page,
      limit,
    };

    if (gender) params.gender = gender;
    if (origin) params.origin = origin;
    if (language) params.language = language;
    if (category) params.category = category;
    if (alphabet) params.alphabet = alphabet;
    if (luckyDay) params.luckyDay = luckyDay;
    if (luckyColor) params.luckyColor = luckyColor;
    if (luckyStone) params.luckyStone = luckyStone;

    const { data } = await apiClient.get('/names', { params });

    return {
      data: data.data || data.names || [],
      pagination: data.pagination || {
        page,
        limit,
        total: 0,
        totalPages: 0,
      },
      appliedFilters: filters,
      success: data.success !== false,
    };
  } catch (error) {
    console.error('[API] Error fetching names with advanced filters:', error);
    return {
      data: [],
      pagination: { page: 1, limit: 50, total: 0, totalPages: 0 },
      success: false,
    };
  }
}

// Export all functions
const namesAPI = {
  // Core endpoints
  fetchFilters,
  fetchNames,
  fetchNameDetail,
  searchNames,

  // Advanced endpoints
  fetchNamesByLetter,
  fetchNamesByCategory,
  fetchNamesByGender,
  fetchNamesByOrigin,
  fetchNamesByLanguage,
  fetchTrendingNames,
  fetchAllFilters,
  fetchReligionFilters,
  fetchNamesWithAdvancedFilters,

  // Legacy endpoints (backward compatibility)
  fetchNamesLegacy,
  fetchFiltersLegacy,
  fetchNameDetailLegacy,
};

export default namesAPI;
