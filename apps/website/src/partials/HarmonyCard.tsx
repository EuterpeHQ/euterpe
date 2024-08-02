import React from "react";
import Image from "next/image";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import CoinIcon from "@/assets/icons/coin.png";
import { Badge } from "@/components/ui/badge";

export type HarmonyCardProps = {
  name: string;
  artist: string;
  description: string;
  price: string;
  image: string;
  avatar: string;
  expires: string;
};

export function HarmonyCard({
  name,
  artist,
  description,
  price,
  image,
  avatar,
  expires,
}: HarmonyCardProps) {
  return (
    <div className="relative flex w-60 flex-col items-center gap-3 bg-card p-4">
      <Image
        src={image}
        alt="harmony"
        className="h-full w-full object-cover"
        width={216}
        height={180}
      />
      <div className="flex flex-col gap-1.5">
        <h3 className="text-[0.813rem] text-primary">{name}</h3>
        <p className="text-[0.625rem] font-extralight text-muted-foreground">
          {description}
        </p>
        <div className="flex items-center">
          <Avatar className="h-5 w-5">
            <AvatarImage
              src={avatar}
              alt="avatar"
              className="object-cover object-top"
            />
          </Avatar>
          <p className="ml-2 text-[0.625rem] font-medium">{artist}</p>
        </div>
      </div>
      <div className="flex w-full items-center justify-between">
        <Badge
          variant="secondary"
          className="flex items-center rounded-full bg-primary/5 p-1 px-2 text-primary"
        >
          <Image src={CoinIcon} alt="coin icon" className="mr-1 w-2.5" />
          {price} EUT
        </Badge>
        <div className="flex flex-col -space-y-0.5 text-[0.625rem]">
          <p className="text-muted-foreground">Ends in</p>
          <p className="font-medium">{expires}</p>
        </div>
      </div>
    </div>
  );
}
