
import { useState } from "react";
import { Link } from "react-router-dom";
import { FileText, MapPin, ChevronDown, Users } from "lucide-react";
import { UseCase } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface EnhancedRelatedUseCaseItemProps {
  useCase: UseCase;
  isDirectlyReferenced: boolean;
}

export function EnhancedRelatedUseCaseItem({ useCase, isDirectlyReferenced }: EnhancedRelatedUseCaseItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Determine classification color
  const getClassificationColor = () => {
    if (useCase.classifications?.sdg) return "text-blue-600 bg-blue-100";
    if (useCase.classifications?.who_system) return "text-green-600 bg-green-100";
    if (useCase.classifications?.wmo_category) return "text-purple-600 bg-purple-100";
    return "text-gray-600 bg-gray-100";
  };

  const classificationColor = getClassificationColor();

  return (
    <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
      <div className={`border rounded-lg hover:bg-muted/30 transition-colors ${isDirectlyReferenced ? 'border-l-4 border-l-primary' : ''}`}>
        {/* Compact Header */}
        <div className="flex items-start gap-3 p-3">
          <div className={`rounded-full p-2 flex-shrink-0 ${classificationColor}`}>
            <FileText className="h-4 w-4" />
          </div>
          
          <div className="flex-1 min-w-0 space-y-2">
            {/* Title and Meta Row */}
            <div className="flex items-start justify-between gap-2">
              <Link 
                to={`/use-cases/${useCase.id}`}
                className="font-medium text-sm hover:text-primary transition-colors line-clamp-2 flex-1"
              >
                {useCase.title}
              </Link>
              
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0 flex-shrink-0">
                  <ChevronDown className={`h-3 w-3 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                </Button>
              </CollapsibleTrigger>
            </div>
            
            {/* Quick Metadata */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              {/* Classification Badge */}
              {useCase.classifications?.sdg && (
                <Badge variant="secondary" className="text-xs px-1.5 py-0 h-5">
                  SDG {useCase.classifications.sdg}
                </Badge>
              )}
              {useCase.classifications?.who_system && (
                <Badge variant="outline" className="text-xs px-1.5 py-0 h-5">
                  {useCase.classifications.who_system}
                </Badge>
              )}
              {useCase.classifications?.wmo_category && (
                <Badge variant="outline" className="text-xs px-1.5 py-0 h-5">
                  {useCase.classifications.wmo_category}
                </Badge>
              )}
              
              {/* Country */}
              {useCase.country && (
                <div className="flex items-center gap-1 text-muted-foreground">
                  <MapPin className="h-3 w-3" />
                  <span>{useCase.country}</span>
                </div>
              )}
              
              {/* Global Goods Count */}
              {useCase.global_goods && useCase.global_goods.length > 0 && (
                <div className="flex items-center gap-1 text-muted-foreground">
                  <span>{useCase.global_goods.length} tools</span>
                </div>
              )}
              
              {/* Direct Reference Indicator */}
              {isDirectlyReferenced && (
                <Badge variant="default" className="text-xs px-1.5 py-0 h-5">
                  Direct
                </Badge>
              )}
            </div>
          </div>
        </div>
        
        {/* Expandable Content */}
        <CollapsibleContent className="border-t">
          <div className="p-4 space-y-4">
            {/* Purpose */}
            {useCase.purpose && (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm font-medium">Purpose</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {useCase.purpose.length > 200 ? `${useCase.purpose.substring(0, 200)}...` : useCase.purpose}
                </p>
              </div>
            )}
            
            {/* Actors */}
            {useCase.actors && (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Key Actors</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {useCase.actors.length > 150 ? `${useCase.actors.substring(0, 150)}...` : useCase.actors}
                </p>
              </div>
            )}
            
            {/* Global Goods Used */}
            {useCase.global_goods && useCase.global_goods.length > 0 && (
              <div>
                <span className="text-sm font-medium mb-2 block">Global Goods Used</span>
                <div className="flex flex-wrap gap-1">
                  {useCase.global_goods.map((good, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {good.name}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            
            {/* Standards */}
            {useCase.standards && useCase.standards.length > 0 && (
              <div>
                <span className="text-sm font-medium mb-2 block">Standards ({useCase.standards.length})</span>
                <div className="flex flex-wrap gap-1">
                  {useCase.standards.slice(0, 4).map((standard, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {standard.code}
                    </Badge>
                  ))}
                  {useCase.standards.length > 4 && (
                    <Badge variant="secondary" className="text-xs">
                      +{useCase.standards.length - 4} more
                    </Badge>
                  )}
                </div>
              </div>
            )}
            
            {/* View Details Button */}
            <div className="pt-2">
              <Link to={`/use-cases/${useCase.id}`}>
                <Button variant="outline" size="sm" className="text-xs h-7">
                  View Full Details
                </Button>
              </Link>
            </div>
          </div>
        </CollapsibleContent>
      </div>
    </Collapsible>
  );
}
