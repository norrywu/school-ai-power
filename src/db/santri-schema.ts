import { pgTable, text, timestamp, pgEnum } from "drizzle-orm/pg-core";
import { kelas } from "./kelas-schema";
import { halaqah } from "./halaqah-schema";
import { relations } from "drizzle-orm";

export const jenisKelaminEnum = pgEnum("jenis_kelamin", ["L", "P"]);

export const santri = pgTable("santri", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  nama: text("nama").notNull(),
  jenisKelamin: jenisKelaminEnum("jenis_kelamin").notNull(),
  kelasId: text("kelas_id").references(() => kelas.id, { onDelete: "set null" }),
  halaqahId: text("halaqah_id").references(() => halaqah.id, { onDelete: "set null" }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

export const santriRelations = relations(santri, ({ one }) => ({
  kelas: one(kelas, {
    fields: [santri.kelasId],
    references: [kelas.id],
  }),
  halaqah: one(halaqah, {
    fields: [santri.halaqahId],
    references: [halaqah.id],
  }),
}));

export type Santri = typeof santri.$inferSelect;
export type NewSantri = typeof santri.$inferInsert;
