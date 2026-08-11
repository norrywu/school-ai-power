import { z } from "zod";

export const halaqahSchema = z.object({
  nama: z.string().min(2, "Nama halaqah minimal 2 karakter"),
  pembimbingId: z.string().nullable().optional(),
});

export const updateHalaqahSchema = halaqahSchema.partial();

export type HalaqahInput = z.infer<typeof halaqahSchema>;
export type UpdateHalaqahInput = z.infer<typeof updateHalaqahSchema>;
