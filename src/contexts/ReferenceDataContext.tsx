
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
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
  loading: true,
  error: null,
});

export function useReferenceData() {
  return useContext(ReferenceDataContext);
}

interface ReferenceDataProviderProps {
  children: ReactNode;
}

export function ReferenceDataProvider({ children }: ReferenceDataProviderProps) {
  const [data, setData] = useState<ReferenceData>({
    classifications: [],
    standards: {},
    sdgs: [],
    countries: [],
    licenses: [],
    languages: [],
    initiatives: [],
    globalGoodsTypes: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    const loadAllReferenceData = async () => {
      try {
        // Check cache first
        const cacheKey = 'referenceData';
        const cacheTimestamp = localStorage.getItem(`${cacheKey}_timestamp`);
        const cacheValid = cacheTimestamp && 
          (Date.now() - parseInt(cacheTimestamp)) < (24 * 60 * 60 * 1000); // 24 hours

        if (cacheValid) {
          const cachedData = localStorage.getItem(cacheKey);
          if (cachedData) {
            const parsed = JSON.parse(cachedData);
            setData({ ...parsed, loading: false, error: null });
            return;
          }
        }

        // Load fresh data
        const [
          classifications,
          standards,
          sdgs,
          countries,
          licenses,
          languages,
          initiatives,
          globalGoodsTypes
        ] = await Promise.all([
          loadClassificationsData('en'),
          loadStandardsData(),
          loadSDGData('en'),
          loadCountriesData('en'),
          loadLicenses(),
          loadProductLanguages(),
          loadCollectionInitiatives(),
          loadGlobalGoodsTypes()
        ]);

        const referenceData = {
          classifications: classifications || [],
          standards: standards || {},
          sdgs: sdgs || [],
          countries: countries || [],
          licenses: licenses || [],
          languages: languages || [],
          initiatives: initiatives || [],
          globalGoodsTypes: globalGoodsTypes || [],
        };

        // Cache the data
        localStorage.setItem(cacheKey, JSON.stringify(referenceData));
        localStorage.setItem(`${cacheKey}_timestamp`, Date.now().toString());

        setData({
          ...referenceData,
          loading: false,
          error: null,
        });
      } catch (error) {
        console.error('Failed to load reference data:', error);
        setData(prev => ({
          ...prev,
          loading: false,
          error: 'Failed to load reference data',
        }));
      }
    };

    loadAllReferenceData();
  }, []);

  return (
    <ReferenceDataContext.Provider value={data}>
      {children}
    </ReferenceDataContext.Provider>
  );
}
