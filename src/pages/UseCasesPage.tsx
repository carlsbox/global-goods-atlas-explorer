
import { useState, useEffect } from "react";
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
          loadClassificationsData(),
          loadStandardsData()
        ]);
        setClassifications(classificationsData || []);
        setStandards(standardsData || []);
      } catch (error) {
        console.error('Failed to load additional data:', error);
      }
    };
    loadData();
  }, []);
  
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
      (useCase.globalGoods && useCase.globalGoods.includes(globalGoodFilter)); // Legacy support
    
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
    <>
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
              {hasActiveFilters && (
                <span className="ml-2 text-primary">
                  (filtered results)
                </span>
              )}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
    </>
  );
}
