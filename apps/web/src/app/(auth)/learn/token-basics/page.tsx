import React from "react";
import Image from "next/image";
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
              Token Basics
              <br />
            </h1>
            <p className="text-blue-300">
              Explore what a Token is and how to create and earn from your
              tokens.
            </p>
            <div className="flex gap-4">
              <button className="w-36 rounded-lg border border-white bg-inherit p-2">
                Explore
              </button>
            </div>
          </div>
        </div>
      </div>
      {/*  */}
      <div className="flex flex-col items-center justify-center">
        <section className="mt-20 flex flex-col-reverse items-center justify-between gap-y-8 text-orange-400 md:flex-row">
          <div className="flex w-full max-w-2xl flex-col flex-wrap items-center justify-center p-2 md:w-[55%]">
            <div className="flex flex-col flex-wrap text-xl">
              <h1>What is a Token?</h1>
              <br />
              <h1 className="">
                A token is a digital asset that represents ownership or access
                rights on a blockchain network.
              </h1>
              <br />
              <h1>
                In the context of Euterpe, artist tokens serve as a means for
                fans to invest in their favorite musicians and participate in
                the ecosystem.
              </h1>
            </div>
          </div>
          <div className="container flex w-full items-center justify-center md:w-[40%]">
            <Image
              className="rounded-lg"
              src="/images/token1.jpg"
              alt="breaking bars"
              width={400}
              height={270}
            />
          </div>
        </section>
        <section className="mt-20 flex flex-col-reverse items-center justify-between gap-y-8 md:flex-row">
          <div className="flex w-full max-w-2xl flex-col flex-wrap items-center justify-center p-2 md:w-[55%]">
            <div className="flex flex-col flex-wrap text-xl">
              <h1>Creating Artist Tokens</h1>
              <br />
              <h1 className="">
                As an artist on Euterpe, you have the power to create your own
                artist tokens. These tokens represent ownership and support for
                your creative work.
              </h1>
              <br />
              <h1>
                To create artist tokens, navigate to your Tokenomics in settings
                and follow the simple steps provided. Customize your tokens with
                unique attributes and set the initial supply for distribution.
              </h1>
            </div>
          </div>
          <div className="container flex w-full items-center justify-center md:w-[40%]">
            <Image
              className="rounded-lg"
              src="/images/token2.jpg"
              alt="breaking bars"
              width={400}
              height={270}
            />
          </div>
        </section>
        <section className="m-auto mt-20 flex flex-col-reverse items-center justify-between gap-y-8 text-blue-300 md:flex-row">
          <div className="flex w-full max-w-2xl flex-col flex-wrap items-center justify-center p-2 md:w-[55%]">
            <div className="flex flex-col flex-wrap text-xl">
              <h1>Selling Harmonies to Fans</h1>
              <br />
              <h1 className="">
                Once your Harmonies are created, fans can purchase them to
                access the associated rewards and benefits. Promote your
                Harmonies alongside your artist tokens to provide fans with
                additional ways to support you and engage with your creative
                endeavors.
              </h1>
              <br />
              <h1>
                Monitor the performance of your Harmonies and adjust rewards as
                needed to maintain fan interest and participation.
              </h1>
            </div>
          </div>
          <div className="container flex w-full items-center justify-center md:w-[40%]">
            <Image
              className="rounded-lg"
              src="/images/token3.jpg"
              alt="breaking bars"
              width={400}
              height={100}
            />
          </div>
        </section>
      </div>
      <div className="relative mb-8 mt-20 flex items-center justify-center overflow-hidden rounded-sm bg-card p-6 sm:p-6">
        <h2 className="text-center text-primary">-Euterpe</h2>
      </div>
    </>
  );
}

export default Page;
