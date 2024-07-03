import React from "react";
import Spacer from "@/components/ui/spacer";
import { useToast } from "@/components/ui/use-toast";
import { useCreateHarmonyStore } from "@/providers/store/createHarmony.store";
import { BsPiggyBank } from "react-icons/bs";
import { FaYoutube } from "react-icons/fa";
import { IconType } from "react-icons";

type HarmonyCardProps = {
  name: string;
  description: string;
  icon: IconType;
};

function HarmonyCard(props: HarmonyCardProps) {
  const setHarmonyType = useCreateHarmonyStore((state) => state.setHarmonyType);
  const { nextStep } = useStepper();

  const handleClick = () => {
    setHarmonyType(props.name);
    nextStep();
  };

  return (
    <div
      onClick={handleClick}
      className="group flex cursor-pointer flex-col items-start rounded-lg border-2 border-accent bg-surface p-4 shadow-sm hover:bg-surfaceVariant sm:p-6 lg:p-6"
    >
      <div className="flex items-center gap-2">
        {props.icon && <props.icon className="h-8 w-8" aria-hidden="true" />}
        <h3 className="text-sm font-medium">{props.name} Harmony</h3>
      </div>
      <p className="mt-1 text-sm text-muted-foreground">{props.description}</p>
    </div>
  );
}

function HarmonyTypes() {
  const harmonyTypes = [
    {
      name: "Yield",
      description: "Enable fans to earn passive income on your Token.",
      icon: BsPiggyBank,
    },
    {
      name: "YouTube",
      type: "Streaming",
      category: "Revenue",
      description: "Enable fans to earn revenue on your YouTube content",
      icon: FaYoutube,
    },
  ];

  const harmonyCategory = useCreateHarmonyStore(
    (state) => state.harmonyCategory,
  );

  return (
    <div>
      <div>{harmonyCategory}</div>
      <Spacer size={24} />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {harmonyTypes.map((harmonyType) => (
          <HarmonyCard key={harmonyType.name} {...harmonyType} />
        ))}
      </div>
    </div>
  );
}

export default HarmonyTypes;
