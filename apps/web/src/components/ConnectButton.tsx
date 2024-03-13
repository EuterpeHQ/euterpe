"use client";

import React, { useEffect, useRef, useState } from "react";
import { ConnectButton as OriginalConnectButton } from "@rainbow-me/rainbowkit";
import { Button } from "@/components/ui/button";
import { IoWalletOutline } from "react-icons/io5";
import Link from "next/link";
import Transition from "@/lib/Transition";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useDisconnect } from "wagmi";

function ConnectButton({ align }: { align?: "left" | "right" }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const trigger = useRef<HTMLButtonElement>(null);
  const dropdown = useRef<HTMLDivElement>(null);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: { target: any }) => {
      if (!dropdown.current || !trigger.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = (event: KeyboardEvent) => {
      if (!dropdownOpen || event.key !== "Escape") return;
      setDropdownOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  const { disconnect } = useDisconnect();

  return (
    <OriginalConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        // const ready = mounted && authenticationStatus !== "loading";
        // const connected =
        //   ready &&
        //   account &&
        //   chain &&
        //   (!authenticationStatus || authenticationStatus === "authenticated");
        const ready = mounted;
        const connected = ready && account && chain;

        return (
          <div
            className="relative inline-flex min-w-36 cursor-pointer justify-end"
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
                    className="gap-3"
                    size="sm"
                  >
                    <IoWalletOutline className="h-4 w-4" />
                    Connect Wallet
                  </Button>
                );
              }

              if (chain.unsupported) {
                return (
                  <Button onClick={openChainModal} className="gap-3" size="sm">
                    <IoWalletOutline className="h-4 w-4" />
                    Wrong network
                  </Button>
                );
              }

              return (
                <div className="inline-flex items-center justify-center">
                  <Avatar
                    onClick={openAccountModal}
                    className="h-8 w-8 rounded-full"
                  >
                    <AvatarImage
                      className="h-full w-full"
                      src={`https://i.pravatar.cc/300`}
                    />
                    <AvatarFallback className="relative bg-black/5">
                      <svg
                        className="absolute left-1/2 h-full w-full -translate-x-1/2 text-black/20"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                    </AvatarFallback>
                  </Avatar>

                  <button
                    ref={trigger}
                    aria-haspopup="true"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    aria-expanded={dropdownOpen}
                  >
                    <div className="ml-2 flex items-center truncate rounded-md bg-card/65 p-1">
                      <span className="ml-2 truncate font-federant text-sm font-medium group-hover:text-slate-800 dark:text-slate-300 dark:group-hover:text-slate-200">
                        {account.displayName}
                      </span>
                      <svg
                        className="ml-1 h-2 w-2 shrink-0 fill-current text-muted-foreground"
                        viewBox="0 0 12 12"
                      >
                        <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                      </svg>
                    </div>
                  </button>
                </div>
              );
            })()}

            {/* @ts-expect-error */}
            <Transition
              className={`dark:bg-surface absolute top-full z-10 mt-1 min-w-44 origin-top-right overflow-hidden rounded border border-slate-200 bg-white py-1.5 shadow-lg dark:border-card/65 ${align === "right" ? "right-0" : "left-0"}`}
              show={dropdownOpen}
              enter="transition ease-out duration-200 transform"
              enterStart="opacity-0 -translate-y-2"
              enterEnd="opacity-100 translate-y-0"
              leave="transition ease-out duration-200"
              leaveStart="opacity-100"
              leaveEnd="opacity-0"
            >
              <div
                ref={dropdown}
                onFocus={() => setDropdownOpen(true)}
                onBlur={() => setDropdownOpen(false)}
              >
                <div className="mb-1 border-b border-slate-200 px-3 pb-2 pt-0.5 dark:border-slate-700">
                  <div className="font-federant font-medium text-slate-800 dark:text-slate-100">
                    {/* 12,531 ETP */}
                    {account?.displayBalance}
                  </div>
                  <div
                    onClick={() => {
                      // ISSUE: After opening the Switch Network Chain Modal, clicking outside the modal unexpectedly dismisses the dropdown.
                      // This hinders users who want to quickly interact with both the modal and dropdown options.
                      // EXPECTED BEHAVIOR: The dropdown in the background should persist even after the modal has been closed by clicking outside of it,
                      // allowing users to switch networks and then return to the dropdown if needed.
                      // setDropdownOpen(false);x
                      openChainModal();
                    }}
                    className="inline-flex cursor-pointer items-center gap-0.5 text-xs text-muted-foreground"
                  >
                    {chain?.hasIcon && (
                      <div
                        style={{
                          background: chain.iconBackground,
                          width: 12,
                          height: 12,
                          borderRadius: 999,
                          overflow: "hidden",
                          marginRight: 4,
                        }}
                      >
                        {chain.iconUrl && (
                          <img
                            alt={chain.name ?? "Chain icon"}
                            src={chain.iconUrl}
                            style={{ width: 12, height: 12 }}
                          />
                        )}
                      </div>
                    )}
                    {chain?.name}
                  </div>
                </div>
                <ul>
                  <li>
                    <Link
                      className="flex items-center px-3 py-1 text-sm font-medium text-white/80 hover:text-primary dark:hover:text-primary"
                      href="/profile/connect-wallet"
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                    >
                      Settings
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="flex items-center px-3 py-1 text-sm font-medium text-white/80 hover:text-primary dark:hover:text-primary"
                      href="#"
                      onClick={() => {
                        setDropdownOpen(!dropdownOpen);
                        disconnect();
                      }}
                    >
                      Disconnect Wallet
                    </Link>
                    <Link
                      className="flex items-center px-3 py-1 text-sm font-medium text-white/80 hover:text-primary dark:hover:text-primary"
                      href="#"
                      onClick={() => {
                        setDropdownOpen(!dropdownOpen);
                      }}
                    >
                      Logout
                    </Link>
                  </li>
                </ul>
              </div>
            </Transition>
          </div>
        );
      }}
    </OriginalConnectButton.Custom>
  );
}

export default ConnectButton;
