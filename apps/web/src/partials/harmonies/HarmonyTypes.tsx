import React from "react";
import Spacer from "@/components/ui/spacer";
import { useToast } from "@/components/ui/use-toast";
import { useCreateHarmonyStore } from "@/providers/store/createHarmony.store";
import { useStepper } from "@/components/stepper";
import {
  FaYoutube,
  FaSpotify,
  FaMicrophone,
  FaHandshake,
  FaHeart,
  FaVideo,
  FaBullhorn,
  FaSignature,
  FaShirt,
  FaCrown,
  FaHeadphones,
  FaPaintbrush,
  FaUsers,
  FaInfinity,
  FaChartLine,
} from "react-icons/fa6";
import { FaMicrophoneAlt, FaTicketAlt } from "react-icons/fa";
import {
  GiReceiveMoney,
  GiProfit,
  GiTicket,
  GiDiamondTrophy,
  GiPresent,
} from "react-icons/gi";
import { MdAttachMoney, MdEvent, MdMonetizationOn } from "react-icons/md";
import { RiHandHeartLine } from "react-icons/ri";
import { Badge } from "@/components/ui/badge";
import { HarmonyType } from "@/entities";
import { cn } from "@/lib/utils";

type HarmonyCardProps = HarmonyType;

function HarmonyCard(props: HarmonyCardProps) {
  const setHarmonyType = useCreateHarmonyStore((state) => state.setHarmonyType);
  const { nextStep } = useStepper();

  const handleClick = () => {
    setHarmonyType(props.type);
    nextStep();
  };

  return (
    <div
      onClick={props.enabled ? handleClick : () => {}}
      className={cn(
        "group relative flex cursor-pointer flex-col items-start rounded-lg border-2 border-accent bg-surface p-4 shadow-sm hover:bg-surfaceVariant sm:p-6 lg:p-6",
        {
          "cursor-default opacity-50 hover:bg-surface": !props.enabled,
        },
      )}
    >
      <div className="flex items-center gap-2">
        {props.icon && <props.icon className="h-7 w-7" aria-hidden="true" />}
        <h3 className="text-sm font-medium">{props.type} Harmony</h3>
      </div>
      <p className="mt-1 text-sm text-muted-foreground">{props.description}</p>

      <Badge
        variant={props.badges[0] === "Coming Soon" ? "outline" : "secondary"}
        className="absolute right-3 top-1 mt-2 text-right"
      >
        {props.badges[0]}
      </Badge>
    </div>
  );
}

function HarmonyTypes() {
  const harmonyTypes: HarmonyType[] = [
    {
      type: "Fees",
      category: "Revenue",
      description:
        "Share a portion of sales and transaction fees with your fans.",
      icon: MdAttachMoney,
      enabled: true,
      badges: ["Popular"],
    },
    {
      type: "YouTube",
      category: "Revenue",
      description: "Enable fans to earn revenue from your YouTube content.",
      icon: FaYoutube,
      enabled: true,
      badges: ["New"],
    },
    {
      type: "Stake",
      category: "Revenue",
      description:
        "Allow fans to stake their tokens to support you and earn rewards.",
      icon: GiReceiveMoney,
      enabled: false,
      badges: ["Coming Soon"],
    },
    {
      type: "Yield",
      category: "Revenue",
      description:
        "Enable fans to earn passive income through yield farming with your token.",
      icon: GiProfit,
      enabled: false,
      badges: ["Coming Soon"],
    },
    {
      type: "Spotify",
      category: "Revenue",
      description: "Allow fans to earn revenue from your Spotify streams.",
      icon: FaSpotify,
      enabled: false,
      badges: ["Coming Soon"],
    },
    {
      type: "Events",
      category: "Revenue",
      description:
        "Share revenue from ticket sales of your events with your fans.",
      icon: FaTicketAlt,
      enabled: false,
      badges: ["Coming Soon"],
    },
    {
      type: "Performance",
      category: "Revenue",
      description:
        "A share of the revenue from live performances and tours is distributed to harmony holders.",
      icon: FaMicrophone,
      enabled: false,
      badges: ["Coming Soon"],
    },
    {
      type: "Early ICO",
      category: "Exclusive",
      description:
        "Allow fans to participate in ICO and secure tokens before the general public.",
      icon: MdMonetizationOn,
      enabled: true,
      badges: ["Exclusive"],
    },
    {
      type: "Preview",
      category: "Exclusive",
      description:
        "Holders get early access to new tracks, albums, and video releases before they are available to the public.",
      icon: MdEvent,
      enabled: false,
      badges: ["Coming Soon"],
    },
    {
      type: "Insider",
      category: "Exclusive",
      description:
        "Provides access to exclusive content such as making-of videos, artist interviews, and rehearsals.",
      icon: GiDiamondTrophy,
      enabled: false,
      badges: ["Coming Soon"],
    },
    {
      type: "Collector’s",
      category: "Exclusive",
      description:
        "When purchased fans gain exclusive, limited edition merchandise and memorabilia.",
      icon: GiPresent,
      enabled: false,
      badges: ["Coming Soon"],
    },
    {
      type: "FaceTime",
      category: "Interactive",
      description:
        "Fans have the opportunity to engage in virtual or in-person meet and greets with the artist.",
      icon: FaVideo,
      enabled: false,
      badges: ["Coming Soon"],
    },
    {
      type: "Shoutout",
      category: "Interactive",
      description:
        "Fans can receive personalized messages and shoutouts from the artist.",
      icon: FaBullhorn,
      enabled: false,
      badges: ["Coming Soon"],
    },
    {
      type: "Merch",
      category: "Merch",
      description:
        "Token holders can access special merchandise lines, or receive discounts on all artist-related merchandising.",
      icon: GiPresent,
      enabled: false,
      badges: ["Coming Soon"],
    },
    {
      type: "Signature",
      category: "Merch",
      description:
        "Offers fans exclusive autographed merchandise or limited edition items.",
      icon: FaSignature,
      enabled: false,
      badges: ["Coming Soon"],
    },
    {
      type: "Fashion",
      category: "Merch",
      description:
        "Fans can collaborate or vote on artist merchandise designs.",
      icon: FaShirt,
      enabled: false,
      badges: ["Coming Soon"],
    },
    {
      type: "Backstage Pass",
      category: "Experience",
      description:
        "Provides access to backstage passes for concerts, offering a behind-the-scenes look at live events.",
      icon: GiTicket,
      enabled: false,
      badges: ["Coming Soon"],
    },
    {
      type: "VIP",
      category: "Experience",
      description:
        "Special treatment at events, including premium seating, exclusive access areas, and private parties.",
      icon: FaCrown,
      enabled: false,
      badges: ["Coming Soon"],
    },
    {
      type: "Listening Party",
      category: "Experience",
      description:
        "Access to an exclusive concert or party celebrating a new album release.",
      icon: FaHeadphones,
      enabled: false,
      badges: ["Coming Soon"],
    },
    {
      type: "Studio",
      category: "Experience",
      description:
        "Fans can visit the artist in the studio during recording sessions, offering a firsthand look at the music production process.",
      icon: FaMicrophoneAlt,
      enabled: false,
      badges: ["Coming Soon"],
    },
    {
      type: "Creative",
      category: "Governance",
      description:
        "Engage with the artist directly to influence or create artwork, music videos, and other creative projects.",
      icon: FaPaintbrush,
      enabled: false,
      badges: ["Coming Soon"],
    },
    {
      type: "Inner Circle",
      category: "Governance",
      description:
        "Fans can participate in decision-making processes such as choosing setlists or song themes.",
      icon: FaUsers,
      enabled: false,
      badges: ["Coming Soon"],
    },
    {
      type: "Participant",
      category: "Community",
      description:
        "Fans can participate and volunteer in a community project or charitable event led by you.",
      icon: FaHandshake,
      enabled: false,
      badges: ["Coming Soon"],
    },
    {
      type: "Donation",
      category: "Community",
      description:
        "Allow your fans to support your causes with proceeds going to charity projects.",
      icon: RiHandHeartLine,
      enabled: false,
      badges: ["Coming Soon"],
    },
    {
      type: "Love",
      category: "Community",
      description:
        "Allow your fans to engage and donate to smaller artists you want to support.",
      icon: FaHeart,
      enabled: false,
      badges: ["Coming Soon"],
    },
    {
      type: "Forever",
      category: "Loyalty",
      description:
        "Forever fans and long-time token holders, can gain a special status that comes with additional benefits.",
      icon: FaInfinity,
      enabled: false,
      badges: ["Coming Soon"],
    },
    {
      type: "Investment",
      category: "Loyalty",
      description:
        "Fans can invest in your projects and business ventures beyond music.",
      icon: FaChartLine,
      enabled: false,
      badges: ["Coming Soon"],
    },
  ];

  const harmonyCategory = useCreateHarmonyStore(
    (state) => state.harmonyCategory,
  );
  const filteredHarmonyTypes = harmonyTypes.filter(
    (harmonyType) => harmonyType.category === harmonyCategory,
  );

  return (
    <div>
      <div>{harmonyCategory} Harmonies</div>
      <Spacer size={24} />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {filteredHarmonyTypes.map((harmonyType, index) => (
          <HarmonyCard key={index} {...harmonyType} />
        ))}
      </div>
    </div>
  );
}

export default HarmonyTypes;
