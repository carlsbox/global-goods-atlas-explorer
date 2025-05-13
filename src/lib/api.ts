
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
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

// Create a new global good
export const useCreateGlobalGood = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (newGood: GlobalGood): Promise<GlobalGood> => {
      // This is a mock implementation
      console.log('Creating global good:', newGood);
      // In a real app, this would make an API call
      return Promise.resolve(newGood);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['globalGoods'] });
    }
  });
};

// Update an existing global good
export const useUpdateGlobalGood = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: GlobalGood }): Promise<GlobalGood> => {
      // This is a mock implementation
      console.log(`Updating global good ${id}:`, data);
      // In a real app, this would make an API call
      return Promise.resolve(data);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['globalGoods'] });
      queryClient.invalidateQueries({ queryKey: ['globalGood', variables.id] });
    }
  });
};

// Delete a global good
export const useDeleteGlobalGood = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string): Promise<void> => {
      // This is a mock implementation
      console.log(`Deleting global good ${id}`);
      // In a real app, this would make an API call
      return Promise.resolve();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['globalGoods'] });
    }
  });
};

// Fetch use cases data
export const useUseCases = () => {
  return useQuery({
    queryKey: ['useCases'],
    queryFn: async (): Promise<UseCase[]> => {
      return loadAllUseCases();
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
