import { useMemo } from 'react';
import { useLazyReferenceData } from '@/hooks/useLazyReferenceData';

/**
 * Enhanced hook that provides reference data with proper resolution functions
 * for filters and display components
 */
export function useEnhancedReferenceData() {
  const {
    standards = {},
    countries = [],
    classifications = [],
    loading,
    error,
  } = useLazyReferenceData(['standards', 'countries', 'classifications']);

  // Create lookup maps for efficient resolution
  const referenceData = useMemo(() => {
    // Standards lookup - flatten all standards into a single map
    const standardsMap = new Map<string, { code: string; name: string; description: string; domain: string }>();
    
    if (standards && typeof standards === 'object') {
      Object.entries(standards).forEach(([domain, domainStandards]) => {
        if (typeof domainStandards === 'object') {
          Object.entries(domainStandards).forEach(([code, standard]: [string, any]) => {
            standardsMap.set(code, {
              code,
              name: standard.name || code,
              description: standard.description || '',
              domain: standard.domain || domain
            });
          });
        }
      });
    }

    // Countries lookup
    const countriesMap = new Map<string, { code: string; name: string }>();
    countries.forEach(country => {
      if (country.code && country.names?.en?.short) {
        countriesMap.set(country.code, {
          code: country.code,
          name: country.names.en.short
        });
      }
    });

    // Classifications lookup
    const classificationsMap = new Map<string, { code: string; title: string; authority: string }>();
    classifications.forEach(classification => {
      if (classification.code) {
        classificationsMap.set(classification.code, {
          code: classification.code,
          title: classification.title || classification.code,
          authority: classification.authority || 'Unknown'
        });
      }
    });

    return {
      standardsMap,
      countriesMap,
      classificationsMap
    };
  }, [standards, countries, classifications]);

  // Helper functions
  const getStandardName = (code: string): string => {
    const standard = referenceData.standardsMap.get(code);
    return standard?.name || code;
  };

  const getCountryName = (code: string): string => {
    const country = referenceData.countriesMap.get(code);
    return country?.name || code;
  };

  const getClassificationTitle = (code: string): string => {
    const classification = referenceData.classificationsMap.get(code);
    return classification?.title || code;
  };

  const validateReference = (code: string, type: 'standard' | 'country' | 'classification'): boolean => {
    switch (type) {
      case 'standard':
        return referenceData.standardsMap.has(code);
      case 'country':
        return referenceData.countriesMap.has(code);
      case 'classification':
        return referenceData.classificationsMap.has(code);
      default:
        return false;
    }
  };

  // Get available standards grouped by domain
  const getStandardsByDomain = () => {
    const byDomain: Record<string, Array<{ code: string; name: string; description: string }>> = {};
    
    referenceData.standardsMap.forEach(standard => {
      const domain = standard.domain || 'other';
      if (!byDomain[domain]) {
        byDomain[domain] = [];
      }
      byDomain[domain].push(standard);
    });

    return byDomain;
  };

  return {
    loading,
    error,
    getStandardName,
    getCountryName,
    getClassificationTitle,
    validateReference,
    getStandardsByDomain,
    standardsMap: referenceData.standardsMap,
    countriesMap: referenceData.countriesMap,
    classificationsMap: referenceData.classificationsMap
  };
}