
import { useQuery } from "@tanstack/react-query";
import { GlobalGood, UseCase, CountryData, Classification } from "./types";
import { 
  loadAllGlobalGoods, 
  loadGlobalGood, 
  loadAllUseCases, 
  loadUseCase, 
  loadCountriesData,
  loadClassificationsData
} from "./dataLoader";
import { useLanguage } from "@/contexts/LanguageContext";

// Fetch global goods data
export const useGlobalGoods = () => {
  return useQuery({
    queryKey: ['globalGoods'],
    queryFn: async (): Promise<GlobalGood[]> => {
      return loadAllGlobalGoods();
    }
  });
};

// Fetch a single global good by ID
export const useGlobalGood = (id: string | undefined, options = {}) => {
  const { language } = useLanguage();
  
  return useQuery({
    queryKey: ['globalGood', id, language],
    queryFn: async (): Promise<GlobalGood | undefined> => {
      if (!id) return undefined;
      return loadGlobalGood(id, language);
    },
    enabled: !!id,
    ...options
  });
};

// Fetch use cases data with language support
export const useUseCases = () => {
  const { language } = useLanguage();
  
  return useQuery({
    queryKey: ['useCases', language],
    queryFn: async (): Promise<UseCase[]> => {
      return loadAllUseCases(language);
    }
  });
};

// Fetch a single use case by ID
export const useUseCase = (id: string | undefined) => {
  const { language } = useLanguage();
  
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
  const { language } = useLanguage();
  
  return useQuery({
    queryKey: ['countries', language],
    queryFn: async (): Promise<CountryData[]> => {
      return loadCountriesData(language);
    }
  });
};

// Updated function to fetch classifications data
export const useClassifications = () => {
  const { language } = useLanguage();
  
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

// Re-export the global good mutations from the hooks file
// Instead of defining them again here, we just re-export them
export { useCreateGlobalGood, useUpdateGlobalGood } from '@/hooks/useGlobalGoodMutations';
