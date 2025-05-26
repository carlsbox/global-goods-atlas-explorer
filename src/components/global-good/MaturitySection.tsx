
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";
import { GlobalGoodFlat } from "@/lib/types/globalGoodFlat";
import { useState } from "react";
import { MaturityRadarChart } from "./MaturityRadarChart";
import { MaturityScoresModal } from "./MaturityScoresModal";

interface MaturitySectionProps {
  globalGood: GlobalGoodFlat;
}

export function MaturitySection({ globalGood }: MaturitySectionProps) {
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [showMultiYear, setShowMultiYear] = useState(false);

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

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Left column - Radar Chart (60%) */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>
                  Maturity Profile {showMultiYear ? '(All Years)' : displayYear.year}
                </span>
                <div className="flex gap-2">
                  <Button
                    variant={showMultiYear ? "default" : "outline"}
                    size="sm"
                    onClick={() => setShowMultiYear(!showMultiYear)}
                  >
                    Multi-Year View
                  </Button>
                  {!showMultiYear && availableYears.map(year => (
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
              <MaturityRadarChart 
                data={showMultiYear ? null : displayYear}
                allYearsData={showMultiYear ? scores : null}
                dimensions={dimensions}
                showMultiYear={showMultiYear}
              />
            </CardContent>
          </Card>
        </div>

        {/* Right column - Latest Year Scores (40%) */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between text-lg">
                <span>Latest Scores ({latestYearData.year})</span>
                <MaturityScoresModal scores={scores} dimensions={dimensions} />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-sm">Dimension</TableHead>
                    <TableHead className="text-center text-sm">Score</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dimensions.map(({ key, label }) => {
                    const score = latestYearData[key as keyof typeof latestYearData] as number;
                    
                    return (
                      <TableRow key={key}>
                        <TableCell className="font-medium text-sm py-2">{label}</TableCell>
                        <TableCell className="text-center py-2">
                          <Badge variant="secondary" className="font-mono text-xs">
                            {score}/10
                          </Badge>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
