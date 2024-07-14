import React from "react";
import { InfoCircledIcon } from "@radix-ui/react-icons";

function AnnouncementBar({ children }: { children?: React.ReactNode }) {
  return (
    <div
      className="sticky top-0 z-50 bg-black px-4 py-3 text-white/90 shadow-md bg-announcement-gradient"
      role="alert"
    >
      <div className="flex w-full items-start justify-center gap-x-2 text-sm md:items-center">
        <InfoCircledIcon className="h-4 w-4" />
        {children || "Add custom announcement message"}
      </div>
    </div>
  );
}

export default AnnouncementBar;
