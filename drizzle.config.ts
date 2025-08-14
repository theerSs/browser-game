import { defineConfig } from "drizzle-kit";

import env from "./server/configs/env/env";

export default defineConfig({
  out: "./server/configs/db/migrations",
  schema: "./server/configs/db/schema/index.ts",
  dialect: "turso",
  casing: "snake_case",
  dbCredentials: {
    url: env.TURSO_DATABASE_URL,
    authToken: env.NODE_ENV === "development" ? undefined : env.TURSO_AUTH_TOKEN,
  },
});
