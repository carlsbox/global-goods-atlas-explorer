
import { Link } from "react-router-dom";
import { GlobalGoodFlat } from "@/lib/types/globalGoodFlat";
import { 
  Card, 
  CardContent 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowUpRight, Globe, Users, Calendar, Wifi, WifiOff } from "lucide-react";

interface EnhancedGlobalGoodCardProps {
  good: GlobalGoodFlat;
}

export function EnhancedGlobalGoodCard({ good }: EnhancedGlobalGoodCardProps) {
  const countryCount = good.Reach?.ImplementationCountries?.length || 0;
  const sectors = good.GlobalGoodsType?.map(type => type.title) || [];
  const sdgs = good.Classifications?.SDGs || [];
  
  // Calculate average maturity score
  const latestMaturity = good.Maturity?.Scores?.[good.Maturity.Scores.length - 1];
  const avgMaturityScore = latestMaturity ? 
    Math.round((latestMaturity.global_utility + latestMaturity.community_support + 
               latestMaturity.maturity_of_gg + latestMaturity.inclusive_design + 
               latestMaturity.climate_resilience + latestMaturity.low_carbon) / 6) : 0;

  const hasOfflineSupport = good.InclusiveDesign?.OfflineSupport?.toLowerCase().includes('yes') || 
                           good.InclusiveDesign?.OfflineSupport?.toLowerCase().includes('support');

  return (
    <Link to={`/global-goods/${good.ID}`}>
      <Card className="h-full transition-all hover:shadow-lg hover:scale-[1.02] duration-200 overflow-hidden border-l-4 border-l-primary/20 hover:border-l-primary">
        <CardContent className="p-0">
          <div className="p-6">
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
              <div className="flex items-center gap-1 ml-2 flex-shrink-0">
                {hasOfflineSupport ? (
                  <WifiOff className="h-4 w-4 text-green-600" title="Offline support" />
                ) : (
                  <Wifi className="h-4 w-4 text-muted-foreground" title="Online only" />
                )}
                <ArrowUpRight className="h-4 w-4 text-primary" />
              </div>
            </div>
            
            {/* Description */}
            <p className="text-muted-foreground text-sm line-clamp-3 mb-4 h-[4.5rem]">
              {good.ProductOverview?.Summary || good.ProductOverview?.Description}
            </p>

            {/* Maturity Score */}
            {avgMaturityScore > 0 && (
              <div className="mb-4">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-muted-foreground">Maturity Score</span>
                  <span className="font-medium">{avgMaturityScore}/10</span>
                </div>
                <Progress value={avgMaturityScore * 10} className="h-2" />
              </div>
            )}
            
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

            {/* SDGs */}
            {sdgs.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-4">
                {sdgs.slice(0, 3).map((sdg) => (
                  <Badge key={sdg.code} variant="outline" className="text-xs px-1.5 py-0.5">
                    {sdg.code.replace('SDG-', '')}
                  </Badge>
                ))}
                {sdgs.length > 3 && (
                  <Badge variant="outline" className="text-xs px-1.5 py-0.5">
                    +{sdgs.length - 3}
                  </Badge>
                )}
              </div>
            )}
            
            {/* Footer Stats */}
            <div className="flex items-center justify-between text-sm text-muted-foreground pt-2 border-t">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Globe className="h-3 w-3" />
                  <span className="text-xs">
                    {countryCount} {countryCount === 1 ? 'country' : 'countries'}
                  </span>
                </div>
                {good.Community?.SizeOfCommunity && (
                  <div className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    <span className="text-xs">
                      {good.Community.SizeOfCommunity.toLocaleString()}
                    </span>
                  </div>
                )}
              </div>
              
              {good.Community?.InceptionYear && (
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  <span className="text-xs">{good.Community.InceptionYear}</span>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
