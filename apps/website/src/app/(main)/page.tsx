import Hero from "@/partials/landing/Hero";
import Harmonies from "@/partials/landing/Harmonies";
import FeaturedArtists from "@/partials/landing/FeaturedArtists";
import Spacer from "@/components/ui/spacer";
import PlumesAI from "@/partials/landing/PlumesAI";
import HowItWorks from "@/partials/landing/HowItWorks";
import Revolutionary from "@/partials/landing/Revolutionary";
import { AuroraBackground } from "@/components/aceternity/aurora-background";

export default function Page() {
  return (
    <>
      <AuroraBackground className="h-fit">
        <div className="w-full bg-background">
          <Hero />
          <Spacer size={100} />
        </div>
      </AuroraBackground>
      <FeaturedArtists />
      <Spacer size={100} />
      <Harmonies />
      <Spacer size={100} />
      <HowItWorks />
      <Spacer size={100} />
      <PlumesAI />
      <Revolutionary />
    </>
  );
}
