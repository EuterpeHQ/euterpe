import React from "react";
import NotificationBanner from "@/partials/NotificationBanner";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Swap from "@/partials/exchange/Swap";
import { RiTokenSwapFill } from "react-icons/ri";
import { FaSpotify } from "react-icons/fa6";

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
        <NotificationBanner />
        <Summary />
        <Actions />
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