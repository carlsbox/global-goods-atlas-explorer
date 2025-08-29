import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "react-router-dom";
import { Leaf } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProgressiveGlobalGoodCardProps {
  good: any; // Can be minimal, summary, or full data
  isUpgrading?: boolean;
  className?: string;
}

export function ProgressiveGlobalGoodCard({ 
  good, 
  isUpgrading = false,
  className 
}: ProgressiveGlobalGoodCardProps) {
  const hasFullData = !!good.Reach?.Countries;
  const hasSummaryData = !!good.Classifications?.SDGs;
  
  return (
    <Link 
      to={`/global-goods/${good.ID}`}
      className={cn("block h-full group", className)}
    >
      <Card className="h-full border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300 bg-card overflow-hidden">
        <CardContent className="p-6 flex flex-col h-full">
          {/* Header with Logo and Name */}
          <div className="flex items-start gap-4 mb-4">
            {good.Logo ? (
              <img 
                src={good.Logo} 
                alt={`${good.Name} logo`}
                className="w-16 h-16 object-contain rounded-lg border border-border p-2 bg-background"
                loading="lazy"
              />
            ) : (
              <div className="w-16 h-16 rounded-lg border border-border bg-muted flex items-center justify-center">
                <span className="text-xl font-bold text-muted-foreground">
                  {good.Name?.substring(0, 2).toUpperCase()}
                </span>
              </div>
            )}
            
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors line-clamp-2">
                {good.Name}
              </h3>
              
              {/* Climate Health Badge */}
              {good.ClimateHealth && (
                <Badge 
                  variant="secondary" 
                  className="mt-2 gap-1 bg-emerald-100 text-emerald-800 border-emerald-200"
                >
                  <Leaf className="h-3 w-3" />
                  Climate & Health
                </Badge>
              )}
            </div>
          </div>
          
          {/* Description */}
          <p className="text-sm text-muted-foreground line-clamp-3 mb-4 flex-grow">
            {good.Summary || good.ProductOverview?.substring(0, 150) || 'No description available'}
          </p>
          
          {/* Progressive Content Loading */}
          {isUpgrading ? (
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          ) : (
            <>
              {/* Sectors - Available in summary data */}
              {hasSummaryData && good.GlobalGoodsType && (
                <div className="flex flex-wrap gap-1 mb-3">
                  {(Array.isArray(good.GlobalGoodsType) ? good.GlobalGoodsType : [good.GlobalGoodsType])
                    .slice(0, 2)
                    .map((type: any, index: number) => (
                      <Badge 
                        key={index} 
                        variant="outline" 
                        className="text-xs"
                      >
                        {typeof type === 'object' ? type.name : type}
                      </Badge>
                    ))}
                </div>
              )}
              
              {/* Countries Count - Available in minimal data */}
              <div className="mt-auto pt-2 border-t border-border">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    {hasFullData ? (
                      `${good.Reach.Countries.length} countries`
                    ) : good.CountryCount !== undefined ? (
                      `${good.CountryCount} countries`
                    ) : (
                      <Skeleton className="h-4 w-20" />
                    )}
                  </span>
                  
                  {/* SDG Count - Available in summary data */}
                  {hasSummaryData && good.Classifications?.SDGs && (
                    <span className="text-muted-foreground">
                      {good.Classifications.SDGs.length} SDGs
                    </span>
                  )}
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}