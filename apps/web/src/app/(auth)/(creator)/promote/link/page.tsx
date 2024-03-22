import { WavyBackground } from "@/components/ui/wavy-background";
import React from "react";

function Page() {
  return (
    <WavyBackground className="m-auto mx-auto my-auto  max-w-4xl  bg-inherit pb-40">
      <div className=" mt-60 flex flex-col items-center justify-center">
        <p className="inter-var text-center text-2xl font-bold text-white md:text-4xl lg:text-7xl">
          Coming Soon
        </p>
        <p className="inter-var mt-4 text-center text-base font-normal text-white md:text-lg">
          Elevate your career and engage with fans like never before!
        </p>
        <p className="float-end me-0 flex-1 text-primary">-Euterpe</p>
      </div>
    </WavyBackground>
  );
}

export default Page;
