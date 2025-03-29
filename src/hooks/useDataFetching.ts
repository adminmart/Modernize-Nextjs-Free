import { useState, useEffect, useCallback } from 'react';

interface CacheItem<T> {
  data: T;
  timestamp: number;
}

// In-memory cache
const cache: Record<string, CacheItem<any>> = {};

// Cache expiration time in milliseconds (default: 5 minutes)
const DEFAULT_CACHE_EXPIRATION = 5 * 60 * 1000;

interface UseDataFetchingOptions {
  cacheKey?: string;
  cacheExpiration?: number;
  initialData?: any;
  enabled?: boolean;
}

/**
 * Custom hook for data fetching with caching
 * @param fetchFn - The function to fetch data
 * @param options - Options for the hook
 * @returns Object containing data, loading state, error, and refetch function
 */
export function useDataFetching<T>(
  fetchFn: () => Promise<T>,
  options: UseDataFetchingOptions = {}
) {
  const {
    cacheKey,
    cacheExpiration = DEFAULT_CACHE_EXPIRATION,
    initialData,
    enabled = true
  } = options;

  const [data, setData] = useState<T | undefined>(initialData);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async (skipCache = false) => {
    // Check cache if cacheKey is provided and skipCache is false
    if (cacheKey && !skipCache) {
      const cachedItem = cache[cacheKey];
      if (cachedItem && Date.now() - cachedItem.timestamp < cacheExpiration) {
        setData(cachedItem.data);
        return;
      }
    }

    setLoading(true);
    setError(null);

    try {
      const result = await fetchFn();
      setData(result);

      // Update cache if cacheKey is provided
      if (cacheKey) {
        cache[cacheKey] = {
          data: result,
          timestamp: Date.now()
        };
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An unknown error occurred'));
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  }, [cacheKey, cacheExpiration, fetchFn]);

  // Fetch data on mount or when dependencies change
  useEffect(() => {
    if (enabled) {
      fetchData();
    }
  }, [enabled, fetchData]);

  // Function to manually refetch data
  const refetch = useCallback((skipCache = false) => {
    return fetchData(skipCache);
  }, [fetchData]);

  // Function to clear the cache for this key
  const clearCache = useCallback(() => {
    if (cacheKey) {
      delete cache[cacheKey];
    }
  }, [cacheKey]);

  return { data, loading, error, refetch, clearCache };
}

// Utility function to clear the entire cache
export function clearAllCache() {
  Object.keys(cache).forEach(key => {
    delete cache[key];
  });
}

// Utility function to clear expired cache items
export function clearExpiredCache(expiration = DEFAULT_CACHE_EXPIRATION) {
  const now = Date.now();
  Object.keys(cache).forEach(key => {
    if (now - cache[key].timestamp > expiration) {
      delete cache[key];
    }
  });
} 