
import { Link } from "react-router-dom";
import { GlobalGoodFlat } from "@/lib/types/globalGoodFlat";
import { 
  Card, 
  CardContent 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight } from "lucide-react";

interface GlobalGoodCardFlatProps {
  good: GlobalGoodFlat;
}

export function GlobalGoodCardFlat({ good }: GlobalGoodCardFlatProps) {
  const countryCount = good.Reach?.ImplementationCountries?.length || 0;
  const sectors = good.GlobalGoodsType?.map(type => type.title) || [];

  return (
    <Link to={`/global-goods/${good.ID}`}>
      <Card className="h-full transition-all hover:shadow-md overflow-hidden">
        <CardContent className="p-0">
          <div className="p-6">
            <div className="flex items-center mb-4">
              {good.Logo ? (
                <img 
                  src={good.Logo} 
                  alt={good.Name} 
                  className="h-10 w-10 mr-3 rounded object-contain"
                />
              ) : (
                <div className="h-10 w-10 bg-primary/10 rounded-full mr-3 flex items-center justify-center">
                  <span className="text-primary font-semibold">
                    {good.Name.charAt(0)}
                  </span>
                </div>
              )}
              <h3 className="font-semibold truncate">{good.Name}</h3>
            </div>
            
            <p className="text-muted-foreground text-sm line-clamp-3 mb-4 h-[4.5rem]">
              {good.ProductOverview?.Summary || good.ProductOverview?.Description}
            </p>
            
            <div className="flex flex-wrap gap-1 mb-4">
              {sectors.slice(0, 3).map((sector) => (
                <Badge key={sector} variant="secondary" className="text-xs">
                  {sector}
                </Badge>
              ))}
              {sectors.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{sectors.length - 3} more
                </Badge>
              )}
            </div>
            
            <div className="flex items-center justify-between mt-auto pt-2 text-sm text-muted-foreground">
              <span>
                {countryCount} {countryCount === 1 ? 'country' : 'countries'}
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
