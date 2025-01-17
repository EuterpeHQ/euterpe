import { join } from "path";
import AutoLoad, { AutoloadPluginOptions } from "@fastify/autoload";
import { FastifyPluginAsync, FastifyServerOptions } from "fastify";
import modules from "./modules";
import FastifySwagger from "@fastify/swagger";

export interface AppOptions
  extends FastifyServerOptions,
    Partial<AutoloadPluginOptions> {}
// Pass --options via CLI arguments in command to enable these options.
const options: AppOptions = {};

const app: FastifyPluginAsync<AppOptions> = async (
  fastify,
  opts
): Promise<void> => {
  await fastify.register(FastifySwagger);
  await fastify.register(require("@scalar/fastify-api-reference"), {
    routePrefix: "/docs",
  });
  void fastify.register(AutoLoad, {
    dir: join(__dirname, "plugins"),
    options: opts,
  });

  fastify.get("/api/healthcheck", async () => {
    return { status: "OK" };
  });
  fastify.register(modules, { prefix: "/api/v1" });
};

export default app;
export { app, options };
