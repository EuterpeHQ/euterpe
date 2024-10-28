import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TbArrowNarrowUp } from "react-icons/tb";
import { TbArrowNarrowDown } from "react-icons/tb";
import { cn } from "@/lib/utils";

const activityItems = [
  {
    id: 1,
    type: "outgoing",
    status: "Completed",
    address: "0x1e8...d533B",
    amount: "+3.32899714 EUT",
    usdEquivalent: "-10288.96 USD",
  },
  {
    id: 2,
    type: "incoming",
    status: "Pending",
    address: "0x1e8...d533B",
    amount: "-1.32899714 EUT",
    usdEquivalent: "-4109.96 USD",
  },
  {
    id: 3,
    type: "incoming",
    status: "Completed",
    address: "0x1e8...d533B",
    amount: "+0.3289 ART",
    usdEquivalent: "+20844.46 USD",
  },
  {
    id: 4,
    type: "outgoing",
    status: "Completed",
    address: "0x1e8...d533B",
    amount: "-3.32899714 EUT",
    usdEquivalent: "-10295.01 USD",
  },
] as const;

function ActivityItem({
  type,
  status,
  address,
  amount,
  usdEquivalent,
}: (typeof activityItems)[number]) {
  return (
    <div className="flex cursor-pointer items-center justify-between rounded-xl p-3 hover:bg-primary/5">
      <div className="flex items-center">
        <div
          className={cn(
            "rounded-xl p-2",
            type === "incoming" ? "bg-[#3b3343]" : "bg-[#2a323f]",
          )}
        >
          {type === "incoming" ? (
            <TbArrowNarrowDown className="h-8  w-6 rotate-45 text-[#b980da]" />
          ) : (
            <TbArrowNarrowUp className="h-8 w-6 rotate-45 text-[#125cc4]" />
          )}
        </div>
        <div className="ml-4 flex flex-col">
          <div className="flex items-center gap-2">
            <div className="h-[7px] w-[7px] rounded-full bg-green-500" />
            <span className="text-sm">{address}</span>
          </div>
          <span
            className={cn(
              "font-azeret text-[0.688rem] font-semibold",
              status === "Completed" ? "text-green-500" : "text-amber-400",
            )}
          >
            {status}
          </span>
        </div>
      </div>

      <div className="hidden flex-col items-end max-[1024px]:flex max-[395px]:hidden min-[1200px]:flex">
        <div className="flex items-center gap-2">
          <span className="text-sm text-white">{amount}</span>
          <div className="h-3 w-3 rounded-full bg-white/5" />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[0.813rem] text-muted-foreground">
            {usdEquivalent}
          </span>

          <div className="h-3 w-3 rounded-full bg-white/5" />
        </div>
      </div>
    </div>
  );
}

function RecentActivity() {
  return (
    <Card className="h-96 rounded-[16px] border-[0.5px] bg-white/[0.02]">
      <CardHeader className="flex items-center gap-2 space-y-0 py-6 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>Recent Activity</CardTitle>
        </div>
      </CardHeader>
      <CardContent className=" px-5 ">
        {activityItems.map((item) => (
          <ActivityItem key={item.id} {...item} />
        ))}
      </CardContent>
    </Card>
  );
}

export default RecentActivity;
