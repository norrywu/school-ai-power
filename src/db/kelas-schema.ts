import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const kelas = pgTable("kelas", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  nama: text("nama").notNull(),
  tingkat: text("tingkat").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

export type Kelas = typeof kelas.$inferSelect;
export type NewKelas = typeof kelas.$inferInsert;
