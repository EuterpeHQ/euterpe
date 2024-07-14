import Hero from "@/partials/landing/Hero";
import Harmonies from "@/partials/landing/Harmonies";
import TopMusicians from "@/partials/landing/TopMusicians";
import Spacer from "@/components/ui/spacer";
import PlumesAI from "@/partials/landing/PlumesAI";
import HowItWorks from "@/partials/landing/HowItWorks";
import Footer from "@/partials/landing/Footer";
import Revolutionary from "@/partials/landing/Reveloutionary";

export default function Page() {
 

  return (
    <main className="bg-black">
    <Hero />
    <Spacer size={100} />
    <TopMusicians />
    <Spacer size={100} />
    <Harmonies />
    <Spacer size={100} />
    {/* <HowItWorks /> */}
    <Spacer size={100} />
    <PlumesAI />
    <Revolutionary/>
    <Footer/>
  </main>
  );
}
