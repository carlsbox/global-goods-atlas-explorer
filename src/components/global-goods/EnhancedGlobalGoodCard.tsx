
import { Link } from "react-router-dom";
import { GlobalGoodFlat } from "@/lib/types/globalGoodFlat";
import { 
  Card, 
  CardContent 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, Globe } from "lucide-react";

interface EnhancedGlobalGoodCardProps {
  good: GlobalGoodFlat;
}

export function EnhancedGlobalGoodCard({ good }: EnhancedGlobalGoodCardProps) {
  const countryCount = good.Reach?.ImplementationCountries?.length || 0;
  const sectors = good.GlobalGoodsType?.map(type => type.title) || [];

  // Truncate description to prevent overflow
  const description = good.ProductOverview?.Summary || good.ProductOverview?.Description || "";
  const truncatedDescription = description.length > 150 
    ? description.substring(0, 150) + "..." 
    : description;

  return (
    <Link to={`/global-goods/${good.ID}`}>
      <Card className="h-full transition-all hover:shadow-lg hover:scale-[1.02] duration-200 overflow-hidden border-l-4 border-l-primary/20 hover:border-l-primary">
        <CardContent className="p-0">
          <div className="p-6 flex flex-col h-full">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center flex-1 min-w-0">
                {good.Logo ? (
                  <img 
                    src={good.Logo} 
                    alt={good.Name} 
                    className="h-10 w-10 mr-3 rounded object-contain flex-shrink-0"
                  />
                ) : (
                  <div className="h-10 w-10 bg-primary/10 rounded-full mr-3 flex items-center justify-center flex-shrink-0">
                    <span className="text-primary font-semibold text-sm">
                      {good.Name.charAt(0)}
                    </span>
                  </div>
                )}
                <h3 className="font-semibold text-base leading-tight truncate">{good.Name}</h3>
              </div>
              <ArrowUpRight className="h-4 w-4 text-primary ml-2 flex-shrink-0" />
            </div>
            
            {/* Description */}
            <p className="text-muted-foreground text-sm mb-4 overflow-hidden line-clamp-3 break-words">
              {truncatedDescription}
            </p>
            
            {/* Sectors */}
            <div className="flex flex-wrap gap-1 mb-4">
              {sectors.slice(0, 2).map((sector) => (
                <Badge key={sector} variant="secondary" className="text-xs">
                  {sector}
                </Badge>
              ))}
              {sectors.length > 2 && (
                <Badge variant="outline" className="text-xs">
                  +{sectors.length - 2}
                </Badge>
              )}
            </div>
            
            {/* Footer Stats */}
            <div className="flex items-center justify-between text-sm text-muted-foreground pt-2 border-t mt-auto">
              <div className="flex items-center gap-1">
                <Globe className="h-3 w-3" />
                <span className="text-xs">
                  {countryCount} {countryCount === 1 ? 'country' : 'countries'}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
