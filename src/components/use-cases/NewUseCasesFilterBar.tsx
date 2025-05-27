
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useI18n } from "@/hooks/useI18n";
import { Badge } from "@/components/ui/badge";

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
  availableFilterOptions
}: NewUseCasesFilterBarProps) {
  const { getText } = useI18n();
  
  // Get unique values for filters with validation to prevent empty strings
  const sdgOptions = [...new Set(classifications
    .filter(c => c.code && c.code.startsWith('SDG') && c.code.trim() !== '')
    .map(c => c.code)
  )];
  
  const whoOptions = [...new Set(classifications
    .filter(c => c.authority === 'WHO' && c.code && c.code.trim() !== '')
    .map(c => c.code)
  )];
  
  const wmoOptions = [...new Set(classifications
    .filter(c => c.authority === 'WMO' && c.code && c.code.trim() !== '')
    .map(c => c.code)
  )];
  
  const standardOptions = [...new Set(standards
    .filter(s => s.code && s.code.trim() !== '')
    .map(s => s.code)
  )];

  const hasActiveFilters = sdgFilter !== "all" || whoSystemFilter !== "all" || wmoFilter !== "all" || 
                          globalGoodFilter !== "all" || standardFilter !== "all" || searchTerm !== "";

  return (
    <div className="bg-card shadow-sm rounded-lg p-6 mb-8 space-y-4">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search use cases by purpose, scope, challenges..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-9"
        />
      </div>
      
      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Select value={sdgFilter} onValueChange={setSdgFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by SDG" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All SDGs</SelectItem>
            {sdgOptions.map(sdg => {
              const isAvailable = availableFilterOptions?.sdgs.has(sdg);
              return (
                <SelectItem 
                  key={sdg} 
                  value={sdg}
                  className={!isAvailable ? "text-muted-foreground opacity-50" : ""}
                >
                  {sdg}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>

        <Select value={whoSystemFilter} onValueChange={setWhoSystemFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by WHO System" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All WHO Systems</SelectItem>
            {whoOptions.map(who => {
              const classification = classifications.find(c => c.code === who);
              const isAvailable = availableFilterOptions?.whoSystems.has(who);
              return (
                <SelectItem 
                  key={who} 
                  value={who}
                  className={!isAvailable ? "text-muted-foreground opacity-50" : ""}
                >
                  {classification?.title || who}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>

        <Select value={wmoFilter} onValueChange={setWmoFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by WMO Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All WMO Categories</SelectItem>
            {wmoOptions.map(wmo => {
              const classification = classifications.find(c => c.code === wmo);
              const isAvailable = availableFilterOptions?.wmoCategories.has(wmo);
              return (
                <SelectItem 
                  key={wmo} 
                  value={wmo}
                  className={!isAvailable ? "text-muted-foreground opacity-50" : ""}
                >
                  {classification?.title || wmo}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>

        <Select value={globalGoodFilter} onValueChange={setGlobalGoodFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by Global Good" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Global Goods</SelectItem>
            {globalGoods
              .filter(good => good.id && good.id.trim() !== '')
              .map(good => {
                const isAvailable = availableFilterOptions?.globalGoods.has(good.id) || 
                                  availableFilterOptions?.globalGoods.has(good.name);
                return (
                  <SelectItem 
                    key={good.id} 
                    value={good.id}
                    className={!isAvailable ? "text-muted-foreground opacity-50" : ""}
                  >
                    {getText(good.name)}
                  </SelectItem>
                );
              })}
          </SelectContent>
        </Select>

        <Select value={standardFilter} onValueChange={setStandardFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by Standard" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Standards</SelectItem>
            {standardOptions.map(standard => {
              const isAvailable = availableFilterOptions?.standards.has(standard);
              return (
                <SelectItem 
                  key={standard} 
                  value={standard}
                  className={!isAvailable ? "text-muted-foreground opacity-50" : ""}
                >
                  {standard}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>

      {/* Active filters and clear button */}
      {hasActiveFilters && (
        <div className="flex items-center justify-between pt-4 border-t">
          <div className="flex flex-wrap gap-2">
            {searchTerm && (
              <Badge variant="secondary" className="flex items-center gap-1">
                Search: "{searchTerm}"
                <X className="h-3 w-3 cursor-pointer" onClick={() => setSearchTerm("")} />
              </Badge>
            )}
            {sdgFilter !== "all" && (
              <Badge variant="secondary" className="flex items-center gap-1">
                SDG: {sdgFilter}
                <X className="h-3 w-3 cursor-pointer" onClick={() => setSdgFilter("all")} />
              </Badge>
            )}
            {whoSystemFilter !== "all" && (
              <Badge variant="secondary" className="flex items-center gap-1">
                WHO: {classifications.find(c => c.code === whoSystemFilter)?.title || whoSystemFilter}
                <X className="h-3 w-3 cursor-pointer" onClick={() => setWhoSystemFilter("all")} />
              </Badge>
            )}
            {wmoFilter !== "all" && (
              <Badge variant="secondary" className="flex items-center gap-1">
                WMO: {classifications.find(c => c.code === wmoFilter)?.title || wmoFilter}
                <X className="h-3 w-3 cursor-pointer" onClick={() => setWmoFilter("all")} />
              </Badge>
            )}
            {globalGoodFilter !== "all" && (
              <Badge variant="secondary" className="flex items-center gap-1">
                Global Good: {globalGoods.find(g => g.id === globalGoodFilter)?.name || globalGoodFilter}
                <X className="h-3 w-3 cursor-pointer" onClick={() => setGlobalGoodFilter("all")} />
              </Badge>
            )}
            {standardFilter !== "all" && (
              <Badge variant="secondary" className="flex items-center gap-1">
                Standard: {standardFilter}
                <X className="h-3 w-3 cursor-pointer" onClick={() => setStandardFilter("all")} />
              </Badge>
            )}
          </div>
          <Button 
            variant="outline" 
            size="sm"
            onClick={onClearAllFilters}
            className="flex items-center"
          >
            <Filter className="mr-2 h-4 w-4" />
            Clear All
          </Button>
        </div>
      )}
    </div>
  );
}
