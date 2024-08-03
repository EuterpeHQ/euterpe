import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import ArrowRightIcon from "@/assets/icons/arrow-right.png";
import Spacer from "@/components/ui/spacer";

function Hero() {
  return (
    <main className="flex h-[480px] w-full flex-col items-center justify-center gap-y-7 px-4 sm:h-[560px] md:h-[634px] md:px-0">
      <h2 className="w-full text-center font-aeonik text-5xl font-medium tracking-[-0.06em] xs:w-[420px] sm:w-[640px] sm:text-7xl md:w-[840px] md:text-[6.25rem]/[80px]">
        Invest in your favorite artists, Earn Royalties and more
      </h2>
      <p className="hidden max-w-[539px] text-center text-sm/4 tracking-[-0.02em] text-muted-foreground md:block">
        Euterpe connects you with rising musicians, allowing <br /> you to
        support their journey and share in their achievements.
      </p>
      <p className="block text-center text-sm/4 tracking-[-0.02em] text-muted-foreground md:hidden">
        Euterpe connects you with rising musicians.
      </p>
      <Button className="w-full max-w-sm text-xs sm:w-fit" asChild>
        <Link
          href="https://app.euterpe.finance"
          rel="noreferrer"
          target="_blank"
        >
          Launch app
          <Image
            src={ArrowRightIcon}
            alt="Right Arrow Icon"
            width={24}
            height={24}
            className="ml-1"
          />
        </Link>
      </Button>
    </main>
  );
}

export default Hero;
