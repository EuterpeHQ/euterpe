import React from "react";
import Footer from "@/partials/Footer";
import Spacer from "@/components/ui/spacer";
import { Logo } from "@/components/Logo";
import AnnouncementBar from "@/components/AnnouncementBar";
import Link from "next/link";

function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AnnouncementBar>
        <div>
          <p className="text-sm">
            Support Euterpe at &nbsp;
            <Link
              href="https://explorer.gitcoin.co/#/round/42161/23/51"
              className="text-primary"
            >
              GG20 🎉🎉
            </Link>
          </p>
        </div>
      </AnnouncementBar>
      <Spacer size={40} />
      <div className="w-full text-center">
        <Logo />
      </div>
      <Spacer size={80} />
      {children}
      <Spacer size={100} />
      <Spacer size={100} />
      <Footer />
    </>
  );
}

export default Layout;
