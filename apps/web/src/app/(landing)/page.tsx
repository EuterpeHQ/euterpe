import Hero from "@/components/Hero";
import Harmonies from "@/components/Harmonies";
import TopMusicians from "@/components/TopMusicians";
import Spacer from "@/components/ui/spacer";

export default function Page() {
  return (
    <main>
      <Spacer size={80} />
      <Hero />
      <Spacer size={100} />
      <TopMusicians />
      <Spacer size={100} />
      <Harmonies />
      <Spacer size={80} />
    </main>
  );
}
