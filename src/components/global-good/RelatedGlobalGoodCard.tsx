
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
    <Card className="hover:shadow-sm transition-shadow border-l-2 border-l-primary/20">
      <CardContent className="p-3">
        <div className="space-y-2">
          {/* Compact header with logo and name */}
          <div className="flex items-center gap-2">
            {globalGood.Logo && (
              <img 
                src={globalGood.Logo} 
                alt={`${globalGood.Name} logo`}
                className="w-6 h-6 object-contain flex-shrink-0"
              />
            )}
            <div className="flex-1 min-w-0">
              <Link 
                to={`/global-goods/${globalGood.ID}`}
                className="font-medium text-sm hover:text-primary transition-colors line-clamp-1"
              >
                {globalGood.Name}
              </Link>
            </div>
            {/* Shared items indicator */}
            {totalShared > 0 && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground flex-shrink-0">
                <Tag className="h-3 w-3" />
                <span>{totalShared}</span>
              </div>
            )}
          </div>

          {/* Compact summary */}
          {globalGood.ProductOverview?.Summary && (
            <p className="text-xs text-muted-foreground line-clamp-1">
              {globalGood.ProductOverview.Summary}
            </p>
          )}

          {/* Compact shared items */}
          {(sharedClassifications.length > 0 || sharedStandards.length > 0) && (
            <div className="flex flex-wrap gap-1">
              {sharedClassifications.slice(0, 1).map((classification, index) => (
                <Badge key={index} variant="secondary" className="text-xs px-1.5 py-0 h-5">
                  {classification}
                </Badge>
              ))}
              {sharedStandards.slice(0, 1).map((standard, index) => (
                <Badge key={index} variant="outline" className="text-xs px-1.5 py-0 h-5">
                  {standard}
                </Badge>
              ))}
              {totalShared > 2 && (
                <Badge variant="secondary" className="text-xs px-1.5 py-0 h-5">
                  +{totalShared - 2}
                </Badge>
              )}
            </div>
          )}

          {/* Compact actions */}
          <div className="flex items-center justify-between">
            <Link to={`/global-goods/${globalGood.ID}`}>
              <Button variant="outline" size="sm" className="text-xs h-6 px-2">
                View
              </Button>
            </Link>
            {mainWebsite && (
              <Button variant="ghost" size="sm" asChild className="h-6 w-6 p-0">
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
