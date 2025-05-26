
import { MapPin, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GlobalGoodFlat } from "@/lib/types/globalGoodFlat";
import { CountryFlag } from "@/lib/utils/countryFlags";

interface CountryDetailPanelProps {
  countryCode: string;
  countryName: string;
  globalGoods: GlobalGoodFlat[];
  onClose: () => void;
  onSelectGood: (good: GlobalGoodFlat) => void;
}

export function CountryDetailPanel({ 
  countryCode, 
  countryName, 
  globalGoods, 
  onClose, 
  onSelectGood 
}: CountryDetailPanelProps) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CountryFlag isoCode={countryCode.toLowerCase()} />
            <span className="truncate">{countryName}</span>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={onClose}
          >
            Back to Overview
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center p-3 bg-primary/5 rounded-lg">
          <div className="text-2xl font-bold text-primary mb-1">
            {globalGoods.length}
          </div>
          <div className="text-sm font-medium">Global Good{globalGoods.length !== 1 ? 's' : ''}</div>
          <div className="text-xs text-muted-foreground">
            Deployed in this country
          </div>
        </div>

        <div className="space-y-3 max-h-96 overflow-y-auto">
          {globalGoods.map((good) => (
            <div 
              key={good.ID} 
              className="p-3 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
              onClick={() => onSelectGood(good)}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-sm mb-1 truncate">{good.Name}</h4>
                  <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                    {good.ProductOverview?.Summary}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {good.GlobalGoodsType?.slice(0, 2).map((type) => (
                      <Badge key={type.code} variant="secondary" className="text-xs">
                        {type.title}
                      </Badge>
                    ))}
                  </div>
                </div>
                <ExternalLink className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              </div>
            </div>
          ))}
        </div>

        {globalGoods.length === 0 && (
          <div className="text-center py-8">
            <MapPin className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
            <p className="text-muted-foreground">No global goods deployed in this country</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
