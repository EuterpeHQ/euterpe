import React from "react";
import {
  Avatar as OriginalAvatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

function Avatar({ className }: { className?: string }) {
  return (
    <OriginalAvatar
      className={cn(" h-24 w-24 rounded-none md:rounded-full", className)}
    >
      <AvatarImage
        className="mt-2 h-full w-full rounded-full"
        src="https://i.pravatar.cc/300"
        alt="avatar"
      />
      <AvatarFallback className="relative bg-black/5">
        <svg
          className="absolute left-1/2 h-full w-full -translate-x-1/2 text-black/20"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
            clipRule="evenodd"
          ></path>
        </svg>
      </AvatarFallback>
    </OriginalAvatar>
  );
}

export default Avatar;
