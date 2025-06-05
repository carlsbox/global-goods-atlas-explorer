
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink, Eye, Building } from "lucide-react";
import { useGlobalGoodDetails } from "@/hooks/useGlobalGoodDetails";
import { LoadingSpinner } from "@/components/LoadingSpinner";

interface GlobalGoodCompactCardProps {
  globalGoodId: string;
  globalGoodName: string;
}

export function GlobalGoodCompactCard({ 
  globalGoodId, 
  globalGoodName 
}: GlobalGoodCompactCardProps) {
  const { data: globalGood, isLoading, error } = useGlobalGoodDetails(globalGoodId);

  if (isLoading) {
    return (
      <Card className="w-full">
        <CardContent className="p-3">
          <div className="flex items-center justify-center">
            <LoadingSpinner />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error || !globalGood) {
    return (
      <Card className="w-full border-gray-200">
        <CardContent className="p-3">
          <div className="text-center">
            <p className="text-sm font-medium">{globalGoodName}</p>
            <p className="text-xs text-muted-foreground mt-1">
              Details not available
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full hover:shadow-md transition-shadow border-green-200">
      <CardContent className="p-3">
        <div className="space-y-3">
          {/* Header */}
          <div className="flex items-start gap-2">
            {globalGood.Logo && (
              <img 
                src={globalGood.Logo} 
                alt={`${globalGood.Name} logo`}
                className="w-6 h-6 object-contain flex-shrink-0"
              />
            )}
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-sm leading-tight">
                {globalGood.Name}
              </h4>
              {globalGood.GlobalGoodsType && globalGood.GlobalGoodsType.length > 0 && (
                <Badge variant="secondary" className="text-xs mt-1">
                  {globalGood.GlobalGoodsType[0].title}
                </Badge>
              )}
            </div>
          </div>

          {/* Description */}
          {globalGood.ProductOverview?.Description && (
            <p className="text-xs text-muted-foreground line-clamp-2">
              {globalGood.ProductOverview.Description}
            </p>
          )}

          {/* Key Stats */}
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            {globalGood.Reach?.ImplementationCountries && globalGood.Reach.ImplementationCountries.length > 0 && (
              <div className="flex items-center gap-1">
                <Building className="h-3 w-3" />
                <span>{globalGood.Reach.ImplementationCountries.length} countries</span>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-2 border-t">
            <Button variant="outline" size="sm" asChild className="flex-1 text-xs h-6">
              <Link to={`/global-goods/${globalGoodId}`}>
                <Eye className="h-3 w-3 mr-1" />
                View Details
              </Link>
            </Button>
            
            {globalGood.Website?.main?.url && (
              <Button variant="outline" size="sm" asChild className="flex-1 text-xs h-6">
                <a 
                  href={globalGood.Website.main.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="h-3 w-3 mr-1" />
                  Visit Website
                </a>
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
