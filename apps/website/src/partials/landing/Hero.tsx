import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function Hero() {
  return (
    <main className="px-2 py-2 flex gap-y-5 justify-center items-center flex-col w-full border-b border-b-[#020403] h-[500px]">
    <h2 className="text-center font-aeonik text-3xl md:text-6xl">
      Invest in your favorite <br /> artists, Earn Royalties and more
    </h2>
    <p className="font-mono text-sm text-center">
      Euterpe connects you with rising musicians, allowing <br /> you to
      support their journey and share in their achievements.
    </p>
    <div className=" block">
      <Link href="/onboarding" className="flex justify-start items-center gap-x-2 font-mono bg-[#B8FF5B] text-black px-4 p-2 rounded-full border-none">
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
      </Link>
    </div>
  </main>
  );
}

export default Hero;
