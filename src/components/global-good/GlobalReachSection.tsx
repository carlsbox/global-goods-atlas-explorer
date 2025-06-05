
import { GlobalGoodFlat } from "@/lib/types/globalGoodFlat";
import { HeroStats } from "@/components/global-good/HeroStats";
import { InteractiveMapCard } from "@/components/global-good/InteractiveMapCard";
import { EnhancedCountriesDisplay } from "@/components/global-good/EnhancedCountriesDisplay";
import { ImplementationContext } from "@/components/global-good/ImplementationContext";
import { WorldMap } from "@/components/global-good/WorldMap";

interface GlobalReachSectionProps {
  globalGood: GlobalGoodFlat;
}

// Helper function to check if external map exists
function hasExternalMap(globalGood: GlobalGoodFlat): boolean {
  const mapUrl = globalGood.Reach?.ImplementationMapOverview?.url;
  return !!(mapUrl && mapUrl.trim() !== "" && mapUrl !== "#");
}

export function GlobalReachSection({ globalGood }: GlobalReachSectionProps) {
  const showExternalMap = hasExternalMap(globalGood);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Global Reach</h2>
      
      {/* Implementation Context */}
      <div className="mb-6">
        <ImplementationContext globalGood={globalGood} />
      </div>
      
      {/* Hero Stats Row */}
      <HeroStats globalGood={globalGood} />
      
      {/* World Map - Always show the local interactive map */}
      <div className="mb-6">
        <WorldMap globalGood={globalGood} />
      </div>
      
      {/* External Map and Countries - Dynamic layout based on external map availability */}
      {showExternalMap ? (
        // 2/3 + 1/3 split when external map exists
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2">
            <InteractiveMapCard globalGood={globalGood} />
          </div>
          <div className="lg:col-span-1">
            <EnhancedCountriesDisplay globalGood={globalGood} />
          </div>
        </div>
      ) : (
        // Full width for countries when no external map
        <div className="mb-6">
          <EnhancedCountriesDisplay globalGood={globalGood} />
        </div>
      )}
    </div>
  );
}
