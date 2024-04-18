import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Artist } from "@/entities";

type ArtistResponse = {
  artists: Artist[];
};

const apiUrl =
  process.env.NEXT_PUBLIC_APP_ENV === "production"
    ? process.env.NEXT_PUBLIC_API_URL
    : process.env.NEXT_PUBLIC_APP_ENV === "staging"
      ? process.env.NEXT_PUBLIC_STAGING_API_URL
      : process.env.NEXT_PUBLIC_LOCAL_DEV_API_URL;

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
