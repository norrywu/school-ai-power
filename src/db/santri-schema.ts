import { pgTable, text, timestamp, pgEnum } from "drizzle-orm/pg-core";

export const jenisKelaminEnum = pgEnum("jenis_kelamin", ["L", "P"]);

export const santri = pgTable("santri", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  nama: text("nama").notNull(),
  jenisKelamin: jenisKelaminEnum("jenis_kelamin").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

export type Santri = typeof santri.$inferSelect;
export type NewSantri = typeof santri.$inferInsert;
