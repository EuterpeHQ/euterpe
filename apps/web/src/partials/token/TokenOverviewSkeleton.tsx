import React from "react";
import TokenProfileCardSkeleton from "@/partials/token/TokenProfileCardSkeleton";
import TokenMetricsSkeleton from "@/partials/token/TokenMetricsCardSkeleton";
import TokenPriceChartSkeleton from "@/partials/token/TokenPriceChartSkeleton";

function TokenOverview() {
  return (
    <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
      <div className="grid grid-rows-2 gap-2">
        <TokenProfileCardSkeleton />
        <TokenMetricsSkeleton />
      </div>
      <div className="lg:col-span-2">
        <TokenPriceChartSkeleton />
      </div>
    </div>
  );
}

export default TokenOverview;
