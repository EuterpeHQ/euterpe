import { WavyBackground } from "@/components/ui/wavy-background";
import React from "react";

function Page() {
  return (
    <WavyBackground className="m-auto mx-auto my-auto  max-w-4xl  bg-inherit pb-40">
      <div className=" mt-60 flex flex-col items-center justify-center">
        <p className="inter-var text-center text-2xl font-bold text-white md:text-4xl lg:text-7xl">
          Coming Soon
        </p>
        <span className="mt-2 text-base">- Earn with Staking</span>

        <p className="float-end me-0 flex-1 text-primary">
          <span className="italic text-blue-300">
            Where words fail music speaks
          </span>{" "}
          -Euterpe
        </p>
      </div>
    </WavyBackground>
  );
}

export default Page;
