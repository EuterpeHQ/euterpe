import { FastifyPluginAsync } from "fastify";
import SpotifyController from "./spotify.controller";
import SpotifyService from "./spotify.service";

const spotifyRoute: FastifyPluginAsync = async (
  fastify,
  opts
): Promise<void> => {
  const spotifyController = new SpotifyController(new SpotifyService());
  fastify.get(
    "/featured-artists",
    spotifyController.featuredArtistsHandler.bind(spotifyController)
  );
};

export default spotifyRoute;
