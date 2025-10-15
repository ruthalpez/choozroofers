import axios from "axios";

const isDev = process.env.NODE_ENV === "development";
const LIVE_API_URL = process.env.NEXT_PUBLIC_API_URL + "/api/roofers";
const DEV_API_URL = "http://localhost:8000/api/roofers";
const API_URL = isDev ? DEV_API_URL : LIVE_API_URL;

// Create axios instance with optimized defaults
const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 10000, // 10 second timeout
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Request interceptor for consistent error handling
apiClient.interceptors.request.use((config: any) => {
  // Add request timestamp for debugging
  config.metadata = { startTime: new Date() };
  return config;
});

// Response interceptor for logging and error handling
apiClient.interceptors.response.use(
  (response: any) => {
    // Log response time in development
    if (isDev && response.config.metadata) {
      const endTime = new Date();
      const duration =
        endTime.getTime() - response.config.metadata.startTime.getTime();
      console.log(
        `API Response time: ${duration}ms for ${response.config.url}`,
      );
    }
    return response;
  },
  (error: any) => {
    console.error("API Error:", {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      message: error.message,
    });
    return Promise.reject(error);
  },
);

// Cache for frequently accessed data
const cache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

const getCachedData = (key: string) => {
  const cached = cache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }
  return null;
};

const setCachedData = (key: string, data: any) => {
  cache.set(key, {
    data,
    timestamp: Date.now(),
  });
};

// Optimized API functions
export const getByCategoryStateCitySlug = async (
  category: string,
  state: string,
  city: string,
  slug: string,
) => {
  const cacheKey = `category-${category}-${state}-${city}-${slug}`;
  const cached = getCachedData(cacheKey);
  if (cached) return cached;

  try {
    const response = await apiClient.get(
      `/${category}/${state}/${city}/${slug}`,
    );
    setCachedData(cacheKey, response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching painter data:", error);
    return null;
  }
};

export const getByStateCity = async (
  state: string,
  city: string,
  page?: number,
  sortByRating?: string,
  serviceFilter?: string,
) => {
  // Create cache key based on parameters
  const cacheKey = `state-city-${state}-${city}-${page || 1}-${
    sortByRating || "none"
  }-${serviceFilter || "all"}`;
  const cached = getCachedData(cacheKey);
  if (cached) return cached;

  try {
    const params: Record<string, any> = {};

    // Only add parameters that have values
    if (page !== undefined && page > 0) params.page = page;
    if (sortByRating) params.sortByRating = sortByRating;
    if (serviceFilter && serviceFilter !== "all" && serviceFilter.trim()) {
      params.service = serviceFilter;
    }

    const response = await apiClient.get(
      `/${state}/${city}/roofers-contractors`,
      { params },
    );

    setCachedData(cacheKey, response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching roofers data:", error);
    return null;
  }
};

export const getZipCodesByStateCity = async (state: string, city: string) => {
  const cacheKey = `zipcodes-${state}-${city}`;
  const cached = getCachedData(cacheKey);
  if (cached) return cached;

  try {
    const response = await apiClient.get(
      `/${state}/${city}/roofers-contractors`,
      {
        params: { zipCode: "" },
      },
    );

    setCachedData(cacheKey, response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching zip codes:", error);
    return null;
  }
};

export const getAllData = async () => {
  const cacheKey = "all-data";
  const cached = getCachedData(cacheKey);
  if (cached) return cached;

  try {
    const response = await apiClient.get("/");
    setCachedData(cacheKey, response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching all data:", error);
    return null;
  }
};

// Utility function to preload data
export const preloadData = async (
  state: string,
  city: string,
  commonParams?: {
    sortByRating?: string;
    serviceFilter?: string;
  },
) => {
  const promises = [
    getByStateCity(
      state,
      city,
      1,
      commonParams?.sortByRating,
      commonParams?.serviceFilter,
    ),
    getZipCodesByStateCity(state, city),
  ];

  try {
    await Promise.allSettled(promises);
  } catch (error) {
    console.error("Error preloading data:", error);
  }
};

// Clear cache function for manual cache invalidation
export const clearCache = (pattern?: string) => {
  if (pattern) {
    for (const key of cache.keys()) {
      if (key.includes(pattern)) {
        cache.delete(key);
      }
    }
  } else {
    cache.clear();
  }
};

// Get cache stats for debugging
export const getCacheStats = () => {
  return {
    size: cache.size,
    keys: Array.from(cache.keys()),
  };
};
