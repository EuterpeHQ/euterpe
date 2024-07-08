import Spacer from "@/components/ui/spacer";
import { FaUncharted } from "react-icons/fa6";
import { TbCoins } from "react-icons/tb";
import { HiOutlineSparkles } from "react-icons/hi2";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FaRegNewspaper } from "react-icons/fa6";
import Balancer from "react-wrap-balancer";

const features = [
  {
    name: "Every Artist is a unique cryptocurrency.",
    description:
      "Fans support their favourite artists as tradable cryptocurrencies that can be bought and sold, driving success in a decentralized marketplace.",
    icon: TbCoins,
  },
  {
    name: "Harmonies unlock shared benefits for fans.",
    description:
      "Fans share rewards, royalties, and unique benefits linked to their favorite artists using NFTs bound by legal agreements and secure blockchain contracts.",
    icon: FaUncharted,
  },
  {
    name: "Plumes scans for millions of Artists.",
    description:
      "Plumes is a decentralized AI (dAI) that democratizes artists spotlighting and discovery without preferential treatment, giving independent artists a platform to rise and reach dedicated fans.",
    icon: HiOutlineSparkles,
  },
];

function HowItWorks() {
  return (
    <section className="border-b border-b-[#020403] p-2 px-8 my-4 mt-10">
    <div className="flex flex-col gap-y-3 justify-center items-center">
      <h2 className="font-aeonik text-4xl">How it works</h2>
      <p className="font-mono font-thin text-[#CDCDCD]">
        Learn How Euterpe's De-Fi platform helps music <br /> creators get
        funding and connect to fans.
      </p>
    </div>
    {/*  */}
    <aside className="my-10 gap-y-8 flex flex-col md:flex-row justify-between items-center">
      <div
        className="w-full w-[20%] h-[400px] md:w-[32%] md:h-[500px]"
        style={{
          backgroundImage: 'url("/images/hiw5.png")',
          backgroundSize: "cover",
          backgroundPosition: "cover",
          backgroundRepeat: "no-repeat",
        }}
      ></div>
      <div
        className="w-full  h-[350px] md:w-[32%] md:h-[500px]"
        style={{
          backgroundImage: 'url("/images/hiw6.png")',
          backgroundSize: "cover",
          backgroundPosition: "cover",
          backgroundRepeat: "no-repeat",
        }}
      ></div>
      <div
        className="w-full  h-[350px] md:w-[32%] md:h-[500px]"
        style={{
          backgroundImage: 'url("/images/hiw7.png")',
          backgroundSize: "cover",
          backgroundPosition: "cover",
          backgroundRepeat: "no-repeat",
        }}
      ></div>
    </aside>
  </section>
  );
}

export default HowItWorks;
