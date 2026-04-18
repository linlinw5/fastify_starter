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

const count = sqlite.prepare("SELECT COUNT(*) as count FROM users").get() as { count: number };
if (count.count === 0) {
  const insert = sqlite.prepare("INSERT INTO users (name, email, age) VALUES (?, ?, ?)");
  const seed = [
    ["Alice", "alice@example.com", 28],
    ["Bob", "bob@example.com", 34],
    ["Carol", "carol@example.com", 25],
    ["David", "david@example.com", 31],
  ];
  for (const [name, email, age] of seed) {
    insert.run(name, email, age);
  }
}

export const db = drizzle({ client: sqlite });
