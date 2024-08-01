import React from "react";
import { InfoCircledIcon } from "@radix-ui/react-icons";

function AnnouncementBar({ children }: { children?: React.ReactNode }) {
  return (
    <div
      className="border-b-[0.8px] border-[#313131] bg-black bg-announcement-gradient p-2 shadow-[0_1.5px_0_0_rgba(255,255,255,0.24)] backdrop-blur-xl"
      role="alert"
    >
      <div className="flex w-full items-start justify-center gap-x-2 text-sm md:items-center">
        <InfoCircledIcon className="h-3 w-3" />
        {children || "Add custom announcement message"}
      </div>
    </div>
  );
}

export default AnnouncementBar;
