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
              Artisit Spotlight
              <br />
            </h1>
            <p className="text-blue-300">
              Explore how decentralized finance (DeFi) principles empower
              artists <br />
              Meet the hidden talents!
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
                <h1>
                  Featured Artist Interviews: Delving into the Creative Journey
                </h1>
                <br />
                <h1 className="">
                  Join us as we sit down with some of the most captivating
                  artists on Euterpe.
                </h1>
                <br />
                <h1>
                  We explore the creative process, inspirations, and experiences
                  that shape their music. From the challenges of the industry to
                  the moments of triumph, get to know the stories behind the
                  music straight from the artists themselves.
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
                <h1>Discovering the Next Big Names.</h1>
                <br />
                <h1 className="">
                  Discover the future stars of the music scene as we shine a
                  spotlight on emerging talent on Euterpe
                </h1>
                <br />
                <h1>
                  From fresh sounds to innovative approaches, these rising
                  artists are breaking boundaries and making their mark on the
                  industry. Explore their music, learn about their backgrounds,
                  and be among the first to witness the rise of the next
                  generation of musical talent.
                </h1>
              </div>
            </div>
            <div className="container flex w-full items-center justify-center md:w-[40%]">
              <Image
                className="rounded-lg"
                src="/images/hidden.webp"
                alt="breaking bars"
                width={400}
                height={270}
              />
            </div>
          </section>
          <section className="m-auto mt-20 flex flex-col-reverse items-center justify-between gap-y-8 text-yellow-400 md:flex-row">
            <div className="flex w-full max-w-2xl flex-col flex-wrap items-center justify-center p-2 md:w-[55%]">
              <div className="flex flex-col flex-wrap text-xl">
                <h1>Curating the Best of Euterpe</h1>
                <br />
                <h1 className="">
                  Get ready to discover your new favorite artists with our
                  community picks and recommendations on Euterpe.
                </h1>
                <br />
                <h1>
                  Drawing from the collective wisdom and tastes of our vibrant
                  music community, we curate a selection of must-listen artists
                  across genres and styles. Whether you're into indie rock,
                  electronic beats, or soulful ballads, there's something here
                  for everyone to enjoy and invest!
                </h1>
              </div>
            </div>
            <div className="container flex w-full items-center justify-center md:w-[40%]">
              <Image
                className="rounded-lg"
                src="/images/music.webp"
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
