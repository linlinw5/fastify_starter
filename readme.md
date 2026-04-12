# Fastify + Scalar Starter

A small Fastify starter with:

- Fastify
- Scalar API docs
- Zod-based schemas
- Eta templates
- Static assets
- SQLite via better-sqlite3
- dotenv-based environment config

## Requirements

- Node.js 20 or newer
- npm

## Setup

````bash
git clone git@github.com:linlinw5/fastify_starter.git
cd fastify_starter
npm install

## Environment

Copy [.env.example](.env.example) to `.env` if you want to override defaults:

```bash
cp .env.example .env
````

Available variables:

- `NODE_ENV` - runtime mode, defaults to `development`
- `HOST` - server host, defaults to `0.0.0.0`
- `PORT` - server port, defaults to `5000`
- `DB_PATH` - SQLite database file path, defaults to `data/db.sqlite`
- `LOGGER_FASTIFY` - enable Fastify built-in logger, defaults to `true`
- `LOGGER_DB` - enable DB debug logs in custom logger, defaults to `true`

````

## Development

```bash
npm run dev
````

## Production

```bash
npm run build
npm start
```

## Scripts

- `npm run dev` - start the app in watch mode
- `npm run build` - build the production bundle into `dist/`
- `npm run start` - run the production build
- `npm run typecheck` - run TypeScript type checking

## Project Structure

- `src/app.ts` - application bootstrap
- `src/routes/` - route definitions
- `src/db/` - database access layer
- `views/` - Eta templates
- `public/` - static assets
- `data/` - local SQLite database files

## Notes

- The generated SQLite database file is ignored by Git.
- After cloning, run `npm install` before starting the app.

---

## 中文版

这是一个简洁的 Fastify 启动模板，包含：

- Fastify
- Scalar API 文档
- Zod Schema 校验
- Eta 模板引擎
- 静态资源支持
- 基于 better-sqlite3 的 SQLite
- 基于 dotenv 的环境变量配置

### 环境要求

- Node.js 20+
- npm

### 初始化

```bash
git clone git@github.com:linlinw5/fastify_starter.git
cd fastify_starter
npm install
```

### 环境变量

如果你需要自定义配置，可复制 `.env.example` 为 `.env`：

```bash
cp .env.example .env
```

支持的变量：

- `NODE_ENV`：运行环境，默认 `development`
- `HOST`：服务监听地址，默认 `0.0.0.0`
- `PORT`：服务端口，默认 `5000`
- `DB_PATH`：SQLite 文件路径，默认 `data/db.sqlite`
- `LOGGER_FASTIFY`：是否开启 Fastify 内置日志，默认 `true`
- `LOGGER_DB`：是否开启 DB 调试日志，默认 `true`

### 开发运行

```bash
npm run dev
```

### 生产运行

```bash
npm run build
npm start
```

### 可用脚本

- `npm run dev`：开发模式（watch）
- `npm run build`：构建产物到 `dist/`
- `npm run start`：运行生产构建产物
- `npm run typecheck`：TypeScript 类型检查

### 目录说明

- `src/app.ts`：应用启动入口
- `src/routes/`：路由定义
- `src/db/`：数据库访问层
- `views/`：Eta 模板文件
- `public/`：静态资源
- `data/`：本地 SQLite 数据文件

### 备注

- SQLite 数据文件默认已在 Git 忽略列表中。
- 克隆后请先执行 `npm install` 再启动项目。
