import React from "react";
import LogoImage from "@/assets/images/logo.png";
import Image from "next/image";

export function Logomark(props: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div {...props}>
      <Image quality={100} className="h-8 w-8" src={LogoImage} alt="logo" />
    </div>
  );
}

export function Logo(props: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div className="flex items-center justify-center">
      <Logomark className="h-8 w-auto" />
      <p className="ml-2 text-base font-semibold">Euterpe</p>
    </div>
  );
}
