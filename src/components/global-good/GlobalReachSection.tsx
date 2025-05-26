
import { GlobalGoodFlat } from "@/lib/types/globalGoodFlat";
import { HeroStats } from "@/components/global-good/HeroStats";
import { InteractiveMapCard } from "@/components/global-good/InteractiveMapCard";
import { EnhancedCountriesDisplay } from "@/components/global-good/EnhancedCountriesDisplay";
import { ImplementationContext } from "@/components/global-good/ImplementationContext";

interface GlobalReachSectionProps {
  globalGood: GlobalGoodFlat;
}

export function GlobalReachSection({ globalGood }: GlobalReachSectionProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Global Reach</h2>
      
      {/* Implementation Context moved here */}
      <div className="mb-6">
        <ImplementationContext globalGood={globalGood} />
      </div>
      
      {/* Hero Stats Row */}
      <HeroStats globalGood={globalGood} />
      
      {/* Map & Countries Grid - Updated to 2/3 1/3 split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <InteractiveMapCard globalGood={globalGood} />
        </div>
        <div className="lg:col-span-1">
          <EnhancedCountriesDisplay globalGood={globalGood} />
        </div>
      </div>
    </div>
  );
}
