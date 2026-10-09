import { z } from "zod";

export const mataPelajaranSchema = z.object({
  nama: z.string().min(2, "Nama mata pelajaran minimal 2 karakter"),
  kode: z.string().min(2, "Kode mata pelajaran minimal 2 karakter"),
});

export const updateMataPelajaranSchema = mataPelajaranSchema.partial();

export type MataPelajaranInput = z.infer<typeof mataPelajaranSchema>;
export type UpdateMataPelajaranInput = z.infer<typeof updateMataPelajaranSchema>;
