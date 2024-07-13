import fp from "fastify-plugin";
import cors from "@fastify/cors";

export default fp(async (fastify) => {
  await fastify.register(cors, {
    origin: (origin, cb) => {
      if (process.env.APP_ENV === "development") {
        cb(null, "*");
        return;
      }
      if (!origin) return cb(null, false);

      let domainRE = new RegExp("");
      if (process.env.APP_ENV === "production") {
        domainRE = /^https:\/\/([a-z0-9]+\.)*euterpe\.(app|finance)$/;
      } else if (process.env.APP_ENV === "staging") {
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
