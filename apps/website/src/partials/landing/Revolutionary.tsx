import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Spacer from "@/components/ui/spacer";
import Link from "next/link";
import GreenArrowRightIcon from "@/assets/icons/green-arrow-right.png";
import Balancer from "react-wrap-balancer";
import LineArtLeftImage from "@/assets/images/line-art-left.svg";
import LineArtRightImage from "@/assets/images/line-art-right.svg";

export default function Revolutionary() {
  return (
    <section className="w-full px-10">
      <Spacer size={64} />
      <div className="relative flex h-96 w-full flex-col items-center justify-center gap-8 overflow-hidden rounded-lg bg-primary p-4">
        <h2 className="text-center font-aeonik text-4xl font-medium tracking-[-0.06em] text-background md:text-5xl lg:text-6xl/[56px]">
          <Balancer>
            Join Euterpe's revolutionary De-Fi platform and help shape the
            future of music
          </Balancer>
        </h2>
        <Button
          className="w-full max-w-sm bg-background text-xs text-primary hover:bg-background/90 sm:w-fit"
          asChild
        >
          <Link
            href="https://euterpe.finance/resources"
            rel="noreferrer"
            target="_blank"
          >
            Launch app
            <Image
              src={GreenArrowRightIcon}
              alt="Right Arrow Icon"
              width={24}
              height={24}
              className="ml-1"
            />
          </Link>
        </Button>
        <Image
          src={LineArtLeftImage}
          alt="Line Art"
          className="absolute -left-10 top-0 hidden h-full lg:block"
        />
        <Image
          src={LineArtRightImage}
          alt="Line Art"
          className="absolute -right-10 top-0 hidden h-full lg:block"
        />
        <Image
          src={LineArtLeftImage}
          alt="Line Art"
          className="absolute bottom-0 right-1/2 block h-full rotate-0 lg:hidden"
        />
        <Image
          src={LineArtRightImage}
          alt="Line Art"
          className="absolute bottom-0 left-1/2 block h-full rotate-0 lg:hidden"
        />
      </div>
      <Spacer size={64} />
    </section>
  );
}
