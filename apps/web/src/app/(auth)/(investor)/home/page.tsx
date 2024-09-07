import React from "react";
import NotificationBanner from "@/partials/NotificationBanner";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Swap from "@/partials/exchange/Swap";
import { RiTokenSwapFill } from "react-icons/ri";
import { FaSpotify } from "react-icons/fa6";
import { ChevronRight, Info } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {  Tooltip,TooltipProvider, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

type Activity = {
  id: number;
  description: string;
  time: string;
};

const activities: Activity[] = [
  { id: 1, description: "Purchased 10 EUT", time: "2 hours ago" },
  { id: 2, description: "Connected Spotify account", time: "1 day ago" },
];

export default function Page() {
  return (
    <main>
      <div className="max-w-9xl mx-auto w-full px-4 py-8 sm:px-6 lg:px-8">
        {/* <NotificationBanner /> */}
        {/* users dashboard */}
        <section className="w-full h-[400px] border-2 border-primary">
          <div className="flex justify-between items-center">
            <h2 className="flex justify-stary items-center gap-x-3 text-lg font-semibold">Balance <ChevronRight size={20}/> </h2>
              <Select>
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="All time" />
                  </SelectTrigger>
                  <SelectContent className="bg-muted">
                    <SelectItem value="light">Last 7days</SelectItem>
                    <SelectItem value="dark">Last month</SelectItem>
                    <SelectItem value="system">Last year</SelectItem>
                  </SelectContent>
                </Select>
          </div>
          {/* chart */}
          <div className="mt-6 w-full h-[300px] border-2 border-secondary"></div>
        </section>
        <section className="flex gap-x-10 justify-between items-center mt-10 w-full h-[300px] border-2 border-primary">
          {/* top tokens */}
          <div className="w-[50%] border-2 border-orange-400 h-[300px]">
            <section className="flex justify-between items-center">
              <div className="flex justify-start items-center gap-x-4">
              <h3>Top Tokens</h3>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <div className=" flex items-center gap-1">
                    <Info size={14} className="text-muted-foreground" />
                  
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs">
                    We're actively developing the top tokens
                    <br /> for artist. Stay tuned!
                  </p>
                </TooltipContent>
              </Tooltip>
          </TooltipProvider>
              </div>
              <h2 className="hover:underline flex justify-stary items-center gap-x-2 text-sm text-primary">See all <ChevronRight size={15}/> </h2>
            </section>
            {/* token */}
            <div className="flex justify-between items-center mt-4 w-full border-2 border-blue-400 h-[70px]">
              <div className="flex justify-start items-center gap-x-3">
                  <div className="w-14 h-14 border-2 rounded-full"></div>
                  <div className="">
                    <h5>Stella</h5>
                    <h5 className="text-sm text-gray-600">STE</h5>
                  </div>
              </div>
              <div className=" p-2 border">
                vector chart
              </div>
              <div className="">
                <h5>$0.4531</h5>
                <h5 className="text-green-500">26,66%</h5>
              </div>
            </div>
          </div>
          <div className="w-[50%] border-2 border-orange-400 h-[300px]">
          <section className="flex justify-between items-center">
              <div className="flex justify-start items-center gap-x-4">
              <h3>Greed Index</h3>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <div className=" flex items-center gap-1">
                    <Info size={14} className="text-muted-foreground" />
                  
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs">
                    We're actively developing the top tokens
                    <br /> for artist. Stay tuned!
                  </p>
                </TooltipContent>
              </Tooltip>
          </TooltipProvider>
              </div>
              <h2 className="hover:underline flex justify-stary items-center gap-x-2 text-sm text-primary">See all <ChevronRight size={15}/> </h2>
            </section>
          </div>
        </section>

        {/* receent activiteis */}
        <section className="flex gap-x-10 justify-between  mt-10 w-full h-[300px] border-2 border-primary">
        <div className="w-full">
        <section className="flex justify-between items-center">
              <div className="flex justify-start items-center gap-x-4">
              <h3>Recent Activities</h3>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <div className=" flex items-center gap-1">
                    <Info size={14} className="text-muted-foreground" />
                  
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs">
                    We're actively working.
                    <br /> Stay tuned!
                  </p>
                </TooltipContent>
              </Tooltip>
          </TooltipProvider>
              </div>
              <h2 className="hover:underline flex justify-stary items-center gap-x-2 text-sm text-primary">See all <ChevronRight size={15}/> </h2>
            </section>
        </div>
        </section>
        {/* <Summary /> */}
        {/* <Actions /> */}
      </div>
    </main>
  );
}

function Summary() {
  return (
    <div className="mt-4 rounded-lg border border-border p-4">
      <h2 className="text-lg font-semibold">Summary</h2>
      <div className="flex gap-4">
        <PortfolioValue />
        <RecentActivity activities={activities} />
      </div>
    </div>
  );
}

function PortfolioValue() {
  return (
    <div className="mt-4 w-full rounded-lg bg-surfaceVariant p-4 shadow-sm">
      <h2 className="font-semibold">Total Value</h2>
      <p className="mt-2 text-xl font-bold text-primary">$0.00</p>
    </div>
  );
}

function RecentActivity({ activities }: { activities: Activity[] }) {
  return (
    <div className="mt-4 w-full rounded-lg bg-surfaceVariant p-4 shadow-sm">
      <h2 className="font-semibold">Recent Activity</h2>
      <ul className="mt-2 space-y-2">
        {activities.map((activity) => (
          <li key={activity.id} className="text-muted-foreground">
            <p>{activity.description}</p>
            <p className="text-xs text-secondary-foreground">{activity.time}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Actions() {
  return (
    <div className="mt-4 rounded-lg border border-border p-4">
      <h2 className="text-lg font-semibold">Quick Actions</h2>
      <div className="flex gap-4">
        <PresaleEUT />
        <ConnectSpotify />
      </div>
    </div>
  );
}

function PresaleEUT() {
  return (
    <div className="mt-4 w-full rounded-lg bg-surfaceVariant p-4 shadow-sm">
      <div className="mb-2 flex items-center gap-2">
        <RiTokenSwapFill />
        <h2 className="font-semibold">Presale</h2>
      </div>
      <Dialog>
        <DialogTrigger asChild>
          <Button size="sm">Buy EUT</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-xl">
          <Swap />
        </DialogContent>
      </Dialog>
    </div>
  );
}

function ConnectSpotify() {
  return (
    <div className="mt-4 w-full rounded-lg bg-surfaceVariant p-4 shadow-sm">
      <div className="mb-2 flex items-center gap-2">
        <FaSpotify />
        <h2 className="font-semibold">Connect Spotify</h2>
      </div>
      <Button size="sm">Connect</Button>
    </div>
  );
}
