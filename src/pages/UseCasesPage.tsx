
import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useUseCases, useGlobalGoods } from "@/lib/api";
import { NewUseCaseCard } from "@/components/use-cases/NewUseCaseCard";
import { NewUseCasesFilterBar } from "@/components/use-cases/NewUseCasesFilterBar";
import { UseCasesNoResults } from "@/components/use-cases/UseCasesNoResults";
import { useI18n } from "@/hooks/useI18n";
import { loadClassificationsData } from "@/lib/loaders";
import { loadStandardsData } from "@/lib/loaders";

export default function UseCasesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const globalGoodFilterParam = searchParams.get("globalGood");

  const { data: useCases = [], isLoading: useCasesLoading } = useUseCases();
  const { data: globalGoods = [], isLoading: globalGoodsLoading } = useGlobalGoods();
  const { getText, tPage, language } = useI18n();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [sdgFilter, setSdgFilter] = useState("all");
  const [whoSystemFilter, setWhoSystemFilter] = useState("all");
  const [wmoFilter, setWmoFilter] = useState("all");
  const [globalGoodFilter, setGlobalGoodFilter] = useState(globalGoodFilterParam || "all");
  const [standardFilter, setStandardFilter] = useState("all");
  const [classifications, setClassifications] = useState<any[]>([]);
  const [standards, setStandards] = useState<any[]>([]);
  
  // Load classifications and standards
  useEffect(() => {
    const loadData = async () => {
      try {
        const [classificationsData, standardsData] = await Promise.all([
          loadClassificationsData(language),
          loadStandardsData()
        ]);
        setClassifications(classificationsData || []);
        setStandards(standardsData || []);
      } catch (error) {
        console.error('Failed to load additional data:', error);
      }
    };
    loadData();
  }, [language]);

  // Calculate which filter options have associated use cases
  const availableFilterOptions = useMemo(() => {
    const availableSdgs = new Set<string>();
    const availableWhoSystems = new Set<string>();
    const availableWmoCategories = new Set<string>();
    const availableGlobalGoods = new Set<string>();
    const availableStandards = new Set<string>();

    useCases.forEach(useCase => {
      // SDG availability
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
      
      // Global goods availability
      if (useCase.global_goods) {
        useCase.global_goods.forEach(good => {
          if (good.id) availableGlobalGoods.add(good.id);
          if (good.name) availableGlobalGoods.add(good.name); // Legacy support
        });
      }
      
      // Standards availability
      if (useCase.standards) {
        useCase.standards.forEach(standard => {
          if (standard.code) availableStandards.add(standard.code);
        });
      }
    });

    return {
      sdgs: availableSdgs,
      whoSystems: availableWhoSystems,
      wmoCategories: availableWmoCategories,
      globalGoods: availableGlobalGoods,
      standards: availableStandards
    };
  }, [useCases]);
  
  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (globalGoodFilter && globalGoodFilter !== "all") {
      params.set("globalGood", globalGoodFilter);
    }
    setSearchParams(params, { replace: true });
  }, [globalGoodFilter, setSearchParams]);
  
  // Filter use cases
  const filteredUseCases = useCases.filter(useCase => {
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
    
    // Global good filter
    const matchesGlobalGood = globalGoodFilter === "all" || 
      (useCase.global_goods && useCase.global_goods.some(good => good.id === globalGoodFilter)) ||
      (useCase.global_goods && useCase.global_goods.some(good => good.name === globalGoodFilter)); // Legacy support
    
    // Standard filter
    const matchesStandard = standardFilter === "all" || 
      (useCase.standards && useCase.standards.some(standard => standard.code === standardFilter));
      
    return matchesSearch && matchesSdg && matchesWho && matchesWmo && matchesGlobalGood && matchesStandard;
  });

  // Clear all filters handler
  const handleClearAllFilters = () => {
    setSearchTerm("");
    setSdgFilter("all");
    setWhoSystemFilter("all");
    setWmoFilter("all");
    setGlobalGoodFilter("all");
    setStandardFilter("all");
  };

  const hasActiveFilters = sdgFilter !== "all" || whoSystemFilter !== "all" || wmoFilter !== "all" || 
                          globalGoodFilter !== "all" || standardFilter !== "all" || searchTerm !== "";

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto mb-12 text-center">
        <h1 className="mb-6">{tPage("title", "useCases")}</h1>
        <p className="text-xl text-muted-foreground">
          Explore comprehensive workflow documentation and implementation guides for digital health solutions.
        </p>
      </div>
      
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
        standards={standards}
        availableFilterOptions={availableFilterOptions}
      />

      {useCasesLoading || globalGoodsLoading ? (
        <div className="text-center my-12">
          <p>{tPage("loading", "useCases")}</p>
        </div>
      ) : (
        <>
          <div className="mb-6">
            <p className="text-muted-foreground">
              {tPage("showing", "useCases", { filtered: filteredUseCases.length, total: useCases.length })}
              {hasActiveFilters && (
                <span className="ml-2 text-primary">
                  (filtered results)
                </span>
              )}
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 auto-rows-fr">
            {filteredUseCases.map((useCase) => (
              <NewUseCaseCard 
                key={useCase.id} 
                useCase={useCase}
                globalGoods={globalGoods}
                classifications={classifications}
              />
            ))}
          </div>
          
          {filteredUseCases.length === 0 && (
            <UseCasesNoResults onClearFilters={handleClearAllFilters} />
          )}
        </>
      )}
    </div>
  );
}
