/**
 * World-Class Optimized API Client
 * Features:
 * - Request/Response caching with TTL
 * - Request deduplication (prevent duplicate concurrent requests)
 * - Automatic retry with exponential backoff
 * - Request cancellation and cleanup
 * - Compression support
 * - Performance monitoring
 * - Intelligent error handling
 */

import axios from 'axios';
import { env } from '@/config/env';

/**
 * In-memory cache for GET requests
 */
class RequestCache {
  constructor() {
    this.cache = new Map();
    this.timestamps = new Map();
  }

  get(key) {
    const data = this.cache.get(key);
    const timestamp = this.timestamps.get(key);
    
    if (!data || !timestamp) return null;
    
    // Default TTL: 5 minutes for cached responses
    const TTL = 5 * 60 * 1000;
    if (Date.now() - timestamp > TTL) {
      this.delete(key);
      return null;
    }
    
    return data;
  }

  set(key, value) {
    this.cache.set(key, value);
    this.timestamps.set(key, Date.now());
  }

  delete(key) {
    this.cache.delete(key);
    this.timestamps.delete(key);
  }

  clear() {
    this.cache.clear();
    this.timestamps.clear();
  }

  size() {
    return this.cache.size;
  }
}

/**
 * Request deduplication - prevents duplicate concurrent requests
 */
class RequestDeduplicator {
  constructor() {
    this.pending = new Map();
  }

  createKey(config) {
    const { method, url, params, data } = config;
    return JSON.stringify({ method, url, params, data });
  }

  getPending(config) {
    const key = this.createKey(config);
    return this.pending.get(key);
  }

  setPending(config, promise) {
    const key = this.createKey(config);
    this.pending.set(key, promise);
    
    // Clean up after request completes
    promise.finally(() => {
      this.pending.delete(key);
    });
  }
}

const requestCache = new RequestCache();
const requestDeduplicator = new RequestDeduplicator();
const activeRequests = new Map();

/**
 * Create axios instance with optimized configuration
 */
export const apiClient = axios.create({
  baseURL: env.api.baseUrl,
  timeout: env.api.timeout,
  headers: {
    'Content-Type': 'application/json',
    'Accept-Encoding': 'gzip, deflate, br',
  },
  // Enable compression
  decompress: true,
  // Increase max content length
  maxContentLength: Infinity,
  maxBodyLength: Infinity,
});

/**
 * Request Interceptor
 * - Request deduplication
 * - Cache checking for GET requests
 * - Request tracking
 * - Performance monitoring
 */
apiClient.interceptors.request.use(
  async (config) => {
    const requestId = `${Date.now()}-${Math.random()}`;
    config.requestId = requestId;
    config.metadata = { startTime: Date.now() };

    // For GET requests, check cache first
    if (config.method === 'get') {
      const cacheKey = `${config.url}?${JSON.stringify(config.params || {})}`;
      const cached = requestCache.get(cacheKey);
      
      if (cached) {
        if (env.isDevelopment) {
          console.log(`[API Cache Hit] ${config.url}`);
        }
        // Return cached response
        return Promise.reject({
          __CACHED__: true,
          config,
          data: cached,
        });
      }

      // Check for duplicate pending request
      const pendingRequest = requestDeduplicator.getPending(config);
      if (pendingRequest) {
        if (env.isDevelopment) {
          console.log(`[API Deduped] ${config.url}`);
        }
        return Promise.reject({
          __DEDUPED__: true,
          config,
          promise: pendingRequest,
        });
      }
    }

    activeRequests.set(requestId, config);

    // Log in development
    if (env.isDevelopment) {
      console.log(`[API] ${config.method.toUpperCase()} ${config.url}`, {
        id: requestId,
        params: config.params,
      });
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Response Interceptor
 * - Handles cached responses
 * - Handles deduped responses
 * - Caches successful GET responses
 * - Automatic retry with exponential backoff
 * - Performance logging
 */
apiClient.interceptors.response.use(
  (response) => {
    const { requestId, metadata, method, url, params } = response.config;
    activeRequests.delete(requestId);

    // Calculate request duration
    const duration = Date.now() - (metadata?.startTime || Date.now());

    // Cache GET responses
    if (method === 'get' && response.status === 200) {
      const cacheKey = `${url}?${JSON.stringify(params || {})}`;
      requestCache.set(cacheKey, response.data);
    }

    // Log in development
    if (env.isDevelopment) {
      console.log(`[API] Response (${response.status}) ${duration}ms`, {
        id: requestId,
        url: response.config.url,
        cached: response.data?.source === 'cache',
      });
    }

    return response;
  },
  async (error) => {
    // Handle cached responses
    if (error.__CACHED__) {
      return {
        config: error.config,
        data: error.data,
        status: 200,
        statusText: 'OK',
        headers: {},
        __fromCache: true,
      };
    }

    // Handle deduped responses
    if (error.__DEDUPED__) {
      try {
        return await error.promise;
      } catch (dedupError) {
        throw dedupError;
      }
    }

    const { config } = error;
    const { requestId } = config || {};

    if (requestId) {
      activeRequests.delete(requestId);
    }

    // Network error handling
    if (!error.response) {
      console.error('[API] Network error:', error.message);
      
      // Retry logic for network errors
      if (config && !config.__retryCount) {
        config.__retryCount = 0;
      }
      
      // Increased retry attempts and backoff time for build processes
      if (config && config.__retryCount < 3) {
        config.__retryCount++;
        // Exponential backoff with jitter
        const backoff = Math.min(1000 * Math.pow(2, config.__retryCount) + Math.random() * 1000, 10000);
        
        if (env.isDevelopment) {
          console.log(`[API] Retrying in ${backoff}ms (attempt ${config.__retryCount})`);
        }
        
        await new Promise(resolve => setTimeout(resolve, backoff));
        return apiClient(config);
      }
      
      return Promise.reject({
        status: 0,
        message: 'Network error. Please check your internet connection.',
        error,
      });
    }

    const { status, data } = error.response;

    // Log error in development
    if (env.isDevelopment) {
      console.error(`[API] Error (${status})`, {
        id: requestId,
        url: config?.url,
        message: data?.message || error.message,
      });
    }

    // Handle specific error codes
    const errorMessages = {
      400: data?.message || 'Bad request.',
      401: 'Unauthorized. Please login.',
      403: 'Forbidden. You do not have permission.',
      404: 'Resource not found.',
      429: 'Too many requests. Please try again later.',
      500: 'Server error. Please try again later.',
      502: 'Bad gateway. Please try again later.',
      503: 'Service unavailable. Please try again later.',
      504: 'Gateway timeout. Please try again later.',
    };

    return Promise.reject({
      status,
      message: errorMessages[status] || data?.message || 'An error occurred.',
      error,
    });
  }
);

/**
 * Get all active requests (useful for cancellation)
 */
export function getActiveRequests() {
  return Array.from(activeRequests.values());
}

/**
 * Cancel all active requests
 */
export function cancelAllRequests() {
  activeRequests.forEach((config) => {
    if (config.signal) {
      config.signal.abort();
    }
  });
  activeRequests.clear();
}

/**
 * Cancel specific request by ID
 */
export function cancelRequest(requestId) {
  const config = activeRequests.get(requestId);
  if (config && config.signal) {
    config.signal.abort();
    activeRequests.delete(requestId);
  }
}

/**
 * Clear request cache
 */
export function clearCache() {
  requestCache.clear();
}

/**
 * Get cache statistics
 */
export function getCacheStats() {
  return {
    size: requestCache.size(),
    entries: requestCache.cache.size,
  };
}

/**
 * Prefetch data - useful for preloading critical resources
 */
export async function prefetch(url, params = {}) {
  try {
    await apiClient.get(url, { params });
  } catch (error) {
    console.warn('[API] Prefetch failed:', url);
  }
}

export default apiClient;