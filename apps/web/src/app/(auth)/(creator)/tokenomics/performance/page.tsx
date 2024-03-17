"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@/components/ui/hover-card";
import Image from "next/image";

function Page() {
  return (
    <main className="m-auto mb-6 w-full max-w-[1500px]">
      <div className="m-auto mt-8 flex w-[98%] flex-row flex-wrap justify-between">
        <h2 className="text-2xl font-semibold">Token Performance</h2>
        <HoverCard>
          <HoverCardTrigger className="cursor-pointer rounded-l-sm rounded-r-sm border-b-2 border-b-primary p-2 text-sm font-bold text-gray-500 hover:text-white">
            What&apos; this?
          </HoverCardTrigger>
          <HoverCardContent className=" border-2 border-primary bg-background">
            Your Token value, price and worth.
          </HoverCardContent>
        </HoverCard>
      </div>
      <div className="m-0 mt-10 flex flex-col justify-start gap-y-6 lg:m-auto lg:flex-row lg:items-center lg:justify-evenly lg:gap-y-0">
        <section className="mt-10 flex h-auto w-full flex-col-reverse justify-start gap-10 rounded-l-md rounded-r-md border-b-2  border-b-gray-600 p-8 shadow-lg hover:border-b-primary lg:h-[400px] lg:w-[60%] lg:flex-row lg:items-center lg:justify-center lg:gap-2 lg:p-0">
          <div className="flex h-full w-full flex-col justify-center  space-y-6 lg:w-[50%]">
            <div className="flex items-center justify-start gap-5">
              <h1 className="">Artist Name:</h1>
              <h1 className="text-2xl">Selena Gomez</h1>
            </div>
            <div className="flex items-center justify-start gap-5">
              <h2>Token Name:</h2>{" "}
              <span className="text-primary">ETP Token</span>
            </div>
            <div className="flex items-center justify-start gap-5">
              <h2>Token Symbol:</h2>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback className="bg-gray-700">ETP</AvatarFallback>
              </Avatar>
            </div>
            <div className="flex flex-wrap items-center justify-start gap-5 min-[370px]:flex-nowrap">
              <h2 className="text-whhite text-2xl">Token Value</h2>
              <h2 className="text-2xl text-primary">0.0840 ETP</h2>{" "}
            </div>
            <div className="flex flex-wrap items-center justify-start gap-5 min-[370px]:flex-nowrap">
              <h2 className="text-2xl text-white">Token Price</h2>
              <h2 className="text-2xl text-primary">0.3 ETP</h2>
            </div>
          </div>
          <div className="flex h-auto w-full items-center justify-center rounded-lg border-2 border-background shadow-lg shadow-primary hover:shadow-slate-300 md:w-[50%] lg:h-[60%] lg:w-[35%]">
            <Image
              className=""
              src="/images/profile-nft.png"
              alt="profile"
              width={200}
              height={200}
            />
          </div>
        </section>
        {/* will be broken down into a component */}
        <div className="w-full lg:w-[30%]">
          <div className="w-full max-w-md rounded-lg border-gray-200  p-4 shadow sm:p-8">
            <div className="mb-4 flex items-center justify-between">
              <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
                Top Creators
              </h5>
              <a
                href="#"
                className="text-sm font-medium text-gray-400 hover:underline"
              >
                View more &rarr;
              </a>
            </div>
            <div className="flow-root">
              <ul
                role="list"
                className="divide-y divide-gray-200 dark:divide-gray-700"
              >
                <li className="py-3 sm:py-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <Avatar>
                        <AvatarImage src={`https://i.pravatar.cc/300?img=2`} />
                        <AvatarFallback className="bg-gray-700">
                          img
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="ms-4 min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                        Neil Sims
                      </p>
                      <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                        Token Price:
                      </p>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-primary">
                      2.78 ETP
                    </div>
                  </div>
                </li>
                <li className="py-3 sm:py-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <Avatar>
                        <AvatarImage src={`https://i.pravatar.cc/300?img=1`} />
                        <AvatarFallback className="bg-gray-700">
                          img
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="ms-4 min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-white">
                        Neil Sims
                      </p>
                      <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                        Token Price:
                      </p>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-primary">
                      2.50 ETP
                    </div>
                  </div>
                </li>
                <li className="py-3 sm:py-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <Avatar>
                        <AvatarImage src={`https://i.pravatar.cc/300?img=4`} />
                        <AvatarFallback className="bg-gray-700">
                          img
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="ms-4 min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-white">
                        Neil Sims
                      </p>
                      <p className="truncate text-sm text-gray-400">
                        Token Price:
                      </p>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-primary">
                      2.33 ETP
                    </div>
                  </div>
                </li>
                <li className="py-3 sm:py-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <Avatar>
                        <AvatarImage src={`https://i.pravatar.cc/300?img=5`} />
                        <AvatarFallback className="bg-gray-700">
                          img
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="ms-4 min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-white">
                        Neil Sims
                      </p>
                      <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                        Token Price:
                      </p>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-primary">
                      1.42 ETP
                    </div>
                  </div>
                </li>

                <li className="py-3 sm:py-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <Avatar>
                        <AvatarImage src={`https://i.pravatar.cc/300?img=7`} />
                        <AvatarFallback className="bg-gray-700">
                          img
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="ms-4 min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-white">
                        Neil Sims
                      </p>
                      <p className="truncate text-sm text-gray-400">
                        Token Price:
                      </p>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-primary">
                      1.57 ETP
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Page;
