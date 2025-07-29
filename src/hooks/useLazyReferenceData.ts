
import { useEffect } from 'react';
import { useReferenceData } from '@/contexts/ReferenceDataContext';

export function useLazyReferenceData(sections: ('classifications' | 'countries' | 'standards')[]) {
  const { loadClassifications, loadCountries, loadStandards, ...data } = useReferenceData();

  console.log('useLazyReferenceData - Requested sections:', sections);
  console.log('useLazyReferenceData - Current data state:', {
    hasStandards: !!data.standards && Object.keys(data.standards).length > 0,
    standardsKeys: data.standards ? Object.keys(data.standards).slice(0, 5) : [],
    loading: data.loading,
    error: data.error
  });

  // Transform standards object into grouped arrays by domain
  const transformedStandards = data.standards ? {
    health: Object.values(data.standards).filter((s: any) => s.domain === 'Health'),
    interoperability: Object.values(data.standards).filter((s: any) => s.domain === 'Interoperability'),
    climate: Object.values(data.standards).filter((s: any) => s.domain === 'Weather and Climate')
  } : { health: [], interoperability: [], climate: [] };

  useEffect(() => {
    const loadRequiredSections = async () => {
      const promises = [];
      
      if (sections.includes('classifications')) {
        console.log('useLazyReferenceData - Loading classifications');
        promises.push(loadClassifications());
      }
      
      if (sections.includes('countries')) {
        console.log('useLazyReferenceData - Loading countries');
        promises.push(loadCountries());
      }
      
      if (sections.includes('standards')) {
        console.log('useLazyReferenceData - Loading standards');
        promises.push(loadStandards());
      }

      try {
        await Promise.all(promises);
        console.log('useLazyReferenceData - All sections loaded successfully');
      } catch (error) {
        console.error('useLazyReferenceData - Error loading sections:', error);
      }
    };

    loadRequiredSections();
  }, [sections, loadClassifications, loadCountries, loadStandards]);

  return {
    ...data,
    standards: transformedStandards
  };
}
