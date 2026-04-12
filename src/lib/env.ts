import "dotenv/config";
import path from "path";

const toBool = (value: string | undefined, defaultValue: boolean): boolean => {
  if (value == null) return defaultValue;
  return value === "true" || value === "TRUE";
};

export const env = {
  nodeEnv: process.env.NODE_ENV ?? "development",
  host: process.env.HOST ?? "0.0.0.0",
  port: Number(process.env.PORT ?? "5000"),
  dbPath: process.env.DB_PATH ?? path.join(process.cwd(), "data/db.sqlite"),
  logger: {
    fastify: toBool(process.env.LOGGER_FASTIFY, true),
    db: toBool(process.env.LOGGER_DB, true),
  },
} as const;
