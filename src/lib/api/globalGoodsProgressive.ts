import { useQuery, useQueries } from '@tanstack/react-query';
import {
  loadMinimalGlobalGoods,
  loadSummaryGlobalGoods,
  loadResolvedGlobalGoods,
  loadProgressiveGlobalGoodDetail,
  ProgressiveGlobalGoodsLoader
} from '../loaders/progressiveGlobalGoodLoader';
import { useState, useEffect } from 'react';

// Singleton loader instance
const progressiveLoader = new ProgressiveGlobalGoodsLoader();

// Hook for minimal data (immediate display)
export function useGlobalGoodsMinimal() {
  return useQuery({
    queryKey: ['globalGoods', 'minimal'],
    queryFn: () => progressiveLoader.getMinimal(),
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
  });
}

// Hook for summary data (filtering/sorting)
export function useGlobalGoodsSummary() {
  return useQuery({
    queryKey: ['globalGoods', 'summary'],
    queryFn: () => progressiveLoader.getSummary(),
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
}

// Hook for resolved data (full features)
export function useGlobalGoodsResolved() {
  return useQuery({
    queryKey: ['globalGoods', 'resolved'],
    queryFn: () => progressiveLoader.getResolved(),
    staleTime: 15 * 60 * 1000,
    gcTime: 60 * 60 * 1000, // 1 hour
  });
}

// Progressive loading hook that manages all three tiers
export function useProgressiveGlobalGoods() {
  const [dataState, setDataState] = useState<'minimal' | 'summary' | 'resolved'>('minimal');
  
  const minimalQuery = useGlobalGoodsMinimal();
  const summaryQuery = useGlobalGoodsSummary();
  const resolvedQuery = useGlobalGoodsResolved();
  
  // Automatically progress through loading states
  useEffect(() => {
    if (minimalQuery.isSuccess && dataState === 'minimal') {
      // Start loading summary in background
      summaryQuery.refetch();
    }
  }, [minimalQuery.isSuccess, dataState]);
  
  useEffect(() => {
    if (summaryQuery.isSuccess && dataState === 'minimal') {
      setDataState('summary');
      // Start loading resolved in background
      resolvedQuery.refetch();
    }
  }, [summaryQuery.isSuccess, dataState]);
  
  useEffect(() => {
    if (resolvedQuery.isSuccess && dataState === 'summary') {
      setDataState('resolved');
    }
  }, [resolvedQuery.isSuccess, dataState]);
  
  // Return the best available data
  const data = resolvedQuery.data || summaryQuery.data || minimalQuery.data || [];
  const isLoading = minimalQuery.isLoading && !minimalQuery.data;
  const isUpgrading = dataState !== 'resolved' && !isLoading;
  
  return {
    data,
    isLoading,
    isUpgrading,
    dataState,
    error: minimalQuery.error || summaryQuery.error || resolvedQuery.error,
    // Expose individual query states for fine-grained control
    queries: {
      minimal: minimalQuery,
      summary: summaryQuery,
      resolved: resolvedQuery
    }
  };
}

// Hook for loading individual global good details progressively
export function useProgressiveGlobalGoodDetail(id: string | undefined) {
  const [hasBasicData, setHasBasicData] = useState(false);
  
  // Try to get basic data from summary first
  const summaryQuery = useGlobalGoodsSummary();
  const basicData = summaryQuery.data?.find(g => g.ID === id);
  
  useEffect(() => {
    if (basicData && !hasBasicData) {
      setHasBasicData(true);
    }
  }, [basicData, hasBasicData]);
  
  // Load full detail
  const detailQuery = useQuery({
    queryKey: ['globalGood', 'detail', id],
    queryFn: () => id ? loadProgressiveGlobalGoodDetail(id) : Promise.resolve(null),
    enabled: !!id,
    staleTime: 10 * 60 * 1000,
  });
  
  return {
    basicData,
    detailedData: detailQuery.data,
    isLoading: !basicData && detailQuery.isLoading,
    isUpgrading: !!basicData && !detailQuery.data,
    error: detailQuery.error
  };
}

// Batch loader for visible cards
export function useGlobalGoodsBatch(ids: string[]) {
  return useQueries({
    queries: ids.map(id => ({
      queryKey: ['globalGood', 'detail', id],
      queryFn: () => loadProgressiveGlobalGoodDetail(id),
      staleTime: 10 * 60 * 1000,
    }))
  });
}

// Preload hook for background loading
export function usePreloadGlobalGoods() {
  useEffect(() => {
    // Start preloading all tiers in background after initial render
    const timer = setTimeout(() => {
      progressiveLoader.preloadAll().catch(console.error);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
}