
import { useState } from 'react';
import { GlobalGood } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  ResponsiveContainer, 
  Tooltip 
} from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { useI18n } from "@/hooks/useI18n";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface MaturityTabProps {
  globalGood: GlobalGood;
}

type MaturityScoreKey = 'global_utility' | 'community_support' | 'maturity_of_gg' | 'inclusive_design' | 'climate_resilience' | 'low_carbon';

export function MaturityTab({ globalGood }: MaturityTabProps) {
  const { tPage } = useI18n();
  const [viewMode, setViewMode] = useState<'chart' | 'table'>('chart');

  // Helper function to check if maturity data is valid
  const hasMaturityData = () => {
    return typeof globalGood.maturity === 'object' && 
           globalGood.maturity.scores && 
           Object.keys(globalGood.maturity.scores).length > 0;
  };

  // Format maturity scores for radar chart
  const formatMaturityData = () => {
    if (!hasMaturityData()) return [];

    const scoreKeys = [
      'global_utility', 
      'community_support', 
      'maturity_of_gg', 
      'inclusive_design', 
      'climate_resilience', 
      'low_carbon'
    ] as MaturityScoreKey[];
    
    return scoreKeys.map(key => {
      const scores = globalGood.maturity && typeof globalGood.maturity === 'object' && globalGood.maturity.scores 
                    ? globalGood.maturity.scores 
                    : {};
      return {
        dimension: tPage(`maturity.scores.${key}`, 'globalGoodDetails'),
        value: scores[key] || 0,
        fullMark: 10
      };
    }).filter(item => item.value > 0); // Filter out dimensions with no score
  };

  // Get maturity scores for table display
  const getMaturityScores = () => {
    if (!hasMaturityData()) return [];

    const scores = globalGood.maturity && typeof globalGood.maturity === 'object' && globalGood.maturity.scores 
                  ? globalGood.maturity.scores 
                  : {};
    return Object.entries(scores)
      .filter(([_, score]) => score !== undefined)
      .map(([key, score]) => ({
        key: key as MaturityScoreKey,
        dimension: tPage(`maturity.scores.${key}`, 'globalGoodDetails'),
        score
      }));
  };

  // Calculate the chart configuration
  const chartConfig = {
    maturity: { color: "hsl(var(--primary))" }
  };

  const maturityData = formatMaturityData();
  const maturityScores = getMaturityScores();
  const maturityLevel = globalGood.maturity && typeof globalGood.maturity === 'object' && 'level' in globalGood.maturity 
                      ? globalGood.maturity.level 
                      : (typeof globalGood.maturity === 'string' ? globalGood.maturity : '');

  if (!globalGood.maturity) {
    return (
      <Card>
        <CardContent className="pt-6 text-center">
          <p>{tPage('maturity.noData', 'globalGoodDetails')}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>{tPage('maturity.title', 'globalGoodDetails')}</CardTitle>
          <Badge variant="outline">{maturityLevel}</Badge>
        </div>
        <p className="text-sm text-muted-foreground">
          {tPage('maturity.description', 'globalGoodDetails')}
        </p>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="chart" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="chart" onClick={() => setViewMode('chart')}>Chart</TabsTrigger>
            <TabsTrigger value="table" onClick={() => setViewMode('table')}>Table</TabsTrigger>
          </TabsList>
          
          <TabsContent value="chart" className="w-full">
            {hasMaturityData() && maturityData.length > 0 ? (
              <div className="w-full h-[400px]">
                <ChartContainer config={chartConfig}>
                  <RadarChart outerRadius={90} data={maturityData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="dimension" />
                    <PolarRadiusAxis domain={[0, 10]} />
                    <Radar
                      name="Maturity"
                      dataKey="value"
                      stroke="var(--color-maturity)"
                      fill="var(--color-maturity)"
                      fillOpacity={0.6}
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </RadarChart>
                </ChartContainer>
              </div>
            ) : (
              <p className="text-center py-8">{tPage('maturity.noData', 'globalGoodDetails')}</p>
            )}
          </TabsContent>
          
          <TabsContent value="table">
            {hasMaturityData() && maturityScores.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{tPage('maturity.scoreTable.dimension', 'globalGoodDetails')}</TableHead>
                    <TableHead>{tPage('maturity.scoreTable.score', 'globalGoodDetails')}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {maturityScores.map((item) => (
                    <TableRow key={item.key}>
                      <TableCell>{item.dimension}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-24 bg-muted rounded-full h-2.5">
                            <div 
                              className="bg-primary h-2.5 rounded-full" 
                              style={{ width: `${(item.score / 10) * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium">{item.score}/10</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <p className="text-center py-8">{tPage('maturity.noData', 'globalGoodDetails')}</p>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="border-t bg-muted/50 text-sm text-muted-foreground">
        <p>{tPage('maturity.level', 'globalGoodDetails')}: {maturityLevel}</p>
      </CardFooter>
    </Card>
  );
}
