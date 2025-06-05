import React, { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react';
import { 
  loadClassificationsData, 
  loadSDGData, 
  loadCountriesData,
  loadLicenses,
  loadProductLanguages,
  loadCollectionInitiatives,
  loadGlobalGoodsTypes
} from '@/lib/loaders';
import { loadStandards } from '@/lib/loaders/referenceDataLoader';

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

  // Load essential data immediately on mount
  useEffect(() => {
    const loadEssentialData = async () => {
      try {
        console.log('ReferenceDataContext - Loading essential data');
        
        const cacheKey = 'essentialReferenceData';
        const cacheTimestamp = localStorage.getItem(`${cacheKey}_timestamp`);
        const cacheValid = cacheTimestamp && 
          (Date.now() - parseInt(cacheTimestamp)) < (24 * 60 * 60 * 1000); // 24 hours

        if (cacheValid) {
          const cachedData = localStorage.getItem(cacheKey);
          if (cachedData) {
            const parsed = JSON.parse(cachedData);
            setData(prev => ({ ...prev, ...parsed, loading: false }));
            return;
          }
        }

        // Load all essential data at once for the reference page
        const [
          globalGoodsTypes,
          licenses,
          languages,
          initiatives
        ] = await Promise.all([
          loadGlobalGoodsTypes(),
          loadLicenses(),
          loadProductLanguages(),
          loadCollectionInitiatives()
        ]);

        console.log('ReferenceDataContext - Essential data loaded:', {
          globalGoodsTypes: globalGoodsTypes?.length || 0,
          licenses: licenses?.length || 0,
          languages: languages?.length || 0,
          initiatives: initiatives?.length || 0
        });

        const essentialData = {
          globalGoodsTypes: globalGoodsTypes || [],
          licenses: licenses || [],
          languages: languages || [],
          initiatives: initiatives || [],
        };

        // Cache the essential data
        localStorage.setItem(cacheKey, JSON.stringify(essentialData));
        localStorage.setItem(`${cacheKey}_timestamp`, Date.now().toString());

        setData(prev => ({
          ...prev,
          ...essentialData,
          loading: false,
        }));

      } catch (error) {
        console.error('ReferenceDataContext - Failed to load essential data:', error);
        setData(prev => ({
          ...prev,
          loading: false,
          error: 'Failed to load reference data',
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

  // Lazy load standards when needed - FIXED VERSION
  const loadStandardsData = useCallback(async () => {
    if (loadedSections.has('standards')) {
      console.log('ReferenceDataContext - Standards already loaded, skipping');
      return;
    }
    
    try {
      console.log('ReferenceDataContext - Loading standards...');
      setData(prev => ({ ...prev, loading: true, error: null }));
      
      const cacheKey = 'standardsData';
      const cacheTimestamp = localStorage.getItem(`${cacheKey}_timestamp`);
      const cacheValid = cacheTimestamp && 
        (Date.now() - parseInt(cacheTimestamp)) < (24 * 60 * 60 * 1000); // 24 hours

      if (cacheValid) {
        const cachedData = localStorage.getItem(cacheKey);
        if (cachedData) {
          console.log('ReferenceDataContext - Loading standards from cache');
          const parsed = JSON.parse(cachedData);
          setData(prev => ({ ...prev, standards: parsed, loading: false }));
          setLoadedSections(prev => new Set(prev).add('standards'));
          return;
        }
      }

      console.log('ReferenceDataContext - Fetching fresh standards data');
      const standards = await loadStandards();
      console.log('ReferenceDataContext - Standards loaded:', {
        type: typeof standards,
        isArray: Array.isArray(standards),
        keys: standards ? Object.keys(standards).slice(0, 10) : [],
        sampleKeys: standards && Object.keys(standards).includes('HL7 FHIR') ? 'Has HL7 FHIR' : 'Missing HL7 FHIR'
      });

      localStorage.setItem(cacheKey, JSON.stringify(standards));
      localStorage.setItem(`${cacheKey}_timestamp`, Date.now().toString());

      setData(prev => ({ ...prev, standards: standards || {}, loading: false }));
      setLoadedSections(prev => new Set(prev).add('standards'));
      console.log('ReferenceDataContext - Standards loading complete');
    } catch (error) {
      console.error('ReferenceDataContext - Failed to load standards:', error);
      setData(prev => ({ ...prev, loading: false, error: 'Failed to load standards' }));
    }
  }, [loadedSections]);

  const contextValue: ReferenceData = {
    ...data,
    loadClassifications,
    loadCountries,
    loadStandards: loadStandardsData,
  };

  return (
    <ReferenceDataContext.Provider value={contextValue}>
      {children}
    </ReferenceDataContext.Provider>
  );
}
