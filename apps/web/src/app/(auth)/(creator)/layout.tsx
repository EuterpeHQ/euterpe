"use client";

import React from "react";
import { useSidebarStore } from "@/providers/store/sidebar.store";

function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const setMode = useSidebarStore((state) => state.setMode);
  setMode("creator");

  return <div>{children}</div>;
}

export default Layout;
