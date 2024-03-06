"use client";

import React from "react";
import Lottie from "lottie-react";
import GirlLottie from "@/assets/animations/girl.json";
import { DotLottiePlayer } from "@dotlottie/react-player";

export function HeroLottie() {
  return (
    <Lottie
      className="h-full w-full"
      animationData={GirlLottie}
      loop
      autoplay
    />
  );
}

export function CoinLottie() {
  return (
    <DotLottiePlayer
      className="h-12 w-12"
      src="/animations/coin.lottie"
      autoplay
      loop
    />
  );
}
