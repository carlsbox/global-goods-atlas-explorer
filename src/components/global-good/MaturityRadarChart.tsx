
import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

interface MaturityRadarChartProps {
  data: {
    year: number;
    global_utility: number;
    community_support: number;
    maturity_of_gg: number;
    inclusive_design: number;
    climate_resilience: number;
    low_carbon: number;
  };
  dimensions: Array<{
    key: string;
    label: string;
  }>;
}

export function MaturityRadarChart({ data, dimensions }: MaturityRadarChartProps) {
  // Transform data for radar chart
  const radarData = dimensions.map(({ key, label }) => ({
    dimension: label,
    value: data[key as keyof typeof data] as number,
    fullMark: 10
  }));

  const chartConfig = {
    value: {
      label: "Score",
      color: "hsl(var(--primary))",
    },
  };

  return (
    <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[350px]">
      <RadarChart data={radarData}>
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="line" />}
        />
        <PolarAngleAxis 
          dataKey="dimension" 
          tick={{ fontSize: 12, fill: 'hsl(var(--foreground))' }}
          className="text-xs"
        />
        <PolarGrid gridType="polygon" />
        <PolarRadiusAxis
          angle={90}
          domain={[0, 10]}
          tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
          tickCount={6}
        />
        <Radar
          dataKey="value"
          stroke="hsl(var(--primary))"
          fill="hsl(var(--primary))"
          fillOpacity={0.2}
          strokeWidth={2}
          dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
        />
      </RadarChart>
    </ChartContainer>
  );
}
