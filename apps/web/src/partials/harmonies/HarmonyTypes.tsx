import React from "react";
import Spacer from "@/components/ui/spacer";
import { useToast } from "@/components/ui/use-toast";
import { useCreateHarmonyStore } from "@/providers/store/createHarmony.store";
import { useStepper } from "@/components/stepper";
import { FaYoutube, FaSpotify } from "react-icons/fa";
import { MdAttachMoney } from "react-icons/md";
import { GiReceiveMoney, GiProfit, GiTicket } from "react-icons/gi";
import { Badge } from "@/components/ui/badge";
import { HarmonyType } from "@/entities";
import { cn } from "@/lib/utils";

type HarmonyCardProps = HarmonyType;

function HarmonyCard(props: HarmonyCardProps) {
  const setHarmonyType = useCreateHarmonyStore((state) => state.setHarmonyType);
  const { nextStep } = useStepper();

  const handleClick = () => {
    setHarmonyType(props.name);
    nextStep();
  };

  return (
    <div
      onClick={props.enabled ? handleClick : () => {}}
      className={cn(
        "group relative flex cursor-pointer flex-col items-start rounded-lg border-2 border-accent bg-surface p-4 shadow-sm hover:bg-surfaceVariant sm:p-6 lg:p-6",
        {
          "cursor-default opacity-40 hover:bg-surface": !props.enabled,
        },
      )}
    >
      <div className="flex items-center gap-2">
        {props.icon && <props.icon className="h-8 w-8" aria-hidden="true" />}
        <h3 className="text-sm font-medium">{props.name} Harmony</h3>
      </div>
      <p className="mt-1 text-sm text-muted-foreground">{props.description}</p>

      <Badge
        variant={props.badges[0] === "Coming soon" ? "outline" : "secondary"}
        className="absolute right-3 top-1 mt-2 text-right"
      >
        {props.badges[0]}
      </Badge>
    </div>
  );
}

function HarmonyTypes() {
  const harmonyTypes = [
    {
      name: "Launch",
      description: "Share a portion of funds from your ICO with your fans.",
      icon: MdAttachMoney,
      enabled: true,
      badges: ["Popular"],
    },
    {
      name: "Fees",
      description:
        "Share a portion of transaction fees with your fans as a reward.",
      icon: MdAttachMoney,
      enabled: true,
      badges: ["Popular"],
    },
    {
      name: "YouTube",
      description: "Enable fans to earn revenue from your YouTube content.",
      icon: FaYoutube,
      enabled: true,
      badges: ["New"],
    },
    {
      name: "Stake",
      description:
        "Allow fans to stake their tokens to support you and earn rewards.",
      icon: GiReceiveMoney,
      enabled: false,
      badges: ["Coming soon"],
    },
    {
      name: "Yield",
      description:
        "Enable fans to earn passive income through yield farming with your token.",
      icon: GiProfit,
      enabled: false,
      badges: ["Coming soon"],
    },
    {
      name: "Spotify",
      description: "Allow fans to earn revenue from your Spotify streams.",
      icon: FaSpotify,
      enabled: false,
      badges: ["Coming soon"],
    },
    {
      name: "Events",
      description:
        "Share revenue from ticket sales of your events with your fans.",
      icon: GiTicket,
      enabled: false,
      badges: ["Coming soon"],
    },
    {
      name: "Performance",
      description:
        "A share of the revenue from live performances and tours is distributed to harmony holders.",
      icon: GiTicket,
      enabled: false,
      badges: ["Coming soon"],
    },
  ];

  const harmonyCategory = useCreateHarmonyStore(
    (state) => state.harmonyCategory,
  );

  return (
    <div>
      <div>{harmonyCategory} Harmonies</div>
      <Spacer size={24} />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {harmonyTypes.map((harmonyType, index) => (
          <HarmonyCard key={index} {...harmonyType} />
        ))}
      </div>
    </div>
  );
}

export default HarmonyTypes;
