"use client";

import React from "react";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Spacer from "@/components/ui/spacer";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { BsBarChart } from "react-icons/bs";
import Link from "next/link";
import { useFeaturedArtists } from "@/hooks/useFeaturedArtist";
import { Artist } from "@/entities";
import { Skeleton } from "@/components/ui/skeleton";

function PriceBadge({ price }: { price: string }) {
  return (
    <div className="flex items-center justify-center rounded-md bg-accent px-2 font-federant text-xs text-white transition-all duration-200 group-hover:bg-accent">
      {price} ETP
    </div>
  );
}

type ProfileCardProps = {
  artist: Artist;
};

function ProfileCard({ artist }: ProfileCardProps) {
  return (
    <Link href={artist.link} target="_blank" rel="noopener noreferrer">
      <Card className="group flex h-full w-full cursor-pointer flex-col overflow-hidden border border-primary/20 bg-transparent shadow-none outline-none transition-all duration-200 md:border-none md:hover:bg-black/10">
        <CardContent className="relative flex items-center justify-center p-0 md:p-4">
          <Avatar className="h-full w-full rounded-none outline-none transition-all duration-200 md:h-36 md:w-36 md:rounded-full">
            <AvatarImage
              className="h-full w-full object-cover"
              src={artist.image}
            />
            <AvatarFallback className="relative bg-black/5">
              <svg
                className="absolute left-1/2 h-full w-full -translate-x-1/2 text-black/20"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </AvatarFallback>
          </Avatar>
        </CardContent>
        <CardHeader className="p-4 text-sm md:p-0 md:pb-4 md:text-center">
          <div className="flex flex-col gap-y-4 md:flex-row md:items-center md:justify-evenly">
            <CardTitle className="font-normal text-muted-foreground">
              {artist.name}
            </CardTitle>
            <PriceBadge price={(artist.popularity / 1000).toFixed(3)} />
          </div>
        </CardHeader>
      </Card>
    </Link>
  );
}

function SkeletonProfileCard() {
  return (
    <Card className="mx-2 flex h-full flex-col justify-between overflow-hidden bg-transparent md:mx-0 md:shadow-none">
      <CardContent className="relative flex items-center justify-center p-0 md:p-4">
        <Skeleton className="h-80 w-72 rounded-none bg-card md:h-36 md:w-36 md:rounded-full" />
      </CardContent>
      <CardHeader className="p-4 text-sm md:p-0 md:pb-4 md:text-center">
        <div className="flex flex-col gap-y-4 md:flex-row md:items-center md:justify-evenly">
          <Skeleton className="inline-flex h-3 w-1/3 justify-center bg-card" />
          <Skeleton className="inline-flex h-3 w-full justify-center bg-card md:w-2/5" />
        </div>
      </CardHeader>
    </Card>
  );
}

function TopMusicians() {
  const { data, isLoading } = useFeaturedArtists();

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

  return (
    <section>
      <div className="container flex items-center justify-between md:px-24">
        <div className="flex flex-col gap-2">
          <h2 className="text-3xl font-semibold">
            Featured Artists{" "}
            <span className="text-primary underline underline-offset-4">
              {getCurrentMonth()}
            </span>
          </h2>
          <p className="text-sm">
            Discover and empower independent artists worldwide.
          </p>
        </div>
        <Button
          className="hidden gap-4 md:inline-flex"
          variant="outline"
          asChild
        >
          <Link href="/login">
            <BsBarChart className="h-[13px] w-[13px]" />
            View Charts
          </Link>
        </Button>
      </div>
      <Spacer size={48} />
      <div className="container flex justify-center">
        <div className="hidden gap-0 lg:grid lg:grid-cols-6">
          {isLoading
            ? [...Array(18)].map((_, i) => <SkeletonProfileCard key={i} />)
            : data?.artists
                .slice(0, 18)
                .map((artist, i) => <ProfileCard key={i} artist={artist} />)}
        </div>
        <div className="hidden gap-0 md:grid md:grid-cols-4 lg:hidden">
          {isLoading
            ? [...Array(12)].map((_, i) => <SkeletonProfileCard key={i} />)
            : data?.artists
                .slice(0, 12)
                .map((artist, i) => <ProfileCard key={i} artist={artist} />)}
        </div>
      </div>
      <div className="flex flex-col items-center gap-6 overflow-hidden scroll-smooth md:hidden">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent>
            {isLoading
              ? [...Array(12)].map((_, i) => <SkeletonProfileCard key={i} />)
              : data?.artists.slice(0, 12).map((artist, i) => (
                  <CarouselItem className="aspect-[320/404] max-w-xs" key={i}>
                    <ProfileCard artist={artist} />
                  </CarouselItem>
                ))}
          </CarouselContent>
        </Carousel>
        <div className="container inline-flex md:hidden">
          <Button className="w-full gap-4" variant="outline" asChild>
            <Link href="/login">
              <BsBarChart className="h-[13px] w-[13px]" />
              View Charts
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

export default TopMusicians;
