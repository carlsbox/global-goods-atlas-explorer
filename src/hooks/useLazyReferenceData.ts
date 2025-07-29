
import { useEffect, useMemo, useRef } from 'react';
import { useReferenceData } from '@/contexts/ReferenceDataContext';

export function useLazyReferenceData(sections: readonly ('classifications' | 'countries' | 'standards')[] | ('classifications' | 'countries' | 'standards')[]) {
  const { loadClassifications, loadCountries, loadStandards, ...data } = useReferenceData();
  
  // Use ref to track loading states to prevent duplicate calls
  const loadingRef = useRef<Set<string>>(new Set());

  // Improved memoization using JSON stringify for better stability
  const memoizedSections = useMemo(() => {
    return [...sections].sort(); // Sort to ensure consistent ordering
  }, [JSON.stringify(sections)]);

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
      
      // Check if classifications need to be loaded
      if (memoizedSections.includes('classifications') && 
          !data.classifications?.length && 
          !loadingRef.current.has('classifications')) {
        console.log('useLazyReferenceData - Loading classifications');
        loadingRef.current.add('classifications');
        promises.push(
          loadClassifications().finally(() => {
            loadingRef.current.delete('classifications');
          })
        );
      }
      
      // Check if countries need to be loaded
      if (memoizedSections.includes('countries') && 
          !data.countries?.length && 
          !loadingRef.current.has('countries')) {
        console.log('useLazyReferenceData - Loading countries');
        loadingRef.current.add('countries');
        promises.push(
          loadCountries().finally(() => {
            loadingRef.current.delete('countries');
          })
        );
      }
      
      // Check if standards need to be loaded
      if (memoizedSections.includes('standards') && 
          (!data.standards || Object.keys(data.standards).length === 0) && 
          !loadingRef.current.has('standards')) {
        console.log('useLazyReferenceData - Loading standards');
        loadingRef.current.add('standards');
        promises.push(
          loadStandards().finally(() => {
            loadingRef.current.delete('standards');
          })
        );
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
