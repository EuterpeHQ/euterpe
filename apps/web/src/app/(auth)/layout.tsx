"use client";

import React from "react";
import ArtistSidebar from "@/partials/ArtistSidebar";
import FanSidebar from "@/partials/FanSidebar";
import { useSidebarStore } from "@/providers/store/sidebar.store";
import { DashboardLoader } from "@/components/Loader";
import { cn } from "@/lib/utils";
import Header from "@/partials/Header";

function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const mode = useSidebarStore((state) => state.mode);
  const hasHydrated = useSidebarStore((state) => state._hasHydrated);

  // if (!hasHydrated) {
  //   return <DashboardLoader isDone={hasHydrated} />;
  //   return <>Loading...</>;
  // }
  return (
    <div className={cn("flex h-screen overflow-hidden")}>
      {mode === "creator" ? <ArtistSidebar /> : <FanSidebar />}
      <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
        <Header />
        {children}
      </div>
    </div>
  );
}

export default Layout;
