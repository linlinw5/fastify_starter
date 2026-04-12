import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { env } from "../lib/env";

const sqlite = new Database(env.dbPath);

// 初始化建表（仅此处允许写 SQL）
sqlite.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    name       TEXT    NOT NULL,
    email      TEXT    NOT NULL UNIQUE,
    age        INTEGER,
    created_at TEXT    NOT NULL DEFAULT (datetime('now'))
  )
`);

export const db = drizzle({ client: sqlite });
