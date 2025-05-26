
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface MaturityScoresModalProps {
  scores: Array<{
    year: number;
    global_utility: number;
    community_support: number;
    maturity_of_gg: number;
    inclusive_design: number;
    climate_resilience: number;
    low_carbon: number;
  }>;
  dimensions: Array<{
    key: string;
    label: string;
  }>;
}

export function MaturityScoresModal({ scores, dimensions }: MaturityScoresModalProps) {
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

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          View All Years
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Complete Maturity Assessment History</DialogTitle>
        </DialogHeader>
        <Card>
          <CardHeader>
            <CardTitle>Historical Maturity Scores</CardTitle>
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
                                <span className={`text-xs ${
                                  change.type === 'up' ? 'text-green-600' : 'text-red-600'
                                }`}>
                                  {change.type === 'up' ? '↗' : '↘'} {Math.abs(change.change)}
                                </span>
                              </div>
                            )}
                            {change && change.type === 'same' && (
                              <span className="text-xs text-gray-400">—</span>
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
      </DialogContent>
    </Dialog>
  );
}
