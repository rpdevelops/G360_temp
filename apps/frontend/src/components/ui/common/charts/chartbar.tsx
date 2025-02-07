"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { cn } from "@/lib/utils"; // Utility for conditional class names

interface ChartBarProps {
  chartData: Array<Record<string, any>>; // Data for the chart
  chartConfig: ChartConfig; // Configuration for the chart
  className?: string; // Optional className for custom styling
}

export function ChartBar({ chartData, chartConfig, className }: ChartBarProps) {
  return (
    <ChartContainer config={chartConfig} className={cn("min-h-[200px] w-fit", className)}>
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        {Object.keys(chartConfig).map((key) => (
          <Bar
            key={key}
            dataKey={key}
            fill={chartConfig[key].color}
            radius={4}
          />
        ))}
      </BarChart>
    </ChartContainer>
  );
}
