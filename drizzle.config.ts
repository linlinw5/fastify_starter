import { defineConfig } from "drizzle-kit";
export default defineConfig({
  dialect: "sqlite",
  dbCredentials: {
    url: "./data/db.sqlite",
  },
  schema: "./src/db/schema.ts",
  out: "./drizzle",
});
