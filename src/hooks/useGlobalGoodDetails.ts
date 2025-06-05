
import { useQuery } from "@tanstack/react-query";
import { loadGlobalGoodFlat } from "@/lib/loaders";
import { GlobalGoodFlat } from "@/lib/types/globalGoodFlat";

export function useGlobalGoodDetails(id: string) {
  return useQuery({
    queryKey: ['global-good-details', id],
    queryFn: async (): Promise<GlobalGoodFlat | null> => {
      try {
        return await loadGlobalGoodFlat(id);
      } catch (error) {
        console.error(`Failed to load global good details for ${id}:`, error);
        return null;
      }
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (replaces deprecated cacheTime)
  });
}
