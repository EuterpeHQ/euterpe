import Hero from "@/components/Hero";
import TopMusicians from "@/components/TopMusicians";
import Spacer from "@/components/ui/spacer";

export default function Page() {
  return (
    <main>
      <Spacer size={80} />
      <Hero />
      <Spacer size={80} />
      <TopMusicians />
      <Spacer size={80} />
    </main>
  );
}
