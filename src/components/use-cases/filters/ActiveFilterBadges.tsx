
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X, Filter } from "lucide-react";

interface ActiveFilterBadgesProps {
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
  sdgData: any[];
  classifications: any[];
  globalGoods: any[];
}

export function ActiveFilterBadges({
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
  sdgData,
  classifications,
  globalGoods
}: ActiveFilterBadgesProps) {
  return (
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
            SDG: {sdgData.find(s => s.code === sdgFilter)?.title || sdgFilter}
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
  );
}
