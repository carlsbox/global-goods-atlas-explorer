
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { loadEnhancedCMSGlobalGood } from '@/lib/cms/enhancedCmsLoader';
import { GlobalGoodFlat } from '@/lib/types/globalGoodFlat';

interface DirectGlobalGoodState {
  data: GlobalGoodFlat | null;
  isLoading: boolean;
  error: string | null;
  isCached: boolean;
}

export function useDirectGlobalGood(id: string | undefined): DirectGlobalGoodState {
  const { data, isLoading, error } = useQuery({
    queryKey: ['directGlobalGood', id],
    queryFn: async () => {
      if (!id) return null;
      
      // Try cache first
      const cacheKey = `globalGood_${id}`;
      const cachedData = localStorage.getItem(cacheKey);
      const cacheTimestamp = localStorage.getItem(`${cacheKey}_timestamp`);
      
      if (cachedData && cacheTimestamp) {
        const isValid = (Date.now() - parseInt(cacheTimestamp)) < (10 * 60 * 1000); // 10 minutes
        if (isValid) {
          return JSON.parse(cachedData);
        }
      }
      
      // Load directly from CMS
      const globalGood = await loadEnhancedCMSGlobalGood(id);
      
      if (globalGood) {
        // Cache the result
        localStorage.setItem(cacheKey, JSON.stringify(globalGood));
        localStorage.setItem(`${cacheKey}_timestamp`, Date.now().toString());
      }
      
      return globalGood || null;
    },
    enabled: !!id,
    staleTime: 10 * 60 * 1000, // 10 minutes
    retry: 1,
  });

  // Check if data came from cache
  const isCached = useMemo(() => {
    if (!id) return false;
    const cacheKey = `globalGood_${id}`;
    const cacheTimestamp = localStorage.getItem(`${cacheKey}_timestamp`);
    return !!(cacheTimestamp && (Date.now() - parseInt(cacheTimestamp)) < (10 * 60 * 1000));
  }, [id, data]);

  return {
    data: data || null,
    isLoading,
    error: error ? 'Failed to load global good' : null,
    isCached,
  };
}
