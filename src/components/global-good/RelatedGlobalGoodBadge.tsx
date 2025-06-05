
import { Link } from "react-router-dom";
import { ExternalLink, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { GlobalGoodFlat } from "@/lib/types/globalGoodFlat";

interface RelatedGlobalGoodBadgeProps {
  globalGood: GlobalGoodFlat;
  sharedClassifications: string[];
  sharedStandards: string[];
  relationshipScore: number;
}

export function RelatedGlobalGoodBadge({ 
  globalGood, 
  sharedClassifications, 
  sharedStandards,
  relationshipScore 
}: RelatedGlobalGoodBadgeProps) {
  const mainWebsite = globalGood.Website?.main?.url;
  const totalShared = sharedClassifications.length + sharedStandards.length;

  // Determine relationship strength for visual indicator
  const getRelationshipStrength = (score: number) => {
    if (score >= 8) return "strong";
    if (score >= 5) return "medium";
    return "weak";
  };

  const relationshipStrength = getRelationshipStrength(relationshipScore);
  
  const strengthColors = {
    strong: "border-l-green-500 bg-green-50/50",
    medium: "border-l-blue-500 bg-blue-50/50", 
    weak: "border-l-gray-400 bg-gray-50/50"
  };

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div className={`
          inline-flex items-center gap-2 px-3 py-1.5 rounded-full border-l-2 
          ${strengthColors[relationshipStrength]}
          hover:shadow-sm transition-all cursor-pointer
        `}>
          {globalGood.Logo && (
            <img 
              src={globalGood.Logo} 
              alt={`${globalGood.Name} logo`}
              className="w-4 h-4 object-contain flex-shrink-0"
            />
          )}
          <span className="text-sm font-medium truncate max-w-[120px]">
            {globalGood.Name}
          </span>
          {totalShared > 0 && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Tag className="h-3 w-3" />
              <span>{totalShared}</span>
            </div>
          )}
        </div>
      </HoverCardTrigger>
      
      <HoverCardContent className="w-80 p-4" side="top">
        <div className="space-y-3">
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
              <h4 className="font-semibold text-sm line-clamp-2">
                {globalGood.Name}
              </h4>
              <div className="flex items-center gap-1 mt-1">
                <span className="text-xs text-muted-foreground">
                  Relationship score: {relationshipScore}
                </span>
              </div>
            </div>
          </div>

          {/* Summary */}
          {globalGood.ProductOverview?.Summary && (
            <p className="text-xs text-muted-foreground line-clamp-3">
              {globalGood.ProductOverview.Summary}
            </p>
          )}

          {/* Shared Items */}
          {(sharedClassifications.length > 0 || sharedStandards.length > 0) && (
            <div className="space-y-2">
              <h5 className="text-xs font-medium text-muted-foreground">Shared Connections</h5>
              <div className="flex flex-wrap gap-1">
                {sharedClassifications.slice(0, 3).map((classification, index) => (
                  <Badge key={index} variant="secondary" className="text-xs px-2 py-0 h-5">
                    {classification}
                  </Badge>
                ))}
                {sharedStandards.slice(0, 3).map((standard, index) => (
                  <Badge key={index} variant="outline" className="text-xs px-2 py-0 h-5">
                    {standard}
                  </Badge>
                ))}
                {totalShared > 6 && (
                  <Badge variant="secondary" className="text-xs px-2 py-0 h-5">
                    +{totalShared - 6} more
                  </Badge>
                )}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-between pt-2 border-t">
            <Link to={`/global-goods/${globalGood.ID}`}>
              <Button variant="outline" size="sm" className="text-xs h-7">
                View Details
              </Button>
            </Link>
            {mainWebsite && (
              <Button variant="ghost" size="sm" asChild className="h-7 w-7 p-0">
                <a 
                  href={mainWebsite} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  title="Visit website"
                >
                  <ExternalLink className="h-3 w-3" />
                </a>
              </Button>
            )}
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
