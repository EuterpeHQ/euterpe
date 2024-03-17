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
    <div className="h-[700px] w-full ">
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
        <section className="mt-10 flex h-[400px] items-center justify-center  gap-2 rounded-l-md rounded-r-md border-b-2 border-b-gray-600 shadow-lg hover:border-b-primary">
          <div className="flex h-full w-[50%] flex-col  justify-center space-y-6 border-b-2 ">
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
            <div className="flex items-center justify-start gap-5">
              <Button className="w-40">Claim your Token</Button>
              <Button className="w-40">Create New Token</Button>
            </div>
          </div>
          <div className="flex h-80 w-[30%] items-center justify-center rounded-lg border-2 border-background shadow-lg shadow-primary hover:shadow-slate-300">
            <Image
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
