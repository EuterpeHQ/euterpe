import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { HeroLottie, CoinLottie } from "../../components/Lotties";
import Link from "next/link";
import { HiOutlineRocketLaunch } from "react-icons/hi2";

function Hero() {
  return (
    // <div className="container flex flex-col-reverse justify-center gap-10 md:flex-row md:px-10 lg:gap-12 lg:px-24">
    //   <div className="">
    //     <div className="flex h-full w-full max-w-md flex-col gap-6">
    //       <h1 className="text-3xl font-semibold md:text-4xl lg:text-5xl">
    //         <span className="leading-snug text-primary underline underline-offset-4">
    //           Invest
    //         </span>{" "}
    //         In Your Favourite{" "}
    //         <span className="text-primary underline underline-offset-4">
    //           Artists:
    //         </span>{" "}
    //         Earn{" "}
    //         <span className="leading-snug text-primary underline underline-offset-4">
    //           Royalties
    //         </span>{" "}
    //         And More.
    //       </h1>
    //       <p className="text-lg font-normal lg:text-lg">
    //         Euterpe connects you with rising musicians, allowing you to support
    //         their journey and share in their achievements.
    //       </p>
    //       <Button className="w-full gap-4 md:w-fit" asChild>
    //         <Link href="/onboarding" target="_blank" rel="noopener noreferrer">
    //           <HiOutlineRocketLaunch className="h-4 w-4" />
    //           Launch App
    //         </Link>
    //       </Button>
    //     </div>
    //   </div>
    //   <div className="">
    //     <Card className="w-full overflow-hidden rounded-3xl bg-black/15 md:w-[275px] lg:w-[420px]">
    //       <CardContent className="h-80 lg:h-96">
    //         <HeroLottie />
    //       </CardContent>
    //       <CardHeader className="border-t-8 border-background p-4">
    //         <CardTitle className="relative -ml-[18px] inline-flex h-6 overflow-hidden font-federant">
    //           <div className="relative bottom-1/2">
    //             <CoinLottie />
    //           </div>
    //           <div className="z-10 -ml-2 flex items-center">$0.03</div>
    //         </CardTitle>
    //         <CardDescription>Euterpe (ETP)</CardDescription>
    //       </CardHeader>
    //     </Card>
    //   </div>
    // </div>
    <main className="px-2 py-2 flex gap-y-5 justify-center items-center flex-col w-full border-b border-b-[#020403] h-[500px]">
    <h2 className="text-center font-aeonik text-3xl md:text-6xl">
      Invest in your favorite <br /> artists, Earn Royalties and more
    </h2>
    <p className="font-mono text-sm text-center">
      Euterpe connects you with rising musicians, allowing <br /> you to
      support their journey and share in their achievements.
    </p>
    <div className=" block">
      <button className="flex justify-start items-center gap-x-2 font-mono bg-[#B8FF5B] text-black px-4 p-2 rounded-full border-none">
        Get Started
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
  </main>
  );
}

export default Hero;
