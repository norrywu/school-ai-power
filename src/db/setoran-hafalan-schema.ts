import { pgTable, text, integer, timestamp, pgEnum } from "drizzle-orm/pg-core";
import { santri } from "./santri-schema";
import { halaqah } from "./halaqah-schema";
import { surah } from "./surah-schema";
import { relations } from "drizzle-orm";

export const jenisSetoranEnum = pgEnum("jenis_setoran", ["ziyadah", "murajaah"]);

export const setoranHafalan = pgTable("setoran_hafalan", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  santriId: text("santri_id")
    .notNull()
    .references(() => santri.id, { onDelete: "cascade" }),
  halaqahId: text("halaqah_id").references(() => halaqah.id, {
    onDelete: "set null",
  }),
  tanggal: timestamp("tanggal").defaultNow().notNull(),
  surahId: text("surah_id")
    .notNull()
    .references(() => surah.id, { onDelete: "cascade" }),
  ayatMulai: integer("ayat_mulai").notNull(),
  ayatSelesai: integer("ayat_selesai").notNull(),
  jenis: jenisSetoranEnum("jenis").notNull().default("ziyadah"),
  nilai: text("nilai"),
  catatan: text("catatan"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

export const setoranHafalanRelations = relations(setoranHafalan, ({ one }) => ({
  santri: one(santri, {
    fields: [setoranHafalan.santriId],
    references: [santri.id],
  }),
  halaqah: one(halaqah, {
    fields: [setoranHafalan.halaqahId],
    references: [halaqah.id],
  }),
  surah: one(surah, {
    fields: [setoranHafalan.surahId],
    references: [surah.id],
  }),
}));

export type SetoranHafalan = typeof setoranHafalan.$inferSelect;
export type NewSetoranHafalan = typeof setoranHafalan.$inferInsert;
