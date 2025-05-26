
import { Card, CardContent } from "@/components/ui/card";
import { GlobalGoodFlat } from "@/lib/types/globalGoodFlat";

interface ImplementationContextProps {
  globalGood: GlobalGoodFlat;
}

export function ImplementationContext({ globalGood }: ImplementationContextProps) {
  const summaryOfReach = globalGood.Reach?.SummaryOfReach;

  if (!summaryOfReach) {
    return null;
  }

  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-3">Implementation Overview</h3>
        <p className="text-muted-foreground leading-relaxed">
          {summaryOfReach}
        </p>
      </CardContent>
    </Card>
  );
}
