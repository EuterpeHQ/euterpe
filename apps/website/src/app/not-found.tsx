import React from "react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import ArrowRightIcon from "@/assets/icons/arrow-right.png";
import Link from "next/link";

function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-5 p-10">
      <title>Not Found | Euterpe</title>
      <div className="flex items-center gap-3">
        <h1 className="font-aeonik text-3xl font-medium text-muted-foreground">
          404
        </h1>
        <Separator orientation="vertical" className="h-10" />
        <p className="text-sm text-muted-foreground">
          Oops! Looks like this page hit a wrong note.
        </p>
      </div>
      <Button className="w-full max-w-sm text-xs sm:w-fit" asChild>
        <Link
          href="https://songwhip.com/bunmi/comforting-habits"
          target="_blank"
          rel="noopener noreferrer"
        >
          Play music
          <Image
            src={ArrowRightIcon}
            alt="Right Arrow Icon"
            width={24}
            height={24}
            className="ml-1"
          />
        </Link>
      </Button>
    </div>
  );
}

export default NotFound;
