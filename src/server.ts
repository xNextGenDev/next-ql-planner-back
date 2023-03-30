import Fastify, { FastifyInstance, RouteShorthandOptions } from "fastify";
import pino from "pino";
import mongodb from "./database/mongoose";
import "dotenv/config";

const logger = pino({
  level: "info",
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
    },
  },
});

const server: FastifyInstance = Fastify({ logger });

server.register(mongodb);

const opts: RouteShorthandOptions = {
  schema: {
    response: {
      200: {
        type: "object",
        properties: {
          pong: {
            type: "string",
          },
        },
      },
    },
  },
};

server.get("/ping", opts, async (request, reply) => {
  return { pong: "it worked!" };
});

const start = async () => {
  try {
    await server.listen({ port: 3000 });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};
start();
