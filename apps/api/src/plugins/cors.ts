import fp from "fastify-plugin";
import cors from "@fastify/cors";

export default fp(async (fastify) => {
  await fastify.register(cors, {
    origin: (origin, cb) => {
      if (process.env.NODE_ENV === "development") {
        cb(null, "*");
        return;
      }
      if (!origin) return cb(null, false);

      let domainRE = new RegExp("");
      if (process.env.NODE_ENV === "production") {
        domainRE = /^https:\/\/([a-z0-9]+\.)*euterpe\.app$/;
      } else if (process.env.NODE_ENV === "staging") {
        domainRE = /^https:\/\/euterpe.*\.vercel\.app$/;
      }

      if (domainRE.test(origin)) {
        cb(null, true);
      } else {
        cb(new Error("Not allowed by CORS"), false);
      }
    },
    methods: ["GET", "POST"],
  });
});
