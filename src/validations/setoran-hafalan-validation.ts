import { z } from "zod";

export const JENIS_SETORAN_VALUES = ["ziyadah", "murajaah"] as const;

export const setoranHafalanBaseSchema = z.object({
  santriId: z.string().min(1, "Santri wajib dipilih"),
  halaqahId: z.string().nullable().optional(),
  tanggal: z.string().min(1, "Tanggal wajib diisi"),
  surahId: z.string().min(1, "Surah wajib dipilih"),
  ayatMulai: z.coerce
    .number({ message: "Ayat mulai harus berupa angka" })
    .min(1, "Ayat mulai minimal 1"),
  ayatSelesai: z.coerce
    .number({ message: "Ayat selesai harus berupa angka" })
    .min(1, "Ayat selesai minimal 1"),
  jenis: z.enum(JENIS_SETORAN_VALUES),
  nilai: z.string().nullable().optional(),
  catatan: z.string().nullable().optional(),
});

export const setoranHafalanSchema = setoranHafalanBaseSchema.refine(
  (data) => data.ayatSelesai >= data.ayatMulai,
  {
    message: "Ayat selesai tidak boleh lebih kecil dari ayat mulai",
    path: ["ayatSelesai"],
  }
);

export const updateSetoranHafalanSchema = setoranHafalanBaseSchema.partial();

export type SetoranHafalanFormValues = z.input<typeof setoranHafalanBaseSchema>;
export type SetoranHafalanInput = z.infer<typeof setoranHafalanSchema>;
export type UpdateSetoranHafalanInput = z.infer<typeof updateSetoranHafalanSchema>;
