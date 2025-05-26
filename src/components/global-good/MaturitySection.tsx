
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield } from "lucide-react";
import { GlobalGoodFlat } from "@/lib/types/globalGoodFlat";

interface MaturitySectionProps {
  globalGood: GlobalGoodFlat;
}

export function MaturitySection({ globalGood }: MaturitySectionProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Maturity Assessment</h2>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Shield className="h-5 w-5 mr-2 text-primary" />
            Maturity Scores
          </CardTitle>
        </CardHeader>
        <CardContent>
          {globalGood.Maturity?.Scores && globalGood.Maturity.Scores.length > 0 ? (
            <>
              {globalGood.Maturity.SummaryOfMaturity && (
                <p className="text-muted-foreground mb-4">{globalGood.Maturity.SummaryOfMaturity}</p>
              )}
              <div className="space-y-3">
                {Object.entries(globalGood.Maturity.Scores[0]).filter(([key]) => key !== 'year').map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <span className="text-sm font-medium capitalize">{key.replace(/_/g, ' ')}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-muted rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full" 
                          style={{ width: `${(Number(value) / 10) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">{Number(value)}/10</span>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p className="text-muted-foreground">No maturity assessment data available</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
