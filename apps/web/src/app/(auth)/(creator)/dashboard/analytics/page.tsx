import React from "react";
import { WavyBackground } from "@/components/ui/wavy-background";
import Link from "next/link";
function Page() {
  return (
    <WavyBackground className="m-auto mx-auto my-auto  max-w-4xl  bg-inherit pb-40">
      <div className=" mt-60 flex flex-col items-center justify-center">
        <p className="inter-var text-center text-2xl font-bold text-white md:text-4xl lg:text-7xl">
          Coming Soon
        </p>
        <span className="mt-2 text-base">- Creator Analytic&apos;s</span>
        <p className="inter-var mt-4 text-center text-base font-normal text-white md:text-lg">
          This page is coming soon, checkout our other pages -{" "}
          <Link href="/tokenomics/manage" className="text-primary underline">
            click me
          </Link>
        </p>
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
