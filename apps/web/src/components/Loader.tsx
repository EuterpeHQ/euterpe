"use client";

import React, { useState } from "react";
import { Progress } from "@/components/ui/progress";
import Spinner from "./Spinner";

export function DashboardLoader({ isDone }: { isDone: boolean }) {
  const [progress, setProgress] = useState(0);

  // React.useEffect(() => {
  //   if (!isDone) {
  //     // If not hydrated, start or continue showing progress
  //     const timer = setTimeout(() => {
  //       setProgress((prevProgress) =>
  //         prevProgress < 90 ? prevProgress + 10 : 90,
  //       );
  //     }, 100); // Adjust the timing and increment as needed
  //     return () => clearTimeout(timer);
  //   } else {
  //     // Once hydrated, complete the progress
  //     setProgress(100);
  //   }
  // }, [isDone]);

  return (<div className="flex h-screen w-full flex-col items-center justify-center">
    {/* <Progress value={progress} className="h-1 w-full bg-primary/20" /> */}
    <Spinner width={36} height={36} color="#c1ff7251" />
  </div>);
}
