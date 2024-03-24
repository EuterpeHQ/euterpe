"use client";

import { useEffect, useState } from "react";
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
import {
  useAccount,
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import { getAccount } from "@wagmi/core";
import { config } from "@/providers/web3";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { abi as exchangeAbi } from "@/abis/Exchange";
import { LuExternalLink } from "react-icons/lu";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { formatEther, parseEther } from "viem";
import { useToast } from "@/components/ui/use-toast";
import { CgSpinner } from "react-icons/cg";

export default function Swap() {
  const { isConnected, chainId } = useAccount();
  const { openConnectModal } = useConnectModal();
  const { toast } = useToast();

  const [baseTokenprice, setBaseTokenPrice] = useState(0);
  const [hasViewedCompletedTransaction, setHasViewedCompletedTransaction] =
    useState(false);
  const [tokenAmounts, setTokenAmounts] = useState({
    baseToken: 0,
    quoteToken: 0,
  });
  type tokenType = "baseToken" | "quoteToken";

  const wagmiContractConfig = {
    address: process.env
      .NEXT_PUBLIC_EXCHANGE_SMART_CONTRACT_ADDRESS as `0x${string}`,
    abi: exchangeAbi,
  };

  const {
    data: price,
    isSuccess,
    error: tokenPriceError,
  } = useReadContract({
    ...wagmiContractConfig,
    functionName: "tokenPrice",
  });
  useEffect(() => {
    if (isSuccess) {
      setBaseTokenPrice(parseFloat(formatEther(price)));
    }
  }, [isSuccess]);

  const handleTokenAmountChange = (tokenType: tokenType, amount: string) => {
    setTokenAmounts((prevAmounts) => {
      let newAmounts = { ...prevAmounts };

      if (tokenType === "baseToken") {
        const baseAmount = parseFloat(amount);
        const quoteAmount = baseAmount * baseTokenprice;
        newAmounts = {
          baseToken: baseAmount,
          quoteToken: isNaN(quoteAmount) ? 0 : quoteAmount,
        };
      } else if (tokenType === "quoteToken") {
        const quoteAmount = parseFloat(amount);
        const baseAmount =
          baseTokenprice > 0 ? quoteAmount / baseTokenprice : 0;
        newAmounts = {
          baseToken: isNaN(baseAmount) ? 0 : baseAmount,
          quoteToken: quoteAmount,
        };
      }

      return newAmounts;
    });
  };

  const {
    data: hash,
    error: buyError,
    isPending,
    writeContract,
  } = useWriteContract();

  const handleBuy = () => {
    setHasViewedCompletedTransaction(false);
    if (isConnected) {
      const { connector } = getAccount(config);
      writeContract({
        ...wagmiContractConfig,
        functionName: "buy",
        connector,
        value: parseEther(tokenAmounts.quoteToken.toString()),
      });
    } else {
      openConnectModal?.();
    }
  };

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  useEffect(() => {
    if (isConfirming) {
      toast({
        title: "Transaction Pending",
        description:
          "Your transaction has been submitted. Waiting for confirmation...",
      });
    }

    if (isConfirmed) {
      toast({
        title: "Transaction Confirmed",
        description: "Your transaction has been successfully confirmed.",
      });
    }

    if (buyError) {
      toast({
        title: "Transaction Error",
        description: "An error occurred during the transaction.",
      });
    }
  }, [isConfirming, isConfirmed, buyError]);

  return (
    <div className="mx-auto my-8 flex w-full flex-col items-center space-y-6 rounded-xl border border-card bg-transparent p-6 ">
      <div className="flex items-center justify-between self-stretch">
        <h2 className="text-lg font-semibold">Buy Tokens</h2>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              {" "}
              <Link
                href="https://sepolia.arbiscan.io/address/0x038F3700204EF5081b4cbEF9fF212Bfe46217966"
                target="_blank"
                rel="noopener noreferrer"
              >
                <LuExternalLink className="cursor-pointer text-muted-foreground" />
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>View on scan</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className="self-stretch">
        <div className="mb-4">
          {buyError && (
            <div className="mb-2 text-red-500">{buyError.message}</div>
          )}
          <label className="block text-sm font-medium text-white/80">
            You pay
          </label>
          <div className="relative mt-1 rounded-md shadow-sm">
            <Input
              className="pl-7 pr-24"
              placeholder="0"
              type="number"
              value={tokenAmounts.quoteToken}
              onChange={(e) =>
                handleTokenAmountChange("quoteToken", e.target.value)
              }
            />
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
            <Input
              className="pl-7 pr-24"
              placeholder="0"
              type="number"
              value={tokenAmounts.baseToken}
              onChange={(e) =>
                handleTokenAmountChange("baseToken", e.target.value)
              }
            />
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
        onClick={
          !hasViewedCompletedTransaction && isConfirmed
            ? () => {
                window.open(
                  `https://sepolia.arbiscan.io/tx/${hash}`,
                  "_blank",
                  "noopener,noreferrer",
                );
                setHasViewedCompletedTransaction(true);
              }
            : handleBuy
        }
        variant="outline"
        size="sm"
        className="w-full py-2 text-white"
        disabled={isPending || isConfirming}
      >
        {isConnected ? (
          isPending ? (
            <div className="inline-flex items-center gap-4">
              <CgSpinner className="h-4 w-4 animate-spin" /> Confirm In Your
              Wallet...
            </div>
          ) : isConfirming ? (
            <div className="inline-flex items-center gap-4">
              <CgSpinner className="h-4 w-4 animate-spin" /> Submitting...
            </div>
          ) : !hasViewedCompletedTransaction && isConfirmed ? (
            <div className="inline-flex items-center gap-4">
              View Transaction
            </div>
          ) : (
            "Buy"
          )
        ) : (
          "Connect Wallet"
        )}
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
