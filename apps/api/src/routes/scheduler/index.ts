import { FastifyPluginAsync } from "fastify";

const scheduler: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.post("/", async function (request, reply) {
    console.log(request);
    // const job = request.query.job
    return { starting: true };
  });
};

export default scheduler;
