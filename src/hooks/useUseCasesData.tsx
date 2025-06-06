
import { useState, useEffect, useMemo } from "react";
import { useUseCases, useGlobalGoods } from "@/lib/api";
import { useI18n } from "@/hooks/useI18n";
import { useLazyReferenceData } from "@/hooks/useLazyReferenceData";

interface AvailableFilterOptions {
  sdgs: Set<string>;
  whoSystems: Set<string>;
  wmoCategories: Set<string>;
  globalGoods: Set<string>;
  standards: Set<string>;
}

// Helper function to safely extract string values from standards
const extractStandardCodes = (standards: any[]): string[] => {
  if (!Array.isArray(standards)) return [];
  
  return standards
    .map(standard => {
      if (typeof standard === 'string') {
        return standard.trim();
      } else if (typeof standard === 'object' && standard !== null) {
        // If it's an object, try to extract the code
        console.warn('Found object in standards array, converting to code:', standard);
        return standard.code || standard.name || String(standard);
      }
      return null;
    })
    .filter((code): code is string => typeof code === 'string' && code.length > 0);
};

export function useUseCasesData() {
  const { data: useCases = [], isLoading: useCasesLoading } = useUseCases();
  const { data: globalGoods = [], isLoading: globalGoodsLoading } = useGlobalGoods();
  const { language } = useI18n();
  
  // Use lazy loading for reference data
  const {
    classifications = [],
    standards = [],
    sdgs = [],
    loading: referenceDataLoading
  } = useLazyReferenceData(['classifications', 'standards']);

  // Calculate which filter options have associated use cases
  const availableFilterOptions: AvailableFilterOptions = useMemo(() => {
    const availableSdgs = new Set<string>();
    const availableWhoSystems = new Set<string>();
    const availableWmoCategories = new Set<string>();
    const availableGlobalGoods = new Set<string>();
    const availableStandards = new Set<string>();

    console.log('Calculating available filters for', useCases.length, 'use cases');

    useCases.forEach(useCase => {
      // SDG availability - directly from use case data
      if (useCase.classifications?.sdg) {
        availableSdgs.add(useCase.classifications.sdg);
      }
      
      // WHO system availability
      if (useCase.classifications?.who_system) {
        availableWhoSystems.add(useCase.classifications.who_system);
      }
      
      // WMO category availability
      if (useCase.classifications?.wmo_category) {
        availableWmoCategories.add(useCase.classifications.wmo_category);
      }
      
      // Global goods availability - check both ID and Name for better matching
      if (useCase.global_goods) {
        useCase.global_goods.forEach(good => {
          if (good.id) {
            availableGlobalGoods.add(good.id);
            // Also try to match by name if IDs don't work
            const matchingGlobalGood = globalGoods.find(gg => 
              gg.ID === good.id || gg.Name === good.name
            );
            if (matchingGlobalGood) {
              availableGlobalGoods.add(matchingGlobalGood.ID);
            }
          }
          if (good.name) {
            // Try to find matching global good by name
            const matchingGlobalGood = globalGoods.find(gg => 
              gg.Name === good.name || gg.ID === good.name
            );
            if (matchingGlobalGood) {
              availableGlobalGoods.add(matchingGlobalGood.ID);
            }
          }
        });
      }
      
      // Standards availability - Use helper function for safe extraction
      if (useCase.standards && Array.isArray(useCase.standards)) {
        const standardCodes = extractStandardCodes(useCase.standards);
        standardCodes.forEach(code => {
          availableStandards.add(code);
        });
      }
    });

    console.log('Available filter options:', {
      sdgs: Array.from(availableSdgs),
      whoSystems: Array.from(availableWhoSystems),
      wmoCategories: Array.from(availableWmoCategories),
      globalGoods: Array.from(availableGlobalGoods),
      standards: Array.from(availableStandards)
    });

    return {
      sdgs: availableSdgs,
      whoSystems: availableWhoSystems,
      wmoCategories: availableWmoCategories,
      globalGoods: availableGlobalGoods,
      standards: availableStandards
    };
  }, [useCases, globalGoods]);

  return {
    useCases,
    globalGoods,
    classifications,
    standards: Array.isArray(standards) ? standards : Object.values(standards || {}),
    sdgData: sdgs,
    availableFilterOptions,
    isLoading: useCasesLoading || globalGoodsLoading || referenceDataLoading
  };
}
