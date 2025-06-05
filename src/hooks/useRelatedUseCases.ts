
import { useMemo } from 'react';
import { UseCase } from '@/lib/types/useCase';
import { useUseCases } from '@/lib/api';
import { calculateRelatedUseCases, RelatedUseCase } from '@/lib/utils/useCaseRelationshipEngine';

export function useRelatedUseCases(currentUseCase: UseCase | null): {
  relatedUseCases: RelatedUseCase[];
  isLoading: boolean;
  error: string | null;
} {
  const { data: allUseCases = [], isLoading } = useUseCases();

  const relatedUseCases = useMemo(() => {
    if (!currentUseCase || allUseCases.length === 0) {
      return [];
    }

    try {
      return calculateRelatedUseCases(currentUseCase, allUseCases);
    } catch (error) {
      console.error('Error calculating related use cases:', error);
      return [];
    }
  }, [currentUseCase, allUseCases]);

  return {
    relatedUseCases,
    isLoading,
    error: null
  };
}
