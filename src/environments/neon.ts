function requireEnv(value: string | undefined, name: string): string {
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value;
}

export const databaseUrl = requireEnv(
  process.env.DATABASE_URL || process.env.NEON_DATABASE_URL,
  "DATABASE_URL",
);

export const betterAuthSecret = requireEnv(
  process.env.BETTER_AUTH_SECRET,
  "BETTER_AUTH_SECRET",
);

export const betterAuthUrl = process.env.BETTER_AUTH_URL;
