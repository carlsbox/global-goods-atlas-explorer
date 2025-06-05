
import { Link } from "react-router-dom";
import { FileText, MapPin, ExternalLink } from "lucide-react";
import { UseCase } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

interface BadgeUseCaseItemProps {
  useCase: UseCase;
  isDirectlyReferenced: boolean;
}

export function BadgeUseCaseItem({ useCase, isDirectlyReferenced }: BadgeUseCaseItemProps) {
  // Determine badge color based on classification
  const getBadgeVariant = () => {
    if (isDirectlyReferenced) return "default";
    if (useCase.classifications?.sdg) return "secondary";
    return "outline";
  };

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Badge 
          variant={getBadgeVariant()}
          className="cursor-pointer hover:shadow-sm transition-all max-w-[200px] truncate"
        >
          <FileText className="h-3 w-3 mr-1 flex-shrink-0" />
          <span className="truncate">{useCase.title}</span>
        </Badge>
      </HoverCardTrigger>
      
      <HoverCardContent className="w-80 p-4" side="top">
        <div className="space-y-3">
          {/* Header */}
          <div>
            <h4 className="font-semibold text-sm line-clamp-2 mb-1">
              {useCase.title}
            </h4>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              {useCase.country && (
                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  <span>{useCase.country}</span>
                </div>
              )}
              {isDirectlyReferenced && (
                <Badge variant="default" className="text-xs px-1 py-0 h-4">
                  Direct
                </Badge>
              )}
            </div>
          </div>

          {/* Purpose */}
          {useCase.purpose && (
            <p className="text-xs text-muted-foreground line-clamp-3">
              {useCase.purpose}
            </p>
          )}

          {/* Quick Info */}
          <div className="flex flex-wrap gap-1">
            {useCase.classifications?.sdg && (
              <Badge variant="secondary" className="text-xs px-1 py-0 h-4">
                SDG {useCase.classifications.sdg}
              </Badge>
            )}
            {useCase.global_goods && useCase.global_goods.length > 0 && (
              <Badge variant="outline" className="text-xs px-1 py-0 h-4">
                {useCase.global_goods.length} tools
              </Badge>
            )}
          </div>

          {/* Action */}
          <div className="flex justify-between items-center pt-2 border-t">
            <Link to={`/use-cases/${useCase.id}`}>
              <Button variant="outline" size="sm" className="text-xs h-6">
                View Details
              </Button>
            </Link>
            <Button variant="ghost" size="sm" asChild className="h-6 w-6 p-0">
              <Link to={`/use-cases/${useCase.id}`}>
                <ExternalLink className="h-3 w-3" />
              </Link>
            </Button>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
