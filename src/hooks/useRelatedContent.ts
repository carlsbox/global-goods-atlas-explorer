
import { useMemo } from 'react';
import { GlobalGoodFlat } from '@/lib/types/globalGoodFlat';
import { useGlobalGoodsFlat } from '@/lib/api/globalGoodsFlat';
import { useUseCases } from '@/lib/api';
import { calculateRelatedContent, RelatedContent } from '@/lib/utils/relationshipEngine';

export function useRelatedContent(globalGood: GlobalGoodFlat | null): {
  relatedContent: RelatedContent | null;
  isLoading: boolean;
  error: string | null;
} {
  const { data: allGlobalGoods = [], isLoading: globalGoodsLoading } = useGlobalGoodsFlat();
  const { data: allUseCases = [], isLoading: useCasesLoading } = useUseCases();

  const relatedContent = useMemo(() => {
    if (!globalGood || allGlobalGoods.length === 0 || allUseCases.length === 0) {
      return null;
    }

    try {
      return calculateRelatedContent(globalGood, allGlobalGoods, allUseCases);
    } catch (error) {
      console.error('Error calculating related content:', error);
      return null;
    }
  }, [globalGood, allGlobalGoods, allUseCases]);

  return {
    relatedContent,
    isLoading: globalGoodsLoading || useCasesLoading,
    error: null
  };
}
