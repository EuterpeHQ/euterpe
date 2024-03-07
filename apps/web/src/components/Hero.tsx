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
    <div className="container flex flex-col-reverse justify-center gap-10 lg:gap-12 md:flex-row md:px-10 lg:px-24">
      <div className="">
        <div className="w-full h-full flex flex-col gap-6 max-w-md">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold">
            <span className="text-primary underline underline-offset-4 leading-snug">
              Invest
            </span>{" "}
            In Your Favourite{" "}
            <span className="text-primary underline underline-offset-4">
              Artists:
            </span>{" "}
            Earn{" "}
            <span className="text-primary underline underline-offset-4 leading-snug">
              Royalties
            </span>{" "}
            And More.
          </h1>
          <p className="text-lg font-normal lg:text-lg">
            Euterpe connects you with rising musicians, allowing you to support
            their journey and share in their achievements.
          </p>
          <Button className="w-full md:w-fit gap-4" asChild>
            <Link href="/app" target="_blank" rel="noopener noreferrer">
              <HiOutlineRocketLaunch className="w-4 h-4" />
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
        <Card className="w-full bg-black/15 rounded-3xl overflow-hidden md:w-[275px] lg:w-[420px]">
          <CardContent className="h-80 lg:h-96">
            <HeroLottie />
          </CardContent>
          <CardHeader className="border-t-8 border-background p-4">
            <CardTitle className="relative h-6 inline-flex font-federant -ml-[18px] overflow-hidden">
              <div className="relative bottom-1/2">
                <CoinLottie />
              </div>
              <div className="flex items-center z-10 -ml-2">$0.03</div>
            </CardTitle>
            <CardDescription>Euterpe (ETP)</CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}

export default Hero;
