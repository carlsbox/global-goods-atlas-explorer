
import { useState, useEffect, useMemo } from "react";
import { useUseCases, useGlobalGoods } from "@/lib/api";
import { useI18n } from "@/hooks/useI18n";
import { loadClassificationsData, loadStandardsData, loadSDGData } from "@/lib/loaders";

interface AvailableFilterOptions {
  sdgs: Set<string>;
  whoSystems: Set<string>;
  wmoCategories: Set<string>;
  globalGoods: Set<string>;
  standards: Set<string>;
}

export function useUseCasesData() {
  const { data: useCases = [], isLoading: useCasesLoading } = useUseCases();
  const { data: globalGoods = [], isLoading: globalGoodsLoading } = useGlobalGoods();
  const { language } = useI18n();
  
  const [classifications, setClassifications] = useState<any[]>([]);
  const [standards, setStandards] = useState<any[]>([]);
  const [sdgData, setSdgData] = useState<any[]>([]);
  
  // Load classifications, standards, and SDG data
  useEffect(() => {
    const loadData = async () => {
      try {
        const [classificationsData, standardsData, sdgDataLoaded] = await Promise.all([
          loadClassificationsData(language),
          loadStandardsData(),
          loadSDGData(language)
        ]);
        setClassifications(classificationsData || []);
        
        // Handle standards data which might be an object or array
        if (Array.isArray(standardsData)) {
          setStandards(standardsData);
        } else if (standardsData && typeof standardsData === 'object') {
          // Convert object to array
          setStandards(Object.values(standardsData));
        } else {
          setStandards([]);
        }
        
        setSdgData(sdgDataLoaded || []);
        
        // Debug logging
        console.log('Loaded data:', {
          classifications: classificationsData?.length || 0,
          standards: Array.isArray(standardsData) ? standardsData.length : Object.keys(standardsData || {}).length,
          sdgs: sdgDataLoaded?.length || 0,
          useCases: useCases.length,
          globalGoods: globalGoods.length
        });
      } catch (error) {
        console.error('Failed to load additional data:', error);
      }
    };
    loadData();
  }, [language, useCases.length, globalGoods.length]);

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
      
      // Standards availability
      if (useCase.standards) {
        useCase.standards.forEach(standard => {
          if (standard.code) availableStandards.add(standard.code);
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
    standards,
    sdgData,
    availableFilterOptions,
    isLoading: useCasesLoading || globalGoodsLoading
  };
}
