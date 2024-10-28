"use client";
import React, { useState, useEffect } from "react";
import ArtistToken from "@/partials/token/ArtistToken";
import { ArtistToken as ArtistTokenProps } from "@/entities";
import ArtistTokenSkeleton from "@/partials/token/ArtistTokenSkeleton";
import { getArtistTokenByAddress } from "@/blockchain/token.interaction";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTitle,
  DialogDescription,
  DialogContent,
} from "@/components/ui/dialog";
import TradeArtistToken from "@/partials/token/TradeArtistToken";
import { watchAsset } from "@/lib/web3";
import { useToast } from "@/components/ui/use-toast";

export default function Page({
  params,
}: {
  params: { address: `0x${string}` };
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [artistToken, setArtistToken] = useState<ArtistTokenProps | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    async function fetchArtistToken() {
      setIsLoading(true);
      const { data: token } = await getArtistTokenByAddress(params.address);
      setArtistToken(token);
      setIsLoading(false);
    }

    fetchArtistToken();
  }, []);

  function handleTrade() {
    if (!artistToken) {
      toast({
        title: "Token not found",
        description: "The token you are trying to trade does not exist.",
      });
      return;
    }
    setOpenDialog(true);
    watchAsset(artistToken);
  }
  return (
    <div className="max-w-9xl mx-auto flex h-full w-full flex-col px-5 pb-5">
      <div className="flex items-center justify-between py-6">
        <h2 className=" font-azeret text-2xl font-medium tracking-[-0.06rem]">
          Token
        </h2>
        <div className="flex w-full max-w-48 gap-3">
          <Button size="sm" className="w-full rounded-xl" onClick={handleTrade}>
            Buy
          </Button>
          <Button
            size="sm"
            className="w-full rounded-xl bg-destructive text-destructive-foreground hover:bg-destructive/15"
            onClick={handleTrade}
          >
            Sell
          </Button>
        </div>
      </div>

      {isLoading ? (
        <ArtistTokenSkeleton />
      ) : artistToken ? (
        <ArtistToken {...artistToken} />
      ) : (
        <div>Token not found</div>
      )}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogTitle className="sr-only">Trade Artist Token</DialogTitle>
        <DialogDescription className="sr-only">
          Trade Artist Token
        </DialogDescription>
        <DialogContent>
          {artistToken && <TradeArtistToken token={artistToken} />}
        </DialogContent>
      </Dialog>
    </div>
  );
}
