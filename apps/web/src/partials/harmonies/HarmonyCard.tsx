import React from "react";
import Image from "next/image";
import { CoinLottie } from "@/components/Lotties";
import HarmonyImage from "@/assets/images/lady-donli.jpeg";

function HarmonyCard() {
  return (
    <div className="w-full max-w-sm p-2 md:max-w-xs  lg:max-w-[350px]">
      <div className="h-full overflow-hidden rounded-xl bg-card p-6">
        <div className="relative mb-6 flex aspect-square w-full items-center justify-center overflow-hidden rounded-xl">
          <Image
            src={HarmonyImage}
            className="h-full w-full cursor-pointer rounded-xl object-cover object-bottom transition duration-200 hover:scale-105 hover:opacity-80"
            alt=""
            aria-hidden="true"
            fill
            placeholder="blur"
            quality={100}
          />
        </div>
        <div className="mb-3 text-white">
          <h3 className="text-lg">Ensemble #{29}</h3>
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
            <p className="font-federant">0.042 ETP</p>
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
            {/* <p>{index * randomInt(1, 10)} days left</p> */}
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

export default HarmonyCard;
