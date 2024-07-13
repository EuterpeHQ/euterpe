"use client";
import React from "react";
import Image from "next/image";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

export default function Page() {
  const { toast } = useToast();

  const handlePlumesDemo = () => {
    toast({
      title: "Feature Unavailable",
      description: "Plumes for Smart Finance is still in the works.",
    });
  };
  return (
    <div>
      <div className="max-w-9xl mx-auto w-full px-4 py-8 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-sm bg-card sm:p-6">
          <div
            className="pointer-events-none absolute -bottom-20 right-0 -mt-20  hidden xl:block"
            aria-hidden="true"
          >
            <Image
              className="opacity-80"
              src="/images/night.png"
              alt="vector-art"
              width={1400}
              height={300}
              quality={100}
            />
          </div>
          <div className="relative space-y-4">
            <h1 className="mb-1 text-2xl font-bold text-foreground/90 md:text-3xl">
              Explore Our Featured Apps
              <br />
            </h1>
            <p className="text-muted-foreground">
              Apps and Integrations to supercharge your stay at Euterpe.
            </p>
          </div>
        </div>
      </div>

      <div className="mb-10 flex px-10">
        <div className="mr-4 flex w-1/2 flex-col gap-4 rounded-lg bg-card px-8 py-6">
          <div className="flex">
            <div className="flex-1">
              <div className="mb-1 text-xs uppercase">App of the Day</div>
              <h1 className="mb-4 text-2xl font-normal">Plumes</h1>
              <p className="text-xs leading-normal">
                Sit back, create music. Plumes handles your account on Euterpe.
              </p>
            </div>
            <div className="text-right">
              <div className="h-full rounded-full border border-surfaceVariant bg-transparent p-0.5">
                <Avatar className="flex h-20 w-20 items-start justify-center">
                  <AvatarImage
                    src="/images/plumes.webp"
                    alt="avatar"
                    width={12}
                    height={12}
                    className="h-24 w-24 object-cover object-top"
                  />
                </Avatar>
              </div>
            </div>
          </div>
          <Button
            size="sm"
            className="w-fit rounded-full border border-border bg-background text-xs font-bold text-foreground hover:bg-surface hover:text-foreground/80"
            onClick={handlePlumesDemo}
          >
            Demo
          </Button>
        </div>

        <div className="ml-4 w-1/2 rounded-lg bg-card px-8 py-6">
          <div className="mb-1 text-xs uppercase">Hand-picked</div>
          <h1 className="mb-4 text-2xl font-normal">
            Apps That Work Great with Euterpe
          </h1>
          <p className="mb-4 text-xs leading-normal">
            A hand-picked selection.
          </p>
          <div className="flex -space-x-2">
            <div className="w-24">
              <img src="/icons/archetype-app.png" alt="icons" />
            </div>
            <div className="w-24">
              <img src="/icons/exper-app.png" alt="icons" />
            </div>
            <div className="w-24">
              <img src="/icons/bloom-app.png" alt="icons" />
            </div>
          </div>
        </div>
      </div>

      <div className="border-grey-darker mx-10 mb-10 border-b"></div>

      <div className="px-10 text-white">
        <div className="flex justify-between">
          <h2 className="mb-8 font-normal">Top Essential Apps Right Now</h2>
          <a href="#" className="text-sm text-muted-foreground no-underline">
            See All
          </a>
        </div>

        <div className="mb-4 flex flex-wrap">
          <div className="flex w-1/2">
            <div className="w-20">
              <img src="/icons/archetype-app.png" alt="icon" />
            </div>
            <div className="flex-1 pl-6 pr-6">
              <div className="mb-1">Archetype</div>
              <div className="mb-6 text-xs text-foreground">
                Simulate your Token in a Virtual World
              </div>
              <div className="mb-8">
                <span className="cursor-pointer rounded-full bg-white px-3 py-1 text-xs font-bold uppercase text-blue-500">
                  Connect
                </span>
              </div>
              <div className="border-grey-darker mb-10 border-b"></div>
            </div>
          </div>

          <div className="flex w-1/2 pl-6">
            <div className="w-20">
              <img src="/icons/bloom-app.png" alt="icon" />
            </div>
            <div className="flex-1 pl-6">
              <div className="mb-1">Bloom</div>
              <div className="mb-6 text-xs text-foreground">
                Equitable and Sustainable Royalties with Bloom Streaming
              </div>
              <div className="mb-8">
                <span className="cursor-pointer rounded-full bg-white px-3 py-1 text-xs font-bold text-blue-500">
                  0 EUT
                </span>
              </div>
              <div className="border-grey-darker mb-10 border-b"></div>
            </div>
          </div>

          <div className="flex w-1/2">
            <div className="w-20">
              <img src="/icons/exper-app.png" alt="icon" />
            </div>
            <div className="flex-1 pl-6 pr-6">
              <div className="mb-1">Exper</div>
              <div className="mb-6 text-xs text-foreground">
                Secure, Decentralized Live Event Ticketing
              </div>
              <div className="mb-8">
                <span className="cursor-pointer rounded-full bg-primary px-3 py-1 text-xs font-bold uppercase text-background">
                  Connected
                </span>
              </div>
              <div className="border-grey-darker mb-10 border-b"></div>
            </div>
          </div>

          <div className="flex w-1/2 pl-6">
            <div className="w-20">
              <img src="/icons/pear-app.png" alt="icon" />
            </div>
            <div className="flex-1 pl-6">
              <div className="mb-1">Pear</div>
              <div className="mb-6 text-xs text-foreground">
                Bank of The Freed & Awakened
              </div>
              <div className="mb-8">
                <span className="cursor-pointer rounded-full bg-white px-3 py-1 text-xs font-bold uppercase text-blue-500">
                  Connect
                </span>
              </div>
              <div className="border-grey-darker mb-10 border-b"></div>
            </div>
          </div>

          <div className="flex w-1/2">
            <div className="w-20">
              <img src="/icons/swyke-app.png" alt="icon" />
            </div>
            <div className="flex-1 pl-6">
              <div className="mb-1">Swyke for Designers</div>
              <div className="mb-6 text-xs text-foreground">
                Create your Fan Merch. Design with AI. Sell in seconds.
              </div>
              <div className="mb-8">
                <span className="cursor-pointer rounded-full bg-white px-3 py-1 text-xs font-bold uppercase text-blue-500">
                  Connect
                </span>
              </div>
            </div>
          </div>
          <div className="flex w-1/2 pl-6">
            <div className="w-20">
              <img src="/icons/fusion-app.png" alt="icon" />
            </div>
            <div className="flex-1 pl-6">
              <div className="mb-1">Fusion</div>
              <div className="mb-6 text-xs text-foreground">
                World's First Blockchain Record Label.
              </div>
              <div className="mb-8">
                <span className="cursor-pointer rounded-full bg-white px-3 py-1 text-xs font-bold uppercase text-blue-500">
                  Connect
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-grey-darker mx-10 mb-10 border-b"></div>
    </div>
  );
}
