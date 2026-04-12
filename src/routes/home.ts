import "@fastify/view";
import type { FastifyPluginAsync } from "fastify";

export const homeRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.get("/", async (_request, reply) => {
    return reply.view("home.eta", {
      title: "Welcome to the home page",
    });
  });
};
