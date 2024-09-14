import React from "react";
import { LiveLottie } from "@/components/Lotties";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useAccount } from "wagmi";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useToast } from "@/components/ui/use-toast";
import { BiError } from "react-icons/bi";
import { LuLoader2 } from "react-icons/lu";
import {
  getArtistTokenByArtistAddress,
  approveTokenForListing,
  listArtistToken,
} from "@/blockchain/token.interaction";
import type { BaseError, WriteContractErrorType } from "@wagmi/core";
import { QRCodeSVG } from "qrcode.react";
import { GrLaunch } from "react-icons/gr";
import { FaHandHoldingHeart } from "react-icons/fa";
import { Separator } from "@/components/ui/separator";

function TokenGoLive({ onTokenGoLive }: { onTokenGoLive: () => void }) {
  const { isConnected, address } = useAccount();
  const { openConnectModal, connectModalOpen } = useConnectModal();
  const [error, setError] = useState<WriteContractErrorType | null>(null);
  const [isFetchingToken, setIsFetchingToken] = useState(false);
  const [isApproving, setIsApproving] = useState(false);
  const [isListing, setIsListing] = useState(false);
  const { toast } = useToast();

  async function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setError(null);
    if (isConnected) {
      setIsFetchingToken(true);
      const token = await getArtistTokenByArtistAddress(
        address as `0x${string}`,
      );
      setIsFetchingToken(false);
      if (!token) {
        toast({
          title: "Token not found",
          description: "You need to create a token before listing it.",
        });
        return;
      }

      setIsApproving(true);
      const { error: approveError } = await approveTokenForListing(
        token.address,
      );
      setIsApproving(false);
      if (approveError) {
        setError(approveError);
        toast({
          title: "Approval Failed",
          description:
            (approveError as BaseError).shortMessage ||
            "An error occurred during approval.",
        });
        return;
      }

      setIsListing(true);
      const { error: listError } = await listArtistToken(token.address);
      setIsListing(false);
      if (listError) {
        setError(listError);
        toast({
          title: "Listing Failed",
          description:
            (listError as BaseError).shortMessage ||
            "An error occurred during listing.",
        });
        return;
      }

      onTokenGoLive();
    } else {
      openConnectModal?.();
    }
  }

  return (
    <div className="px-8 py-12">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-1">
          <h2 className="text-xl font-semibold tracking-[0.04em]">Go Live</h2>
          <div className="-mb-[2.5px]">
            <LiveLottie />
          </div>
        </div>
        <p className="text-sm text-[#D0D0D0]">
          List your token for trading, allowing fans to invest and support your
          music journey
        </p>
      </div>
      <div className="mt-8">
        {error && (
          <div className="mb-5 flex items-start rounded-md bg-orange-600/10 p-4 text-sm font-medium text-orange-600/60">
            <BiError className="mr-2 mt-0.5 h-4 w-4 shrink-0 text-orange-600/50" />
            {(error as BaseError).shortMessage || error.message}
          </div>
        )}
        <div className="flex flex-col gap-4 rounded-lg bg-white/[0.02] p-5">
          <div className="flex gap-2.5">
            <GrLaunch className="mt-1 h-4 w-4 shrink-0 text-primary" />
            <div className="flex w-full flex-col gap-1">
              <h3 className="text-sm font-medium">
                Activate First Round of Trading
              </h3>

              <p className="text-xs text-muted-foreground">
                Enable your token to become tradable on Euterpe, allowing fans
                to invest in your artist brand.
              </p>
            </div>
          </div>
          <Separator className="my-0 h-[2px]" />
          <div className="flex gap-2.5">
            <FaHandHoldingHeart className="h-4 w-4 shrink-0 text-primary" />
            <div className="flex w-full flex-col gap-1">
              <h3 className="text-sm font-medium">
                Fair and Transparent Distribution
              </h3>
              <p className="text-xs text-muted-foreground">
                Promote trustworthiness by making 90% of your token supply
                available for trading in the marketplace.
              </p>
            </div>
          </div>
        </div>
        <div className="mt-8 flex flex-col items-center gap-2">
          <QRCodeSVG
            className="rounded-xl border-[0.5px] bg-primary/5 p-3.5"
            value={`https://app.euterpe.finance/token/${""}`}
            size={180}
            bgColor="transparent"
            marginSize={0}
            imageSettings={{
              src: "https://app.euterpe.finance/logo/logo.png",
              x: undefined,
              y: undefined,
              height: 32,
              width: 32,
              opacity: 0.8,
              excavate: true,
            }}
          />
          <p className="text-xs text-muted-foreground">Add link to bio</p>
        </div>

        <Button
          type="button"
          size="lg"
          className="mt-8 w-full"
          disabled={isFetchingToken || isApproving || isListing}
          onClick={handleSubmit}
        >
          {isConnected ? (
            isFetchingToken ? (
              <LuLoader2 className="h-4 w-4 animate-spin" />
            ) : isApproving ? (
              <div className="inline-flex items-center gap-2">
                <LuLoader2 className="h-4 w-4 animate-spin" /> Approve In Your
                Wallet...
              </div>
            ) : isListing ? (
              <div className="inline-flex items-center gap-2">
                <LuLoader2 className="h-4 w-4 animate-spin" /> Going Live...
              </div>
            ) : (
              "Go Live"
            )
          ) : (
            "Connect Wallet"
          )}
        </Button>
      </div>
    </div>
  );
}

export default TokenGoLive;
