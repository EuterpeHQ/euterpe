import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { HeroLottie, CoinLottie } from "./Lotties";
import Link from "next/link";
import { HiOutlineRocketLaunch } from "react-icons/hi2";

function Hero() {
  return (
    <div className="container flex flex-col-reverse justify-center gap-10 md:flex-row md:px-10 lg:gap-12 lg:px-24">
      <div className="">
        <div className="flex h-full w-full max-w-md flex-col gap-6">
          <h1 className="text-3xl font-semibold md:text-4xl lg:text-5xl">
            <span className="leading-snug text-primary underline underline-offset-4">
              Invest
            </span>{" "}
            In Your Favourite{" "}
            <span className="text-primary underline underline-offset-4">
              Artists:
            </span>{" "}
            Earn{" "}
            <span className="leading-snug text-primary underline underline-offset-4">
              Royalties
            </span>{" "}
            And More.
          </h1>
          <p className="text-lg font-normal lg:text-lg">
            Euterpe connects you with rising musicians, allowing you to support
            their journey and share in their achievements.
          </p>
          <Button className="w-full gap-4 md:w-fit" asChild>
            <Link href="/app" target="_blank" rel="noopener noreferrer">
              <HiOutlineRocketLaunch className="h-4 w-4" />
              Launch App
            </Link>
          </Button>
          <div className="flex w-full gap-6 lg:gap-12">
            <div className="text-lg font-light">
              <strong className="font-federant">20,000,000 +</strong>
              <br />
              Market Cap
            </div>
            <div className="text-lg font-light">
              <strong className="font-federant">334,000 +</strong>
              <br />
              NFTs
            </div>
            <div className="text-lg font-light">
              <strong className="font-federant">1,000,000 +</strong>
              <br />
              Artists
            </div>
          </div>
        </div>
      </div>
      <div className="">
        <Card className="w-full overflow-hidden rounded-3xl bg-black/15 md:w-[275px] lg:w-[420px]">
          <CardContent className="h-80 lg:h-96">
            <HeroLottie />
          </CardContent>
          <CardHeader className="border-t-8 border-background p-4">
            <CardTitle className="relative -ml-[18px] inline-flex h-6 overflow-hidden font-federant">
              <div className="relative bottom-1/2">
                <CoinLottie />
              </div>
              <div className="z-10 -ml-2 flex items-center">$0.03</div>
            </CardTitle>
            <CardDescription>Euterpe (ETP)</CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}

export default Hero;
