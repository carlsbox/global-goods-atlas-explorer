
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export function useUseCasesFilters() {
  const [searchParams, setSearchParams] = useSearchParams();
  const globalGoodFilterParam = searchParams.get("globalGood");

  const [searchTerm, setSearchTerm] = useState("");
  const [sdgFilter, setSdgFilter] = useState("all");
  const [whoSystemFilter, setWhoSystemFilter] = useState("all");
  const [wmoFilter, setWmoFilter] = useState("all");
  const [globalGoodFilter, setGlobalGoodFilter] = useState(globalGoodFilterParam || "all");
  const [standardFilter, setStandardFilter] = useState("all");

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (globalGoodFilter && globalGoodFilter !== "all") {
      params.set("globalGood", globalGoodFilter);
    }
    setSearchParams(params, { replace: true });
  }, [globalGoodFilter, setSearchParams]);

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

  return {
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
  };
}
