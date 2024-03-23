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
              Investing Guides
              <br />
            </h1>
            <p className="text-blue-300">
              Explore how decentralized finance (DeFi) principles empower
              artists <br />
              Invest in the future!
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
          <section className="mt-20 flex flex-col-reverse items-center justify-between gap-y-8 text-purple-400 md:flex-row">
            <div className="flex w-full max-w-2xl flex-col flex-wrap items-center justify-center p-2 md:w-[55%]">
              <div className="flex flex-col flex-wrap text-xl">
                <h1>Why Invest in Euterpe?</h1>
                <br />
                <h1 className="">
                  Investing in Euterpe presents a unique opportunity to support
                  the future of the music industry while potentially earning
                  returns on your investment.
                </h1>
                <br />
                <h1>
                  By investing in Euterpe, you're not just supporting individual
                  artists; you're contributing to the disruption of traditional
                  music industry models, empowering artists to retain control of
                  their creative work, and creating a more equitable and
                  decentralized ecosystem for musicians and fans alike.
                </h1>
              </div>
            </div>
            <div className="container flex w-full items-center justify-center md:w-[40%]">
              <Image
                className="rounded-lg"
                src="/images/why-invest.jpg"
                alt="breaking bars"
                width={400}
                height={270}
              />
            </div>
          </section>
          <section className="mt-20 flex flex-col-reverse items-center justify-between gap-y-8 md:flex-row">
            <div className="flex w-full max-w-2xl flex-col flex-wrap items-center justify-center p-2 md:w-[55%]">
              <div className="flex flex-col flex-wrap text-xl">
                <h1>How to Invest in Euterpe</h1>
                <br />
                <h1 className="">
                  You can invest by purchasing artist tokens, participating in
                  funding strategies like Harmonies, or acquiring governance
                  tokens to participate in platform governance and
                  decision-making processes.
                </h1>
                <br />
                <h1>
                  With various investment options available, you can choose the
                  approach that aligns best with your investment goals and
                  preferences.
                </h1>
              </div>
            </div>
            <div className="container flex w-full items-center justify-center md:w-[40%]">
              <Image
                className="rounded-lg"
                src="/images/how-invest.jpg"
                alt="breaking bars"
                width={400}
                height={270}
              />
            </div>
          </section>
          <section className="m-auto mt-20 flex flex-col-reverse items-center justify-between gap-y-8 text-blue-300 md:flex-row">
            <div className="flex w-full max-w-2xl flex-col flex-wrap items-center justify-center p-2 md:w-[55%]">
              <div className="flex flex-col flex-wrap text-xl">
                <h1>The Impact of Your Investment</h1>
                <br />
                <h1 className="">
                  When you invest in Euterpe, you're not just investing in a
                  platform; you're investing in the future of music.
                </h1>
                <br />
                <h1>
                  Your investment directly supports artists in realizing their
                  creative potential, breaking free from traditional industry
                  constraints, and connecting with their fans on a deeper level.
                  By investing in Euterpe, you're helping to shape a more
                  vibrant, diverse, and inclusive music ecosystem for
                  generations to come.
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
