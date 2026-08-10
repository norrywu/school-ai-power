import { betterAuth } from "better-auth";
import { drizzleAdapter } from "@better-auth/drizzle-adapter";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "../src/db/auth-schema";
import { databaseUrl, betterAuthSecret } from "../src/environments";

const sql = neon(databaseUrl);
export const db = drizzle(sql, { schema });

export const auth = betterAuth({
  secret: betterAuthSecret,
  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
  }),
  emailAndPassword: {
    enabled: true,
  },
});
