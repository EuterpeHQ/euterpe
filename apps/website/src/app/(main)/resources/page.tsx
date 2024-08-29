import React from "react";
import { Carousel, Card } from "@/components/aceternity/tall-cards-carousel";
import Spacer from "@/components/ui/spacer";
import type { Metadata } from "next";
import CTA from "@/partials/landing/CTA";

export const metadata: Metadata = {
  title: "Resources",
};

export default function Page() {
  const artistCards = artistData.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ));

  const fanCards = fanData.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ));

  return (
    <div className="h-full w-full py-20">
      <CTA />
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

const artistData = [
  {
    category: "Article",
    title: "Empowering 5,000 Music Artists",
    src: "https://i.pinimg.com/564x/9e/7f/94/9e7f94361ba601097f50657a73024402.jpg",
    href: "/article/empowering-5000-music-artists",
  },
  {
    category: "Article",
    title: "Piecemeal DeFi for Musicians",
    src: "https://i.pinimg.com/564x/0a/ec/2f/0aec2f08ff39e335b2e50a92720cc5c5.jpg",
    href: "/article/piecemeal-defi-for-musicians",
  },
  {
    category: "Video",
    title: "The Art of Creative Freedom",
    src: "https://i.pinimg.com/564x/30/4e/7e/304e7ec7d195ea7fe7addc8ced757245.jpg",
    href: "/video/the-art-of-creative-freedom",
  },
  {
    category: "Live Stream",
    title: "Towards a Killer Token Launch",
    src: "https://i.pinimg.com/564x/6d/a6/86/6da686e70ebcc916bea1776ef0d3a55f.jpg",
    href: "/livestream/towards-a-killer-token-launch",
  },
  {
    category: "Fundraiser",
    title: "Record Label Codependency",
    src: "https://i.pinimg.com/564x/78/0a/0e/780a0ed7dd9750046e7d6dbb962c1b41.jpg",
    href: "/article/record-label-codependency?fundraiser=true",
  },
];

const fanData = [
  {
    category: "Fundraiser",
    title: "A New Kind of Music Dream",
    src: "https://i.pinimg.com/564x/3f/e4/bc/3fe4bca3cbe505ba57a08791b4ddc097.jpg",
    href: "/article/a-new-kind-of-music-dream?fundraiser=true",
  },
  {
    category: "Article",
    title: "Getting started with Harmonies",
    src: "https://i.pinimg.com/564x/f0/ac/5f/f0ac5f498b5d6a0cfaac8caa87cb7f00.jpg",
    href: "/article/getting-started-with-harmonies",
  },
  {
    category: "Video",
    title: "Spotlighting On Tega Ethan",
    src: "https://i.pinimg.com/564x/76/3a/60/763a6042eae3c69b43ae6a2a6e7c9b20.jpg",
    href: "/video/spotlighting-on-tega-ethan",
  },
  {
    category: "Live Stream",
    title: "How To Support Smaller Artists",
    src: "https://i.pinimg.com/564x/fa/c5/88/fac58809636dbc8d5652d8546898055f.jpg",
    href: "/livestream/how-to-support-smaller-artists",
  },
  {
    category: "Article",
    title: "Bringing Smart Finance to everyone",
    src: "https://i.pinimg.com/564x/c7/51/48/c75148d8ff9319ea1016f21d6462abaa.jpg",
    href: "/article/bringing-smart-finance-to-everyone",
  },
];
