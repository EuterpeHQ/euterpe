import React from "react";
import Footer from "@/partials/Footer";
import Spacer from "@/components/ui/spacer";
import { Logo } from "@/components/Logo";

function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
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
