import { env } from "./env";
import pino from "pino";

type LoggerConfig = typeof env.logger;
export type DebugScope = Exclude<keyof LoggerConfig, "fastify">;
export type LogLevel = "debug" | "info" | "warn" | "error";

const prettyOptions = {
  colorize: true,
  translateTime: "SYS:yyyy-mm-dd HH:MM:ss",
  ignore: "pid,hostname",
} as const;

const loggerOptions = {
  level: env.nodeEnv === "development" ? "debug" : "info",
  ...(env.nodeEnv === "development"
    ? {
        transport: {
          target: "pino-pretty",
          options: prettyOptions,
        },
      }
    : {}),
} as const;

const pinoLogger = pino(loggerOptions);

function formatValue(value: unknown): unknown {
  if (value instanceof Error) {
    return {
      name: value.name,
      message: value.message,
      stack: value.stack,
    };
  }

  return value;
}

function isDebugEnabled(scope: DebugScope): boolean {
  if (env.nodeEnv !== "development") return false;
  return env.logger[scope];
}

export function logger(level: LogLevel, scope: DebugScope, event: string, details: Record<string, unknown> = {}): void {
  if (level === "debug" && !isDebugEnabled(scope)) return;

  const detailsPayload = Object.fromEntries(Object.entries(details).map(([key, value]) => [key, formatValue(value)]));
  const message = `Scope: ${scope}, Event: ${event}`;
  pinoLogger[level](detailsPayload, message);
}

export const fastifyLoggerOptions = env.logger.fastify ? loggerOptions : false;
