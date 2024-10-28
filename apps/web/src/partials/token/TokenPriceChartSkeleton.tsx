import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function TokenPriceChartSkeleton() {
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
          <div className={cn("px-2 py-0.5")}>1M</div>
          <div className={cn("px-2 py-0.5", true && "rounded-sm bg-primary/5")}>
            1Y
          </div>
          <div className={cn("px-2 py-0.5")}>5Y</div>
        </div>
      </CardHeader>
      <CardContent className="px-5 pt-4 sm:pt-6">
        <Skeleton className="aspect-auto h-[400px] w-full" />
      </CardContent>
    </Card>
  );
}
