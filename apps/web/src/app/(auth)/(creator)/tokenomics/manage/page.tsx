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
import { abi } from "@/abis/ArtistTokenFactory";

function Page() {
  // state to handle form data
  const [formData, setFormData] = useState({
    name: "",
    symbol: "",
    initialSupply: "",
    artist: "",
    spotify: "",
  });
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted");
  };
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
              <Button className="w-40">Claim your Token</Button>
              <Dialog>
                <DialogTrigger className="">
                  <Button className="w-40">Create New Token</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create your Token</DialogTitle>
                    <DialogDescription>
                      <form className="my-8" onSubmit={handleSubmit}>
                        <LabelInputContainer className="mb-4">
                          <Label htmlFor="name">Token Name</Label>
                          <Input
                            id="text"
                            placeholder="Enter name of Token"
                            type="text"
                            required
                          />
                        </LabelInputContainer>
                        <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-x-2 md:space-y-0">
                          <LabelInputContainer>
                            <Label htmlFor="symbol">Token Symbol</Label>
                            <Input
                              id="symbol"
                              placeholder="ETP"
                              type="text"
                              required
                            />
                          </LabelInputContainer>
                          <LabelInputContainer>
                            <Label htmlFor="supply">Initial Supply</Label>
                            <Input
                              id="supply"
                              placeholder="20"
                              type="number"
                              required
                            />
                          </LabelInputContainer>
                        </div>
                        <LabelInputContainer className="mb-4">
                          <Label htmlFor="text">Spotify</Label>
                          <Input
                            id="type"
                            placeholder="Enter your Spotify name"
                            type="text"
                            required
                          />
                        </LabelInputContainer>
                        <button
                          className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                          type="submit"
                        >
                          Create
                          <BottomGradient />
                        </button>
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
