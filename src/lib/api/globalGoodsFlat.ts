
import { useQuery } from '@tanstack/react-query';
import { loadGlobalGoodFlat, loadAllGlobalGoodsFlat } from '../loaders/globalGoodFlatLoader';
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
    queryFn: () => id ? loadGlobalGoodFlat(id) : Promise.resolve(undefined),
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
