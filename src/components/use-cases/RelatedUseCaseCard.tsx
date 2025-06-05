
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RelatedUseCase } from "@/lib/utils/useCaseRelationshipEngine";
import { ArrowRight, Users, Globe, Settings } from "lucide-react";

interface RelatedUseCaseCardProps {
  relatedUseCase: RelatedUseCase;
}

export function RelatedUseCaseCard({ relatedUseCase }: RelatedUseCaseCardProps) {
  const { useCase, relationshipReasons, sharedElements } = relatedUseCase;
  
  // Truncate purpose for card display
  const truncatedPurpose = useCase.purpose && useCase.purpose.length > 120 
    ? useCase.purpose.substring(0, 120) + '...'
    : useCase.purpose;

  return (
    <Link to={`/use-cases/${useCase.id}`} className="block group">
      <Card className="h-full transition-all duration-200 hover:shadow-md hover:border-primary/50 group-hover:scale-[1.02]">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg leading-tight group-hover:text-primary transition-colors">
            {useCase.title}
          </CardTitle>
          <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-1">
              {useCase.classifications?.sdg && (
                <Badge variant="secondary" className="text-xs">
                  {useCase.classifications.sdg}
                </Badge>
              )}
              {useCase.classifications?.who_system && (
                <Badge variant="outline" className="text-xs">
                  {useCase.classifications.who_system}
                </Badge>
              )}
            </div>
            <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {truncatedPurpose && (
            <p className="text-sm text-muted-foreground leading-relaxed">
              {truncatedPurpose}
            </p>
          )}
          
          {/* Relationship indicators */}
          <div className="space-y-2">
            <div className="text-xs font-medium text-green-600">
              Why this is related:
            </div>
            <div className="text-xs text-muted-foreground">
              {relationshipReasons.slice(0, 2).join(' • ')}
            </div>
          </div>

          {/* Shared elements badges */}
          <div className="flex flex-wrap gap-1">
            {sharedElements.standards.length > 0 && (
              <Badge variant="outline" className="text-xs flex items-center gap-1">
                <Settings className="h-3 w-3" />
                {sharedElements.standards.length} standard{sharedElements.standards.length > 1 ? 's' : ''}
              </Badge>
            )}
            {sharedElements.globalGoods.length > 0 && (
              <Badge variant="outline" className="text-xs flex items-center gap-1">
                <Globe className="h-3 w-3" />
                {sharedElements.globalGoods.length} global good{sharedElements.globalGoods.length > 1 ? 's' : ''}
              </Badge>
            )}
            {sharedElements.actors.length > 0 && (
              <Badge variant="outline" className="text-xs flex items-center gap-1">
                <Users className="h-3 w-3" />
                Similar actors
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
