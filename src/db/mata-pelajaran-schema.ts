import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { guruPelajaran } from "./guru-pelajaran-schema";

export const mataPelajaran = pgTable("mata_pelajaran", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  nama: text("nama").notNull(),
  kode: text("kode").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

export const mataPelajaranRelations = relations(mataPelajaran, ({ many }) => ({
  guruPelajaran: many(guruPelajaran),
}));

export type MataPelajaran = typeof mataPelajaran.$inferSelect;
export type NewMataPelajaran = typeof mataPelajaran.$inferInsert;
