
import React, { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react';
import { 
  loadClassificationsData, 
  loadStandardsData, 
  loadSDGData, 
  loadCountriesData,
  loadLicenses,
  loadProductLanguages,
  loadCollectionInitiatives,
  loadGlobalGoodsTypes
} from '@/lib/loaders';

interface ReferenceData {
  classifications: any[];
  standards: any;
  sdgs: any[];
  countries: any[];
  licenses: any[];
  languages: any[];
  initiatives: any[];
  globalGoodsTypes: any[];
  loading: boolean;
  error: string | null;
  // New methods for lazy loading
  loadClassifications: () => Promise<void>;
  loadCountries: () => Promise<void>;
  loadStandards: () => Promise<void>;
}

const ReferenceDataContext = createContext<ReferenceData>({
  classifications: [],
  standards: {},
  sdgs: [],
  countries: [],
  licenses: [],
  languages: [],
  initiatives: [],
  globalGoodsTypes: [],
  loading: false,
  error: null,
  loadClassifications: async () => {},
  loadCountries: async () => {},
  loadStandards: async () => {},
});

export function useReferenceData() {
  return useContext(ReferenceDataContext);
}

interface ReferenceDataProviderProps {
  children: ReactNode;
}

export function ReferenceDataProvider({ children }: ReferenceDataProviderProps) {
  const [data, setData] = useState<Omit<ReferenceData, 'loadClassifications' | 'loadCountries' | 'loadStandards'>>({
    classifications: [],
    standards: {},
    sdgs: [],
    countries: [],
    licenses: [],
    languages: [],
    initiatives: [],
    globalGoodsTypes: [],
    loading: false,
    error: null,
  });

  const [loadedSections, setLoadedSections] = useState<Set<string>>(new Set());

  // Load only essential data on mount (licenses, languages, initiatives, globalGoodsTypes)
  useEffect(() => {
    const loadEssentialData = async () => {
      try {
        setData(prev => ({ ...prev, loading: true, error: null }));

        // Check cache first for essential data
        const cacheKey = 'essentialReferenceData';
        const cacheTimestamp = localStorage.getItem(`${cacheKey}_timestamp`);
        const cacheValid = cacheTimestamp && 
          (Date.now() - parseInt(cacheTimestamp)) < (24 * 60 * 60 * 1000); // 24 hours

        if (cacheValid) {
          const cachedData = localStorage.getItem(cacheKey);
          if (cachedData) {
            const parsed = JSON.parse(cachedData);
            setData(prev => ({ ...prev, ...parsed, loading: false, error: null }));
            return;
          }
        }

        // Load only essential data
        const [
          licenses,
          languages,
          initiatives,
          globalGoodsTypes
        ] = await Promise.all([
          loadLicenses(),
          loadProductLanguages(),
          loadCollectionInitiatives(),
          loadGlobalGoodsTypes()
        ]);

        const essentialData = {
          licenses: licenses || [],
          languages: languages || [],
          initiatives: initiatives || [],
          globalGoodsTypes: globalGoodsTypes || [],
        };

        // Cache the essential data
        localStorage.setItem(cacheKey, JSON.stringify(essentialData));
        localStorage.setItem(`${cacheKey}_timestamp`, Date.now().toString());

        setData(prev => ({
          ...prev,
          ...essentialData,
          loading: false,
          error: null,
        }));
      } catch (error) {
        console.error('Failed to load essential reference data:', error);
        setData(prev => ({
          ...prev,
          loading: false,
          error: 'Failed to load essential reference data',
        }));
      }
    };

    loadEssentialData();
  }, []);

  // Lazy load classifications when needed
  const loadClassifications = useCallback(async () => {
    if (loadedSections.has('classifications')) return;
    
    try {
      setData(prev => ({ ...prev, loading: true }));
      
      const cacheKey = 'classificationsData';
      const cacheTimestamp = localStorage.getItem(`${cacheKey}_timestamp`);
      const cacheValid = cacheTimestamp && 
        (Date.now() - parseInt(cacheTimestamp)) < (12 * 60 * 60 * 1000); // 12 hours

      if (cacheValid) {
        const cachedData = localStorage.getItem(cacheKey);
        if (cachedData) {
          const parsed = JSON.parse(cachedData);
          setData(prev => ({ ...prev, classifications: parsed.classifications, sdgs: parsed.sdgs, loading: false }));
          setLoadedSections(prev => new Set(prev).add('classifications'));
          return;
        }
      }

      const [classifications, sdgs] = await Promise.all([
        loadClassificationsData('en'),
        loadSDGData('en')
      ]);

      const classificationData = {
        classifications: classifications || [],
        sdgs: sdgs || [],
      };

      localStorage.setItem(cacheKey, JSON.stringify(classificationData));
      localStorage.setItem(`${cacheKey}_timestamp`, Date.now().toString());

      setData(prev => ({ ...prev, ...classificationData, loading: false }));
      setLoadedSections(prev => new Set(prev).add('classifications'));
    } catch (error) {
      console.error('Failed to load classifications:', error);
      setData(prev => ({ ...prev, loading: false, error: 'Failed to load classifications' }));
    }
  }, [loadedSections]);

  // Lazy load countries when needed
  const loadCountries = useCallback(async () => {
    if (loadedSections.has('countries')) return;
    
    try {
      setData(prev => ({ ...prev, loading: true }));
      
      const cacheKey = 'countriesData';
      const cacheTimestamp = localStorage.getItem(`${cacheKey}_timestamp`);
      const cacheValid = cacheTimestamp && 
        (Date.now() - parseInt(cacheTimestamp)) < (24 * 60 * 60 * 1000); // 24 hours

      if (cacheValid) {
        const cachedData = localStorage.getItem(cacheKey);
        if (cachedData) {
          const parsed = JSON.parse(cachedData);
          setData(prev => ({ ...prev, countries: parsed, loading: false }));
          setLoadedSections(prev => new Set(prev).add('countries'));
          return;
        }
      }

      const countries = await loadCountriesData('en');

      localStorage.setItem(cacheKey, JSON.stringify(countries));
      localStorage.setItem(`${cacheKey}_timestamp`, Date.now().toString());

      setData(prev => ({ ...prev, countries: countries || [], loading: false }));
      setLoadedSections(prev => new Set(prev).add('countries'));
    } catch (error) {
      console.error('Failed to load countries:', error);
      setData(prev => ({ ...prev, loading: false, error: 'Failed to load countries' }));
    }
  }, [loadedSections]);

  // Lazy load standards when needed
  const loadStandards = useCallback(async () => {
    if (loadedSections.has('standards')) return;
    
    try {
      setData(prev => ({ ...prev, loading: true }));
      
      const cacheKey = 'standardsData';
      const cacheTimestamp = localStorage.getItem(`${cacheKey}_timestamp`);
      const cacheValid = cacheTimestamp && 
        (Date.now() - parseInt(cacheTimestamp)) < (24 * 60 * 60 * 1000); // 24 hours

      if (cacheValid) {
        const cachedData = localStorage.getItem(cacheKey);
        if (cachedData) {
          const parsed = JSON.parse(cachedData);
          setData(prev => ({ ...prev, standards: parsed, loading: false }));
          setLoadedSections(prev => new Set(prev).add('standards'));
          return;
        }
      }

      const standards = await loadStandardsData();

      localStorage.setItem(cacheKey, JSON.stringify(standards));
      localStorage.setItem(`${cacheKey}_timestamp`, Date.now().toString());

      setData(prev => ({ ...prev, standards: standards || {}, loading: false }));
      setLoadedSections(prev => new Set(prev).add('standards'));
    } catch (error) {
      console.error('Failed to load standards:', error);
      setData(prev => ({ ...prev, loading: false, error: 'Failed to load standards' }));
    }
  }, [loadedSections]);

  const contextValue: ReferenceData = {
    ...data,
    loadClassifications,
    loadCountries,
    loadStandards,
  };

  return (
    <ReferenceDataContext.Provider value={contextValue}>
      {children}
    </ReferenceDataContext.Provider>
  );
}
