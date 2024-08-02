import Hero from "@/partials/landing/Hero";
import Harmonies from "@/partials/landing/Harmonies";
import FeaturedArtists from "@/partials/landing/FeaturedArtists";
import Spacer from "@/components/ui/spacer";
import PlumesAI from "@/partials/landing/PlumesAI";
import HowItWorks from "@/partials/landing/HowItWorks";
import Footer from "@/partials/landing/Footer";
import Revolutionary from "@/partials/landing/Reveloutionary";

export default function Page() {
  return (
    <>
      <Hero />
      <Spacer size={100} />
      <FeaturedArtists />
      <Spacer size={100} />
      <Harmonies />
      <Spacer size={100} />
      <HowItWorks />
      <Spacer size={100} />
      <PlumesAI />
      <Revolutionary />
      <Footer />
    </>
  );
}
