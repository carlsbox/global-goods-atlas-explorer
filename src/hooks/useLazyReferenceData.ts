
import { useEffect } from 'react';
import { useReferenceData } from '@/contexts/ReferenceDataContext';

export function useLazyReferenceData(sections: ('classifications' | 'countries' | 'standards')[]) {
  const { loadClassifications, loadCountries, loadStandards, ...data } = useReferenceData();

  useEffect(() => {
    const loadRequiredSections = async () => {
      const promises = [];
      
      if (sections.includes('classifications')) {
        promises.push(loadClassifications());
      }
      
      if (sections.includes('countries')) {
        promises.push(loadCountries());
      }
      
      if (sections.includes('standards')) {
        promises.push(loadStandards());
      }

      await Promise.all(promises);
    };

    loadRequiredSections();
  }, [sections, loadClassifications, loadCountries, loadStandards]);

  return data;
}
