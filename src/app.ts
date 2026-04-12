import Fastify from "fastify";
import fastifyStatic from "@fastify/static";
import swagger from "@fastify/swagger";
import view from "@fastify/view";
import { serializerCompiler, validatorCompiler, jsonSchemaTransform } from "fastify-type-provider-zod";
import { Eta } from "eta";
import path from "path";
import { homeRoutes, usersRoutes } from "./routes";
import { env } from "./lib/env";
import { fastifyLoggerOptions } from "./lib/logger";

// ── Fastify Instance ─────────────────────────────────────────────────────────
const fastify = Fastify({ logger: fastifyLoggerOptions });

// ── Zod type provider ────────────────────────────────────────────────────────
// Fastify Type Provider Zod lets us define request/response schemas with Zod and generate JSON Schema for validation and docs.
fastify.setValidatorCompiler(validatorCompiler);
fastify.setSerializerCompiler(serializerCompiler);

// ── Application Startup ─────────────────────────────────────────────────────
async function main() {
  try {
    // ── OpenAPI / Swagger ────────────────────────────────────────────────────────
    // Swagger collects Fastify routes and schemas and generates an OpenAPI-compliant document.
    await fastify.register(swagger, {
      openapi: {
        info: {
          title: "Users API",
          description: "Fastify + Zod + SQLite CRUD Example",
          version: "1.0.0",
        },
        tags: [{ name: "Users", description: "User Management Interface" }],
      },
      transform: jsonSchemaTransform,
    });

    // ── Scalar API Reference UI ──────────────────────────────────────────────────
    // Scalar provides a modern API documentation UI based on the OpenAPI spec and integrates well with Fastify.
    await fastify.register(import("@scalar/fastify-api-reference"), {
      routePrefix: "/docs",
      configuration: {
        theme: "saturn",
        title: "Users API Docs",
      },
    });

    // ── View Engine ───────────────────────────────────────────────────────────────
    // Eta is a lightweight JavaScript template engine for server-side HTML rendering.
    await fastify.register(view, {
      engine: {
        eta: new Eta(),
      },
      root: path.join(process.cwd(), "views"),
    });

    // ── Static Assets ─────────────────────────────────────────────────────────────
    // Serve static assets under /public (such as CSS, images, and client-side scripts).
    await fastify.register(fastifyStatic, {
      root: path.join(process.cwd(), "public"),
      prefix: "/public/",
    });

    // Routes
    await fastify.register(homeRoutes);
    await fastify.register(usersRoutes, { prefix: "/api" });

    // Start Server
    await fastify.listen({ port: env.port, host: env.host });
    fastify.log.info(`Server is running at http://${env.host}:${env.port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}

void main();
