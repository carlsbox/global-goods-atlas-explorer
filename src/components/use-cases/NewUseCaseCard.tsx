
import { Link } from "react-router-dom";
import { UseCase } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  ArrowRight, 
  Globe,
  Settings,
  Circle
} from "lucide-react";
import { useI18n } from "@/hooks/useI18n";
import { ClassificationBadge } from "@/components/ClassificationBadge";

interface NewUseCaseCardProps {
  useCase: UseCase;
  globalGoods?: any[];
  classifications?: any[];
}

export function NewUseCaseCard({ useCase, globalGoods = [], classifications = [] }: NewUseCaseCardProps) {
  const { getText } = useI18n();
  
  // Extract actor types from the actors field
  const actorTypes = useCase.actors ? 
    useCase.actors.split('\n')
      .filter(line => line.trim().startsWith('-'))
      .map(line => line.replace(/^-\s*\*?\*?/, '').split('–')[0].trim())
      .slice(0, 3) : [];

  // Get global goods names
  const usedGoodsNames = useCase.global_goods?.map(good => good.name) || [];

  // Get classification info
  const getClassificationInfo = (code: string) => {
    return classifications.find(c => c.code === code);
  };

  return (
    <Card className="h-full flex flex-col transition-all hover:shadow-md overflow-hidden">
      <CardHeader className="pb-3 flex-shrink-0">
        <div className="flex items-start justify-between gap-3 mb-3">
          <CardTitle className="text-lg leading-tight line-clamp-2 flex-1">
            {useCase.title}
          </CardTitle>
          <Circle className="h-5 w-5 text-primary flex-shrink-0" />
        </div>
        
        {/* Classification badges */}
        <div className="flex flex-wrap gap-1">
          {useCase.classifications?.sdg && (
            <ClassificationBadge 
              code={useCase.classifications.sdg} 
            />
          )}
          {useCase.classifications?.who_system && (
            <ClassificationBadge 
              code={useCase.classifications.who_system} 
            />
          )}
          {useCase.classifications?.wmo_category && (
            <ClassificationBadge 
              code={useCase.classifications.wmo_category} 
            />
          )}
        </div>
      </CardHeader>

      <CardContent className="pt-0 flex-1 flex flex-col">
        <div className="flex-1 space-y-4">
          {/* Purpose preview */}
          <p className="text-sm text-muted-foreground line-clamp-3">
            {useCase.purpose || useCase.description}
          </p>
          
          {/* Actors */}
          {actorTypes.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Key Actors</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {actorTypes.map((actor, index) => (
                  <Badge key={index} variant="secondary" className="text-xs truncate max-w-[120px]">
                    {actor}
                  </Badge>
                ))}
              </div>
            </div>
          )}
          
          {/* Global Goods */}
          {usedGoodsNames.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Globe className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Global Goods</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {usedGoodsNames.slice(0, 2).map((name, index) => (
                  <Badge key={index} className="text-xs truncate max-w-[100px]">
                    {name}
                  </Badge>
                ))}
                {usedGoodsNames.length > 2 && (
                  <Badge variant="outline" className="text-xs">
                    +{usedGoodsNames.length - 2}
                  </Badge>
                )}
              </div>
            </div>
          )}

          {/* Standards - Updated to work with string array */}
          {useCase.standards && useCase.standards.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Settings className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Standards</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {useCase.standards.slice(0, 2).map((standardCode, index) => (
                  <Badge key={index} variant="outline" className="text-xs truncate max-w-[100px]">
                    {standardCode}
                  </Badge>
                ))}
                {useCase.standards.length > 2 && (
                  <Badge variant="outline" className="text-xs">
                    +{useCase.standards.length - 2}
                  </Badge>
                )}
              </div>
            </div>
          )}
        </div>
        
        {/* Action button - pinned to bottom */}
        <div className="flex justify-end mt-4 pt-4 border-t flex-shrink-0">
          <Button asChild size="sm">
            <Link to={`/use-cases/${useCase.id}`} className="flex items-center">
              View Details <ArrowRight className="ml-1 h-3 w-3" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
