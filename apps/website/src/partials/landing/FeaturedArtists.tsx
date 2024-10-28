import React from "react";
import Spacer from "@/components/ui/spacer";
import CoinIcon from "@/assets/icons/coin.png";
import { cn } from "@/lib/utils";
import Marquee from "@/components/magicui/marquee";
import Image from "next/image";

function FeaturedArtists() {
  function getCurrentMonth() {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const currentDate = new Date();
    return monthNames[currentDate.getMonth()];
  }

  function getCurrentYear() {
    const currentDate = new Date();
    return currentDate.getFullYear();
  }

  return (
    <section className="border-t border-t-[0.5px] border-border/80">
      <Spacer size={64} />
      <div className="flex flex-col gap-2 px-10">
        <h2 className="font-aeonik text-3xl font-bold">Featured Artists</h2>
        <p className="font-extralight text-muted-foreground">
          {getCurrentMonth()} {getCurrentYear()}
        </p>
      </div>
      <Spacer size={48} />
      <ArtistsMarquee />
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

const artists = [
  {
    name: "Matt Ryder",
    price: "0.042 EUT",
    image: "/images/matt-ryder.png",
  },
  {
    name: "Siv Jakobsen",
    price: "0.042 EUT",
    image: "/images/siv-jakobsen.png",
  },
  {
    name: "Henry Green",
    price: "0.042 EUT",
    image: "/images/henry-green.png",
  },
  {
    name: "Far Caspian",
    price: "0.042 EUT",
    image: "/images/far-caspian.png",
  },
  {
    name: "Parra for Cuva",
    price: "0.042 EUT",
    image: "/images/parra-for-cuva.png",
  },
  {
    name: "Flow Clark",
    price: "0.042 EUT",
    image: "/images/flow-clark.png",
  },
  {
    name: "Alex Lustig",
    price: "0.042 EUT",
    image: "/images/alex-lustig.png",
  },
  {
    name: "Jesse James Solomon",
    price: "0.042 EUT",
    image: "/images/jesse-james-solomon.png",
  },
  {
    name: "TSHA",
    price: "0.042 EUT",
    image: "/images/tsha.png",
  },
  {
    name: "Mont Duamel",
    price: "0.042 EUT",
    image: "/images/mont-duamel.png",
  },
  {
    name: "Astrid S",
    price: "0.042 EUT",
    image: "/images/astrid-s.png",
  },
  {
    name: "Xander.",
    price: "0.042 EUT",
    image: "/images/xander.png",
  },
];

const firstRow = artists.slice(0, artists.length / 2);
const secondRow = artists.slice(artists.length / 2);

export function ArtistsMarquee() {
  return (
    <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden">
      <Marquee pauseOnHover className="[--duration:20s] [--gap:0.75rem]">
        {firstRow.map((artist) => (
          <ArtistCard key={artist.name} {...artist} />
        ))}
      </Marquee>
      <Marquee
        reverse
        pauseOnHover
        className="[--duration:20s] [--gap:0.75rem]"
      >
        {secondRow.map((artist) => (
          <ArtistCard key={artist.name} {...artist} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background" />
    </div>
  );
}

export default FeaturedArtists;
