import { FastifyInstance, FastifyPluginOptions } from "fastify";
import spotify from "./spotify";

export default async (fastify: FastifyInstance, opts: FastifyPluginOptions) => {
  await Promise.all([fastify.register(spotify)]);
};
