"use client";
import React from "react";
import { formatAddress } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";
import { ArtistToken as ArtistTokenProps } from "@/entities";
import Avatar from "@/components/Avatar";
import {
  CartesianGrid,
  Tooltip as RechartTooltip,
  ResponsiveContainer,
  YAxis,
  XAxis,
  AreaChart,
  Area,
} from "recharts";
import HistoricalPrices from "@/data/historical-prices.json";
import { Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { LuExternalLink } from "react-icons/lu";
import Link from "next/link";
import Spacer from "@/components/ui/spacer";

function ArtistToken(props: ArtistTokenProps) {
  return (
    <main className="w-full max-w-5xl">
      <Spacer size={28} />
      <div className="flex flex-col">
        <h2 className="text-lg font-semibold">Your Token</h2>
        <Spacer size={12} />
        <div className="flex flex-col-reverse gap-2 md:flex-row">
          <div className="flex flex-col gap-2">
            <TokenDisplayCard {...props} />
            <TokenMetrics {...props} />
          </div>
          <TokenChart {...props} />
        </div>
      </div>
    </main>
  );
}

function TokenDisplayCard(props: ArtistTokenProps) {
  return (
    <div className="inline-flex flex-col gap-4 rounded-lg border-[0.5px] border-card/65 bg-surface px-6 py-4">
      <div className="flex flex-row items-center gap-4">
        <Avatar className="h-auto w-12" />
        <div className="flex flex-col">
          <h2 className="font-medium">{props.name}</h2>
          <h2 className="text-sm font-medium text-muted-foreground">
            {props.symbol}
          </h2>
        </div>
      </div>
      <p className="w-fit rounded-sm bg-accent px-1 py-0.5 text-xs text-primary">
        7.156k Holders
      </p>
      <div className="flex gap-8">
        <div>
          <p className="text-xs text-muted-foreground">Price</p>
          <p className="text-xs font-medium">$0.003720</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Market Cap</p>
          <p className="text-xs font-medium">$126k</p>
        </div>
      </div>
      <div className="flex gap-4">
        <div className="rounded-md bg-surfaceVariant px-6 py-2">
          <p className="text-center text-xs text-muted-foreground">5m</p>
          <p className="text-center text-xs font-bold text-green-400">+3.90%</p>
        </div>
        <div className="rounded-md bg-surfaceVariant px-6 py-2">
          <p className="text-center text-xs text-muted-foreground">1H</p>
          <p className="text-center text-xs font-bold text-red-400">-1.64%</p>
        </div>
        <div className="rounded-md bg-surfaceVariant px-6 py-2">
          <p className="text-center text-xs text-muted-foreground">24H</p>
          <p className="text-center text-xs font-bold text-green-400">
            +12.81%
          </p>
        </div>
      </div>
    </div>
  );
}

function TokenMetrics(props: ArtistTokenProps) {
  return (
    <div className="inline-flex w-full flex-col justify-center gap-4 rounded-lg border-[0.5px] border-card/65 bg-surface px-6 py-4">
      <div className="flex justify-between">
        <p className="text-sm text-muted-foreground">Address</p>
        <div className="flex items-center gap-2">
          <p className="ml-2 text-sm">{formatAddress(props.address)} </p>
          <Link
            href={`https://arbiscan.io/token/${props.address}`}
            target="_blank"
            rel="noreferrer"
          >
            <LuExternalLink className="h-3 w-3 cursor-pointer text-muted-foreground" />
          </Link>
        </div>
      </div>
      <div className="flex justify-between">
        <p className="text-sm text-muted-foreground">Total Supply</p>
        <p className="text-sm">
          {props.totalSupply} {props.symbol}
        </p>
      </div>
      <div className="flex justify-between">
        <p className="text-sm text-muted-foreground">Circulating Supply</p>
        <p className="text-sm">N/A</p>
      </div>
      <div className="flex justify-between">
        <p className="text-sm text-muted-foreground">All Time High</p>
        <p className="text-sm">N/A</p>
      </div>
      <div className="flex justify-between">
        <p className="text-sm text-muted-foreground">All Time Low</p>
        <p className="text-sm">N/A</p>
      </div>
    </div>
  );
}

function TokenChart(props: ArtistTokenProps) {
  const { toast } = useToast();

  const handleChart = () => {
    toast({
      title: "Feature Unavailable",
      description:
        "Sorry, this part of the chart is not functional. Check back soon!",
    });
  };

  return (
    <div className="inline-flex w-full flex-col justify-center gap-4 rounded-lg border-[0.5px] border-card/65 bg-surface px-6 py-4">
      <div className="flex justify-between">
        <div
          onClick={handleChart}
          className="flex w-fit cursor-pointer items-center gap-1 rounded-md border-[0.5px] border-card/65 bg-surfaceVariant p-1.5 text-xs"
        >
          <div className="px-2 py-0.5">24H</div>
          <div className="px-2 py-0.5">1W</div>
          <div className="px-2 py-0.5">3M</div>
          <div className="px-2 py-0.5">1Y</div>
          <div className="rounded-sm bg-accent px-2 py-0.5">5Y</div>
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <div className="flex items-center gap-1">
                <Info size={14} className="text-muted-foreground" />
                <p className="text-xs text-muted-foreground">
                  This is just a simulation
                </p>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-xs">
                We're actively developing price charts
                <br /> for artist tokens. Stay tuned!
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <ResponsiveContainer>
        <AreaChart
          data={HistoricalPrices.map((item) => ({
            ...item,
            Date: item["Date"].substring(0, 4),
          })).reverse()}
        >
          <CartesianGrid stroke="#555" strokeDasharray="5 5" />
          <Area
            type="monotone"
            dataKey="Open"
            dot={false}
            stroke="#c1ff7050"
            fill="#4a5c33"
            isAnimationActive={false}
          />
          <XAxis dataKey="Date" interval={150} />
          <YAxis />
          {/* @ts-expect-error */}
          <RechartTooltip content={<CustomTooltip />} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active: any;
  payload: any;
  label: any;
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip w-24 rounded-md border-[0.5px] border-card/65 bg-surface p-2">
        <p className="text-primary transition-all duration-200">
          ${payload[0].value.toFixed(0)}
        </p>
      </div>
    );
  }

  return null;
};

export default ArtistToken;
