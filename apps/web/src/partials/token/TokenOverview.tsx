import React from "react";
import { ArtistToken as ArtistTokenProps } from "@/entities";
import TokenProfileCard from "@/partials/token/TokenProfileCard";
import TokenMetricsCard from "@/partials/token/TokenMetricsCard";
import TokenPriceChart from "@/partials/token/TokenPriceChart";

function TokenOverview(props: ArtistTokenProps) {
  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
      <div className="grid grid-rows-2 gap-3">
        <TokenProfileCard {...props} />
        <TokenMetricsCard {...props} />
      </div>
      <div className="lg:col-span-2">
        <TokenPriceChart />
      </div>
    </div>
  );
}

export default TokenOverview;
