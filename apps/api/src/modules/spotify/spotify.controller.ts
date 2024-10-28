import { FastifyReply, FastifyRequest } from "fastify";
import SpotifyService from "./spotify.service";

class SpotifyController {
  private spotifyService: SpotifyService;

  constructor(spotifyService: SpotifyService) {
    this.spotifyService = spotifyService;
  }
  public async featuredArtistsHandler(
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<void> {
    try {
      const featuredArtistsData =
        await this.spotifyService.getFeaturedArtists();
      reply.send(featuredArtistsData);
    } catch (error) {
      reply.code(500).send({ error: "Failed to fetch featured artists" });
    }
  }
}

export default SpotifyController;
