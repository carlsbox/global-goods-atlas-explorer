
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Shield, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { GlobalGoodFlat } from "@/lib/types/globalGoodFlat";
import { useState } from "react";
import { MaturityRadarChart } from "./MaturityRadarChart";

interface MaturitySectionProps {
  globalGood: GlobalGoodFlat;
}

export function MaturitySection({ globalGood }: MaturitySectionProps) {
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  const maturityData = globalGood.Maturity;
  const scores = maturityData?.Scores || [];
  
  if (!maturityData || scores.length === 0) {
    return (
      <div>
        <h2 className="text-2xl font-bold mb-4">Maturity Assessment</h2>
        <Card>
          <CardContent className="p-6">
            <p className="text-muted-foreground">No maturity assessment data available</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Get the latest year's data for the radar chart
  const latestYearData = scores[0];
  const displayYear = selectedYear ? scores.find(s => s.year === selectedYear) || latestYearData : latestYearData;
  const availableYears = scores.map(s => s.year).sort((a, b) => b - a);

  // Calculate year-over-year changes
  const getChangeIndicator = (dimension: string, currentYear: number) => {
    const currentIndex = scores.findIndex(s => s.year === currentYear);
    const previousIndex = currentIndex + 1;
    
    if (previousIndex >= scores.length) return null;
    
    const current = scores[currentIndex][dimension as keyof typeof scores[0]] as number;
    const previous = scores[previousIndex][dimension as keyof typeof scores[0]] as number;
    
    if (current > previous) return { type: 'up', change: current - previous };
    if (current < previous) return { type: 'down', change: current - previous };
    return { type: 'same', change: 0 };
  };

  const dimensions = [
    { key: 'global_utility', label: 'Global Utility' },
    { key: 'community_support', label: 'Community Support' },
    { key: 'maturity_of_gg', label: 'Maturity of Global Good' },
    { key: 'inclusive_design', label: 'Inclusive Design' },
    { key: 'climate_resilience', label: 'Climate Resilience' },
    { key: 'low_carbon', label: 'Low Carbon' }
  ];

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2 flex items-center">
          <Shield className="h-6 w-6 mr-2 text-primary" />
          Maturity Assessment
        </h2>
        {maturityData.SummaryOfMaturity && (
          <p className="text-muted-foreground">{maturityData.SummaryOfMaturity}</p>
        )}
      </div>

      <div className="mb-6">
        {/* Radar Chart Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Maturity Profile {displayYear.year}</span>
              <div className="flex gap-2">
                {availableYears.map(year => (
                  <Button
                    key={year}
                    variant={selectedYear === year || (!selectedYear && year === latestYearData.year) ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedYear(selectedYear === year ? null : year)}
                  >
                    {year}
                  </Button>
                ))}
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <MaturityRadarChart data={displayYear} dimensions={dimensions} />
          </CardContent>
        </Card>
      </div>

      {/* Detailed Scores Table */}
      <Card>
        <CardHeader>
          <CardTitle>Detailed Maturity Scores</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Dimension</TableHead>
                {availableYears.map(year => (
                  <TableHead key={year} className="text-center">{year}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {dimensions.map(({ key, label }) => (
                <TableRow key={key}>
                  <TableCell className="font-medium">{label}</TableCell>
                  {availableYears.map(year => {
                    const yearData = scores.find(s => s.year === year);
                    const score = yearData?.[key as keyof typeof yearData] as number;
                    const change = getChangeIndicator(key, year);
                    
                    return (
                      <TableCell key={year} className="text-center">
                        <div className="flex items-center justify-center gap-2">
                          <Badge variant="secondary" className="font-mono">
                            {score}/10
                          </Badge>
                          {change && change.type !== 'same' && (
                            <div className="flex items-center">
                              {change.type === 'up' ? (
                                <TrendingUp className="h-3 w-3 text-green-600" />
                              ) : (
                                <TrendingDown className="h-3 w-3 text-red-600" />
                              )}
                              <span className={`text-xs ml-1 ${
                                change.type === 'up' ? 'text-green-600' : 'text-red-600'
                              }`}>
                                {change.type === 'up' ? '+' : ''}{change.change}
                              </span>
                            </div>
                          )}
                          {change && change.type === 'same' && (
                            <Minus className="h-3 w-3 text-gray-400" />
                          )}
                        </div>
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
