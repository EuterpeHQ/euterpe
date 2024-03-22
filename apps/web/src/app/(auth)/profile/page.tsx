import React from "react";
import Image from "next/image";
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
      <div className="m-auto flex h-[900px] w-[60%] flex-col  border-2 border-primary">
        <h2 className="text-center text-2xl">Account Info</h2>

        <form className="justify-starth-[400px] mt-8 flex w-full flex-col  gap-y-4  border-2 border-orange-700">
          <div className=" mx-auto h-28 w-28 rounded-full border border-primary"></div>
          <label htmlFor="" className="space-y-10 text-2xl font-bold">
            Full Name
          </label>
          <p className="text-2xl text-primary">John Doe</p>
          <div className=" w-full border border-gray-400"></div>
          <label htmlFor="" className="text-2xl font-bold">
            User Name
          </label>
          <p className="text-2xl text-primary">Selena Gomez</p>
          <div className=" w-full border border-gray-400"></div>
        </form>
      </div>
    </div>
  );
}

export default Page;
