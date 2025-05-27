
import { useMemo } from "react";
import { UseCase } from "@/lib/types";

interface UseFilteredUseCasesProps {
  useCases: UseCase[];
  globalGoods: any[];
  searchTerm: string;
  sdgFilter: string;
  whoSystemFilter: string;
  wmoFilter: string;
  globalGoodFilter: string;
  standardFilter: string;
}

export function useFilteredUseCases({
  useCases,
  globalGoods,
  searchTerm,
  sdgFilter,
  whoSystemFilter,
  wmoFilter,
  globalGoodFilter,
  standardFilter
}: UseFilteredUseCasesProps) {
  return useMemo(() => {
    return useCases.filter(useCase => {
      // Search filter - check multiple fields
      const matchesSearch = searchTerm === "" || [
        useCase.title,
        useCase.purpose || useCase.description || "",
        useCase.scope || "",
        useCase.actors || "",
        useCase.challenges || "",
        useCase.sustainability_considerations || ""
      ].some(field => field.toLowerCase().includes(searchTerm.toLowerCase()));
      
      // SDG filter
      const matchesSdg = sdgFilter === "all" || useCase.classifications?.sdg === sdgFilter;
      
      // WHO system filter
      const matchesWho = whoSystemFilter === "all" || useCase.classifications?.who_system === whoSystemFilter;
      
      // WMO filter
      const matchesWmo = wmoFilter === "all" || useCase.classifications?.wmo_category === wmoFilter;
      
      // Global good filter - improved matching logic
      const matchesGlobalGood = globalGoodFilter === "all" || 
        (useCase.global_goods && useCase.global_goods.some(good => {
          // Direct ID match
          if (good.id === globalGoodFilter) return true;
          // Name-based matching
          if (good.name === globalGoodFilter) return true;
          // Check if global good with this filter ID exists and matches by name
          const filterGlobalGood = globalGoods.find(gg => gg.id === globalGoodFilter);
          if (filterGlobalGood && (good.name === filterGlobalGood.name || good.id === filterGlobalGood.name)) {
            return true;
          }
          return false;
        }));
      
      // Standard filter
      const matchesStandard = standardFilter === "all" || 
        (useCase.standards && useCase.standards.some(standard => standard.code === standardFilter));
        
      return matchesSearch && matchesSdg && matchesWho && matchesWmo && matchesGlobalGood && matchesStandard;
    });
  }, [useCases, globalGoods, searchTerm, sdgFilter, whoSystemFilter, wmoFilter, globalGoodFilter, standardFilter]);
}
