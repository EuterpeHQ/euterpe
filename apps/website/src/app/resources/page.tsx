"use client";
import Image from "next/image";
import React from "react";
import { Carousel, Card } from "@/components/aceternity/tall-cards-carousel";
import Spacer from "@/components/ui/spacer";
import Balancer from "react-wrap-balancer";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import LineArtLeftImage from "@/assets/images/line-art-left.svg";
import LineArtRightImage from "@/assets/images/line-art-right.svg";
import GreenArrowRightIcon from "@/assets/icons/green-arrow-right.png";

export default function Page() {
  const artistCards = artistData.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ));

  const fanCards = fanData.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ));

  return (
    <div className="h-full w-full px-10 py-20">
      <div className="relative flex h-96 w-full flex-col items-center justify-center gap-8 overflow-hidden rounded-lg bg-primary p-4">
        <h2 className="text-center font-aeonik text-4xl font-medium tracking-[-0.06em] text-background md:text-5xl lg:text-6xl/[56px]">
          <Balancer>
            Become part of a global community that's actively reshaping the
            music industry.
          </Balancer>
        </h2>
        <Button
          className="w-full max-w-sm bg-background text-xs text-primary hover:bg-background/90 sm:w-fit"
          asChild
        >
          <Link
            href="https://app.euterpe.finance"
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
      <Spacer size={80} />
      <div>
        <h2 className="mx-auto max-w-7xl pl-4 font-aeonik text-3xl font-medium text-neutral-800 dark:text-neutral-200 md:text-5xl">
          Artists
        </h2>
        <Carousel items={artistCards} />
      </div>
      <div>
        <h2 className="mx-auto max-w-7xl pl-4 font-aeonik text-3xl font-medium text-neutral-800 dark:text-neutral-200 md:text-5xl">
          Fans
        </h2>
        <Carousel items={fanCards} />
      </div>
    </div>
  );
}

const DummyContent = () => {
  return <></>;
};

const artistData = [
  {
    category: "Article",
    title: "Empowering 5,000 Music Artists",
    src: "https://i.pinimg.com/564x/9e/7f/94/9e7f94361ba601097f50657a73024402.jpg",

    content: <DummyContent />,
  },
  {
    category: "Article",
    title: "Piecemeal DeFi for Musicians",
    src: "https://i.pinimg.com/564x/0a/ec/2f/0aec2f08ff39e335b2e50a92720cc5c5.jpg",

    content: <DummyContent />,
  },
  {
    category: "Video",
    title: "The Art of Creative Freedom",
    src: "https://i.pinimg.com/564x/30/4e/7e/304e7ec7d195ea7fe7addc8ced757245.jpg",

    content: <DummyContent />,
  },
  {
    category: "Webinar",
    title: "Towards a Killer Token Launch",
    src: "https://i.pinimg.com/564x/6d/a6/86/6da686e70ebcc916bea1776ef0d3a55f.jpg",

    content: <DummyContent />,
  },
  {
    category: "Fundraiser",
    title: "Record Label Codependency",
    src: "https://i.pinimg.com/564x/78/0a/0e/780a0ed7dd9750046e7d6dbb962c1b41.jpg",

    content: <DummyContent />,
  },
];

const fanData = [
  {
    category: "Fundraiser",
    title: "A New Kind of Music Dream",
    src: "https://i.pinimg.com/564x/3f/e4/bc/3fe4bca3cbe505ba57a08791b4ddc097.jpg",
    content: <DummyContent />,
  },
  {
    category: "Article",
    title: "Getting started with Harmonies",
    src: "https://i.pinimg.com/564x/f0/ac/5f/f0ac5f498b5d6a0cfaac8caa87cb7f00.jpg",

    content: <DummyContent />,
  },
  {
    category: "Video",
    title: "Spotlighting On Tega Ethan",
    src: "https://i.pinimg.com/564x/76/3a/60/763a6042eae3c69b43ae6a2a6e7c9b20.jpg",
    content: <DummyContent />,
  },
  {
    category: "Webinar",
    title: "How To Support Smaller Artists",
    src: "https://i.pinimg.com/564x/fa/c5/88/fac58809636dbc8d5652d8546898055f.jpg",
    content: <DummyContent />,
  },
  {
    category: "Article",
    title: "Plumes Automates 5% of Activity on Euterpe",
    src: "https://i.pinimg.com/564x/c7/51/48/c75148d8ff9319ea1016f21d6462abaa.jpg",
    content: <DummyContent />,
  },
];
