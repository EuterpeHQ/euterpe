"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { BiError } from "react-icons/bi";
import { LuLoader2 } from "react-icons/lu";
import { useAccount } from "wagmi";
import { useToast } from "@/components/ui/use-toast";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { buyArtistToken } from "@/blockchain/token.interaction";
import type { BaseError, WriteContractErrorType } from "@wagmi/core";
import type { ArtistToken } from "@/entities";

function TradeArtistToken({ token }: { token: ArtistToken }) {
  const { isConnected } = useAccount();
  const { openConnectModal, connectModalOpen } = useConnectModal();
  const { toast } = useToast();
  const [baseTokenprice, setBaseTokenPrice] = useState(0.0001);
  const [tokenAmounts, setTokenAmounts] = useState<{
    baseToken: number | undefined;
    quoteToken: number | undefined;
  }>({
    baseToken: 0,
    quoteToken: 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [error, setError] = useState<WriteContractErrorType | null>(null);
  const [transactionHash, setTransactionHash] = useState<string | null>(null);
  type tokenType = "baseToken" | "quoteToken";

  const handleChange = (tokenType: tokenType, amount: string) => {
    console.log({ amount });
    setTokenAmounts((prevAmounts) => {
      if (amount === "") {
        return {
          baseToken: undefined,
          quoteToken: undefined,
        };
      }
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

  const handleTrade = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    if (
      tokenAmounts.baseToken === undefined ||
      tokenAmounts.quoteToken === undefined
    ) {
      return;
    }
    if (isConnected) {
      setIsLoading(true);
      setIsConfirmed(false);
      const { data, error } = await buyArtistToken(
        token.address,
        tokenAmounts.quoteToken.toString(),
      );
      setIsLoading(false);
      if (error) {
        setError(error);
        toast({
          title: "Trade Failed",
          description:
            (error as BaseError).shortMessage ||
            "An error occurred during the trade.",
        });
      } else {
        setTransactionHash(data);
        setIsConfirmed(true);
        toast({
          title: "Trade Successful",
          description: "The trade was successful.",
        });
      }
    } else {
      openConnectModal?.();
    }
  };

  return (
    <div className="px-8 py-12">
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-semibold tracking-[0.04em]">
          Trade Your Tokens
        </h2>
        <p className="text-sm text-[#D0D0D0]">
          Buy tokens from the marketplace to support your favorite artists.
        </p>
      </div>
      <form className="mt-8" onSubmit={handleTrade}>
        {error && (
          <div className="mb-5 flex max-h-20 items-start overflow-y-scroll rounded-md bg-orange-600/10 p-4 text-sm font-medium text-orange-600/60 [overflow-wrap:anywhere]">
            <BiError className="mr-2 mt-0.5 h-4 w-4 shrink-0 text-orange-600/50" />
            {(error as BaseError).shortMessage || error.message}
          </div>
        )}
        <div className="flex flex-col gap-5">
          <div className="flex w-full flex-col gap-2.5">
            <Label htmlFor="quoteToken">You Pay (ETH)</Label>
            <Input
              id="quoteToken"
              name="quoteToken"
              placeholder="Enter amount in ETH"
              type="number"
              value={tokenAmounts.quoteToken}
              onChange={(e) => handleChange("quoteToken", e.target.value)}
              required
            />
          </div>
          <div className="flex w-full flex-col gap-2.5">
            <Label htmlFor="baseToken">You Receive ({token.symbol})</Label>
            <Input
              id="baseToken"
              name="baseToken"
              placeholder="Estimated amount"
              type="number"
              value={tokenAmounts.baseToken}
              onChange={(e) => handleChange("baseToken", e.target.value)}
            />
          </div>
        </div>

        {isConfirmed && transactionHash ? (
          <Button
            type="button"
            size="lg"
            className="mt-8 w-full"
            onClick={() =>
              window.open(
                `https://sepolia.arbiscan.io/tx/${transactionHash}`,
                "_blank",
              )
            }
          >
            View Transaction
          </Button>
        ) : (
          <Button
            type="submit"
            size="lg"
            className="mt-8 w-full"
            disabled={isLoading}
          >
            {isConnected ? (
              isLoading ? (
                <div className="inline-flex items-center gap-2">
                  <LuLoader2 className="h-4 w-4 animate-spin" /> Trade In
                  Progress...
                </div>
              ) : (
                "Buy Tokens"
              )
            ) : (
              "Connect Wallet"
            )}
          </Button>
        )}
      </form>
    </div>
  );
}

export default TradeArtistToken;
