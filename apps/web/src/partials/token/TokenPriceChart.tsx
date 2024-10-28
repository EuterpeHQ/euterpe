"use client";
import React, { useState } from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { cn } from "@/lib/utils";
import HistoricalPrices from "@/data/historical-prices.json";

export const description = "An interactive area chart";

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  Open: {
    label: "Open",
    color: "hsl(var(--chart-1))",
  },
  Close: {
    label: "Close",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export default function TokenPriceChart() {
  const [timeRange, setTimeRange] = useState("1y");

  const chartData = HistoricalPrices.map((item) => ({
    ...item,
    Date: new Date(item.Date).toISOString(),
  })).reverse();

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.Date);
    const latestDate = new Date(chartData[chartData.length - 1].Date);
    let daysToSubtract = 90;
    if (timeRange === "30d") {
      daysToSubtract = 30;
    } else if (timeRange === "7d") {
      daysToSubtract = 7;
    } else if (timeRange === "1y") {
      daysToSubtract = 365;
    } else if (timeRange === "3y") {
      daysToSubtract = 365 * 3;
    }
    const startDate = new Date(latestDate);
    startDate.setDate(latestDate.getDate() - daysToSubtract);
    return date >= startDate;
  });

  return (
    <Card className="h-full rounded-[16px] border-[0.5px] bg-white/[0.02]">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-6 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>Token Price</CardTitle>
          <CardDescription>
            See token performance across different periods
          </CardDescription>
        </div>

        <div className="flex w-fit cursor-pointer items-center gap-2 rounded-lg border-[0.5px] bg-background p-1.5 font-azeret text-[0.688rem] sm:ml-auto">
          {/* <div
            className={cn(
              "px-2 py-0.5",
              timeRange === "7d" && "rounded-sm bg-primary/5",
            )}
            onClick={() => setTimeRange("7d")}
          >
            1W
          </div> */}
          <div
            className={cn(
              "px-2 py-0.5",
              timeRange === "30d" && "rounded-sm bg-primary/5",
            )}
            onClick={() => setTimeRange("30d")}
          >
            1M
          </div>
          {/* <div
            className={cn(
              "px-2 py-0.5",
              timeRange === "90d" && "rounded-sm bg-primary/5",
            )}
            onClick={() => setTimeRange("90d")}
          >
            3M
          </div> */}
          <div
            className={cn(
              "px-2 py-0.5",
              timeRange === "1y" && "rounded-sm bg-primary/5",
            )}
            onClick={() => setTimeRange("1y")}
          >
            1Y
          </div>
          <div
            className={cn(
              "px-2 py-0.5",
              timeRange === "3y" && "rounded-sm bg-primary/5",
            )}
            onClick={() => setTimeRange("3y")}
          >
            5Y
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-5 pt-4 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[400px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-Open)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-Open)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-Close)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-Close)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="Date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    });
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="Open"
              type="natural"
              fill="url(#fillMobile)"
              stroke="var(--color-Close)"
              stackId="a"
            />
            <Area
              dataKey="Close"
              type="natural"
              fill="url(#fillDesktop)"
              stroke="var(--color-Open)"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
