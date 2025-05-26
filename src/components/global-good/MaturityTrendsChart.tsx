
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart";

interface MaturityTrendsChartProps {
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

export function MaturityTrendsChart({ scores, dimensions }: MaturityTrendsChartProps) {
  // Sort scores by year for proper line chart display
  const sortedScores = [...scores].sort((a, b) => a.year - b.year);

  const chartConfig = {
    global_utility: {
      label: "Global Utility",
      color: "hsl(var(--chart-1))",
    },
    community_support: {
      label: "Community Support", 
      color: "hsl(var(--chart-2))",
    },
    maturity_of_gg: {
      label: "Maturity of GG",
      color: "hsl(var(--chart-3))",
    },
    inclusive_design: {
      label: "Inclusive Design",
      color: "hsl(var(--chart-4))",
    },
    climate_resilience: {
      label: "Climate Resilience",
      color: "hsl(var(--chart-5))",
    },
    low_carbon: {
      label: "Low Carbon",
      color: "hsl(220 70% 50%)",
    },
  };

  return (
    <ChartContainer config={chartConfig} className="aspect-auto h-[300px] w-full">
      <LineChart data={sortedScores} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
        <XAxis 
          dataKey="year" 
          tick={{ fontSize: 12 }}
          tickLine={false}
          axisLine={false}
        />
        <YAxis 
          domain={[0, 10]}
          tick={{ fontSize: 12 }}
          tickLine={false}
          axisLine={false}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        
        {dimensions.map(({ key }) => (
          <Line
            key={key}
            type="monotone"
            dataKey={key}
            strokeWidth={2}
            dot={{ fill: "var(--color-" + key + ")", strokeWidth: 2, r: 4 }}
            stroke={`var(--color-${key})`}
          />
        ))}
      </LineChart>
    </ChartContainer>
  );
}
