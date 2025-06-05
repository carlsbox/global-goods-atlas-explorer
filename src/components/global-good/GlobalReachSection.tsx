
import { GlobalGoodFlat } from "@/lib/types/globalGoodFlat";
import { HeroStats } from "@/components/global-good/HeroStats";
import { EnhancedCountriesDisplay } from "@/components/global-good/EnhancedCountriesDisplay";
import { ImplementationContext } from "@/components/global-good/ImplementationContext";
import { WorldMap } from "@/components/global-good/WorldMap";

interface GlobalReachSectionProps {
  globalGood: GlobalGoodFlat;
}

export function GlobalReachSection({ globalGood }: GlobalReachSectionProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Global Reach</h2>
      
      {/* Implementation Context */}
      <div className="mb-6">
        <ImplementationContext globalGood={globalGood} />
      </div>
      
      {/* Hero Stats Row */}
      <HeroStats globalGood={globalGood} />
      
      {/* Always show local map and countries side by side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">Implementation Map</h3>
          <WorldMap globalGood={globalGood} />
        </div>
        <div>
          <EnhancedCountriesDisplay globalGood={globalGood} />
        </div>
      </div>
    </div>
  );
}
