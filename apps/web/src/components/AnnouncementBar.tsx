import Link from "next/link";
import React from "react";
import { InfoCircledIcon } from "@radix-ui/react-icons";

function AnnouncementBar() {
  return (
    <div className=" px-4 py-3 text-white/90 shadow-md" role="alert">
      <div className="flex w-full items-start justify-center gap-x-2 md:items-center">
        <InfoCircledIcon className="h-4 w-4" />
        <div>
          <p className="text-sm">
            Ready to launch your music career?&nbsp;
            <Link href="/tokenomics/manage" className="text-primary">
              Create your unique artist token.
            </Link>
            &nbsp;&nbsp;Explore a new world of music investment&nbsp;
            <Link href="/exchange" className="text-primary">
              Buy ETP.
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default AnnouncementBar;
