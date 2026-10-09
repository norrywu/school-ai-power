import { pgTable, text, timestamp, index, uniqueIndex } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { user } from "./auth-schema";
import { mataPelajaran } from "./mata-pelajaran-schema";

export const guruPelajaran = pgTable(
  "guru_pelajaran",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    guruId: text("guru_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    mataPelajaranId: text("mata_pelajaran_id")
      .notNull()
      .references(() => mataPelajaran.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [
    index("guru_pelajaran_guru_id_idx").on(table.guruId),
    index("guru_pelajaran_mata_pelajaran_id_idx").on(table.mataPelajaranId),
    uniqueIndex("guru_mata_pelajaran_unique_idx").on(
      table.guruId,
      table.mataPelajaranId
    ),
  ]
);

export const guruPelajaranRelations = relations(guruPelajaran, ({ one }) => ({
  guru: one(user, {
    fields: [guruPelajaran.guruId],
    references: [user.id],
  }),
  mataPelajaran: one(mataPelajaran, {
    fields: [guruPelajaran.mataPelajaranId],
    references: [mataPelajaran.id],
  }),
}));

export type GuruPelajaran = typeof guruPelajaran.$inferSelect;
export type NewGuruPelajaran = typeof guruPelajaran.$inferInsert;
