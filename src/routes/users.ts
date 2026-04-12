import { z } from "zod";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { findAllUsers, findUserById, createUser, updateUser, deleteUser } from "../db";

// ── Schemas ─────────────────────────────────────────────────────────────────

const UserSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  email: z.string(),
  age: z.number().int().nullable(),
  created_at: z.string(),
});

const UserIdParam = z.object({
  id: z.coerce.number().int().positive(),
});

const CreateUserBody = z.object({
  name: z.string().min(1).describe("User name"),
  email: z.email().describe("Email address, globally unique"),
  age: z.number().int().positive().optional().describe("Age (optional)"),
});

const UpdateUserBody = z.object({
  name: z.string().min(1).optional().describe("User name"),
  email: z.email().optional().describe("Email address"),
  age: z.number().int().positive().nullable().optional().describe("Age (null clears the value)"),
});

const NotFoundResponse = z.object({ message: z.string() });
const MessageResponse = z.object({ message: z.string() });

// ── Plugin ───────────────────────────────────────────────────────────────────

export const usersRoutes: FastifyPluginAsyncZod = async (fastify) => {
  // GET /users
  fastify.get(
    "/users",
    {
      schema: {
        tags: ["Users"],
        summary: "Get all users",
        response: { 200: z.array(UserSchema) },
      },
    },
    async () => findAllUsers(),
  );

  // GET /users/:id
  fastify.get(
    "/users/:id",
    {
      schema: {
        tags: ["Users"],
        summary: "Get user by ID",
        params: UserIdParam,
        response: {
          200: UserSchema,
          404: NotFoundResponse,
        },
      },
    },
    async (request, reply) => {
      const user = findUserById(request.params.id);
      if (!user) return reply.status(404).send({ message: "User not found" });
      return user;
    },
  );

  // POST /users
  fastify.post(
    "/users",
    {
      schema: {
        tags: ["Users"],
        summary: "Create user",
        body: CreateUserBody,
        response: {
          201: UserSchema,
        },
      },
    },
    async (request, reply) => {
      const user = createUser(request.body);
      return reply.status(201).send(user);
    },
  );

  // PATCH /users/:id
  fastify.patch(
    "/users/:id",
    {
      schema: {
        tags: ["Users"],
        summary: "Update user",
        params: UserIdParam,
        body: UpdateUserBody,
        response: {
          200: UserSchema,
          404: NotFoundResponse,
        },
      },
    },
    async (request, reply) => {
      const user = updateUser(request.params.id, request.body);
      if (!user) return reply.status(404).send({ message: "User not found" });
      return user;
    },
  );

  // DELETE /users/:id
  fastify.delete(
    "/users/:id",
    {
      schema: {
        tags: ["Users"],
        summary: "Delete user",
        params: UserIdParam,
        response: {
          200: MessageResponse,
          404: NotFoundResponse,
        },
      },
    },
    async (request, reply) => {
      const deleted = deleteUser(request.params.id);
      if (!deleted) return reply.status(404).send({ message: "User not found" });
      return { message: "Deleted successfully" };
    },
  );
};
