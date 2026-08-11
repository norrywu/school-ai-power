import type { SheetField } from "@/components/sheet-trigger";
import type { SelectOption } from "@/types/form";
import {
  JENIS_SETORAN_VALUES,
  type SetoranHafalanFormValues,
} from "@/validations/setoran-hafalan-validation";

export const SETORAN_HAFALAN_KEY = ["setoran-hafalan"];
export const SURAH_KEY = ["surah"];

export const JENIS_SETORAN_LABELS: Record<"ziyadah" | "murajaah", string> = {
  ziyadah: "Ziyadah (Hafalan Baru)",
  murajaah: "Muraja'ah (Pengulangan)",
};

export const JENIS_SETORAN_OPTIONS: SelectOption<"ziyadah" | "murajaah">[] =
  JENIS_SETORAN_VALUES.map((jenis) => ({
    value: jenis,
    label: JENIS_SETORAN_LABELS[jenis],
  }));

export const SETORAN_HAFALAN_FORM_DEFAULTS: SetoranHafalanFormValues = {
  santriId: "",
  halaqahId: null,
  tanggal: new Date().toISOString().split("T")[0],
  surahId: "",
  ayatMulai: 1,
  ayatSelesai: 1,
  jenis: "ziyadah",
  nilai: "A",
  catatan: "",
};

export function setoranHafalanFields(
  santriOptions: SelectOption<string>[] = [],
  halaqahOptions: SelectOption<string>[] = [],
  surahOptions: SelectOption<string>[] = []
): SheetField<SetoranHafalanFormValues>[] {
  return [
    {
      name: "santriId",
      label: "Santri",
      type: "select",
      placeholder: "Pilih santri",
      options: santriOptions,
    },
    {
      name: "halaqahId",
      label: "Halaqah Tahfidz",
      type: "select",
      placeholder: "Pilih halaqah (opsional)",
      options: halaqahOptions,
    },
    {
      name: "tanggal",
      label: "Tanggal Setoran",
      type: "date",
    },
    {
      name: "jenis",
      label: "Jenis Setoran",
      type: "select",
      placeholder: "Pilih jenis setoran",
      options: JENIS_SETORAN_OPTIONS,
    },
    {
      name: "surahId",
      label: "Surah",
      type: "select",
      placeholder: "Pilih surah Al-Qur'an",
      options: surahOptions,
    },
    {
      name: "ayatMulai",
      label: "Ayat Mulai",
      type: "number",
      placeholder: "mis. 1",
    },
    {
      name: "ayatSelesai",
      label: "Ayat Selesai",
      type: "number",
      placeholder: "mis. 10",
    },
    {
      name: "nilai",
      label: "Nilai / Kriteria",
      placeholder: "mis. A / Sangat Baik / 90",
      autoComplete: "off",
    },
    {
      name: "catatan",
      label: "Catatan Pembimbing",
      placeholder: "Catatan tajwid, makhraj, kelancaran (opsional)",
      autoComplete: "off",
    },
  ];
}
