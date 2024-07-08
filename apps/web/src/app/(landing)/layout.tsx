import React from "react";
import Footer from "@/partials/Footer";
import Spacer from "@/components/ui/spacer";
import { Logo } from "@/components/Logo";
import AnnouncementBar from "@/components/AnnouncementBar";
import Link from "next/link";
import Nav from "@/partials/landing/Nav";

function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) 

{
  return (
    
    <>
    <main className="bg-black">
     <Nav/>
      <Spacer size={40} />
      {/* <div className="w-full text-center">
        <Logo />
      </div> */}
      <Spacer size={80} />
      {children}
      {/* <Spacer size={100} /> */}
      <Spacer size={100} />
      {/* <Footer /> */}
    </main>

    </>
  );
}

export default Layout;
