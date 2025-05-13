
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GlobalGood } from "@/lib/types";

interface CountryDetailsProps {
  countryName: string;
  countryGoods: GlobalGood[];
  onSelectGood: (good: GlobalGood) => void;
}

export function CountryDetails({
  countryName,
  countryGoods,
  onSelectGood
}: CountryDetailsProps) {
  return (
    <Card className="border-0 shadow-none rounded-none h-full">
      <CardHeader>
        <CardTitle>{countryName}</CardTitle>
      </CardHeader>
      <CardContent>
        <h3 className="font-semibold mb-2">Global Goods Used</h3>
        <div className="space-y-2">
          {countryGoods.length > 0 ? (
            countryGoods.map(good => (
              <Button
                key={good.id}
                variant="outline"
                className="w-full justify-start text-left font-normal"
                onClick={() => onSelectGood(good)}
              >
                <div className="flex items-center">
                  {good.logo ? (
                    <img 
                      src={good.logo} 
                      alt={good.name} 
                      className="h-5 w-5 mr-2 object-contain" 
                    />
                  ) : null}
                  {good.name}
                </div>
                <div className="ml-auto flex gap-1">
                  {good.sector?.slice(0, 1).map(sector => (
                    <Badge key={sector} variant="secondary" className="text-xs">
                      {sector}
                    </Badge>
                  ))}
                </div>
              </Button>
            ))
          ) : (
            <p className="text-sm text-muted-foreground">No global goods data available for this country</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
