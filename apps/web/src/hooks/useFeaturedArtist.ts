import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Artist } from "@/entities";

type ArtistResponse = {
  artists: Artist[];
};

async function fetchFeaturedArtists() {
  const response = await axios.get<{
    artists: Artist[];
  }>(`${process.env.NEXT_PUBLIC_API_URL}/spotify/featured-artists`);
  return response.data;
}

export function useFeaturedArtists() {
  return useQuery({
    queryKey: ["featuredArtists"],
    queryFn: fetchFeaturedArtists,
  });
}
