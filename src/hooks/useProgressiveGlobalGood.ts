
import { useState, useEffect } from 'react';
import { GlobalGoodFlat } from '@/lib/types/globalGoodFlat';
import { useGlobalGoodsFlat, useGlobalGoodFlat } from '@/lib/api/globalGoodsFlat';

interface ProgressiveLoadingState {
  basicData: Partial<GlobalGoodFlat> | null;
  detailedData: GlobalGoodFlat | null;
  loadingPhase: 'basic' | 'detailed' | 'complete' | 'error';
  error: string | null;
}

export function useProgressiveGlobalGood(id: string | undefined) {
  const [state, setState] = useState<ProgressiveLoadingState>({
    basicData: null,
    detailedData: null,
    loadingPhase: 'basic',
    error: null,
  });

  const { data: allGoods, isLoading: allGoodsLoading } = useGlobalGoodsFlat();
  const { data: detailedGood, isLoading: detailedLoading, error: detailedError } = useGlobalGoodFlat(id);

  useEffect(() => {
    if (!id) return;

    // Phase 1: Load basic data from index
    if (allGoods && !allGoodsLoading) {
      const basicGood = allGoods.find(good => good.ID === id);
      if (basicGood) {
        setState(prev => ({
          ...prev,
          basicData: {
            ID: basicGood.ID,
            Name: basicGood.Name,
            Logo: basicGood.Logo,
            ClimateHealth: basicGood.ClimateHealth,
            ProductOverview: basicGood.ProductOverview,
            Classifications: basicGood.Classifications,
            GlobalGoodsType: basicGood.GlobalGoodsType,
            Reach: basicGood.Reach,
          },
          loadingPhase: 'detailed',
        }));
      }
    }
  }, [allGoods, allGoodsLoading, id]);

  useEffect(() => {
    // Phase 2: Load detailed data
    if (detailedGood && !detailedLoading) {
      setState(prev => ({
        ...prev,
        detailedData: detailedGood,
        loadingPhase: 'complete',
      }));
    } else if (detailedError) {
      setState(prev => ({
        ...prev,
        loadingPhase: 'error',
        error: 'Failed to load detailed data',
      }));
    }
  }, [detailedGood, detailedLoading, detailedError]);

  return {
    ...state,
    isLoading: state.loadingPhase !== 'complete' && state.loadingPhase !== 'error',
    hasBasicData: !!state.basicData,
    hasDetailedData: !!state.detailedData,
  };
}
