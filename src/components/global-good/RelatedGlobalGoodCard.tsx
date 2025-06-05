
import { Link } from "react-router-dom";
import { ExternalLink, Tag } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GlobalGoodFlat } from "@/lib/types/globalGoodFlat";

interface RelatedGlobalGoodCardProps {
  globalGood: GlobalGoodFlat;
  sharedClassifications: string[];
  sharedStandards: string[];
  relationshipScore: number;
}

export function RelatedGlobalGoodCard({ 
  globalGood, 
  sharedClassifications, 
  sharedStandards 
}: RelatedGlobalGoodCardProps) {
  const mainWebsite = globalGood.Website?.main?.url;
  const totalShared = sharedClassifications.length + sharedStandards.length;

  return (
    <Card className="h-full hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="space-y-3">
          {/* Header with logo and name */}
          <div className="flex items-start gap-3">
            {globalGood.Logo && (
              <img 
                src={globalGood.Logo} 
                alt={`${globalGood.Name} logo`}
                className="w-8 h-8 object-contain flex-shrink-0"
              />
            )}
            <div className="flex-1 min-w-0">
              <Link 
                to={`/global-goods/${globalGood.ID}`}
                className="font-semibold text-sm hover:text-primary transition-colors line-clamp-2"
              >
                {globalGood.Name}
              </Link>
            </div>
          </div>

          {/* Summary */}
          {globalGood.ProductOverview?.Summary && (
            <p className="text-xs text-muted-foreground line-clamp-2">
              {globalGood.ProductOverview.Summary}
            </p>
          )}

          {/* Shared items indicator */}
          {totalShared > 0 && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Tag className="h-3 w-3" />
              <span>{totalShared} shared {totalShared === 1 ? 'item' : 'items'}</span>
            </div>
          )}

          {/* Shared classifications and standards */}
          {(sharedClassifications.length > 0 || sharedStandards.length > 0) && (
            <div className="flex flex-wrap gap-1">
              {sharedClassifications.slice(0, 2).map((classification, index) => (
                <Badge key={index} variant="secondary" className="text-xs px-1 py-0">
                  {classification}
                </Badge>
              ))}
              {sharedStandards.slice(0, 2).map((standard, index) => (
                <Badge key={index} variant="outline" className="text-xs px-1 py-0">
                  {standard}
                </Badge>
              ))}
              {totalShared > 4 && (
                <Badge variant="secondary" className="text-xs px-1 py-0">
                  +{totalShared - 4}
                </Badge>
              )}
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-between pt-2">
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
      </CardContent>
    </Card>
  );
}
