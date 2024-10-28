import fp from "fastify-plugin";

export default fp(async (fastify) => {
  await fastify.register(require("fastify-overview"));
  await fastify.register(require("fastify-overview-ui"));
});
