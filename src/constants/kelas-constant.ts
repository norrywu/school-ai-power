import type { SheetField } from "@/components/sheet-trigger";
import type { KelasInput } from "@/validations/kelas-validation";

export const KELAS_KEY = ["kelas"];

export const KELAS_FORM_DEFAULTS: KelasInput = {
  nama: "",
  tingkat: "",
};

export function kelasFields(): SheetField<KelasInput>[] {
  return [
    {
      name: "nama",
      label: "Nama Kelas",
      placeholder: "mis. VII A / Ula 1",
      autoComplete: "off",
    },
    {
      name: "tingkat",
      label: "Tingkat",
      placeholder: "mis. 7 / Wustho",
      autoComplete: "off",
    },
  ];
}
