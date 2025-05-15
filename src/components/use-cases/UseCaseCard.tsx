
import { Link } from "react-router-dom";
import { UseCase } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  MapPin, 
  ArrowUpRight, 
  Calendar,
  ArrowRight 
} from "lucide-react";
import { useI18n } from "@/hooks/useI18n";

interface UseCaseCardProps {
  useCase: UseCase;
  globalGoods: any[];
}

export function UseCaseCard({ useCase, globalGoods }: UseCaseCardProps) {
  const { getText } = useI18n();
  
  // Get global good names for display
  const usedGoodsNames = useCase.globalGoods
    .map(goodId => {
      const good = globalGoods.find(g => g.id === goodId);
      return good ? getText(good.name) : null;
    })
    .filter(Boolean);

  return (
    <Card className="h-full transition-all hover:shadow-md overflow-hidden">
      <CardContent className="p-0">
        {useCase.featuredImage && (
          <div className="relative aspect-video">
            <img 
              src={useCase.featuredImage} 
              alt={useCase.title} 
              className="w-full h-full object-cover" 
            />
          </div>
        )}
        <div className="p-6">
          <h3 className="font-semibold text-xl mb-2">{useCase.title}</h3>
          
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">{useCase.country}</span>
            <span className="text-muted-foreground">•</span>
            <Badge variant="outline" className="text-xs">
              {useCase.sector}
            </Badge>
            <span className="text-muted-foreground">•</span>
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar className="h-3 w-3 mr-1" />
              {useCase.year}
            </div>
          </div>
          
          <p className="text-muted-foreground text-sm line-clamp-3 mb-4 min-h-[4.5rem]">
            {useCase.description}
          </p>
          
          <div className="mb-4">
            <h4 className="text-sm font-medium mb-2">Global Goods Used:</h4>
            <div className="flex flex-wrap gap-1">
              {usedGoodsNames.map((name, index) => (
                <Badge key={index} className="text-xs">
                  {name}
                </Badge>
              ))}
            </div>
          </div>
          
          <div className="flex justify-between items-center mt-4 pt-2 border-t">
            <span className="text-sm text-muted-foreground">
              {useCase.organization}
            </span>
            <div className="flex items-center gap-2">
              {useCase.link && (
                <Button asChild variant="ghost" size="sm" className="text-primary">
                  <a 
                    href={useCase.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center"
                  >
                    Website <ArrowUpRight className="ml-1 h-3 w-3" />
                  </a>
                </Button>
              )}
              <Button asChild size="sm">
                <Link to={`/use-cases/${useCase.id}`} className="flex items-center">
                  Details <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
