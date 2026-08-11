import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { user } from "./auth-schema";
import { relations } from "drizzle-orm";

export const halaqah = pgTable("halaqah", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  nama: text("nama").notNull(),
  pembimbingId: text("pembimbing_id").references(() => user.id, {
    onDelete: "set null",
  }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

export const halaqahRelations = relations(halaqah, ({ one }) => ({
  pembimbing: one(user, {
    fields: [halaqah.pembimbingId],
    references: [user.id],
  }),
}));

export type Halaqah = typeof halaqah.$inferSelect;
export type NewHalaqah = typeof halaqah.$inferInsert;
