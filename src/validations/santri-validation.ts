import { z } from "zod";

export const JENIS_KELAMIN_VALUES = ["L", "P"] as const;

export const santriSchema = z.object({
  nama: z.string().min(2, "Nama minimal 2 karakter"),
  jenisKelamin: z.enum(JENIS_KELAMIN_VALUES),
});

export const updateSantriSchema = santriSchema.partial();

export type SantriInput = z.infer<typeof santriSchema>;
export type UpdateSantriInput = z.infer<typeof updateSantriSchema>;
