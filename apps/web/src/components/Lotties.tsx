"use client";

import React from "react";
import Lottie from "lottie-react";
import GirlLottie from "@/assets/animations/girl.json";
import { DotLottiePlayer } from "@dotlottie/react-player";
import LiveLottieAnimation from "@/assets/animations/live.json";

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

export function LiveLottie() {
  return (
    <Lottie
      className="h-5 w-5"
      animationData={LiveLottieAnimation}
      loop
      autoplay
    />
  );
}
