
import { useUseCasesData } from "@/hooks/useUseCasesData";
import { useUseCasesFilters } from "@/hooks/useUseCasesFilters";
import { useFilteredUseCases } from "@/hooks/useFilteredUseCases";
import { NewUseCasesFilterBar } from "@/components/use-cases/NewUseCasesFilterBar";
import { UseCasesHeader } from "@/components/use-cases/UseCasesHeader";
import { UseCasesGrid } from "@/components/use-cases/UseCasesGrid";
import { useI18n } from "@/hooks/useI18n";

export default function UseCasesPage() {
  const { tPage } = useI18n();
  
  const {
    useCases,
    globalGoods,
    classifications,
    standards,
    sdgData,
    availableFilterOptions,
    isLoading
  } = useUseCasesData();

  const {
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
    handleClearAllFilters,
    hasActiveFilters
  } = useUseCasesFilters();

  const filteredUseCases = useFilteredUseCases({
    useCases,
    globalGoods,
    searchTerm,
    sdgFilter,
    whoSystemFilter,
    wmoFilter,
    globalGoodFilter,
    standardFilter
  });

  // Convert standards objects to string codes for the filter
  const standardCodes = Array.isArray(standards) 
    ? standards.map(standard => typeof standard === 'string' ? standard : standard.code).filter(Boolean)
    : Object.keys(standards || {});

  return (
    <div className="container mx-auto px-4 py-8">
      <UseCasesHeader />
      
      <NewUseCasesFilterBar
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
        onClearAllFilters={handleClearAllFilters}
        globalGoods={globalGoods}
        classifications={classifications}
        standards={standardCodes}
        sdgData={sdgData}
        availableFilterOptions={availableFilterOptions}
      />

      {isLoading ? (
        <div className="text-center my-12">
          <p>{tPage("loading", "useCases")}</p>
        </div>
      ) : (
        <UseCasesGrid
          filteredUseCases={filteredUseCases}
          totalUseCases={useCases.length}
          globalGoods={globalGoods}
          classifications={classifications}
          onClearFilters={handleClearAllFilters}
          hasActiveFilters={hasActiveFilters}
        />
      )}
    </div>
  );
}
