import axios from "axios";
import NodeCache from "node-cache";

class SpotifyService {
  private clientId: string;
  private clientSecret: string;
  private tokenUrl: string;
  private apiBaseUrl: string;
  private tokenCache: NodeCache;

  constructor() {
    this.clientId = process.env.SPOTIFY_CLIENT_ID!;
    this.clientSecret = process.env.SPOTIFY_CLIENT_SECRET!;
    this.tokenUrl = "https://accounts.spotify.com/api/token";
    this.apiBaseUrl = "https://api.spotify.com/v1";
    this.tokenCache = new NodeCache();
  }

  async getAccessToken() {
    const cachedToken = this.tokenCache.get("spotifyAccessToken");
    console.log("cached ", cachedToken);
    if (cachedToken) {
      return cachedToken;
    }

    try {
      const response = await axios.post(
        this.tokenUrl,
        {
          grant_type: "client_credentials",
          client_id: this.clientId,
          client_secret: this.clientSecret,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      const { access_token, expires_in } = response.data;
      this.tokenCache.set("spotifyAccessToken", access_token, expires_in - 60);

      return access_token;
    } catch (error) {
      console.error("Error fetching Spotify access token:", error);
      throw new Error("Failed to fetch Spotify access token");
    }
  }

  public async getFeaturedArtists() {
    const accessToken = await this.getAccessToken();

    try {
      const response = await axios.get(
        `${this.apiBaseUrl}/browse/new-releases?limit=20`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const newReleases = response.data.albums.items;

      let featuredArtistIds: string[] = [];
      for (let i = 0; i < newReleases.length; i++) {
        const artist = newReleases[i].artists[0];
        featuredArtistIds.push(artist.id);
      }
      const artistsResponse = await axios.get(
        `${this.apiBaseUrl}/artists?ids=${featuredArtistIds.join(",")}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      function transformArtistsData(artistsResponse: axios.AxiosResponse) {
        return artistsResponse.data.artists.map((artist: any) => ({
          id: artist.id,
          name: artist.name,
          image: artist.images[1].url,
          link: artist.external_urls.spotify,
          popularity: artist.popularity,
        }));
      }
      const featuredArtist = transformArtistsData(artistsResponse);

      return { artists: featuredArtist };
    } catch (error) {
      console.error("Error fetching featured artists from Spotify:", error);
      throw new Error("Failed to fetch featured artists from Spotify");
    }
  }
}

export default SpotifyService;
