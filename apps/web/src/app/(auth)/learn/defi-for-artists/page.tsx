import React from "react";
import Image from "next/image";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";

// import { StickyScroll } from "../ui/sticky-scroll-reveal";

function Page() {
  return (
    <>
      <div className="max-w-9xl mx-auto w-full px-4 py-8 sm:px-6 lg:px-8">
        {/* Change vector art */}
        <div className="relative mb-8 overflow-hidden rounded-sm bg-card sm:p-6">
          <div
            className="pointer-events-none absolute right-0 top-0 -mt-4  hidden xl:block"
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
              Defi for Artist
              <br />
            </h1>
            <p className="text-blue-300">
              Explore how decentralized finance (DeFi) principles empower
              artists <br />
              by providing direct access to funding and financial support from
              fans, bypassing traditional intermediaries.
            </p>
            <div className="flex gap-4">
              <button className="w-36 rounded-lg border border-white bg-inherit p-2">
                Explore
              </button>
              {/* <button className="w-36 rounded-lg border border-white bg-inherit p-2">
              Create
            </button> */}
            </div>
          </div>
        </div>
        {/*  */}
        <div className="flex flex-col items-center justify-center">
          <section className="mt-20 flex flex-col-reverse items-center justify-between gap-y-8 text-orange-400 md:flex-row">
            <div className="flex w-full max-w-2xl flex-col flex-wrap items-center justify-center p-2 md:w-[55%]">
              <div className="flex flex-col flex-wrap text-xl">
                <h1>Embrace your artistic freedom!</h1>
                <br />
                <h1 className="">
                  On Euterpe, musicians have the power to chart their own course
                  and express themselves authentically.
                </h1>
                <br />
                <h1>
                  Break free from constraints and unleash your creativity
                  without compromise.
                </h1>
              </div>
            </div>
            <div className="container flex w-full items-center justify-center md:w-[40%]">
              <Image
                className="rounded-lg"
                src="/images/music1.jpg"
                alt="breaking bars"
                width={400}
                height={270}
              />
            </div>
          </section>
          <section className="mt-20 flex flex-col-reverse items-center justify-between gap-y-8 md:flex-row">
            <div className="flex w-full max-w-2xl flex-col flex-wrap items-center justify-center p-2 md:w-[55%]">
              <div className="flex flex-col flex-wrap text-xl">
                <h1>
                  Artists are empowered with direct access to funding and
                  financial support from fans, bypassing traditional
                  intermediaries like record labels.
                </h1>
                <br />
                <h1 className="">
                  In Euterpe, we leverage your influence from platforms such as
                  Spotify, Apple Music, and Audio Mack worldwide to facilitate
                  funding based on your influence.
                </h1>
                <br />
                <h1>
                  Say goodbye to centralized control and earn on your own terms!
                </h1>
              </div>
            </div>
            <div className="container flex w-full items-center justify-center md:w-[40%]">
              <Image
                className="rounded-lg"
                src="/images/artist.jpg"
                alt="breaking bars"
                width={400}
                height={270}
              />
            </div>
          </section>
          <section className="m-auto mt-20 flex flex-col-reverse items-center justify-between gap-y-8 text-blue-300 md:flex-row">
            <div className="flex w-full max-w-2xl flex-col flex-wrap items-center justify-center p-2 md:w-[55%]">
              <div className="flex flex-col flex-wrap text-xl">
                <h1>
                  In Euterpe, artists have the opportunity to engage directly
                  with their fans and grow their fan base organically.
                </h1>
                <br />
                <h1 className="">
                  As your fan base increases, so does your potential for
                  earnings.
                </h1>
                <br />
                <h1>
                  Say hello to a thriving community of supporters who are eager
                  to invest in your talent and see you succeed!
                </h1>
              </div>
            </div>
            <div className="container flex w-full items-center justify-center md:w-[40%]">
              <Image
                className="rounded-lg"
                src="/images/crowd.webp"
                alt="breaking bars"
                width={400}
                height={270}
              />
            </div>
          </section>
        </div>
      </div>
      <div className="relative mb-8 flex items-center justify-center overflow-hidden rounded-sm bg-card p-6 sm:p-6">
        <h2 className="text-center text-primary">-Euterpe</h2>
      </div>
    </>
  );
}

export default Page;
