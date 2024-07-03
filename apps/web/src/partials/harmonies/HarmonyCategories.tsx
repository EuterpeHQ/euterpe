import React from "react";
import Image from "next/image";
import DollarIcon from "@/assets/icons/dollar.png";
import Spacer from "@/components/ui/spacer";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { HarmonyCategory } from "@/entities";
import { useToast } from "@/components/ui/use-toast";
import { useCreateHarmonyStore } from "@/providers/store/createHarmony.store";
import { Step, type StepItem, Stepper, useStepper } from "@/components/stepper";

type CategoryCardProps = HarmonyCategory;

function CategoryCard(props: CategoryCardProps) {
  const { toast } = useToast();
  const setHarmonyCategory = useCreateHarmonyStore(
    (state) => state.setHarmonyCategory,
  );
  const { nextStep } = useStepper();

  const enabledCategories = ["Revenue"];
  const enabled = enabledCategories.includes(props.name);
  const handleClick = () => {
    if (enabled) {
      setHarmonyCategory(props.name);
      nextStep();
    } else {
      toast({
        title: "Feature Unavailable",
        description: `${props.name} Harmony is not yet supported. Check back soon!`,
      });
    }
  };

  return (
    <div
      onClick={handleClick}
      className="group flex cursor-pointer flex-col items-start rounded-lg border border-transparent bg-surfaceVariant p-4 shadow-sm hover:bg-muted sm:p-6 lg:p-6"
    >
      <Image
        className="h-8 w-8"
        src={DollarIcon}
        alt={props.name}
        quality={100}
      />
      <h3 className="mt-4 text-sm font-medium text-primary">{props.name}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{props.description}</p>
    </div>
  );
}

function InfoCard() {
  return (
    <div className="mb-4 flex items-center justify-center gap-4 rounded-md border-2 border-orange-400 bg-orange-400/10 p-3">
      <InfoCircledIcon />
      <p className="text-sm">
        Only the Revenue harmonies are functional. We are working on improving
        and adding more harmonies.
      </p>
    </div>
  );
}

function HarmonyCategories() {
  const categories = [
    {
      name: "Revenue",
      description: "Share revenue and royalties with your fans.",
      image: "@/assets/icons/dollar.png",
    },
    {
      name: "Exclusive",
      description: "Give your fans access to exclusive content and music.",
      image: "@/assets/icons/favourite.png",
    },
    {
      name: "Interaction",
      description: "Enable your fans to interact and engage with you directly.",
      image: "@/assets/icons/dollar.png",
    },
    {
      name: "Merch",
      description: "Offer your fans discounted merchandise to support you.",
      image: "@/assets/icons/dollar.png",
    },
    {
      name: "Physical Experiences",
      description: "Provide unique physical experiences for your fans.",
      image: "@/assets/icons/dollar.png",
    },
    {
      name: "Governance",
      description:
        "Allow your fans to influence projects and vote on creative decisions.",
      image: "@/assets/icons/dollar.png",
    },
    {
      name: "Community",
      description:
        "Build a community where your fans can engage and participate.",
      image: "@/assets/icons/dollar.png",
    },
    {
      name: "Loyalty",
      description:
        "Reward your fans with benefits for their loyalty and support.",
      image: "@/assets/icons/dollar.png",
    },
  ];

  return (
    <div>
      <InfoCard />
      <Spacer size={24} />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((category) => (
          <CategoryCard key={category.name} {...category} />
        ))}
      </div>
    </div>
  );
}

export default HarmonyCategories;
