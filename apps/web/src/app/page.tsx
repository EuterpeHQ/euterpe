import Hero from "@/partials/landing/Hero";
import Harmonies from "@/partials/landing/Harmonies";
import TopMusicians from "@/partials/landing/TopMusicians";
import Spacer from "@/components/ui/spacer";
import PlumesAI from "@/partials/landing/PlumesAI";
import Footer from "@/partials/landing/Footer";

export default function Page() {
  return (
    <main>
      <Spacer size={80} />
      <Hero />
      <Spacer size={100} />
      <TopMusicians />
      <Spacer size={100} />
      <Harmonies />
      <Spacer size={100} />
      <PlumesAI />
      <Spacer size={100} />
      <Spacer size={100} />
      <Footer />
    </main>
  );
}
