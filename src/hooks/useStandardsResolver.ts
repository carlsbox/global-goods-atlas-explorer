
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
  const { standards, loading } = useLazyReferenceData(['standards']);

  console.log('useStandardsResolver - Input codes:', standardCodes);
  console.log('useStandardsResolver - Standards data:', standards);
  console.log('useStandardsResolver - Loading state:', loading);

  const resolvedStandards = useMemo(() => {
    if (!standards || loading || !standardCodes.length) {
      console.log('useStandardsResolver - Early return due to:', {
        hasStandards: !!standards,
        loading,
        hasStandardCodes: standardCodes.length > 0
      });
      return [];
    }

    console.log('useStandardsResolver - Available standard keys:', Object.keys(standards));
    
    const resolved = standardCodes
      .map(code => {
        const standard = standards[code];
        console.log(`useStandardsResolver - Resolving "${code}":`, standard);
        return standard;
      })
      .filter(Boolean) as Standard[];

    console.log('useStandardsResolver - Resolved standards:', resolved);
    return resolved;
  }, [standards, standardCodes, loading]);

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
      }
    });

    console.log('useStandardsResolver - Grouped standards:', groups);
    return groups;
  }, [resolvedStandards]);

  return {
    resolvedStandards,
    groupedStandards,
    loading,
  };
}
