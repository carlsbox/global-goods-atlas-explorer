
import { Link } from "react-router-dom";
import { GlobalGoodFlat } from "@/lib/types/globalGoodFlat";
import { ArrowUpRight, Globe, Shield } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { SDGBadges } from "./list-item/SDGBadges";
import { ClassificationBadges } from "./list-item/ClassificationBadges";
import { StandardsBadges } from "./list-item/StandardsBadges";
import { CountriesAndSectors } from "./list-item/CountriesAndSectors";

interface EnhancedGlobalGoodListItemProps {
  good: GlobalGoodFlat;
}

export function EnhancedGlobalGoodListItem({ good }: EnhancedGlobalGoodListItemProps) {
  const countryCount = good.Reach?.ImplementationCountries?.length || 0;
  const sectors = good.GlobalGoodsType?.map(type => type.title) || [];

  return (
    <Link to={`/global-goods/${good.ID}`}>
      <div className="bg-card hover:bg-accent/50 border rounded-lg p-4 transition-all hover:shadow-lg hover:scale-[1.01] duration-200">
        {/* Header Section */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            {good.Logo ? (
              <img 
                src={good.Logo} 
                alt={good.Name} 
                className="h-10 w-10 rounded object-contain flex-shrink-0"
              />
            ) : (
              <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-primary font-semibold text-sm">
                  {good.Name.charAt(0)}
                </span>
              </div>
            )}
            
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-lg leading-tight mb-1">{good.Name}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {good.ProductOverview?.Summary || good.ProductOverview?.Description || 'No description available'}
              </p>
            </div>
          </div>

          <ArrowUpRight className="h-5 w-5 text-primary flex-shrink-0 ml-2" />
        </div>

        {/* Countries and Sectors */}
        <CountriesAndSectors countryCount={countryCount} sectors={sectors} />

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Left Column - Classifications */}
          <div className="space-y-3">
            {/* SDG Classifications */}
            <SDGBadges sdgs={good.Classifications?.SDGs || []} />

            {/* Other Classifications */}
            <ClassificationBadges 
              whoClassifications={good.Classifications?.WHO || []}
              dpiClassifications={good.Classifications?.DPI || []}
              wmoClassifications={good.Classifications?.WMO || []}
            />
          </div>

          {/* Right Column - Standards */}
          <div className="space-y-3">
            <StandardsBadges 
              healthStandards={good.StandardsAndInteroperability?.HealthStandards || []}
              interopStandards={good.StandardsAndInteroperability?.Interoperability || []}
            />
          </div>
        </div>
      </div>
    </Link>
  );
}
