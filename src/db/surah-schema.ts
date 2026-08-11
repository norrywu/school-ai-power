import { pgTable, text, integer, timestamp } from "drizzle-orm/pg-core";

export const surah = pgTable("surah", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  nomor: integer("nomor").notNull().unique(),
  nama: text("nama").notNull(),
  jumlahAyat: integer("jumlah_ayat").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

export type Surah = typeof surah.$inferSelect;
export type NewSurah = typeof surah.$inferInsert;
