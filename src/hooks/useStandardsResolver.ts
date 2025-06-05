
import { useMemo } from 'react';
import { useLazyReferenceData } from '@/hooks/useLazyReferenceData';

interface Standard {
  code: string;
  name: string;
  description: string;
  domain: string;
  type: string;
  link: string;
}

export function useStandardsResolver(standardCodes: string[]) {
  const { standards, loading, error } = useLazyReferenceData(['standards']);

  console.log('useStandardsResolver - Phase 2 Debug:', {
    inputCodes: standardCodes,
    standardsType: typeof standards,
    standardsIsArray: Array.isArray(standards),
    standardsKeys: standards ? Object.keys(standards).slice(0, 10) : [],
    loading,
    error
  });

  const resolvedStandards = useMemo(() => {
    if (!standards || loading || !standardCodes.length) {
      console.log('useStandardsResolver - Early return:', {
        hasStandards: !!standards,
        loading,
        hasStandardCodes: standardCodes.length > 0,
        error
      });
      return [];
    }

    console.log('useStandardsResolver - Processing standards:', {
      standardsKeys: Object.keys(standards),
      inputCodes: standardCodes
    });
    
    const resolved = standardCodes
      .map(code => {
        // Try exact match first
        let standard = standards[code];
        
        // If not found, try case-insensitive lookup
        if (!standard) {
          const lowerCode = code.toLowerCase();
          const foundKey = Object.keys(standards).find(key => 
            key.toLowerCase() === lowerCode
          );
          if (foundKey) {
            standard = standards[foundKey];
            console.log(`useStandardsResolver - Found case-insensitive match: "${code}" -> "${foundKey}"`);
          }
        }
        
        // If still not found, try partial matching for common aliases
        if (!standard) {
          if (code.toLowerCase().includes('fhir')) {
            standard = standards['HL7 FHIR'] || standards['FHIR'];
          } else if (code.toLowerCase().includes('icd')) {
            standard = standards['ICD-10'] || standards['ICD'];
          }
        }

        if (standard) {
          console.log(`useStandardsResolver - Successfully resolved "${code}":`, standard);
        } else {
          console.warn(`useStandardsResolver - Could not resolve standard code: "${code}"`);
        }
        
        return standard;
      })
      .filter(Boolean) as Standard[];

    console.log('useStandardsResolver - Final resolved standards:', resolved);
    return resolved;
  }, [standards, standardCodes, loading, error]);

  const groupedStandards = useMemo(() => {
    const groups = {
      health: [] as Standard[],
      interoperability: [] as Standard[],
      climate: [] as Standard[],
      dataCollection: [] as Standard[],
      emergency: [] as Standard[],
    };

    resolvedStandards.forEach(standard => {
      console.log(`useStandardsResolver - Grouping standard "${standard.code}" with domain "${standard.domain}"`);
      
      switch (standard.domain) {
        case 'Health':
          groups.health.push(standard);
          break;
        case 'Interoperability':
          groups.interoperability.push(standard);
          break;
        case 'Weather and Climate':
          groups.climate.push(standard);
          break;
        case 'Data Collection':
          groups.dataCollection.push(standard);
          break;
        case 'Emergency':
          groups.emergency.push(standard);
          break;
        default:
          console.log(`useStandardsResolver - Unknown domain "${standard.domain}" for standard "${standard.code}"`);
          // Default to health if domain is unclear
          groups.health.push(standard);
      }
    });

    console.log('useStandardsResolver - Final grouped standards:', groups);
    return groups;
  }, [resolvedStandards]);

  return {
    resolvedStandards,
    groupedStandards,
    loading,
    error,
  };
}
