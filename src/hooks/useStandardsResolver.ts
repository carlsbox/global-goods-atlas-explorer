
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

  const resolvedStandards = useMemo(() => {
    if (!standards || loading || !standardCodes.length) return [];

    return standardCodes
      .map(code => standards[code])
      .filter(Boolean) as Standard[];
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
      }
    });

    return groups;
  }, [resolvedStandards]);

  return {
    resolvedStandards,
    groupedStandards,
    loading,
  };
}
