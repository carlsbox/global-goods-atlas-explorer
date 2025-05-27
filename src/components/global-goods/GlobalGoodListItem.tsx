
import { Link } from "react-router-dom";
import { GlobalGoodFlat } from "@/lib/types/globalGoodFlat";
import { ArrowUpRight, Globe } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface GlobalGoodListItemProps {
  good: GlobalGoodFlat;
}

export function GlobalGoodListItem({ good }: GlobalGoodListItemProps) {
  const countryCount = good.Reach?.ImplementationCountries?.length || 0;
  const primarySector = good.GlobalGoodsType?.[0]?.title || '';

  return (
    <Link to={`/global-goods/${good.ID}`}>
      <div className="bg-card hover:bg-accent/50 border rounded-lg p-3 transition-all hover:shadow-md hover:scale-[1.01] duration-200">
        <div className="flex items-center justify-between">
          {/* Left side - Logo and basic info */}
          <div className="flex items-center gap-3 flex-1 min-w-0">
            {good.Logo ? (
              <img 
                src={good.Logo} 
                alt={good.Name} 
                className="h-8 w-8 rounded object-contain flex-shrink-0"
              />
            ) : (
              <div className="h-8 w-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-primary font-semibold text-sm">
                  {good.Name.charAt(0)}
                </span>
              </div>
            )}
            
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-base leading-tight truncate">{good.Name}</h3>
              <p className="text-sm text-muted-foreground truncate">
                {good.ProductOverview?.Summary || good.ProductOverview?.Description || 'No description available'}
              </p>
            </div>
          </div>

          {/* Right side - Quick info and arrow */}
          <div className="flex items-center gap-3 flex-shrink-0">
            {/* Country count */}
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Globe className="h-3 w-3" />
              <span>{countryCount}</span>
            </div>
            
            {/* Primary sector */}
            {primarySector && (
              <Badge variant="secondary" className="text-xs">
                {primarySector}
              </Badge>
            )}
            
            <ArrowUpRight className="h-4 w-4 text-primary" />
          </div>
        </div>
      </div>
    </Link>
  );
}
