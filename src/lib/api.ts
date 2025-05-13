
import { useQuery } from "@tanstack/react-query";
import { GlobalGood, UseCase, CountryData } from "./types";
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
export const useGlobalGood = (id: string | undefined) => {
  const { language } = useLanguage();
  
  return useQuery({
    queryKey: ['globalGood', id, language],
    queryFn: async (): Promise<GlobalGood | undefined> => {
      if (!id) return undefined;
      return loadGlobalGood(id, language);
    },
    enabled: !!id
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

// Fetch countries data
export const useCountries = () => {
  return useQuery({
    queryKey: ['countries'],
    queryFn: async (): Promise<CountryData[]> => {
      return loadCountriesData();
    }
  });
};

// Fetch classifications data
export const useClassifications = () => {
  const { language } = useLanguage();
  
  return useQuery({
    queryKey: ['classifications', language],
    queryFn: async () => {
      return loadClassificationsData(language);
    }
  });
};
