import React from "react";
import { CoinLottie } from "../../components/Lotties";
import Spacer from "@/components/ui/spacer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { GrMoney } from "react-icons/gr";
import { randomInt } from "crypto";
import Balancer from "react-wrap-balancer";

function Collection({ index }: { index: number }) {
  return (
    <div className="w-full max-w-sm p-4 md:max-w-xs lg:max-w-sm">
      <div className="h-full overflow-hidden rounded-xl bg-card p-6">
        <div className="relative mb-6 flex aspect-square w-full items-center justify-center overflow-hidden rounded-xl">
          <img
            src="https://www.morebranches.com/wp-content/uploads/2023/10/IMG_0850-scaled.jpg"
            className="h-full w-full cursor-pointer rounded-xl object-cover object-bottom transition duration-200 hover:scale-105 hover:opacity-80"
            alt=""
            aria-hidden="true"
          />
        </div>
        <div className="mb-3 text-white">
          <h3 className="text-lg">Ensemble #{29 + index}</h3>
        </div>
        <div className="mb-4 text-muted-foreground">
          <p>
            A 5% chance to earn 1% of every 1000 streams on our{" "}
            <span className="italic">Pan African Rockstar</span> Album
          </p>
        </div>
        <div className="mb-4 flex justify-between">
          <div className="relative flex items-center text-primary">
            <div className="absolute -left-4">
              <CoinLottie />
            </div>
            <div className="w-5"></div>
            <p className="font-federant">0.041 ETP</p>
          </div>
          <div className="flex items-center text-muted-foreground">
            <svg
              className="mr-2"
              width="17"
              height="17"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.305 2.007a6.667 6.667 0 1 0 0 13.334 6.667 6.667 0 0 0 0-13.334Zm2.667 7.334H8.305a.667.667 0 0 1-.667-.667V6.007a.667.667 0 0 1 1.334 0v2h2a.667.667 0 0 1 0 1.334Z"
                fill="#8BACD9"
              />
            </svg>
            <p>{index * randomInt(1, 10)} days left</p>
          </div>
        </div>
        <div className="mb-4 h-px bg-primary/20" />
        <div className="flex items-center">
          <img
            className="h-8 w-8 rounded-full"
            src="https://github.com/mwororokevin/nft-preview-card-component/blob/master/images/image-avatar.png?raw=true"
            alt=""
          />
          <div className="ml-4 text-muted-foreground">
            <span>Created by</span>
            <span className="cursor-pointer whitespace-nowrap text-white hover:text-primary">
              {" "}
              Lady Donli
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function Harmonies() {
  return (
    <section className="">
      <div className="container mx-auto flex items-center justify-between px-7 md:px-24">
        <div className="flex flex-col gap-2">
          <h2 className="text-3xl font-semibold md:max-w-sm lg:max-w-md">
            Invest In Secure and Decentralized{" "}
            <span className="text-primary underline underline-offset-4">
              Harmonies
            </span>
          </h2>
          <p className="text-sm md:max-w-sm lg:max-w-md">
            <Balancer>
              Harmonies house a collection of one or more NFTs that legally bind
              an investor to certain rewards.
            </Balancer>
          </p>
        </div>
        <Button
          className="hidden gap-4 md:inline-flex"
          variant="outline"
          asChild
        >
          <Link href="/login">
            <GrMoney className="h-[13px] w-[13px]" />
            See More
          </Link>
        </Button>
      </div>
      <Spacer size={40} />
      <div className="container -m-4 mx-auto flex flex-wrap justify-center px-5">
        {[...Array(3)].map((_, index) => (
          <Collection key={index} index={index + 1} />
        ))}
      </div>
      <div className="container inline-flex pt-6 md:hidden">
        <Button className="w-full gap-4" variant="outline" asChild>
          <Link href="/login">
            <GrMoney className="h-[13px] w-[13px]" />
            See More
          </Link>
        </Button>
      </div>
    </section>
  );
}

export default Harmonies;
