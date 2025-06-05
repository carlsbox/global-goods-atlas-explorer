
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
    console.log('Filtering use cases with globalGoodFilter:', globalGoodFilter);
    
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
      
      // Global good filter - simplified logic
      const matchesGlobalGood = globalGoodFilter === "all" || 
        (useCase.global_goods && useCase.global_goods.some(good => {
          // Check if the good's ID or name matches the filter
          const matchesId = good.id === globalGoodFilter;
          const matchesName = good.name === globalGoodFilter;
          
          // Also check if the filter corresponds to a global good ID that matches this good's name
          const filterGlobalGood = globalGoods.find(gg => gg.ID === globalGoodFilter);
          const matchesGlobalGoodName = filterGlobalGood && (
            good.name === filterGlobalGood.Name || 
            good.id === filterGlobalGood.ID
          );
          
          console.log('Global good matching:', {
            goodId: good.id,
            goodName: good.name,
            filter: globalGoodFilter,
            matchesId,
            matchesName,
            matchesGlobalGoodName
          });
          
          return matchesId || matchesName || matchesGlobalGoodName;
        }));
      
      // Standard filter - Updated to work with string array
      const matchesStandard = standardFilter === "all" || 
        (useCase.standards && useCase.standards.includes(standardFilter));
        
      return matchesSearch && matchesSdg && matchesWho && matchesWmo && matchesGlobalGood && matchesStandard;
    });
  }, [useCases, globalGoods, searchTerm, sdgFilter, whoSystemFilter, wmoFilter, globalGoodFilter, standardFilter]);
}
