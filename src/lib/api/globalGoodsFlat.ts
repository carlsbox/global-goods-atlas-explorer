
import { useQuery } from '@tanstack/react-query';
import { loadGlobalGoodFlatWithDetails, loadAllGlobalGoodsFlat, loadFeaturedGlobalGoods } from '../loaders/globalGoodFlatLoader';
import { GlobalGoodFlat } from '../types/globalGoodFlat';

export function useGlobalGoodsFlat() {
  return useQuery({
    queryKey: ['globalGoodsFlat'],
    queryFn: loadAllGlobalGoodsFlat,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useGlobalGoodFlat(id: string | undefined) {
  return useQuery({
    queryKey: ['globalGoodFlat', id],
    queryFn: () => id ? loadGlobalGoodFlatWithDetails(id) : Promise.resolve(undefined),
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// New hook for getting detailed data (uses individual files)
export function useGlobalGoodFlatDetailed(id: string | undefined) {
  return useQuery({
    queryKey: ['globalGoodFlatDetailed', id],
    queryFn: () => id ? loadGlobalGoodFlatWithDetails(id) : Promise.resolve(undefined),
    enabled: !!id,
    staleTime: 10 * 60 * 1000, // 10 minutes - longer cache for detailed data
  });
}

// Hook for featured global goods on home page - lightweight and fast
export function useFeaturedGlobalGoods(count?: number) {
  return useQuery({
    queryKey: ['featuredGlobalGoods', count],
    queryFn: () => loadFeaturedGlobalGoods(count),
    staleTime: 10 * 60 * 1000, // 10 minutes cache
  });
}
