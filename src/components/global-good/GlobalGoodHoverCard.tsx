
import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { ExternalLink, Eye, Building2 } from "lucide-react";
import { useGlobalGoodDetails } from "@/hooks/useGlobalGoodDetails";
import { LoadingSpinner } from "@/components/LoadingSpinner";

interface GlobalGoodHoverCardProps {
  globalGoodId: string;
  globalGoodName: string;
  children: ReactNode;
}

export function GlobalGoodHoverCard({ 
  globalGoodId, 
  globalGoodName, 
  children 
}: GlobalGoodHoverCardProps) {
  const { data: globalGood, isLoading, error } = useGlobalGoodDetails(globalGoodId);

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        {children}
      </HoverCardTrigger>
      
      <HoverCardContent className="w-80 p-4" side="top" align="center">
        {isLoading && (
          <div className="flex items-center justify-center py-4">
            <LoadingSpinner />
          </div>
        )}
        
        {error && (
          <div className="text-center py-4">
            <p className="text-sm text-muted-foreground">Failed to load details</p>
          </div>
        )}
        
        {globalGood && (
          <div className="space-y-4">
            {/* Header */}
            <div className="flex items-start gap-3">
              {globalGood.Logo && (
                <img 
                  src={globalGood.Logo} 
                  alt={`${globalGood.Name} logo`}
                  className="w-8 h-8 object-contain flex-shrink-0"
                />
              )}
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-sm leading-tight">
                  {globalGood.Name}
                </h4>
                {globalGood.GlobalGoodsType && (
                  <Badge variant="secondary" className="text-xs mt-1">
                    {globalGood.GlobalGoodsType}
                  </Badge>
                )}
              </div>
            </div>

            {/* Description */}
            {globalGood.Description && (
              <p className="text-xs text-muted-foreground line-clamp-3">
                {globalGood.Description}
              </p>
            )}

            {/* Key Stats */}
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              {globalGood.Countries && globalGood.Countries.length > 0 && (
                <div className="flex items-center gap-1">
                  <Building2 className="h-3 w-3" />
                  <span>{globalGood.Countries.length} countries</span>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-2 pt-2 border-t">
              <Button variant="outline" size="sm" asChild className="flex-1 text-xs h-7">
                <Link to={`/global-goods/${globalGoodId}`}>
                  <Eye className="h-3 w-3 mr-1" />
                  View Details
                </Link>
              </Button>
              
              {globalGood.Website && (
                <Button variant="outline" size="sm" asChild className="flex-1 text-xs h-7">
                  <a 
                    href={globalGood.Website} 
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
        )}
        
        {!globalGood && !isLoading && !error && (
          <div className="text-center py-4">
            <p className="text-sm font-medium">{globalGoodName}</p>
            <p className="text-xs text-muted-foreground mt-1">
              Details not available
            </p>
          </div>
        )}
      </HoverCardContent>
    </HoverCard>
  );
}
