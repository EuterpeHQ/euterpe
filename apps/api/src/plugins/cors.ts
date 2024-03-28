import fp from "fastify-plugin";
import cors from "@fastify/cors";

export default fp(async (fastify) => {
  await fastify.register(cors, {
    origin: (origin, cb) => {
      const euterpeDomainRegex = /^https:\/\/euterpe.*\.vercel\.app$/;
      const localhostRegex = /^http:\/\/localhost:\d+$/;
      if (!origin) return;
      if (euterpeDomainRegex.test(origin) || localhostRegex.test(origin)) {
        cb(null, true);
      } else {
        cb(new Error("Not allowed by CORS"), false);
      }
    },
    methods: ["GET", "POST"],
  });
});
