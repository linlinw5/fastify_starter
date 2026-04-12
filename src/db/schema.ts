import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  age: integer("age"),
  created_at: text("created_at")
    .notNull()
    .default(sql`(datetime('now'))`),
});

// TypeScript 类型推断
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
