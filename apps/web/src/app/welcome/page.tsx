"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import ConnectButton from "@/components/ConnectButton";
import { useAccount } from "wagmi";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useSidebarStore } from "@/providers/store/sidebar.store";
import Image from "next/image";
import Balancer from "react-wrap-balancer";

export default function Page() {
  const { isConnected } = useAccount();
  const [mode, setMode] = useState<"artist" | "fan">("fan");
  const setModeInStore = useSidebarStore((state) => state.setMode);
  const router = useRouter();

  return (
    <div
      className="flex h-screen w-screen items-center justify-center bg-[url('/images/listening.jpg')] bg-cover bg-fixed bg-center bg-center"
      style={{
        backgroundImage: `linear-gradient(hsl(var(--secondary)/ 0.4), rgba(135, 80, 156, 0.2)), url('/images/horizon.jpg')`,
      }}
    >
      <div className="flex w-full max-w-3xl flex-col items-center justify-center gap-6 rounded-3xl border border-border bg-background p-10 shadow-2xl">
        <h1 className="text-center text-xl font-bold md:text-4xl">
          Welcome to Euterpe
        </h1>
        <p className="-mt-4 max-w-lg text-center text-sm text-muted-foreground md:text-sm">
          <Balancer>
            Discover tomorrow's music stars today. Support their journey and
            earn alongside them.
          </Balancer>
        </p>
        <div className="flex flex-wrap justify-center gap-10">
          <div
            className={cn(
              "scale-100 cursor-pointer opacity-100 transition-all duration-200",
              mode !== "artist" && "scale-90",
            )}
            onClick={() => setMode("artist")}
          >
            <SelectOption
              type="Artist"
              text="Independently fund your music with a dedicated fanbase"
              img="/icons/musician.png"
              selected={mode === "artist"}
            />
          </div>
          <div
            className={cn(
              "scale-100 cursor-pointer opacity-100 transition-all duration-200",
              mode !== "fan" && "scale-90",
            )}
            onClick={() => setMode("fan")}
          >
            <SelectOption
              type="Fan"
              text="Rally behind your favorite music artists and earn rewards"
              img="/icons/music-lover.png"
              selected={mode === "fan"}
            />
          </div>
        </div>

        {isConnected ? (
          <div
            className="mx-auto flex w-36 cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-primary bg-primary/5 p-4 text-primary"
            onClick={() => {
              setModeInStore(mode === "artist" ? "creator" : "investor");
              router.push(mode === "artist" ? "/dashboard" : "/home");
            }}
          >
            <p className="text-sm font-bold">Enter</p>
          </div>
        ) : (
          <ConnectButton />
        )}
      </div>
    </div>
  );
}

interface SelectOptionProps {
  type: string;
  text: String;
  img: any;
  selected?: boolean;
}
function SelectOption({ type, text, img, selected }: SelectOptionProps) {
  return (
    <Card
      className={cn(
        "group flex h-[230px] w-[230px] cursor-pointer flex-col justify-center overflow-hidden border border-primary/20 bg-black/15 outline-none transition-all duration-200 md:hover:bg-primary/10 ",
        selected && "md:bg-primary/10",
      )}
    >
      <CardContent className="relative flex items-center justify-center p-0 md:p-4">
        <Image
          src={img}
          alt={type}
          width={100}
          height={100}
          className="h-24 w-24 object-contain"
        />
      </CardContent>
      <CardHeader className="p-4 text-sm md:p-0 md:pb-4 md:text-center">
        <CardTitle className="text-primary">{type}</CardTitle>
        <CardDescription>
          <span>{text}</span>
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex flex-col items-start justify-end md:hidden">
        <div className="mb-4 h-px w-full bg-primary/20" />
      </CardFooter>
    </Card>
  );
}
