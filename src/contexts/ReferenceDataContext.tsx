
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { loadLicenses, loadStandards, loadGlobalGoodsTypes, loadCountries } from '@/lib/loaders/referenceDataLoader';
import { loadClassificationsByAuthority } from '@/lib/loaders/classificationsReferenceLoader';

interface ReferenceData {
  licenses: any[];
  standards: Record<string, any>;
  globalGoodsTypes: any[];
  countries: Record<string, any>;
  classifications: {
    sdgs: any[];
    who: any[];
    wmo: any[];
    dpi: any[];
  };
  loaded: boolean;
  error: string | null;
}

const ReferenceDataContext = createContext<ReferenceData>({
  licenses: [],
  standards: {},
  globalGoodsTypes: [],
  countries: {},
  classifications: { sdgs: [], who: [], wmo: [], dpi: [] },
  loaded: false,
  error: null
});

export const useReferenceData = () => useContext(ReferenceDataContext);

interface ReferenceDataProviderProps {
  children: ReactNode;
}

export function ReferenceDataProvider({ children }: ReferenceDataProviderProps) {
  const [data, setData] = useState<ReferenceData>({
    licenses: [],
    standards: {},
    globalGoodsTypes: [],
    countries: {},
    classifications: { sdgs: [], who: [], wmo: [], dpi: [] },
    loaded: false,
    error: null
  });

  useEffect(() => {
    const loadReferenceData = async () => {
      try {
        // Check localStorage cache first
        const cacheKey = 'reference-data-cache';
        const cacheTimestampKey = 'reference-data-timestamp';
        const cached = localStorage.getItem(cacheKey);
        const timestamp = localStorage.getItem(cacheTimestampKey);
        
        // Use cache if it's less than 24 hours old
        if (cached && timestamp) {
          const age = Date.now() - parseInt(timestamp);
          if (age < 24 * 60 * 60 * 1000) { // 24 hours
            const cachedData = JSON.parse(cached);
            setData({ ...cachedData, loaded: true, error: null });
            return;
          }
        }

        // Load fresh data
        const [
          licenses,
          standards,
          globalGoodsTypes,
          countries,
          sdgs,
          who,
          wmo,
          dpi
        ] = await Promise.all([
          loadLicenses(),
          loadStandards(),
          loadGlobalGoodsTypes(),
          loadCountries(),
          loadClassificationsByAuthority('sdgs'),
          loadClassificationsByAuthority('who'),
          loadClassificationsByAuthority('wmo'),
          loadClassificationsByAuthority('dpi')
        ]);

        const referenceData = {
          licenses,
          standards,
          globalGoodsTypes,
          countries,
          classifications: { sdgs, who, wmo, dpi }
        };

        // Cache the data
        localStorage.setItem(cacheKey, JSON.stringify(referenceData));
        localStorage.setItem(cacheTimestampKey, Date.now().toString());

        setData({
          ...referenceData,
          loaded: true,
          error: null
        });
      } catch (error) {
        console.error('Failed to load reference data:', error);
        setData(prev => ({
          ...prev,
          loaded: true,
          error: 'Failed to load reference data'
        }));
      }
    };

    loadReferenceData();
  }, []);

  return (
    <ReferenceDataContext.Provider value={data}>
      {children}
    </ReferenceDataContext.Provider>
  );
}
