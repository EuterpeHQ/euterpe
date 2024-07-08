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
    // <div className="overflow-hidden bg-background py-8 sm:py-16">
    //   <div className="mx-auto max-w-7xl px-6 lg:px-8">
    //     <div className="flex items-center justify-between">
    //       <div className="flex flex-col gap-2">
    //         <h2 className="text-3xl font-semibold">
    //           How{" "}
    //           <span className="text-primary underline underline-offset-4">
    //             Euterpe
    //           </span>{" "}
    //           Works
    //         </h2>
    //         <p className="text-sm md:max-w-sm lg:max-w-md">
    //           <Balancer>
    //             Learn How Euterpe's DeFi platform helps music creators get
    //             funding and connect to fans.
    //           </Balancer>
    //         </p>
    //       </div>
    //       <Button
    //         className="hidden gap-4 md:inline-flex"
    //         variant="outline"
    //         asChild
    //       >
    //         <Link href="/whitepaper">
    //           <FaRegNewspaper className="h-[13px] w-[13px]" />
    //           Read More
    //         </Link>
    //       </Button>
    //     </div>

    //     <Spacer size={40} />
    //     <div className="mx-auto grid max-w-2xl grid-cols-1 place-items-center gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
    //       <div className="lg:ml-auto lg:pl-4 lg:pt-4">
    //         <div className="lg:max-w-lg">
    //           <dl className="mt-0 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
    //             {features.map((feature) => (
    //               <div key={feature.name} className="relative pl-9">
    //                 <dt className="inline font-semibold text-white/80">
    //                   <feature.icon
    //                     className="absolute left-1 top-1 h-5 w-5 text-sm text-primary"
    //                     aria-hidden="true"
    //                   />
    //                   {feature.name}
    //                 </dt>{" "}
    //                 <br />
    //                 <dd className="inline text-muted-foreground">
    //                   {feature.description}
    //                 </dd>
    //               </div>
    //             ))}
    //           </dl>
    //         </div>
    //       </div>
    //       <div className=" order-first flex aspect-[16/9] items-start justify-end overflow-hidden rounded-xl shadow-xl ring-1 ring-gray-400/10">
    //         <img
    //           src="/images/vector-art.jpg"
    //           alt="Product screenshot"
    //           className=" aspect-[16/9] w-full max-w-none rounded-xl object-cover object-center"
    //           width={2432}
    //           height={1642}
    //         />
    //       </div>
    //     </div>
    //   </div>
    // </div>
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
        className="w-full md:w-[32%] h-[500px]"
        style={{
          backgroundImage: 'url("/images/hiw5.png")',
          backgroundSize: "cover",
          backgroundPosition: "cover",
          backgroundRepeat: "no-repeat",
        }}
      ></div>
      <div
        className="w-full md:w-[32%] h-[500px]"
        style={{
          backgroundImage: 'url("/images/hiw6.png")',
          backgroundSize: "cover",
          backgroundPosition: "cover",
          backgroundRepeat: "no-repeat",
        }}
      ></div>
      <div
        className="w-full md:w-[32%] h-[500px]"
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
