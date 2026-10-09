import type { SheetField } from "@/components/sheet-trigger";
import type { MataPelajaranInput } from "@/validations/mata-pelajaran-validation";

export const MATA_PELAJARAN_KEY = ["mata-pelajaran"] as const;

export const MATA_PELAJARAN_FORM_DEFAULTS: MataPelajaranInput = {
  nama: "",
  kode: "",
};

export function mataPelajaranFields(): SheetField<MataPelajaranInput>[] {
  return [
    {
      name: "kode",
      label: "Kode Mata Pelajaran",
      placeholder: "mis. FIQ-01, NHW-01",
      autoComplete: "off",
    },
    {
      name: "nama",
      label: "Nama Mata Pelajaran",
      placeholder: "mis. Fiqih, Nahwu",
      autoComplete: "off",
    },
  ];
}
