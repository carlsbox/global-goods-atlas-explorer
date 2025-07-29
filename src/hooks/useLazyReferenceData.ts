
import { useEffect, useMemo } from 'react';
import { useReferenceData } from '@/contexts/ReferenceDataContext';

export function useLazyReferenceData(sections: ('classifications' | 'countries' | 'standards')[]) {
  const { loadClassifications, loadCountries, loadStandards, ...data } = useReferenceData();

  // Memoize sections to prevent infinite loops
  const memoizedSections = useMemo(() => sections, [sections.join(',')]);

  console.log('useLazyReferenceData - Requested sections:', memoizedSections);
  console.log('useLazyReferenceData - Current data state:', {
    hasStandards: !!data.standards && Object.keys(data.standards).length > 0,
    standardsKeys: data.standards ? Object.keys(data.standards).slice(0, 5) : [],
    loading: data.loading,
    error: data.error
  });

  useEffect(() => {
    const loadRequiredSections = async () => {
      const promises = [];
      
      if (memoizedSections.includes('classifications') && !data.classifications?.length) {
        console.log('useLazyReferenceData - Loading classifications');
        promises.push(loadClassifications());
      }
      
      if (memoizedSections.includes('countries') && !data.countries?.length) {
        console.log('useLazyReferenceData - Loading countries');
        promises.push(loadCountries());
      }
      
      if (memoizedSections.includes('standards') && !data.standards) {
        console.log('useLazyReferenceData - Loading standards');
        promises.push(loadStandards());
      }

      if (promises.length === 0) {
        return; // Nothing to load
      }

      try {
        await Promise.all(promises);
        console.log('useLazyReferenceData - All sections loaded successfully');
      } catch (error) {
        console.error('useLazyReferenceData - Error loading sections:', error);
      }
    };

    loadRequiredSections();
  }, [memoizedSections, loadClassifications, loadCountries, loadStandards, data.classifications?.length, data.countries?.length, data.standards]);

  return data;
}
