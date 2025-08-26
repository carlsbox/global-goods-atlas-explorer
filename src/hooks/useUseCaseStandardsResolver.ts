import { useState, useEffect } from 'react';

interface Standard {
  code: string;
  name: string;
  description: string;
  domain?: string;
  type?: string;
  link?: string;
}

interface GroupedStandards {
  health: Standard[];
  interoperability: Standard[];
  climate: Standard[];
  dataCollection: Standard[];
  emergency: Standard[];
}

export function useUseCaseStandardsResolver(standardCodes: string[]) {
  const [groupedStandards, setGroupedStandards] = useState<GroupedStandards>({
    health: [],
    interoperability: [],
    climate: [],
    dataCollection: [],
    emergency: []
  });
  const [resolvedStandards, setResolvedStandards] = useState<Standard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!standardCodes || standardCodes.length === 0) {
      setLoading(false);
      return;
    }

    async function resolveStandards() {
      setLoading(true);
      setError(null);

      try {
        // Load standards directly from localStorage or files
        const standardsData = localStorage.getItem('standardsData');
        let standards: Record<string, Standard> = {};

        if (standardsData) {
          try {
            standards = JSON.parse(standardsData);
            console.log('useUseCaseStandardsResolver - Loaded from cache:', Object.keys(standards).length, 'standards');
          } catch (e) {
            console.error('Failed to parse cached standards:', e);
          }
        }

        // If no cached data, load from files
        if (Object.keys(standards).length === 0) {
          console.log('useUseCaseStandardsResolver - Loading standards from files');
          
          try {
            // Load all standards files
            const [healthRes, interopRes, climateRes] = await Promise.all([
              fetch('/data/reference/standards/health.json'),
              fetch('/data/reference/standards/interoperability.json'),
              fetch('/data/reference/standards/climate.json')
            ]);

            const [healthData, interopData, climateData] = await Promise.all([
              healthRes.json(),
              interopRes.json(),
              climateRes.json()
            ]);

            // Merge all standards into a single object with domain info
            Object.entries(healthData).forEach(([code, data]: [string, any]) => {
              standards[code] = { ...data, code, domain: 'Health' };
            });
            Object.entries(interopData).forEach(([code, data]: [string, any]) => {
              standards[code] = { ...data, code, domain: 'Interoperability' };
            });
            Object.entries(climateData).forEach(([code, data]: [string, any]) => {
              standards[code] = { ...data, code, domain: 'Climate' };
            });

            // Cache the merged data
            localStorage.setItem('standardsData', JSON.stringify(standards));
            localStorage.setItem('standardsData_timestamp', Date.now().toString());
            
            console.log('useUseCaseStandardsResolver - Loaded and cached', Object.keys(standards).length, 'standards');
          } catch (error) {
            console.error('Failed to load standards from files:', error);
            setError('Failed to load standards data');
            setLoading(false);
            return;
          }
        }

        // Now resolve the standard codes
        const resolved: Standard[] = [];
        const grouped: GroupedStandards = {
          health: [],
          interoperability: [],
          climate: [],
          dataCollection: [],
          emergency: []
        };

        console.log('useUseCaseStandardsResolver - Resolving codes:', standardCodes);
        console.log('useUseCaseStandardsResolver - Available standards:', Object.keys(standards).slice(0, 10));

        standardCodes.forEach(code => {
          const trimmedCode = code.trim();
          
          // Try exact match first
          let standard = standards[trimmedCode];
          
          // If not found, try case-insensitive match
          if (!standard) {
            const upperCode = trimmedCode.toUpperCase();
            const matchKey = Object.keys(standards).find(key => key.toUpperCase() === upperCode);
            if (matchKey) {
              standard = standards[matchKey];
              console.log(`useUseCaseStandardsResolver - Found case-insensitive match: ${trimmedCode} -> ${matchKey}`);
            }
          }

          if (standard) {
            resolved.push(standard);
            
            // Group by domain
            const domain = standard.domain?.toLowerCase() || '';
            
            if (domain.includes('health')) {
              grouped.health.push(standard);
            } else if (domain.includes('interoperability')) {
              grouped.interoperability.push(standard);
            } else if (domain.includes('climate')) {
              grouped.climate.push(standard);
            } else if (standard.type?.toLowerCase().includes('data') || 
                      standard.name?.toLowerCase().includes('data')) {
              grouped.dataCollection.push(standard);
            } else if (standard.type?.toLowerCase().includes('emergency') || 
                      standard.name?.toLowerCase().includes('emergency')) {
              grouped.emergency.push(standard);
            } else {
              // Default to interoperability for unknown domains
              grouped.interoperability.push(standard);
            }
          } else {
            console.warn(`useUseCaseStandardsResolver - Standard not found: "${trimmedCode}"`);
          }
        });

        console.log('useUseCaseStandardsResolver - Resolution complete:', {
          requested: standardCodes.length,
          resolved: resolved.length,
          grouped: {
            health: grouped.health.length,
            interoperability: grouped.interoperability.length,
            climate: grouped.climate.length,
            dataCollection: grouped.dataCollection.length,
            emergency: grouped.emergency.length
          }
        });

        setResolvedStandards(resolved);
        setGroupedStandards(grouped);
      } catch (err) {
        console.error('useUseCaseStandardsResolver - Error:', err);
        setError(err instanceof Error ? err.message : 'Failed to resolve standards');
      } finally {
        setLoading(false);
      }
    }

    resolveStandards();
  }, [standardCodes]);

  return { groupedStandards, resolvedStandards, loading, error };
}