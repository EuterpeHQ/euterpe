import { IconType } from "react-icons";

export type Artist = {
  id: string;
  name: string;
  image: string;
  link: string;
  popularity: number;
};

export type ArtistToken = {
  owner: `0x${string}`;
  address: `0x${string}`;
  name: string;
  symbol: string;
  value: string;
  totalSupply: string;
  artistName: string;
};

export type HarmonyCategory = {
  name:
    | "Revenue"
    | "Exclusive"
    | "Interactive"
    | "Merch"
    | "Experience"
    | "Governance"
    | "Community"
    | "Loyalty";
  description: string;
  image: string;
};

type BaseHarmony = {
  description: string;
  icon: IconType;
  enabled: boolean;
  badges: string[];
};

type Expand<T> = T extends infer O ? { [K in keyof O]: O[K] } : never;

type RevenueHarmonies = Expand<
  {
    type:
      | "Fees"
      | "YouTube"
      | "Stake"
      | "Yield"
      | "Spotify"
      | "Events"
      | "Performance";
    category: "Revenue";
  } & BaseHarmony
>;

type ExclusiveHarmonies = Expand<
  {
    type: "Early ICO" | "Preview" | "Insider" | "Collector’s";
    category: "Exclusive";
  } & BaseHarmony
>;

type InteractiveHarmonies = Expand<
  {
    type: "FaceTime" | "Shoutout";
    category: "Interactive";
  } & BaseHarmony
>;

type MerchHarmonies = Expand<
  {
    type: "Merch" | "Signature" | "Fashion";
    category: "Merch";
  } & BaseHarmony
>;

type ExperienceHarmonies = Expand<
  {
    type: "Backstage Pass" | "VIP" | "Listening Party" | "Studio";
    category: "Experience";
  } & BaseHarmony
>;

type GovernanceHarmonies = Expand<
  {
    type: "Creative" | "Inner Circle";
    category: "Governance";
  } & BaseHarmony
>;

type CommunityHarmonies = Expand<
  {
    type: "Participant" | "Donation" | "Love";
    category: "Community";
  } & BaseHarmony
>;

type LoyaltyHarmonies = Expand<
  {
    type: "Forever" | "Investment";
    category: "Loyalty";
  } & BaseHarmony
>;

export type HarmonyType =
  | RevenueHarmonies
  | ExclusiveHarmonies
  | InteractiveHarmonies
  | MerchHarmonies
  | ExperienceHarmonies
  | GovernanceHarmonies
  | CommunityHarmonies
  | LoyaltyHarmonies;
