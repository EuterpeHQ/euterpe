import React from "react";
import { CoinLottie } from "../../components/Lotties";
import Spacer from "@/components/ui/spacer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { GrMoney } from "react-icons/gr";
import { randomInt } from "crypto";
import Balancer from "react-wrap-balancer";
import Image from "next/image";
import HarmonyImage from "@/assets/images/lady-donli.jpeg";

function Collection({ index }: { index: number }) {
  return (
    <div className="w-full max-w-sm p-4 md:max-w-xs lg:max-w-sm">
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
    <section className="w-[92%] m-auto border-b border-b-[#020403] py-6 flex flex-col md:flex-row justify-between items-start gap-y-4 p-2 px-8 my-4 mt-10">
    <div className="flex flex-col gap-y-4 ">
      <h2 className="font-aeonik text-wrap text-3xl md:text-6xl">
        Invest In Secure <br /> and Decentralized <br />
        <span className="text-[#B8FF5B]">Harmonies</span>
      </h2>
      <p className="font-mono text-sm font-thin text-[#CDCDCD]">
        Harmonies house a collection of one or more NFTs that <br /> legally
        bind an investor to certain rewards.
      </p>
      <div className=" block">
        <button className="flex justify-start items-center gap-x-2 font-mono bg-[#B8FF5B] text-black px-4 p-2 rounded-full border-none">
          Learn more
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="w-5 h-5 bi bi-arrow-right-short"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8"
            />
          </svg>
        </button>
      </div>
    </div>
    {/* image */}
    <div
      className=" p-4 w-full w-[20%] h-[400px] md:w-[38%] md:h-[750px]"
      style={{
        backgroundImage: 'url("/images/invest.png")',
        backgroundSize: "cover",
        backgroundPosition: "cover",
        backgroundRepeat: "no-repeat",
      }}
    ></div>
  </section>
  );
}

export default Harmonies;
