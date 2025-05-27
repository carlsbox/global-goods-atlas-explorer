import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { GlobalGood, LanguageCode } from '@/lib/types';
import { 
  loadGlobalGoodsIndex, 
  loadAllGlobalGoods, 
  loadGlobalGood,
  clearGlobalGoodsCache,
  GlobalGoodIndexItem
} from '@/lib/loaders/globalGoodHybridLoader';
import { useI18n } from '@/hooks/useI18n';

// Hook for loading global goods index (lightweight)
export function useGlobalGoodsIndex() {
  return useQuery({
    queryKey: ['globalGoodsIndex'],
    queryFn: loadGlobalGoodsIndex,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes (was cacheTime)
  });
}

// Hook for loading all global goods (for catalog)
export function useGlobalGoodsHybrid() {
  const { language } = useI18n();
  
  return useQuery({
    queryKey: ['globalGoodsHybrid', language],
    queryFn: () => loadAllGlobalGoods(language),
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000, // 30 minutes (was cacheTime)
  });
}

// Hook for loading individual global good (full data)
export function useGlobalGoodHybrid(id: string | undefined) {
  const { language } = useI18n();
  
  return useQuery({
    queryKey: ['globalGoodHybrid', id, language],
    queryFn: () => id ? loadGlobalGood(id, language) : Promise.resolve(undefined),
    enabled: !!id,
    staleTime: 10 * 60 * 1000, // 10 minutes for individual items
    gcTime: 60 * 60 * 1000, // 1 hour (was cacheTime)
  });
}

// Mutation for creating/updating global goods
export function useCreateGlobalGoodHybrid() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (globalGood: GlobalGood) => {
      // In a real implementation, this would save to both index and individual file
      console.log('Creating global good (hybrid):', globalGood);
      
      // Clear caches to force refresh
      clearGlobalGoodsCache();
      
      return globalGood;
    },
    onSuccess: () => {
      // Invalidate all related queries
      queryClient.invalidateQueries({ queryKey: ['globalGoodsIndex'] });
      queryClient.invalidateQueries({ queryKey: ['globalGoodsHybrid'] });
    }
  });
}

export function useUpdateGlobalGoodHybrid() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: GlobalGood }) => {
      // In a real implementation, this would update both index and individual file
      console.log('Updating global good (hybrid):', id, data);
      
      // Clear caches to force refresh
      clearGlobalGoodsCache();
      
      return data;
    },
    onSuccess: (data) => {
      // Invalidate specific queries
      queryClient.invalidateQueries({ queryKey: ['globalGoodsIndex'] });
      queryClient.invalidateQueries({ queryKey: ['globalGoodsHybrid'] });
      queryClient.invalidateQueries({ queryKey: ['globalGoodHybrid', data.id] });
    }
  });
}

export function useDeleteGlobalGoodHybrid() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      // In a real implementation, this would remove from both index and individual file
      console.log('Deleting global good (hybrid):', id);
      
      // Clear caches to force refresh
      clearGlobalGoodsCache();
      
      return id;
    },
    onSuccess: () => {
      // Invalidate all related queries
      queryClient.invalidateQueries({ queryKey: ['globalGoodsIndex'] });
      queryClient.invalidateQueries({ queryKey: ['globalGoodsHybrid'] });
    }
  });
}
