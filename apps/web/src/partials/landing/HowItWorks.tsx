import Spacer from "@/components/ui/spacer";
import { FaUncharted } from "react-icons/fa6";
import { TbCoins } from "react-icons/tb";
import { HiOutlineSparkles } from "react-icons/hi2";
import { url } from "inspector";

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
    <div className="overflow-hidden bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:ml-auto lg:pl-4 lg:pt-4">
            <div className="lg:max-w-lg">
              <div className="flex flex-col gap-2">
                <h2 className="text-3xl font-semibold">
                  How{" "}
                  <span className="text-primary underline underline-offset-4">
                    Euterpe
                  </span>{" "}
                  Works
                </h2>
                <p className="text-sm">
                  Learn How Euterpe's DeFi platform helps music creators get
                  funding and connect to fans.
                </p>
              </div>
              <Spacer size={40} />
              <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
                {features.map((feature) => (
                  <div key={feature.name} className="relative pl-9">
                    <dt className="inline font-semibold text-white/80">
                      <feature.icon
                        className="absolute left-1 top-1 h-5 w-5 text-primary"
                        aria-hidden="true"
                      />
                      {feature.name}
                    </dt>{" "}
                    <br />
                    <dd className="inline text-muted-foreground">
                      {feature.description}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
          <div
            className="flex items-start justify-end lg:order-first"
            style={{
              backgroundImage: `url("/images/app.png")`,
              backgroundPosition: "center",
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
            }}
          >
            {/* <img
              src="/images/app.png"
              alt="Product screenshot"
              className="aspect-[2432/1642] w-[48rem] max-w-none rounded-xl object-contain object-right-top shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem]"
              width={2432}
              height={1642}
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HowItWorks;
