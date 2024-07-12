"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import HarmonyCard from "@/partials/harmonies/HarmonyCard";
import { getArtistHarmonies } from "@/blockchain/harmony.interaction";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import Spacer from "@/components/ui/spacer";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import HarmonyCreationStepper from "@/partials/harmonies/HarmonyCreationStepper";
import AnalyticsImage from "@/assets/images/analytics.svg";

function Page() {
  const { toast } = useToast();
  const { isPending, error, data } = useQuery({
    queryKey: ["getArtistTokens"],
    queryFn: getArtistHarmonies,
  });

  useEffect(() => {
    if (error) {
      toast({
        title: "Failed to Load Data",
        description: error.message,
      });
    }
  }, [error]);

  return (
    <>
      <div className="max-w-9xl mx-auto w-full px-4 py-8 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-sm bg-card sm:p-6">
          <div
            className="pointer-events-none absolute right-0 top-0 -mt-20  hidden xl:block"
            aria-hidden="true"
          >
            <Image
              className="opacity-60"
              src="/images/vector-art.jpg"
              alt="vector-art"
              width={1400}
              height={300}
            />
          </div>
          <div className="relative space-y-4">
            <h1 className="mb-1 text-2xl font-bold text-foreground/80 md:text-3xl">
              Create your Harmonies
              <br />
            </h1>
            <p className="text-muted-foreground">
              Enable different types of Harmonies
            </p>
          </div>
        </div>
      </div>
      <div className="h-full w-full rounded-lg p-6 lg:w-full">
        <div className="flex w-full justify-between">
          <h1 className="text-xl font-semibold text-foreground">Harmonies</h1>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline">Create Harmony</Button>
            </SheetTrigger>
            <SheetContent className="sm:max-w-4xl">
              <SheetHeader>
                <SheetTitle>Create new Harmony</SheetTitle>
                <Spacer size={24} />
              </SheetHeader>
              <HarmonyCreationStepper />
            </SheetContent>
          </Sheet>
        </div>
        <Spacer size={96} />
        <section className="w-full">
          <div className="flex flex-wrap justify-center border-primary px-5">
            {data?.length === 0 ? (
              <div className="flex flex-col items-center justify-center">
                <Image
                  src={AnalyticsImage}
                  alt="music-girl"
                  width={250}
                  height={250}
                  className="opacity-80"
                />
                <p className="mt-2 text-muted-foreground">
                  You don't have any harmonies yet, Create one.
                </p>
              </div>
            ) : (
              <div className="-m-4 flex flex-wrap justify-center border-primary px-5">
                {data?.map((harmony, index) => <HarmonyCard key={index} />)}
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
}

export default Page;
