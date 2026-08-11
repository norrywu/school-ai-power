import { requireEnv } from "./env-utils";

export const databaseUrl = requireEnv(
  process.env.DATABASE_URL || process.env.NEON_DATABASE_URL,
  "DATABASE_URL",
);
