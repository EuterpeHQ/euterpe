"use client";

import { Input } from "@/components/ui/input";
import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { FaEthereum } from "react-icons/fa6";
import { CoinLottie } from "@/components/Lotties";
import { useAccount } from "wagmi";
import { useConnectModal } from "@rainbow-me/rainbowkit";

export default function Swap() {
  const { isConnected, chainId } = useAccount();
  const { openConnectModal } = useConnectModal();

  const handleBuy = () => {
    if (!isConnected) {
      console.log(isConnected);
      openConnectModal?.();
      return;
    }
  };
  return (
    <div className="mx-auto my-8 flex max-w-md flex-col items-center space-y-6 rounded-xl border border-card bg-transparent p-6 ">
      <div className="flex items-center justify-between self-stretch">
        <h2 className="text-lg font-semibold">Buy Tokens</h2>
        <SettingsIcon className="cursor-pointer text-muted-foreground" />
      </div>
      <div className="self-stretch">
        <div className="mb-4">
          <label className="block text-sm font-medium text-white/80">
            You pay
          </label>
          <div className="relative mt-1 rounded-md shadow-sm">
            <Input className="pl-7 pr-24" placeholder="0" type="number" />
            <div className="absolute inset-y-0 right-0 flex items-center">
              <Select>
                <SelectTrigger
                  id="currency"
                  className="border-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                >
                  <SelectValue placeholder="ETH" />
                  <FaEthereum className="mx-2 h-4 w-4 text-muted-foreground" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="eth">ETH</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <ReplaceIcon className="h-7 w-7 text-muted-foreground" />
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-white/80">
            You receive
          </label>
          <div className="relative mt-1 rounded-md shadow-sm">
            <Input className="pl-7 pr-24" placeholder="0" type="number" />
            <div className="absolute inset-y-0 right-0 flex items-center">
              <Select>
                <SelectTrigger
                  id="currency"
                  className="overflow-hidden border-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                >
                  <div className="relative flex items-center">
                    <SelectValue placeholder="ETP" />
                    <div className="absolute -right-10">
                      <CoinLottie />
                    </div>
                  </div>
                  <div className="mx-2 w-4" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="etp">ETP</SelectItem>
                  <SelectItem value="art">ART</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>
      <Button
        onClick={handleBuy}
        variant="outline"
        size="sm"
        className="w-full py-2 text-white"
      >
        {isConnected ? "Swap" : "Connect Wallet"}
      </Button>
      <div className="text-xs text-muted-foreground">
        0.01% of fees are included in the protocol
      </div>
    </div>
  );
}

function ReplaceIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14 4c0-1.1.9-2 2-2" />
      <path d="M20 2c1.1 0 2 .9 2 2" />
      <path d="M22 8c0 1.1-.9 2-2 2" />
      <path d="M16 10c-1.1 0-2-.9-2-2" />
      <path d="m3 7 3 3 3-3" />
      <path d="M6 10V5c0-1.7 1.3-3 3-3h1" />
      <rect width="8" height="8" x="2" y="14" rx="2" />
    </svg>
  );
}

function SettingsIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function UnlinkIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m18.84 12.25 1.72-1.71h-.02a5.004 5.004 0 0 0-.12-7.07 5.006 5.006 0 0 0-6.95 0l-1.72 1.71" />
      <path d="m5.17 11.75-1.71 1.71a5.004 5.004 0 0 0 .12 7.07 5.006 5.006 0 0 0 6.95 0l1.71-1.71" />
      <line x1="8" x2="8" y1="2" y2="5" />
      <line x1="2" x2="5" y1="8" y2="8" />
      <line x1="16" x2="16" y1="19" y2="22" />
      <line x1="19" x2="22" y1="16" y2="16" />
    </svg>
  );
}
