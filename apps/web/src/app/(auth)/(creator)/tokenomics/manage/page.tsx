import Image from "next/image";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import React from "react";
import { Button } from "@/components/ui/button";

function Page() {
  return (
    <div className="m-auto h-[700px] w-full max-w-[1500px]">
      <div className="m-auto mt-8 flex w-[98%] flex-row flex-wrap justify-between">
        <h2 className="text-2xl font-semibold">Manage Tokens</h2>
        <HoverCard>
          <HoverCardTrigger className="cursor-pointer rounded-l-sm rounded-r-sm border-b-2 border-b-primary p-2 text-sm font-bold text-gray-500 hover:text-white">
            How it works?
          </HoverCardTrigger>
          <HoverCardContent className=" border-2 border-primary bg-background">
            Create, Claim and Customize your personal token.
          </HoverCardContent>
        </HoverCard>
      </div>
      <div className="m-auto mt-10 h-full w-[95%]">
        <section className="mt-10 flex h-auto flex-col-reverse justify-start gap-10 rounded-l-md rounded-r-md  border-b-2 border-b-gray-600 p-8 shadow-lg hover:border-b-primary lg:h-[400px] lg:flex-row lg:items-center lg:justify-center lg:gap-2 lg:p-0">
          <div className="flex h-full w-full flex-col justify-center  space-y-6 lg:w-[50%]">
            <div className="flex items-center justify-start gap-5">
              <h1 className="">Artist Name:</h1>
              <h1 className="text-2xl">Selena Gomez</h1>
            </div>
            <div className="flex items-center justify-start gap-5">
              <h2>Token Name:</h2> <span className="text-primary">ETP</span>
            </div>
            <div className="flex items-center justify-start gap-5">
              <h2>Token Symbol:</h2>
              <span className="h-8 w-8 rounded-full border-2 border-primary"></span>
            </div>
            <h2 className="text-2xl font-bold text-primary">Token Value</h2>
            <h2 className="text-2xl">0.0840 BTC</h2>
            <div className="flex flex-wrap items-center justify-start gap-5 min-[370px]:flex-nowrap">
              <Button className="w-40">Claim your Token</Button>
              <Button className="w-40">Create New Token</Button>
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
    </div>
  );
}

export default Page;
