
import { useState, useEffect } from 'react';
import { loadSDGData } from '@/lib/loaders/sdgLoader';
import { loadClassificationsData } from '@/lib/loaders/classificationLoader';
import { loadStandardsData } from '@/lib/loaders/standardsLoader';
import { loadCountriesData } from '@/lib/loaders/countryLoader';
import { resolveClassificationCodes, getClassificationByCode } from '@/lib/loaders/classificationsReferenceLoader';
import { useI18n } from '@/hooks/useI18n';

export function useReferenceData() {
  const { language } = useI18n();
  const [data, setData] = useState({
    sdgs: [] as any[],
    classifications: [] as any[],
    standards: {} as any,
    countries: [] as any[],
    loading: true,
    error: null as string | null,
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        setData(prev => ({ ...prev, loading: true, error: null }));
        
        const [sdgs, classifications, standards, countries] = await Promise.all([
          loadSDGData(language),
          loadClassificationsData(language),
          loadStandardsData(),
          loadCountriesData(language),
        ]);

        setData({
          sdgs: Array.isArray(sdgs) ? sdgs : [],
          classifications: Array.isArray(classifications) ? classifications : [],
          standards: standards || {},
          countries: Array.isArray(countries) ? countries : [],
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

    loadData();
  }, [language]);

  // Helper functions for classification resolution
  const resolveClassifications = async (codes: string[]) => {
    try {
      return await resolveClassificationCodes(codes);
    } catch (error) {
      console.error('Failed to resolve classification codes:', error);
      return [];
    }
  };

  const getClassification = async (code: string) => {
    try {
      return await getClassificationByCode(code);
    } catch (error) {
      console.error('Failed to get classification by code:', error);
      return null;
    }
  };

  const findClassificationByCode = (code: string) => {
    return data.classifications.find(c => c.code === code) || null;
  };

  const getClassificationsByAuthority = (authority: string) => {
    return data.classifications.filter(c => 
      c.authority === authority || 
      c.authority === authority.toUpperCase()
    );
  };

  return {
    ...data,
    resolveClassifications,
    getClassification,
    findClassificationByCode,
    getClassificationsByAuthority,
  };
}
