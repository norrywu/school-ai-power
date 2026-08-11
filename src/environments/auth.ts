import { requireEnv } from "./env-utils";

export const betterAuthSecret = requireEnv(
  process.env.BETTER_AUTH_SECRET,
  "BETTER_AUTH_SECRET",
);

export const betterAuthUrl = process.env.BETTER_AUTH_URL;
