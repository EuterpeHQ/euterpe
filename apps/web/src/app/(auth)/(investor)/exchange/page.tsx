import React from "react";
import Swap from "@/partials/exchange/Swap";

function Page() {
  return (
    <div className="max-w-9xl mx-auto w-full px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-1 text-xl font-bold text-foreground/80 md:text-2xl">
        Exchange
      </h1>
      <Swap />
    </div>
  );
}

export default Page;
