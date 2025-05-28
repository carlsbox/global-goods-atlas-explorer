
import { useState, useEffect } from 'react';
import { loadSDGData } from '@/lib/loaders/sdgLoader';
import { loadClassificationsData } from '@/lib/loaders/classificationLoader';
import { loadStandardsData } from '@/lib/loaders/standardsLoader';
import { loadCountriesData } from '@/lib/loaders/countryLoader';
import { useI18n } from '@/hooks/useI18n';

export function useReferenceData() {
  const { language } = useI18n();
  const [data, setData] = useState({
    sdgs: [],
    classifications: [],
    standards: {},
    countries: [],
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
          sdgs,
          classifications,
          standards,
          countries,
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

  return data;
}
