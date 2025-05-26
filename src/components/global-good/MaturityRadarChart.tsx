
import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart";

interface MaturityRadarChartProps {
  data?: {
    year: number;
    global_utility: number;
    community_support: number;
    maturity_of_gg: number;
    inclusive_design: number;
    climate_resilience: number;
    low_carbon: number;
  } | null;
  allYearsData?: Array<{
    year: number;
    global_utility: number;
    community_support: number;
    maturity_of_gg: number;
    inclusive_design: number;
    climate_resilience: number;
    low_carbon: number;
  }> | null;
  dimensions: Array<{
    key: string;
    label: string;
  }>;
  showMultiYear?: boolean;
}

export function MaturityRadarChart({ data, allYearsData, dimensions, showMultiYear = false }: MaturityRadarChartProps) {
  
  if (showMultiYear && allYearsData) {
    // Multi-year view
    const radarData = dimensions.map(({ key, label }) => {
      const dimensionData: any = { dimension: label };
      
      allYearsData.forEach((yearData, index) => {
        dimensionData[`year_${yearData.year}`] = yearData[key as keyof typeof yearData] as number;
      });
      
      return dimensionData;
    });

    // Create chart config for multi-year
    const chartConfig: any = {};
    const colors = [
      "hsl(var(--chart-1))",
      "hsl(var(--chart-2))", 
      "hsl(var(--chart-3))",
      "hsl(var(--chart-4))",
      "hsl(var(--chart-5))",
      "hsl(220 70% 50%)"
    ];

    allYearsData.forEach((yearData, index) => {
      chartConfig[`year_${yearData.year}`] = {
        label: yearData.year.toString(),
        color: colors[index % colors.length],
      };
    });

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
          <ChartLegend content={<ChartLegendContent />} />
          
          {allYearsData.map((yearData, index) => (
            <Radar
              key={`year_${yearData.year}`}
              dataKey={`year_${yearData.year}`}
              stroke={colors[index % colors.length]}
              fill={colors[index % colors.length]}
              fillOpacity={0.1}
              strokeWidth={2}
              dot={{ fill: colors[index % colors.length], strokeWidth: 2, r: 3 }}
            />
          ))}
        </RadarChart>
      </ChartContainer>
    );
  }

  // Single year view
  if (!data) return null;
  
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
