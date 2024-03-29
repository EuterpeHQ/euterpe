import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Artist } from "@/entities";

type ArtistResponse = {
  artists: Artist[];
};

const apiUrl =
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_API_URL
    : process.env.NEXT_PUBLIC_DEV_API_URL;

async function fetchFeaturedArtists() {
  const response = await axios.get<{
    artists: Artist[];
  }>(`${apiUrl}/spotify/featured-artists`);
  return response.data;
}

export function useFeaturedArtists() {
  return useQuery({
    queryKey: ["featuredArtists"],
    queryFn: fetchFeaturedArtists,
  });
}
