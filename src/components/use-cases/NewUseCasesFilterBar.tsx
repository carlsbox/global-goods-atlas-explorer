
import { SearchFilter } from "./filters/SearchFilter";
import { SDGFilter } from "./filters/SDGFilter";
import { WHOSystemFilter } from "./filters/WHOSystemFilter";
import { WMOCategoryFilter } from "./filters/WMOCategoryFilter";
import { GlobalGoodFilter } from "./filters/GlobalGoodFilter";
import { StandardFilter } from "./filters/StandardFilter";
import { ActiveFilterBadges } from "./filters/ActiveFilterBadges";
import { useFilterOptions } from "@/hooks/useFilterOptions";

interface AvailableFilterOptions {
  sdgs: Set<string>;
  whoSystems: Set<string>;
  wmoCategories: Set<string>;
  globalGoods: Set<string>;
  standards: Set<string>;
}

interface NewUseCasesFilterBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  sdgFilter: string;
  setSdgFilter: (sdg: string) => void;
  whoSystemFilter: string;
  setWhoSystemFilter: (system: string) => void;
  wmoFilter: string;
  setWmoFilter: (category: string) => void;
  globalGoodFilter: string;
  setGlobalGoodFilter: (globalGood: string) => void;
  standardFilter: string;
  setStandardFilter: (standard: string) => void;
  onClearAllFilters: () => void;
  globalGoods?: any[];
  classifications?: any[];
  standards?: any[];
  sdgData?: any[];
  availableFilterOptions?: AvailableFilterOptions;
}

export function NewUseCasesFilterBar({
  searchTerm,
  setSearchTerm,
  sdgFilter,
  setSdgFilter,
  whoSystemFilter,
  setWhoSystemFilter,
  wmoFilter,
  setWmoFilter,
  globalGoodFilter,
  setGlobalGoodFilter,
  standardFilter,
  setStandardFilter,
  onClearAllFilters,
  globalGoods = [],
  classifications = [],
  standards = [],
  sdgData = [],
  availableFilterOptions
}: NewUseCasesFilterBarProps) {
  const { sdgOptions, whoOptions, wmoOptions, standardOptions } = useFilterOptions({
    globalGoods,
    classifications,
    standards,
    sdgData
  });

  const hasActiveFilters = sdgFilter !== "all" || whoSystemFilter !== "all" || wmoFilter !== "all" || 
                          globalGoodFilter !== "all" || standardFilter !== "all" || searchTerm !== "";

  return (
    <div className="bg-card shadow-sm rounded-lg p-6 mb-8 space-y-4">
      <SearchFilter searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <SDGFilter
          sdgFilter={sdgFilter}
          setSdgFilter={setSdgFilter}
          sdgOptions={sdgOptions}
          availableOptions={availableFilterOptions?.sdgs || new Set()}
        />

        <WHOSystemFilter
          whoSystemFilter={whoSystemFilter}
          setWhoSystemFilter={setWhoSystemFilter}
          whoOptions={whoOptions}
          classifications={classifications}
          availableOptions={availableFilterOptions?.whoSystems || new Set()}
        />

        <WMOCategoryFilter
          wmoFilter={wmoFilter}
          setWmoFilter={setWmoFilter}
          wmoOptions={wmoOptions}
          classifications={classifications}
          availableOptions={availableFilterOptions?.wmoCategories || new Set()}
        />

        <GlobalGoodFilter
          globalGoodFilter={globalGoodFilter}
          setGlobalGoodFilter={setGlobalGoodFilter}
          globalGoods={globalGoods}
          availableOptions={availableFilterOptions?.globalGoods || new Set()}
        />

        <StandardFilter
          standardFilter={standardFilter}
          setStandardFilter={setStandardFilter}
          standardOptions={standardOptions}
          availableOptions={availableFilterOptions?.standards || new Set()}
        />
      </div>

      {hasActiveFilters && (
        <ActiveFilterBadges
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          sdgFilter={sdgFilter}
          setSdgFilter={setSdgFilter}
          whoSystemFilter={whoSystemFilter}
          setWhoSystemFilter={setWhoSystemFilter}
          wmoFilter={wmoFilter}
          setWmoFilter={setWmoFilter}
          globalGoodFilter={globalGoodFilter}
          setGlobalGoodFilter={setGlobalGoodFilter}
          standardFilter={standardFilter}
          setStandardFilter={setStandardFilter}
          onClearAllFilters={onClearAllFilters}
          sdgData={sdgData}
          classifications={classifications}
          globalGoods={globalGoods}
        />
      )}
    </div>
  );
}
