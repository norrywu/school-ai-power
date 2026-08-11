import { defineConfig } from "drizzle-kit";
import { databaseUrl } from "./src/environments";

export default defineConfig({
  schema: "./src/db/**/*.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: databaseUrl,
  },
});
