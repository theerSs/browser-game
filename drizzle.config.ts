import { defineConfig } from "drizzle-kit";

import env from "./server/utils/env/env";

export default defineConfig({
  out: "./server/utils/db/migrations",
  schema: "./server/utils/db/schema/index.ts",
  dialect: "turso",
  casing: "snake_case",
  dbCredentials: {
    url: env.TURSO_DATABASE_URL,
    authToken: env.NODE_ENV === "development" ? undefined : env.TURSO_AUTH_TOKEN,
  },
});
