
import { Link } from "react-router-dom";
import { GlobalGood } from "@/lib/types";
import { 
  Card, 
  CardContent 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight } from "lucide-react";

interface GlobalGoodCardProps {
  good: GlobalGood;
}

export function GlobalGoodCard({ good }: GlobalGoodCardProps) {
  return (
    <Link to={`/global-goods/${good.id}`}>
      <Card className="h-full transition-all hover:shadow-md overflow-hidden">
        <CardContent className="p-0">
          <div className="p-6">
            <div className="flex items-center mb-4">
              {good.logo ? (
                <img 
                  src={good.logo} 
                  alt={good.name} 
                  className="h-10 w-10 mr-3 rounded object-contain"
                />
              ) : (
                <div className="h-10 w-10 bg-primary/10 rounded-full mr-3" />
              )}
              <h3 className="font-semibold truncate">{good.name}</h3>
            </div>
            
            <p className="text-muted-foreground text-sm line-clamp-3 mb-4 h-[4.5rem]">
              {good.description}
            </p>
            
            <div className="flex flex-wrap gap-1 mb-4">
              {good.sector?.slice(0, 3).map((sector) => (
                <Badge key={sector} variant="secondary" className="text-xs">
                  {sector}
                </Badge>
              ))}
              {(good.sector?.length || 0) > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{(good.sector?.length || 0) - 3} more
                </Badge>
              )}
            </div>
            
            <div className="flex items-center justify-between mt-auto pt-2 text-sm text-muted-foreground">
              <span>
                {good.countries?.length || 0} {good.countries?.length === 1 ? 'country' : 'countries'}
              </span>
              <div className="flex items-center text-primary">
                View details <ArrowUpRight className="ml-1 h-3 w-3" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
