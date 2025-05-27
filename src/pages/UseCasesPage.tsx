
import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useUseCases, useGlobalGoods } from "@/lib/api";
import { NewUseCaseCard } from "@/components/use-cases/NewUseCaseCard";
import { NewUseCasesFilterBar } from "@/components/use-cases/NewUseCasesFilterBar";
import { UseCasesNoResults } from "@/components/use-cases/UseCasesNoResults";
import { useI18n } from "@/hooks/useI18n";
import { loadClassificationsData } from "@/lib/loaders";
import { loadStandardsData } from "@/lib/loaders";
import { loadSDGData } from "@/lib/loaders";

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
        setStandards(standardsData || []);
        setSdgData(sdgDataLoaded || []);
        
        // Debug logging
        console.log('Loaded data:', {
          classifications: classificationsData?.length || 0,
          standards: standardsData?.length || 0,
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
  const availableFilterOptions = useMemo(() => {
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
      
      // Global goods availability - check both id and name for better matching
      if (useCase.global_goods) {
        useCase.global_goods.forEach(good => {
          if (good.id) {
            availableGlobalGoods.add(good.id);
            // Also try to match by name if IDs don't work
            const matchingGlobalGood = globalGoods.find(gg => 
              gg.id === good.id || gg.name === good.name
            );
            if (matchingGlobalGood) {
              availableGlobalGoods.add(matchingGlobalGood.id);
            }
          }
          if (good.name) {
            // Try to find matching global good by name
            const matchingGlobalGood = globalGoods.find(gg => 
              gg.name === good.name || gg.id === good.name
            );
            if (matchingGlobalGood) {
              availableGlobalGoods.add(matchingGlobalGood.id);
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
        sdgData={sdgData}
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
