import { FastifyPluginAsync } from "fastify";
import spotifyRoute from "./spotify.route";

const spotify: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  await fastify.register(spotifyRoute, {
    prefix: "/spotify",
  });
};

export default spotify;
