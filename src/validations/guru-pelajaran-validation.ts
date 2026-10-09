import { z } from "zod";

export const guruPelajaranSchema = z.object({
  guruId: z.string().min(1, "Guru wajib dipilih"),
  mataPelajaranId: z.string().min(1, "Mata pelajaran wajib dipilih"),
});

export type GuruPelajaranInput = z.infer<typeof guruPelajaranSchema>;
