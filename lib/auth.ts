import { betterAuth } from "better-auth";
import { drizzleAdapter } from "@better-auth/drizzle-adapter";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { nextCookies } from "better-auth/next-js";
import { admin } from "better-auth/plugins/admin";
import * as schema from "../src/db/auth-schema";
import { databaseUrl, betterAuthSecret } from "../src/environments";
import { ac, roles } from "../src/lib/permissions";

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
  plugins: [
    nextCookies(),
    admin({
      ac,
      roles,
      defaultRole: "teacher",
      adminRoles: ["admin"],
    }),
  ],
});
