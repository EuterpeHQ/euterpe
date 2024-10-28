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
            <h1 className="max-w-md font-aeonik text-5xl/[48px] tracking-[-0.06em] md:text-6xl/[56px]">
              {" "}
              Streaming Is Flawed, So We Created{" "}
              <span className="font-medium text-primary">Harmonies</span>
            </h1>
            <p className="max-w-lg text-sm text-muted-foreground">
              Harmonies allow artists to exchange revenue, royalties and rewards
              for support from their most loyal fans.
            </p>
          </div>
          <Button className="w-full max-w-sm text-xs sm:w-fit" asChild>
            <Link href="/resources">
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

const harmonies = [
  {
    name: "Anemoia",
    artist: "Lady Donli",
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
      "Join us backstage at our next concert and receive a personalized merch pack",
    price: "0.042",
    image: "/images/harmony-2.png",
    avatar: "/images/catching-flies.png",
    expires: "54 days",
  },
  {
    name: "Nostalgia",
    artist: "London Grammar",
    description:
      "Recieve 2% of our concert ticket sales from The Greatest Love Arena tour 2024",
    price: "0.042",
    image: "/images/harmony-3.png",
    avatar: "/images/catching-flies.png",
    expires: "217 days",
  },
  {
    name: "Synesthesia",
    artist: "The Chainsmokers",
    description:
      "Be the first to hear exclusive, unreleased tracks before anyone else does",
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
