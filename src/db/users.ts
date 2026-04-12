import { eq } from "drizzle-orm";
import { db } from "./client";
import { users, type User, type NewUser } from "./schema";
import { logger } from "../lib/logger";

export function findAllUsers(): User[] {
  const result = db.select().from(users).all();
  logger("debug", "db", "findAllUsers", { result });
  return result;
}

export function findUserById(id: number): User | undefined {
  const result = db.select().from(users).where(eq(users.id, id)).get();
  logger("debug", "db", "findUserById", { id, result });
  return result;
}

export function createUser(data: NewUser): User {
  const result = db.insert(users).values(data).returning().get();
  logger("debug", "db", "createUser", { data, result });
  return result;
}

export function updateUser(id: number, data: Partial<Omit<NewUser, "id" | "created_at">>): User | undefined {
  const result = db.update(users).set(data).where(eq(users.id, id)).returning().get();
  logger("debug", "db", "updateUser", { id, data, result });
  return result;
}

export function deleteUser(id: number): boolean {
  const deleted = db.delete(users).where(eq(users.id, id)).returning().all();
  const result = deleted.length > 0;
  logger("debug", "db", "deleteUser", { id, deleted, result });
  return result;
}
