"use client";

import React from "react";
import { ConnectButton as OriginalConnectButton } from "@rainbow-me/rainbowkit";
import { Button } from "@/components/ui/button";
import { IoWalletOutline } from "react-icons/io5";
import { useSidebarStore } from "@/providers/store/sidebar.store";
import { useRouter } from "next/navigation";
import Image from "next/image";
import WalletIcon from "@/assets/icons/wallet.png";

export function ConnectButton({ userType }: { userType: "artist" | "fan" }) {
  const setModeInStore = useSidebarStore((state) => state.setMode);
  const router = useRouter();

  return (
    <OriginalConnectButton.Custom>
      {({ account, chain, openChainModal, openConnectModal, mounted }) => {
        const ready = mounted;
        const connected = ready && account && chain;

        return (
          <div
            className="relative flex w-full min-w-36 cursor-pointer justify-end"
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <Button
                    onClick={openConnectModal}
                    className="font-azeret w-full gap-2 rounded-md bg-[#B8FF5B] text-xs font-semibold"
                    size="lg"
                  >
                    <Image src={WalletIcon} alt="wallet" className="h-4 w-4" />
                    Connect wallet
                  </Button>
                );
              }

              if (chain.unsupported) {
                return (
                  <Button
                    onClick={openChainModal}
                    className="font-azeret w-full gap-2 rounded-md bg-[#B8FF5B] text-xs font-semibold"
                    size="lg"
                  >
                    <IoWalletOutline className="h-4 w-4" />
                    Wrong network
                  </Button>
                );
              }

              return (
                <Button
                  className="font-azeret w-full gap-2 rounded-md bg-[#B8FF5B] text-xs font-semibold"
                  size="lg"
                  onClick={() => {
                    setModeInStore(
                      userType === "artist" ? "creator" : "investor",
                    );
                    router.push(userType === "artist" ? "/dashboard" : "/home");
                  }}
                >
                  Enter
                </Button>
              );
            })()}
          </div>
        );
      }}
    </OriginalConnectButton.Custom>
  );
}
