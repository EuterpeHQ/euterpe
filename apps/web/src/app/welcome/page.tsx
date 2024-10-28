"use client";
import React, { useState } from "react";
import { ConnectButton } from "@/partials/welcome/ConnectButton";
import { cn } from "@/lib/utils";
import Image, { StaticImageData } from "next/image";

export default function Page() {
  const [mode, setMode] = useState<"artist" | "fan">("artist");

  return (
    <div
      className="h-screen w-screen overflow-hidden bg-cover bg-fixed bg-center"
      style={{
        backgroundImage: `url('https://images.pexels.com/photos/213207/pexels-photo-213207.jpeg')`,
      }}
    >
      <div className="flex h-full w-full flex-col items-center justify-end backdrop-blur-sm sm:justify-center">
        <div className="mb-8 flex w-[97%] flex-col items-center justify-center gap-8 rounded-3xl border border-[#313131] bg-[#282828] p-12 shadow-xl sm:mx-0 sm:mb-0 sm:w-fit sm:rounded-[40px]">
          <div className="flex flex-col items-center gap-2">
            <h1 className="text-center text-3xl font-semibold text-white">
              Welcome to Euterpe
            </h1>
            <p className="w-80 text-center text-sm leading-snug text-[#D0D0D0]">
              Discover tomorrow's music stars today. Support their journey and
              earn alongside them.
            </p>
          </div>

          <div className="flex justify-center gap-4">
            <UserCard
              title="I'm an Artist"
              description="Independently fund your music with a dedicated fanbase"
              image="/images/artist-user.png"
              selected={mode === "artist"}
              onClick={() => setMode("artist")}
            />
            <UserCard
              title="I'm a Fan"
              description="Rally behind your favorite music artists and earn rewards"
              image="/images/fan-user.png"
              selected={mode === "fan"}
              onClick={() => setMode("fan")}
            />
          </div>
          <ConnectButton userType={mode} />
        </div>
        <div className="absolute bottom-0 left-0 right-0 flex h-6 items-center justify-center bg-gradient-to-r from-[hsl(var(--secondary))]/40 to-[hsl(var(--secondary))]/40">
          <p className="text-xs">&copy; 2024 Euterpe. All Rights Reserved.</p>
        </div>
      </div>
    </div>
  );
}

type UserCardProps = React.HTMLAttributes<HTMLDivElement> & {
  title: string;
  description: string;
  image: string | StaticImageData;
  selected?: boolean;
};

function UserCard({
  title,
  description,
  image,
  selected,
  ...props
}: UserCardProps) {
  return (
    <div {...props}>
      <div
        className={cn(
          "hidden aspect-square w-[220px] cursor-pointer flex-col items-center gap-4 rounded-3xl border-[0.5px] border-[#313131] bg-[#1E1E1E] p-5 sm:flex",
          selected && "border-primary bg-primary/5",
        )}
      >
        <Image
          src={image}
          alt={title}
          width={110}
          height={110}
          className="h-24 w-24 object-contain"
        />
        <div className="flex flex-col items-center gap-1.5">
          <h1 className="text-base font-semibold text-primary">{title}</h1>
          <p className="text-center text-xs text-[#DCDCDC]">{description}</p>
        </div>
      </div>
      <div className="flex h-full w-full cursor-pointer flex-col items-center gap-2 sm:hidden">
        <div
          className={cn(
            "flex h-full w-full max-w-sm cursor-pointer items-center justify-center rounded-full border-[0.5px] border-[#313131] bg-[#1E1E1E] p-4",
            selected && "border-primary bg-primary/5",
          )}
        >
          <Image
            src={image}
            alt={title}
            width={110}
            height={110}
            className="object-contain"
          />
        </div>
        <h1 className="text-base font-semibold text-primary">{title}</h1>
      </div>
    </div>
  );
}
