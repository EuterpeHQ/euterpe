export type Artist = {
  id: string;
  name: string;
  image: string;
  link: string;
  popularity: number;
};

export type ArtistToken = {
  address: `0x${string}`;
  name: string;
  symbol: string;
  value: string;
  totalSupply: string;
  artistName: string;
};
