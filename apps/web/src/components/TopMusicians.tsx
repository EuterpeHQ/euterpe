import React from "react";
import { Button } from "./ui/button";
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

function RankBadge({ rank }: { rank: number }) {
  return (
    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-neutral-800 font-federant text-xs text-white transition-all duration-200 group-hover:bg-neutral-800 md:bg-black/20">
      {rank}
    </div>
  );
}

type ProfileCardProps = {
  rank: number;
};

function ProfileCard({ rank }: ProfileCardProps) {
  return (
    <Card className="group flex h-full w-full cursor-pointer flex-col justify-between overflow-hidden border border-primary/20 bg-black/15 outline-none transition-all duration-200 md:hover:bg-primary/10 md:hover:outline md:hover:outline-offset-2 md:hover:outline-primary/20">
      <CardContent className="relative flex items-center justify-center p-0 md:p-4">
        <div className="absolute inset-2 z-10">
          <RankBadge rank={rank} />
        </div>
        <Avatar className="h-full w-full rounded-none md:h-24 md:w-24 md:rounded-full">
          <AvatarImage
            className="h-full w-full"
            src={`https://i.pravatar.cc/300?img=${rank}`}
          />
          <AvatarFallback className="relative bg-black/5">
            <svg
              className="absolute left-1/2 h-full w-full -translate-x-1/2 text-black/20"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </AvatarFallback>
        </Avatar>
      </CardContent>
      <CardHeader className="p-4 text-sm md:p-0 md:pb-4 md:text-center">
        <CardTitle>Name {rank}</CardTitle>
        <CardDescription>
          <span>Token Price: </span>

          <span className="font-federant text-white">
            {(rank / 3).toFixed(2)}
            <span className="tracking-widest"> ETP</span>
          </span>
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex flex-col items-start justify-end md:hidden">
        <div className="mb-4 h-px w-full bg-primary/20" />
      </CardFooter>
    </Card>
  );
}

function TopMusicians() {
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
            Top Musicians{" "}
            <span className="text-primary underline underline-offset-4">
              {getCurrentMonth()}
            </span>
          </h2>
          <p className="text-sm">Discover this month's top musical talents.</p>
        </div>
        <Button
          className="hidden gap-4 md:inline-flex"
          variant="outline"
          asChild
        >
          <Link href="/charts">
            <BsBarChart className="h-[13px] w-[13px]" />
            View Charts
          </Link>
        </Button>
      </div>
      <Spacer size={40} />
      <div className="container flex justify-center">
        <div className="hidden gap-5 md:grid md:grid-cols-[repeat(3,minmax(220px,220px))] lg:grid-cols-[repeat(4,minmax(240px,240px))]">
          {[...Array(12)].map((_, i) => (
            <ProfileCard key={i} rank={i + 1} />
          ))}
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
            {[...Array(6)].map((_, i) => (
              <CarouselItem className="aspect-[320/404] max-w-xs" key={i}>
                <ProfileCard rank={i + 1} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <div className="container inline-flex md:hidden">
          <Button className="w-full gap-4" variant="outline" asChild>
            <Link href="/charts">
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
