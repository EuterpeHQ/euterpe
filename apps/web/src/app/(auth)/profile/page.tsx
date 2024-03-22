import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
function Page() {
  return (
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
            Account Settings <br />
          </h1>
          <p className="text-muted-foreground">
            Set your name, bio, and other public facing image
          </p>
          <div className="flex gap-4">
            <button className="w-36 rounded-lg border border-white bg-inherit p-2">
              Explore
            </button>
            <button className="w-36 rounded-lg border border-white bg-inherit p-2">
              Create
            </button>
          </div>
        </div>
      </div>
      {/* User profile */}
      <div className="m-auto mt-16 flex w-full  flex-col md:w-[60%]">
        <h2 className="rounded-l-sm rounded-r-sm border-b border-b-gray-300 text-center text-4xl font-bold text-blue-300 ">
          Account Info
        </h2>

        <form className=" mt-8 flex w-full flex-col gap-y-8 ">
          <div className=" m-auto mx-auto flex h-28 w-28 items-center justify-center rounded-full border border-primary p-1">
            <Image
              className="m-auto ms-3 h-20 w-20 text-center"
              src="/images/profile-nft.png"
              alt="profile"
              width={90}
              height={90}
            />
          </div>
          <label htmlFor="" className="space-y-10 text-2xl font-bold">
            Full Name
          </label>
          <p className="border-b-2 border-b-gray-400 text-2xl text-primary">
            John Doe
          </p>
          <label htmlFor="" className="text-2xl font-bold">
            User Name
          </label>
          <p className="border-b-2 border-b-gray-400 text-2xl text-primary ">
            Selena Gomez
          </p>
          <label htmlFor="" className="text-2xl font-bold">
            Email
          </label>
          <p className="border-b-2 border-b-gray-400 text-2xl text-primary ">
            example@example.com
          </p>
          <Button className="mt-8 font-semibold">Edit</Button>
        </form>
      </div>
    </div>
  );
}

export default Page;
