"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import LineChart from "@/components/charts/LineChart";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { config } from "@/providers/web3";
import { abi as artistTokenFactoryAbi } from "@/abis/ArtistTokenFactory";
import {
  useAccount,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import { getAccount } from "@wagmi/core";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useToast } from "@/components/ui/use-toast";
import { CgSpinner } from "react-icons/cg";

function Page() {
  const [formData, setFormData] = useState({
    name: "",
    symbol: "",
    supply: "",
    artist: "",
    spotify: "",
  });
  const [hasViewedCompletedTransaction, setHasViewedCompletedTransaction] =
    useState(false);
  const [opendialog, setOpendialog] = useState(false);

  const { isConnected } = useAccount();
  const { openConnectModal, connectModalOpen } = useConnectModal();
  const { toast } = useToast();

  // const handleDialog = (value: React.SetStateAction<boolean>) => {
  //   if (connectModalOpen) {
  //     setOpendialog(true);
  //   } else {
  //     setOpendialog(value);
  //   }
  // };
  useEffect(() => {
    if (connectModalOpen) {
      setOpendialog(false);
    }
  }, [connectModalOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const wagmiContractConfig = {
    address: process.env
      .NEXT_PUBLIC_ARTIST_TOKEN_SMART_CONTRACT_ADDRESS as `0x${string}`,
    abi: artistTokenFactoryAbi,
  };
  const {
    data: hash,
    error: buyError,
    isPending,
    writeContract,
  } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isConnected) {
      if (!hasViewedCompletedTransaction && isConfirmed) {
        window.open(
          `https://sepolia.arbiscan.io/tx/${hash}`,
          "_blank",
          "noopener,noreferrer",
        );
        setHasViewedCompletedTransaction(true);
      } else {
        const { connector } = getAccount(config);
        writeContract?.({
          ...wagmiContractConfig,
          functionName: "createToken",
          connector,
          args: [
            formData.name,
            formData.symbol,
            BigInt(formData.supply),
            formData.artist,
            formData.spotify,
          ],
        });
      }
    } else {
      openConnectModal?.();
    }
  };

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

  useEffect(() => {
    if (isConfirmed && !opendialog) {
      setFormData({
        name: "",
        symbol: "",
        supply: "",
        artist: "",
        spotify: "",
      });
    }
  }, [opendialog, isConfirmed]);
  return (
    <main className="m-auto mb-6 w-full max-w-[1500px]">
      <div className="m-auto mt-8 flex w-[98%] flex-row flex-wrap justify-between">
        <h2 className="text-2xl font-semibold">Manage Tokens</h2>
        <HoverCard>
          <HoverCardTrigger className="cursor-pointer rounded-l-sm rounded-r-sm border-b-2 border-b-primary p-2 text-sm font-bold text-gray-500 hover:text-white">
            How it works?
          </HoverCardTrigger>
          <HoverCardContent className=" border-2 border-primary bg-background">
            Create, Claim and Customize your personal token.
            <br /> You can only claim your token once authenticated.
          </HoverCardContent>
        </HoverCard>
      </div>
      <div className="m-auto mt-10 w-[95%]">
        <section className="mt-10 flex h-auto flex-col-reverse justify-start gap-10 rounded-l-md rounded-r-md  border-b-2 border-b-gray-600 p-8 shadow-lg hover:border-b-primary lg:h-[400px] lg:flex-row lg:items-center lg:justify-center lg:gap-2 lg:p-0">
          <div className="flex h-full w-full flex-col justify-center  space-y-6 lg:w-[50%]">
            <div className="flex items-center justify-start gap-5">
              <h1 className="">Artist Name:</h1>
              <h1 className="text-2xl">Selena Gomez</h1>
            </div>
            <div className="flex items-center justify-start gap-5">
              <h2>Token Name:</h2>{" "}
              <span className="text-primary">ETP Token</span>
            </div>
            <div className="flex items-center justify-start gap-5">
              <h2>Token Symbol:</h2>
              <Avatar>
                <AvatarImage src="" />
                <AvatarFallback className="bg-gray-700">ETP</AvatarFallback>
              </Avatar>
            </div>
            <h2 className="text-2xl font-bold text-primary">Token Value</h2>
            <h2 className="text-2xl">0.0840 ETP</h2>
            <div className="flex flex-wrap items-center justify-start gap-5 min-[370px]:flex-nowrap">
              {/* <Button className="w-40">Claim your Token</Button> */}
              <Dialog open={opendialog} onOpenChange={setOpendialog}>
                <DialogTrigger className="">
                  <Button className="w-40">Create New Token</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create your Token</DialogTitle>
                    <DialogDescription>
                      <form className="my-8" onSubmit={handleSubmit}>
                        <div></div>
                        {buyError && (
                          <div className="mx-auto mb-4 h-32 max-w-md overflow-y-scroll break-words rounded-lg bg-card p-4 text-red-500">
                            {buyError.message}
                          </div>
                        )}
                        <LabelInputContainer className="mb-4">
                          <Label htmlFor="name">Token Name</Label>
                          <Input
                            id="name"
                            name="name"
                            placeholder="Enter name of Token"
                            type="text"
                            value={formData.name}
                            onChange={handleChange}
                            required
                          />
                        </LabelInputContainer>
                        <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-x-2 md:space-y-0">
                          <LabelInputContainer>
                            <Label htmlFor="symbol">Token Symbol</Label>
                            <Input
                              id="symbol"
                              name="symbol"
                              placeholder="ART"
                              type="text"
                              value={formData.symbol}
                              onChange={handleChange}
                              required
                            />
                          </LabelInputContainer>
                          <LabelInputContainer>
                            <Label htmlFor="supply">Initial Supply</Label>
                            <Input
                              id="supply"
                              name="supply"
                              placeholder="21000000"
                              type="number"
                              value={formData.supply}
                              onChange={handleChange}
                              required
                            />
                          </LabelInputContainer>
                        </div>
                        <LabelInputContainer className="mb-4">
                          <Label htmlFor="text">Spotify Link</Label>
                          <Input
                            id="spotify"
                            name="spotify"
                            placeholder="Enter your Spotify link"
                            type="text"
                            value={formData.spotify}
                            onChange={handleChange}
                            required
                          />
                        </LabelInputContainer>
                        <Button
                          type="submit"
                          variant="outline"
                          size="sm"
                          className="w-full py-2 text-white"
                          disabled={isPending || isConfirming}
                        >
                          {isConnected ? (
                            isPending ? (
                              <div className="inline-flex items-center gap-4">
                                <CgSpinner className="h-4 w-4 animate-spin" />{" "}
                                Confirm In Your Wallet...
                              </div>
                            ) : isConfirming ? (
                              <div className="inline-flex items-center gap-4">
                                <CgSpinner className="h-4 w-4 animate-spin" />{" "}
                                Submitting...
                              </div>
                            ) : !hasViewedCompletedTransaction &&
                              isConfirmed ? (
                              <div className="inline-flex items-center gap-4">
                                View Transaction
                              </div>
                            ) : (
                              "Create Token"
                            )
                          ) : (
                            "Connect Wallet"
                          )}
                          <BottomGradient />
                        </Button>
                        {/* <button
                          className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                          type="submit"
                        >
                          Create
                          <BottomGradient />
                        </button> */}
                        <div className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />
                      </form>
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          <div className="flex h-auto w-full items-center justify-center rounded-lg border-2 border-background shadow-lg shadow-primary hover:shadow-slate-300 md:w-[50%] lg:h-80 lg:w-[30%]">
            <Image
              className="h-40 w-40 lg:h-auto lg:w-60"
              src="/images/profile-nft.png"
              alt="profile"
              width={250}
              height={250}
            />
          </div>
        </section>
      </div>
      <div className="m-auto mt-16 flex w-[98%] flex-row flex-wrap justify-between">
        <div className="m-auto mt-8 flex w-[98%] flex-wrap items-center justify-between gap-y-6 text-white  lg:gap-y-0 xl:max-w-7xl">
          <HoverCard>
            <HoverCardTrigger className="cursor-pointer rounded-l-sm rounded-r-sm border-b-2 border-primary p-2 text-xl font-bold">
              Statistics
            </HoverCardTrigger>
            <HoverCardContent className=" border-2 border-primary bg-background">
              This is your statistics and influence in the music industry.
            </HoverCardContent>
          </HoverCard>
          <Link href="/tokenomics/performance/">
            <Button>View More</Button>
          </Link>
        </div>
        <LineChart />
      </div>
    </main>
  );
}
const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};
const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
};

export default Page;
