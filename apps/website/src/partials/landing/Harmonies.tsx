import Spacer from "@/components/ui/spacer";
import { FaUncharted } from "react-icons/fa6";
import { TbCoins } from "react-icons/tb";
import { HiOutlineSparkles } from "react-icons/hi2";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FaRegNewspaper } from "react-icons/fa6";
import Balancer from "react-wrap-balancer";
import Image from "next/image";
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
        className="rounded-sm bg-[#313131] space-y-6 flex flex-col w-full w-[20%] md:w-[32%] md:h-[500px] border"
            >
        <div className=" flex justify-center items-center ms-10 mt-40 w-[80px] h-[80px] bg-[#FC8D27]">
          <Image src="/hiw6.png" className="rounded-sm m-auto w-10 h-10" alt="" width={100} height={100}/>
        </div>
        <p className="ms-10 text-white font-semibold text-2xl">Every Artist is a 
        unique cryptocurrency.</p>
        <p className="ms-10 text-sm text-[#A5A5A5]">Fans support their favourite artists as tradable cryptocurrencies that can be bought and sold, driving success in a decentralized marketplace.</p>
      </div>
      <div
        className="rounded-sm bg-[#313131] space-y-6 flex flex-col w-full w-[20%] md:w-[32%] md:h-[500px] border"
            >
        <div className=" flex justify-center items-center ms-10 mt-40 w-[80px] h-[80px] bg-[#FC8D27]">
          <Image src="/hiw7.png" className="rounded-sm m-auto w-10 h-10" alt="" width={100} height={100}/>
        </div>
        <p className="ms-10 text-white font-semibold text-2xl">Every Artist is a 
        unique cryptocurrency.</p>
        <p className="ms-10 text-sm text-[#A5A5A5]">Fans support their favourite artists as tradable cryptocurrencies that can be bought and sold, driving success in a decentralized marketplace.</p>
      </div>
      <div
        className="rounded-sm bg-[#313131] space-y-6 flex flex-col w-full w-[20%] h-auto md:w-[32%] md:h-[500px] border"
            >
        <div className=" flex justify-center items-center ms-10 mt-40 w-[80px] h-[80px] bg-[#FC8D27]">
          <Image src="/hiw5.png" className="rounded-sm m-auto w-10 h-10" alt="" width={100} height={100}/>
        </div>
        <p className="ms-10 text-white font-semibold text-2xl">Every Artist is a 
        unique cryptocurrency.</p>
        <p className="ms-10 text-sm text-[#A5A5A5]">Fans support their favourite artists as tradable cryptocurrencies that can be bought and sold, driving success in a decentralized marketplace.</p>
      </div>
    </aside>
  </section>
  );
}

export default HowItWorks;
