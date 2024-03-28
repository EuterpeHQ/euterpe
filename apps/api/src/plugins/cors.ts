import fp from "fastify-plugin";
import cors from "@fastify/cors";

export default fp(async (fastify) => {
  await fastify.register(cors, {
    origin: (origin, cb) => {
      if (process.env.NODE_ENV === "development") {
        cb(null, true);
        return;
      }
      if (!origin) return;

      const euterpeDomainRegex = /^https:\/\/euterpe.*\.vercel\.app$/;
      if (euterpeDomainRegex.test(origin)) {
        cb(null, true);
      } else {
        cb(new Error("Not allowed by CORS"), false);
      }
    },
    methods: ["GET", "POST"],
  });
});
