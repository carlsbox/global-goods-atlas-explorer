
import { Link } from "react-router-dom";
import { GlobalGoodFlat } from "@/lib/types/globalGoodFlat";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, Globe, Users, Calendar } from "lucide-react";

interface GlobalGoodListItemProps {
  good: GlobalGoodFlat;
}

export function GlobalGoodListItem({ good }: GlobalGoodListItemProps) {
  const countryCount = good.Reach?.ImplementationCountries?.length || 0;
  const sectors = good.GlobalGoodsType?.map(type => type.title) || [];
  const sdgs = good.Classifications?.SDGs || [];

  return (
    <Link to={`/global-goods/${good.ID}`}>
      <div className="bg-card hover:bg-accent/50 border rounded-lg p-4 transition-all hover:shadow-md hover:scale-[1.01] duration-200">
        <div className="flex items-start gap-4">
          {/* Logo */}
          <div className="flex-shrink-0">
            {good.Logo ? (
              <img 
                src={good.Logo} 
                alt={good.Name} 
                className="h-12 w-12 rounded object-contain"
              />
            ) : (
              <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-primary font-semibold">
                  {good.Name.charAt(0)}
                </span>
              </div>
            )}
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-semibold text-lg leading-tight">{good.Name}</h3>
              <ArrowUpRight className="h-4 w-4 text-primary ml-4" />
            </div>

            <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
              {good.ProductOverview?.Summary || good.ProductOverview?.Description}
            </p>

            {/* Metadata Row */}
            <div className="flex flex-wrap items-center gap-4 mb-3">
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Globe className="h-4 w-4" />
                <span>{countryCount} {countryCount === 1 ? 'country' : 'countries'}</span>
              </div>
              
              {good.Community?.SizeOfCommunity && (
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span>{good.Community.SizeOfCommunity.toLocaleString()}</span>
                </div>
              )}
              
              {good.Community?.InceptionYear && (
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>Since {good.Community.InceptionYear}</span>
                </div>
              )}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {sectors.slice(0, 3).map((sector) => (
                <Badge key={sector} variant="secondary" className="text-xs">
                  {sector}
                </Badge>
              ))}
              {sdgs.slice(0, 4).map((sdg) => (
                <Badge key={sdg.code} variant="outline" className="text-xs">
                  {sdg.code.replace('SDG-', '')}
                </Badge>
              ))}
              {(sectors.length > 3 || sdgs.length > 4) && (
                <Badge variant="outline" className="text-xs">
                  +{Math.max(0, sectors.length - 3) + Math.max(0, sdgs.length - 4)} more
                </Badge>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
