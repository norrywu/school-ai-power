import { z } from "zod";

export const kelasSchema = z.object({
  nama: z.string().min(2, "Nama kelas minimal 2 karakter"),
  tingkat: z.string().min(1, "Tingkat kelas wajib diisi"),
});

export const updateKelasSchema = kelasSchema.partial();

export type KelasInput = z.infer<typeof kelasSchema>;
export type UpdateKelasInput = z.infer<typeof updateKelasSchema>;
