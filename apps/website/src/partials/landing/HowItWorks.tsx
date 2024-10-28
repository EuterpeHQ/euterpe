/* NOTE: CSS backdrop blur filter glitches and flickers on scroll,
 *       images are used for the blur effect as a workaround */

import React from "react";
import Spacer from "@/components/ui/spacer";
import ArtistTokenIcon from "@/assets/icons/artist-token-feature.svg";
import HarmonyIcon from "@/assets/icons/harmony-feature.svg";
import PlumesIcon from "@/assets/icons/plumes-feature.svg";
import Image, { StaticImageData } from "next/image";
import Balancer from "react-wrap-balancer";
import OrangeBlurryBlob from "@/assets/images/orange-blurry-blob.svg";

const features = [
  {
    title: "Every Artist is a unique cryptocurrency.",
    description:
      "Fans support their favourite artists using tradable cryptocurrencies that can be bought and sold, creating new revenue streams for artists via transaction fees.",
    icon: ArtistTokenIcon,
  },
  {
    title: "Harmonies unlock revenue sharing for Fans.",
    description:
      "Artists can offer revenue, royalties, and rewards linked to their music through NFTs, smart contracts, and legal agreements on the blockchain.",
    icon: HarmonyIcon,
  },
  {
    title: "Plumes empowers millions of emerging Artists.",
    description:
      "With Plumes as your AI companion, focusing on Music comes first. Artists and fans can navigate through Euterpe with personalized AI-powered assistance.",
    icon: PlumesIcon,
  },
];

function HowItWorks() {
  return (
    <section className="border-t border-t-[0.5px] border-border/80 px-10">
      <Spacer size={64} />
      <div className="flex flex-col items-center gap-12">
        <div className="flex max-w-lg flex-col gap-4">
          <h1 className="text-center font-aeonik text-6xl font-medium tracking-[-0.06rem]">
            How it works
          </h1>
          <p className="text-center text-sm text-muted-foreground">
            Learn how Euterpe uses DeFi to empower artists with financial and
            creative independence.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
          <ArtistTokenFeatureCard />
          <HarmonyFeatureCard />
          <PlumesFeatureCard />
        </div>
      </div>
    </section>
  );
}

type FeatureCardProps = {
  title: string;
  description: string;
  icon: string | StaticImageData;
};

function FeatureCard({ title, description, icon }: FeatureCardProps) {
  return (
    <div className="flex h-full w-full flex-1 flex-col gap-16 bg-white/[0.01] p-8">
      <div className="">
        <Spacer size={100} />
        <Image src={icon} alt={title} className="h-20 w-20" />
      </div>
      <div>
        <div className="flex flex-col gap-6">
          <h3 className="flex-wrap-reverse font-aeonik text-3xl/[32px] tracking-[-0.06rem]">
            <Balancer>
              {(() => {
                const charLimit = 20;
                let splitIndex = charLimit;
                while (splitIndex > 0 && title[splitIndex] !== " ") {
                  splitIndex--;
                }
                if (splitIndex === 0) splitIndex = charLimit;
                const firstPart = title.slice(0, splitIndex).trim();
                const restPart = title.slice(splitIndex).trim();
                return (
                  <>
                    {firstPart} <br /> {restPart}
                  </>
                );
              })()}
            </Balancer>
          </h3>
          <p className="text-xs font-light tracking-[-0.04rem] text-[#A5A5A5]">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

function ArtistTokenFeatureCard() {
  return (
    <div className="relative overflow-hidden border-[0.8px] bg-card shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]">
      <Image
        src={OrangeBlurryBlob}
        alt="Orange blurry blob"
        className="absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 object-cover opacity-30 blur-lg"
        width={500}
        height={500}
      />
      {/* <div className="bg-[radial-gradient(169.40%_89.55%_at_94.76%_6.29%,rgba(0,0,0,0.40)_0%,rgba(255,255,255,0.00)_100%) absolute bottom-24 right-20 h-16 w-16 rounded-full bg-[#FC8D27] blur-3xl" /> */}
      {/* <div className="blu absolute left-20 top-24 h-1 w-4 -rotate-45 rounded-full bg-[#FC8D27] blur-[60px]" />
      <div className="absolute right-16 top-28 h-1 w-4 -rotate-45 rounded-full bg-[#FC8D27] blur-[60px]" />
      <div className="absolute bottom-20 left-8 h-1 w-4 -rotate-45 rounded-full bg-[#FC8D27] blur-[60px]" />
      <div className="absolute bottom-24 right-16 h-6 w-7 -rotate-45 rounded-full bg-[#FC8D27] blur-[55px]" /> */}
      <FeatureCard {...features[0]} />
    </div>
  );
}

function HarmonyFeatureCard() {
  return (
    <div className="relative overflow-hidden border-[0.8px] bg-card shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]">
      <Image
        src={OrangeBlurryBlob}
        alt="Orange blurry blob"
        className="absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 object-cover opacity-30 blur-lg"
        width={500}
        height={500}
      />
      {/* <div className="absolute left-20 top-24 h-1 w-4 -rotate-45 rounded-full bg-[#FC8D27]" />
      <div className="absolute right-36 top-20 h-3.5 w-6 rotate-45 rounded-full bg-[#FC8D27]" />
      <div className="absolute bottom-20 left-8 h-1 w-4 -rotate-45 rounded-full bg-[#FC8D27]" />
      <div className="absolute bottom-24 right-16 h-1 w-4 -rotate-45 rounded-full bg-[#FC8D27]" /> */}
      <FeatureCard {...features[1]} />
    </div>
  );
}

function PlumesFeatureCard() {
  return (
    <div className="relative overflow-hidden border-[0.8px] bg-card shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]">
      <Image
        src={OrangeBlurryBlob}
        alt="Orange blurry blob"
        className="absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 object-cover opacity-30 blur-lg"
        width={500}
        height={500}
      />
      {/* <div className="absolute left-20 top-28 h-1 w-4 -rotate-45 rounded-full bg-[#FC8D27]" />
      <div className="absolute right-24 top-44 h-1 w-4 -rotate-45 rounded-full bg-[#FC8D27]" />
      <div className="absolute bottom-16 left-12 h-3.5 w-6 rotate-45 rounded-full bg-[#FC8D27]" />
      <div className="absolute bottom-24 right-24 h-1 w-4 -rotate-45 rounded-full bg-[#FC8D27]" /> */}
      <FeatureCard {...features[2]} />
    </div>
  );
}

export default HowItWorks;
