"use client";
import React, { useState, useEffect } from "react";
import { ArtistToken as ArtistTokenProps } from "@/entities";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import TokenGoLive from "@/partials/token/TokenGoLive";
import { getTokenStatus } from "@/blockchain/token.interaction";

export default function TokenProfileCard(props: ArtistTokenProps) {
  const [isLive, setIsLive] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    async function fetchTokenStatus() {
      try {
        setIsLoading(true);
        const status = await getTokenStatus(props.address);
        console.log("status", status);
        setIsLive(status);
      } catch (error) {
        console.error("Error fetching token status:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchTokenStatus();
  }, [props.address]);

  const handleSwitchChange = (value: boolean) => {
    if (isLive) {
      return;
    }
    if (value) {
      setOpenDialog(true);
    }
  };

  const handleTokenGoLiveSuccess = () => {
    setOpenDialog(false);
    setIsLive(true);
  };

  return (
    <div className="flex flex-col rounded-[16px] border-[0.5px] bg-white/[0.02] px-4 py-6">
      <div className="flex flex-row items-start justify-between">
        <div className="flex flex-col gap-3">
          <div className="flex flex-row items-center gap-2">
            <Avatar className="bg-[#FFAE65]">
              <AvatarImage
                src="https://api.dicebear.com/9.x/notionists/svg?seed=Felix"
                alt="avatar"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-2">
              <h2 className="font-bold leading-none">{props.name}</h2>
              <h2 className="text-xs font-medium uppercase leading-none text-muted-foreground">
                {props.symbol}
              </h2>
            </div>
          </div>
          <p className="w-fit bg-primary/10 px-2 py-1.5 text-xs text-primary">
            7.156k Holders
          </p>
        </div>
        <div className="flex gap-2 text-xs font-medium">
          <Switch
            className="disabled:opacity-100"
            checked={isLive}
            onCheckedChange={handleSwitchChange}
            disabled={isLive}
          />
          <p>Live</p>
        </div>
      </div>

      <div className="mt-4 flex gap-[58px]">
        <div className="flex flex-col gap-1">
          <p className="font-azeret text-xs tracking-[-0.04em] text-muted-foreground">
            Price
          </p>
          <p className="text-xs font-medium">$0.003720</p>
        </div>
        <div className="flex flex-col gap-1">
          <p className="font-azeret text-[0.688rem] tracking-[-0.04em] text-muted-foreground">
            Market Cap
          </p>
          <p className="text-xs font-medium">$126k</p>
        </div>
      </div>
      <div className="mt-5 flex gap-4">
        <div className="flex h-12 items-center bg-white/[0.02] px-9">
          <div>
            <p className="text-center font-azeret text-[0.688rem] text-[#747474]">
              5m
            </p>
            <p className="text-center text-xs font-medium text-[#36FF87]">
              +3.90%
            </p>
          </div>
        </div>
        <div className="flex h-12 items-center bg-white/[0.02] px-9">
          <div>
            <p className="text-center font-azeret text-[0.688rem] text-[#747474]">
              1H
            </p>
            <p className="text-center text-xs font-medium text-[#FF2C6B]">
              -1.64%
            </p>
          </div>
        </div>
        <div className="flex h-12 items-center bg-white/[0.02] px-9">
          <div>
            <p className="text-center font-azeret text-[0.688rem] text-[#747474]">
              24H
            </p>
            <p className="text-center text-xs font-medium text-[#36FF87]">
              +12.81%
            </p>
          </div>
        </div>
      </div>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <TokenGoLive onTokenGoLive={handleTokenGoLiveSuccess} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
