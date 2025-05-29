
import { useState, useEffect } from 'react';
import { GlobalGoodFlat } from '@/lib/types/globalGoodFlat';
import { useReferenceData } from '@/contexts/ReferenceDataContext';

interface ProgressiveLoadingState {
  basicData: Partial<GlobalGoodFlat> | null;
  detailedData: GlobalGoodFlat | null;
  loadingPhase: 'initial' | 'basic' | 'detailed' | 'complete' | 'error';
  error: string | null;
}

export function useProgressiveGlobalGood(id: string | undefined) {
  const [state, setState] = useState<ProgressiveLoadingState>({
    basicData: null,
    detailedData: null,
    loadingPhase: 'initial',
    error: null
  });
  
  const { loaded: referenceDataLoaded } = useReferenceData();

  useEffect(() => {
    if (!id) return;

    const loadProgressively = async () => {
      try {
        setState(prev => ({ ...prev, loadingPhase: 'initial' }));

        // Phase 1: Load basic data from index
        const indexResponse = await fetch('/data/global-goods/index.json');
        if (indexResponse.ok) {
          const index = await indexResponse.json();
          const basicItem = index.find((item: any) => item.ID === id);
          
          if (basicItem) {
            // Create basic data structure with minimal info
            const basicData: Partial<GlobalGoodFlat> = {
              ID: basicItem.ID,
              Name: basicItem.Name,
              Logo: basicItem.Logo,
              ProductOverview: {
                Summary: basicItem.Summary || '',
                Description: '',
                PrimaryFunctionality: '',
                Users: '',
                Languages: [],
                Screenshots: []
              },
              GlobalGoodsType: basicItem.GlobalGoodType?.map((code: string) => ({
                code,
                title: code,
                description: ''
              })) || [],
              Classifications: {
                SDGs: basicItem.Classifications?.SDGs?.map((code: string) => ({
                  code,
                  title: code,
                  description: ''
                })) || [],
                WHO: basicItem.Classifications?.WHO?.map((code: string) => ({
                  code,
                  title: code,
                  description: ''
                })) || [],
                WMO: basicItem.Classifications?.WMO?.map((code: string) => ({
                  code,
                  title: code,
                  description: ''
                })) || [],
                DPI: basicItem.Classifications?.DPI?.map((code: string) => ({
                  code,
                  title: code,
                  description: ''
                })) || []
              },
              Reach: {
                SummaryOfReach: '',
                NumberOfImplementations: 0,
                ImplementationMapOverview: null,
                ImplementationCountries: basicItem.Countries?.map((code: string) => ({
                  iso_code: code,
                  type: 'State',
                  names: { en: { short: code.toUpperCase(), formal: code.toUpperCase() } }
                })) || []
              }
            };

            setState(prev => ({
              ...prev,
              basicData,
              loadingPhase: 'basic'
            }));
          }
        }

        // Phase 2: Load detailed data (only after reference data is ready)
        if (referenceDataLoaded) {
          const detailResponse = await fetch(`/data/global-goods/individual/${id}.json`);
          if (detailResponse.ok) {
            const rawData = await detailResponse.json();
            
            // Transform using cached reference data
            const { transformRawDataToFlatOptimized } = await import('@/lib/loaders/optimizedGlobalGoodLoader');
            const detailedData = await transformRawDataToFlatOptimized(rawData);
            
            setState(prev => ({
              ...prev,
              detailedData,
              loadingPhase: 'detailed'
            }));
          }
        }

        setState(prev => ({ ...prev, loadingPhase: 'complete' }));
      } catch (error) {
        console.error('Error in progressive loading:', error);
        setState(prev => ({
          ...prev,
          loadingPhase: 'error',
          error: error instanceof Error ? error.message : 'Unknown error'
        }));
      }
    };

    loadProgressively();
  }, [id, referenceDataLoaded]);

  return {
    basicData: state.basicData,
    detailedData: state.detailedData,
    loadingPhase: state.loadingPhase,
    error: state.error,
    isBasicLoaded: state.loadingPhase === 'basic' || state.loadingPhase === 'detailed' || state.loadingPhase === 'complete',
    isDetailedLoaded: state.loadingPhase === 'detailed' || state.loadingPhase === 'complete',
    isComplete: state.loadingPhase === 'complete'
  };
}
