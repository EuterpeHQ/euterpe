"use client";

import React from "react";
import Sidebar from "@/partials/CreatorSidebar";
import InvestorSidebar from "@/partials/InvestorSidebar";
import { useSidebarStore } from "@/providers/store/sidebar.store";
import { DashboardLoader } from "@/components/Loader";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import Header from "@/partials/Header";

const inter = Inter({ weight: ["300", "700"], subsets: ["latin"] });

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
    <div className={cn("flex h-screen overflow-hidden", inter.className)}>
      {mode === "creator" ? <Sidebar /> : <InvestorSidebar />}
      <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
        <Header />
        {children}
      </div>
    </div>
  );
}

export default Layout;
