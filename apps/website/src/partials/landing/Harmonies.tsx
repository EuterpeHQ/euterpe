import React from "react";
import Spacer from "@/components/ui/spacer";
import CoinIcon from "@/assets/icons/coin.png";
import { cn } from "@/lib/utils";
import Marquee from "@/components/magicui/marquee";
import Image from "next/image";
import { HarmonyCard } from "@/partials/HarmonyCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ArrowRightIcon from "@/assets/icons/arrow-right.png";

function Harmonies() {
  return (
    <section className="border-t border-t-[0.5px] border-border/80 px-10">
      <Spacer size={64} />
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-6">
            <h1 className="max-w-md font-aeonik text-6xl/[56px] tracking-[-0.06em]">
              {" "}
              Invest In Secure and Decentralized{" "}
              <span className="font-medium text-primary">Harmonies</span>
            </h1>
            <p className="max-w-lg text-sm text-muted-foreground">
              Harmonies house a collection of one or more NFTs that legally bind
              an investor to certain rewards.
            </p>
          </div>
          <Button className="w-full max-w-sm text-xs sm:w-fit" asChild>
            <Link
              href="https://euterpe.finance/resources"
              rel="noreferrer"
              target="_blank"
            >
              Learn more
              <Image
                src={ArrowRightIcon}
                alt="Right Arrow Icon"
                width={24}
                height={24}
                className="ml-1"
              />
            </Link>
          </Button>
        </div>
        <HarmoniesMarquee />
      </div>
    </section>
  );
}

const ArtistCard = ({
  image,
  name,
  price,
}: {
  image: string;
  name: string;
  price: string;
}) => {
  return (
    <figure
      className={cn(
        "relative flex w-52 cursor-pointer flex-col items-center gap-5 overflow-hidden border-[1px] border-border/70 bg-background p-4 hover:bg-primary/5",
      )}
    >
      <img
        className="rounded-full"
        width="140"
        height="140"
        alt=""
        src={image}
      />
      <div className="flex flex-col items-center gap-2">
        <figcaption className="text-sm font-semibold dark:text-white">
          {name}
        </figcaption>
        <blockquote className="flex items-center text-xs font-semibold text-primary">
          <Image src={CoinIcon} alt="coin icon" className="mr-1 w-2.5" />
          {price}
        </blockquote>
      </div>
    </figure>
  );
};

const harmonies = [
  {
    name: "Anemoia",
    artist: "Catching Flies",
    description:
      "A 5% chance to earn 1% of every 1000 streams on our Pan African Rockstar Album",
    price: "0.042",
    image: "/images/harmony-1.png",
    avatar: "/images/catching-flies.png",
    expires: "18 days",
  },
  {
    name: "Hypnagogia",
    artist: "Catching Flies",
    description:
      "A 5% chance to earn 1% of every 1000 streams on our Pan African Rockstar Album",
    price: "0.042",
    image: "/images/harmony-2.png",
    avatar: "/images/catching-flies.png",
    expires: "54 days",
  },
  {
    name: "Nostalgia",
    artist: "Catching Flies",
    description:
      "A 5% chance to earn 1% of every 1000 streams on our Pan African Rockstar Album",
    price: "0.042",
    image: "/images/harmony-3.png",
    avatar: "/images/catching-flies.png",
    expires: "217 days",
  },
  {
    name: "Synesthesia",
    artist: "Catching Flies",
    description:
      "A 5% chance to earn 1% of every 1000 streams on our Pan African Rockstar Album",
    price: "0.042",
    image: "/images/harmony-4.png",
    avatar: "/images/catching-flies.png",
    expires: "122 days",
  },
];

const firstRow = harmonies.slice(0, harmonies.length / 2);
const secondRow = harmonies.slice(harmonies.length / 2);

export function HarmoniesMarquee() {
  return (
    <div className="relative flex h-[600px] w-full flex-row items-center justify-center overflow-hidden">
      <Marquee
        pauseOnHover
        vertical
        className="[--duration:20s] [--gap:0.75rem]"
      >
        {firstRow.map((harmony) => (
          <HarmonyCard key={harmony.name} {...harmony} />
        ))}
      </Marquee>
      <Marquee
        reverse
        pauseOnHover
        vertical
        className="[--duration:20s] [--gap:0.75rem]"
      >
        {secondRow.map((harmony) => (
          <HarmonyCard key={harmony.name} {...harmony} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-white dark:from-background" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-white dark:from-background" />
    </div>
  );
}

export default Harmonies;
