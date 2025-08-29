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
import { referenceDataCache } from '@/lib/cache/ReferenceDataCache';

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

  // Load essential data immediately on mount using centralized cache
  useEffect(() => {
    const loadEssentialData = async () => {
      try {
        console.log('ReferenceDataContext - Loading essential data');

        // Load all essential data through cache
        const [
          globalGoodsTypes,
          licenses,
          languages,
          initiatives
        ] = await Promise.all([
          referenceDataCache.get('globalGoodsTypes', loadGlobalGoodsTypes),
          referenceDataCache.get('licenses', loadLicenses),
          referenceDataCache.get('productLanguages', loadProductLanguages),
          referenceDataCache.get('collectionInitiatives', loadCollectionInitiatives)
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

  // Lazy load classifications when needed using centralized cache
  const loadClassifications = useCallback(async () => {
    if (loadedSections.has('classifications')) return;
    
    try {
      setData(prev => ({ ...prev, loading: true }));

      const [classifications, sdgs] = await Promise.all([
        referenceDataCache.get('classifications', () => loadClassificationsData('en')),
        referenceDataCache.get('sdgs', () => loadSDGData('en'))
      ]);

      setData(prev => ({ 
        ...prev, 
        classifications: classifications || [],
        sdgs: sdgs || [],
        loading: false 
      }));
      setLoadedSections(prev => new Set(prev).add('classifications'));
    } catch (error) {
      console.error('Failed to load classifications:', error);
      setData(prev => ({ ...prev, loading: false, error: 'Failed to load classifications' }));
    }
  }, [loadedSections]);

  // Lazy load countries when needed using centralized cache
  const loadCountries = useCallback(async () => {
    if (loadedSections.has('countries')) return;
    
    try {
      setData(prev => ({ ...prev, loading: true }));

      const countries = await referenceDataCache.get('countries', () => loadCountriesData('en'));

      setData(prev => ({ ...prev, countries: countries || [], loading: false }));
      setLoadedSections(prev => new Set(prev).add('countries'));
    } catch (error) {
      console.error('Failed to load countries:', error);
      setData(prev => ({ ...prev, loading: false, error: 'Failed to load countries' }));
    }
  }, [loadedSections]);

  // Lazy load standards when needed using centralized cache
  const loadStandardsData = useCallback(async () => {
    if (loadedSections.has('standards')) {
      console.log('ReferenceDataContext - Standards already loaded, skipping');
      return;
    }
    
    try {
      console.log('ReferenceDataContext - Loading standards...');
      setData(prev => ({ ...prev, loading: true, error: null }));

      const standards = await referenceDataCache.get('standards', loadStandards);
      
      console.log('ReferenceDataContext - Standards loaded:', {
        type: typeof standards,
        isArray: Array.isArray(standards),
        keys: standards ? Object.keys(standards).slice(0, 10) : [],
        sampleKeys: standards && Object.keys(standards).includes('HL7 FHIR') ? 'Has HL7 FHIR' : 'Missing HL7 FHIR'
      });

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
