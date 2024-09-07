"use client";
import React from "react";
import Image from "next/image";
import CoinIcon from "@/assets/icons/coin-vertical.svg";
import GroupIcon from "@/assets/icons/group.svg";
import HeadphonesIcon from "@/assets/icons/headphones.svg";
import TokenPerformance from "@/partials/dashboard/TokenPerformance";
import RecentActivity from "@/partials/dashboard/RecentActivity";
import NotificationBanner from "@/partials/NotificationBanner";
import { ThreeDCardDemo } from "@/components/ThreeDCardDemo";
import LineChart from "@/components/charts/LineChart";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
function Page() {
  return (
    <main>
      <div className="max-w-9xl mx-auto flex w-full flex-col gap-2 p-5">
        <div className="flex flex-col gap-2 py-4">
          <p className="font-azeret text-[0.688rem] leading-[1.2] tracking-[-0.04em] text-muted-foreground">
            Total Balance
          </p>
          <h1 className="text-[2.5rem] leading-[1.2]">$15,653.07</h1>
        </div>
        <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
          <div>
            <div className="flex gap-2 rounded-[16px] border-[0.5px] bg-white/[0.02] px-5 py-7">
              <Image src={CoinIcon} alt="coin" width={32} height={32} />
              <div className="flex flex-col gap-1">
                <p className="font-azeret text-[0.688rem] leading-[1.2] tracking-[-0.04em] text-muted-foreground">
                  Total Value
                </p>
                <h1 className="text-[1.75rem] leading-[1.2]">$4.2k</h1>
              </div>
            </div>
          </div>
          <div>
            <div className="flex gap-2 rounded-[16px] border-[0.5px] bg-white/[0.02] px-5 py-7">
              <Image src={GroupIcon} alt="coin" width={32} height={32} />
              <div className="flex flex-col gap-1">
                <p className="font-azeret text-[0.688rem] leading-[1.2] tracking-[-0.04em] text-muted-foreground">
                  Token Holders
                </p>
                <h1 className="text-[1.75rem] leading-[1.2]">138</h1>
              </div>
            </div>
          </div>
          <div>
            <div className="flex gap-2 rounded-[16px] border-[0.5px] bg-white/[0.02] px-5 py-7">
              <Image src={HeadphonesIcon} alt="coin" width={32} height={32} />
              <div className="flex flex-col gap-1">
                <p className="font-azeret text-[0.688rem] leading-[1.2] tracking-[-0.04em] text-muted-foreground">
                  Fans
                </p>
                <h1 className="text-[1.75rem] leading-[1.2]">23.5k</h1>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <TokenPerformance />
          </div>
          <div>
            <RecentActivity />
          </div>
        </div>
      </div>
    </main>
  );
}

export default Page;
