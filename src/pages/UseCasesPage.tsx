
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useUseCases, useGlobalGoods } from "@/lib/api";
import { UseCaseCard } from "@/components/use-cases/UseCaseCard";
import { UseCasesFilterBar } from "@/components/use-cases/UseCasesFilterBar";
import { SelectedGoodFilter } from "@/components/use-cases/SelectedGoodFilter";
import { UseCasesNoResults } from "@/components/use-cases/UseCasesNoResults";
import { useI18n } from "@/hooks/useI18n";

export default function UseCasesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const globalGoodFilterParam = searchParams.get("globalGood");

  const { data: useCases = [], isLoading: useCasesLoading } = useUseCases();
  const { data: globalGoods = [], isLoading: globalGoodsLoading } = useGlobalGoods();
  const { getText, tPage } = useI18n();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [sectorFilter, setSectorFilter] = useState("all");
  const [globalGoodFilter, setGlobalGoodFilter] = useState(globalGoodFilterParam || "all");
  
  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (globalGoodFilter && globalGoodFilter !== "all") {
      params.set("globalGood", globalGoodFilter);
    }
    setSearchParams(params, { replace: true });
  }, [globalGoodFilter, setSearchParams]);
  
  // Extract unique sectors for filter
  const sectors = Array.from(
    new Set(useCases.map(useCase => useCase.sector))
  ).sort();
  
  // Filter use cases
  const filteredUseCases = useCases.filter(useCase => {
    const matchesSearch = searchTerm === "" || 
      useCase.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      useCase.description.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesSector = sectorFilter === "all" || useCase.sector === sectorFilter;
    const matchesGlobalGood = globalGoodFilter === "all" || 
      (useCase.globalGoods && useCase.globalGoods.includes(globalGoodFilter));
      
    return matchesSearch && matchesSector && matchesGlobalGood;
  });

  // Clear all filters handler
  const handleClearAllFilters = () => {
    setSearchTerm("");
    setSectorFilter("all");
    setGlobalGoodFilter("all");
  };

  // Get global good name for display - using getText to handle multilingual names
  const selectedGood = globalGoodFilter !== "all" 
    ? globalGoods.find(g => g.id === globalGoodFilter) 
    : null;
  
  const selectedGoodName = selectedGood 
    ? getText(selectedGood.name) 
    : "";

  return (
    <>
      <div className="max-w-4xl mx-auto mb-12 text-center">
        <h1 className="mb-6">{tPage("title", "useCases")}</h1>
        <p className="text-xl text-muted-foreground">
          {tPage("description", "useCases")}
        </p>
      </div>
      
      {globalGoodFilter && globalGoodFilter !== "all" && (
        <SelectedGoodFilter 
          selectedGoodName={selectedGoodName} 
          onClear={() => setGlobalGoodFilter("all")} 
        />
      )}
      
      <UseCasesFilterBar
        sectors={sectors}
        globalGoods={globalGoods}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        sectorFilter={sectorFilter}
        setSectorFilter={setSectorFilter}
        globalGoodFilter={globalGoodFilter}
        setGlobalGoodFilter={setGlobalGoodFilter}
        onClearAllFilters={handleClearAllFilters}
      />

      {useCasesLoading || globalGoodsLoading ? (
        <div className="text-center my-12">
          <p>{tPage("loading", "useCases")}</p>
        </div>
      ) : (
        <>
          <div className="mb-4">
            <p className="text-muted-foreground">
              {tPage("showing", "useCases", { filtered: filteredUseCases.length, total: useCases.length })}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredUseCases.map((useCase) => (
              <UseCaseCard 
                key={useCase.id} 
                useCase={useCase}
                globalGoods={globalGoods}
              />
            ))}
          </div>
          
          {filteredUseCases.length === 0 && (
            <UseCasesNoResults onClearFilters={handleClearAllFilters} />
          )}
        </>
      )}
    </>
  );
}
