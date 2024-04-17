import { test } from "node:test";
import * as assert from "node:assert";
import Fastify from "fastify";
import corsPlugin from "../../src/plugins/cors";

test("CORS allows all origins in development", async (t) => {
  process.env.APP_ENV = "development";
  const fastify = Fastify();
  await fastify.register(corsPlugin);
  await fastify.ready();

  const response = await fastify.inject({
    method: "GET",
    url: "/",
    headers: { Origin: "https://malicious-site.com" },
  });

  assert.equal(response.headers["access-control-allow-origin"], "*");
});

test("CORS policy for staging", async (t) => {
  process.env.APP_ENV = "staging";
  const fastify = Fastify();
  await fastify.register(corsPlugin);
  await fastify.ready();

  const allowedOrigins = [
    "https://euterpe.vercel.app",
    "https://euterpe.staging.vercel.app",
  ];
  for (let origin of allowedOrigins) {
    const response = await fastify.inject({
      method: "GET",
      url: "/",
      headers: { Origin: origin },
    });
    assert.equal(response.headers["access-control-allow-origin"], origin);
  }

  const blockedOrigins = ["https://malicious-site.com", "*"];
  for (let origin of blockedOrigins) {
    const response = await fastify.inject({
      method: "GET",
      url: "/",
      headers: { Origin: origin },
    });
    assert.equal(response.headers["access-control-allow-origin"], undefined);
  }
});

test("CORS policy for production", async (t) => {
  process.env.APP_ENV = "production";
  const fastify = Fastify();
  await fastify.register(corsPlugin);
  await fastify.ready();

  const allowedOrigins = ["https://euterpe.app", "https://www.euterpe.app"];
  for (let origin of allowedOrigins) {
    const response = await fastify.inject({
      method: "GET",
      url: "/",
      headers: { Origin: origin },
    });
    assert.equal(response.headers["access-control-allow-origin"], origin);
  }

  const blockedOrigins = [
    "https://euterpe.vercel.app",
    "https://malicious-site.com",
    "*",
  ];
  for (let origin of blockedOrigins) {
    const response = await fastify.inject({
      method: "GET",
      url: "/",
      headers: { Origin: origin },
    });
    assert.equal(response.headers["access-control-allow-origin"], undefined);
  }
});
