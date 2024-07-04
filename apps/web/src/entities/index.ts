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
  name: string;
  description: string;
  image: string;
};
