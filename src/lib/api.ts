import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { UseCase } from "./types/useCase";
import { CountryData } from "./types/country";
import { Classification } from "./types/classifications";
import { 
  loadAllGlobalGoodsFlat, 
  loadGlobalGoodFlat, 
  loadAllUseCases, 
  loadUseCase, 
  loadCountriesData,
  loadClassificationsData
} from "./dataLoader";
import { useI18n } from "@/hooks/useI18n";
import { GlobalGoodFlat } from "./types/globalGoodFlat";
import { GlobalGood } from "./types";

// Fetch global goods data
export const useGlobalGoods = () => {
  return useQuery({
    queryKey: ['globalGoods'],
    queryFn: async (): Promise<GlobalGoodFlat[]> => {
      return loadAllGlobalGoodsFlat();
    }
  });
};

// Fetch a single global good by ID
export const useGlobalGood = (id: string | undefined, options = {}) => {
  const { language } = useI18n();
  
  return useQuery({
    queryKey: ['globalGood', id, language],
    queryFn: async (): Promise<GlobalGoodFlat | undefined> => {
      if (!id) return undefined;
      return loadGlobalGoodFlat(id);
    },
    enabled: !!id,
    ...options
  });
};

// Fetch use cases data with language support
export const useUseCases = () => {
  const { language } = useI18n();
  
  return useQuery({
    queryKey: ['useCases', language],
    queryFn: async (): Promise<UseCase[]> => {
      return loadAllUseCases(language);
    }
  });
};

// Fetch a single use case by ID
export const useUseCase = (id: string | undefined) => {
  const { language } = useI18n();
  
  return useQuery({
    queryKey: ['useCase', id, language],
    queryFn: async (): Promise<UseCase | undefined> => {
      if (!id) return undefined;
      return loadUseCase(id, language);
    },
    enabled: !!id
  });
};

// Updated to use language for countries data
export const useCountries = () => {
  const { language } = useI18n();
  
  return useQuery({
    queryKey: ['countries', language],
    queryFn: async (): Promise<CountryData[]> => {
      return loadCountriesData(language);
    }
  });
};

// Updated function to fetch classifications data
export const useClassifications = () => {
  const { language } = useI18n();
  
  return useQuery({
    queryKey: ['classifications', language],
    queryFn: async (): Promise<Classification[]> => {
      return loadClassificationsData(language);
    }
  });
};

// Helper function to group classifications by authority and group
export const useGroupedClassifications = () => {
  const { data: classifications = [], isLoading, error } = useClassifications();
  
  const groupedData = classifications.reduce((acc: Record<string, Record<string, Classification[]>>, item) => {
    // Initialize authority object if it doesn't exist
    if (!acc[item.authority]) {
      acc[item.authority] = {};
    }
    
    // Initialize group array if it doesn't exist
    if (!acc[item.authority][item.group_code]) {
      acc[item.authority][item.group_code] = [];
    }
    
    // Add classification to the appropriate group
    acc[item.authority][item.group_code].push(item);
    
    return acc;
  }, {});
  
  return { 
    groupedData, 
    isLoading, 
    error,
    classifications 
  };
};

// Add the missing useDeleteGlobalGood hook
export const useDeleteGlobalGood = () => {
  return {
    mutateAsync: async (id: string) => {
      console.log(`Deleting global good with ID: ${id}`);
      // This is a mock implementation. In a real application, this would call an API
      // to delete the global good with the specified ID.
      
      // Simulate a successful deletion after a short delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      return { success: true };
    }
  };
};

// Add the missing hybrid hooks
export const useGlobalGoodHybrid = (id: string | undefined) => {
  const { language } = useI18n();
  
  return useQuery({
    queryKey: ['globalGoodHybrid', id, language],
    queryFn: async (): Promise<GlobalGood | undefined> => {
      if (!id) return undefined;
      // Use the detailed loader for complete data
      const { loadGlobalGoodFlatWithDetails } = await import('./loaders/globalGoodFlatLoader');
      const flatData = await loadGlobalGoodFlatWithDetails(id);
      if (!flatData) return undefined;
      
      // Convert GlobalGoodFlat to GlobalGood format
      return {
        id: flatData.ID,
        name: flatData.Name,
        summary: flatData.ProductOverview?.Summary || '',
        description: flatData.ProductOverview?.Description || '',
        logo: flatData.Logo || '',
        website: flatData.Website?.main?.url || '',
        sectors: flatData.GlobalGoodsType?.map(type => type.title || type.code || '') || [],
        countries: flatData.Reach?.ImplementationCountries?.map(c => c.iso_code) || [],
        lastUpdated: new Date().toISOString(),
        // Add other required fields with defaults
        sdgs: [],
        classifications: [],
        standards: [],
        maturity: {},
        technical: {},
        licensing: {},
        community: {},
        sustainability: {}
      } as GlobalGood;
    },
    enabled: !!id
  });
};

export const useCreateGlobalGoodHybrid = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: GlobalGood) => {
      console.log('Creating global good (hybrid):', data);
      // This is a mock implementation
      await new Promise(resolve => setTimeout(resolve, 1000));
      return { success: true, id: data.id };
    },
    onSuccess: () => {
      // Invalidate and refetch global goods queries
      queryClient.invalidateQueries({ queryKey: ['globalGoods'] });
      queryClient.invalidateQueries({ queryKey: ['globalGoodsFlat'] });
    }
  });
};

export const useUpdateGlobalGoodHybrid = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: GlobalGood }) => {
      console.log('Updating global good (hybrid):', id, data);
      // This is a mock implementation
      await new Promise(resolve => setTimeout(resolve, 1000));
      return { success: true, id };
    },
    onSuccess: (_, { id }) => {
      // Invalidate and refetch global goods queries
      queryClient.invalidateQueries({ queryKey: ['globalGoods'] });
      queryClient.invalidateQueries({ queryKey: ['globalGoodsFlat'] });
      queryClient.invalidateQueries({ queryKey: ['globalGoodHybrid', id] });
    }
  });
};

// Re-export the global good mutations from the hooks file
// Instead of defining them again here, we just re-export them
export { useCreateGlobalGood, useUpdateGlobalGood } from '@/hooks/useGlobalGoodMutations';
