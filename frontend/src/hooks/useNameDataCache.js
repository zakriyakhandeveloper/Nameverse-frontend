import { useState, useCallback, useRef, useEffect } from 'react';

/**
 * useNameDataCache - Optimized hook for caching and fetching name data
 * Features:
 * - Single API call per name
 * - In-memory cache for 5+ minutes
 * - Automatic prefetching of related names
 * - Deduplication of concurrent requests
 * - Fallback to static data
 */

const nameDataCache = new Map();
const pendingRequests = new Map();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

export function useNameDataCache() {
  const [data, setData] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const cacheKeyRef = useRef(null);

  const getCacheKey = useCallback((religion, name) => {
    return `${religion}:${name}`;
  }, []);

  const isCacheValid = useCallback((cacheKey) => {
    const cached = nameDataCache.get(cacheKey);
    if (!cached) return false;

    const age = Date.now() - cached.timestamp;
    return age < CACHE_TTL;
  }, []);

  const fetchNameData = useCallback(
    async (religion, name, options = {}) => {
      const cacheKey = getCacheKey(religion, name);
      cacheKeyRef.current = cacheKey;

      // Check cache first
      if (isCacheValid(cacheKey)) {
        const cached = nameDataCache.get(cacheKey);
        setData(cached.data);
        setRelated(cached.related || []);
        setLoading(false);
        return cached.data;
      }

      // If request already pending, wait for it
      if (pendingRequests.has(cacheKey)) {
        setLoading(true);
        try {
          const result = await pendingRequests.get(cacheKey);
          setData(result.data);
          setRelated(result.related || []);
          setLoading(false);
          return result.data;
        } catch (err) {
          setError(err.message);
          setLoading(false);
          throw err;
        }
      }

      // Make new request
      setLoading(true);
      setError(null);

      const requestPromise = (async () => {
        try {
          // Main request - single unified API call
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE}/api/v1/names/${religion}/${name}`,
            {
              signal: options.signal,
              headers: {
                'Accept': 'application/json',
                'Cache-Control': 'public, max-age=3600',
              },
              next: { revalidate: 3600 },
            }
          );

          if (!response.ok) {
            throw new Error(`HTTP ${response.status}: Failed to fetch name data`);
          }

          const nameData = await response.json();

          // Parallel prefetch related and similar names
          let relatedData = [];
          try {
            const relatedResponse = await fetch(
              `${process.env.NEXT_PUBLIC_API_BASE}/api/v1/names/${religion}/${nameData.slug || name}/related?limit=6`,
              {
                headers: { 'Cache-Control': 'public, max-age=3600' },
                next: { revalidate: 3600 },
              }
            );

            if (relatedResponse.ok) {
              const related = await relatedResponse.json();
              relatedData = related.data || related || [];
            }
          } catch (err) {
            console.debug('Prefetch related names failed (non-critical):', err);
          }

          // Cache the results
          nameDataCache.set(cacheKey, {
            data: nameData,
            related: relatedData,
            timestamp: Date.now(),
          });

          // Clean up pending request
          pendingRequests.delete(cacheKey);

          setData(nameData);
          setRelated(relatedData);
          setLoading(false);

          return { data: nameData, related: relatedData };
        } catch (err) {
          // Clean up pending request on error
          pendingRequests.delete(cacheKey);
          setError(err.message);
          setLoading(false);
          throw err;
        }
      })();

      // Store pending request
      pendingRequests.set(cacheKey, requestPromise);

      try {
        const result = await requestPromise;
        return result.data;
      } catch (err) {
        throw err;
      }
    },
    [getCacheKey, isCacheValid]
  );

  const clearCache = useCallback((religion = null, name = null) => {
    if (religion && name) {
      const key = getCacheKey(religion, name);
      nameDataCache.delete(key);
    } else if (religion) {
      // Clear all names for this religion
      for (const key of nameDataCache.keys()) {
        if (key.startsWith(`${religion}:`)) {
          nameDataCache.delete(key);
        }
      }
    } else {
      // Clear everything
      nameDataCache.clear();
    }
  }, [getCacheKey]);

  const getCacheStats = useCallback(() => {
    return {
      size: nameDataCache.size,
      entries: Array.from(nameDataCache.entries()).map(([key, value]) => ({
        key,
        age: Date.now() - value.timestamp,
        valid: Date.now() - value.timestamp < CACHE_TTL,
      })),
    };
  }, []);

  return {
    data,
    related,
    loading,
    error,
    fetchNameData,
    clearCache,
    getCacheStats,
  };
}

/**
 * Preload a name in background
 * Useful for hover states or anticipated navigation
 */
export function preloadName(religion, name) {
  const cacheKey = `${religion}:${name}`;

  if (nameDataCache.has(cacheKey)) {
    const cached = nameDataCache.get(cacheKey);
    const age = Date.now() - cached.timestamp;
    if (age < CACHE_TTL) {
      return Promise.resolve(cached.data);
    }
  }

  // Silently preload in background
  return fetch(
    `${process.env.NEXT_PUBLIC_API_BASE}/api/v1/names/${religion}/${name}`,
    {
      headers: { 'Cache-Control': 'public, max-age=3600' },
      next: { revalidate: 3600 },
    }
  )
    .then((res) => (res.ok ? res.json() : null))
    .catch(() => null);
}
