import type { SheetField } from "@/components/sheet-trigger";
import type { SelectOption } from "@/types/form";
import type { HalaqahInput } from "@/validations/halaqah-validation";

export const HALAQAH_KEY = ["halaqah"];

export const HALAQAH_FORM_DEFAULTS: HalaqahInput = {
  nama: "",
  pembimbingId: null,
};

export function halaqahFields(
  pembimbingOptions: SelectOption<string>[] = []
): SheetField<HalaqahInput>[] {
  return [
    {
      name: "nama",
      label: "Nama Halaqah",
      placeholder: "mis. Halaqah Abu Bakar / Tahfidz 1",
      autoComplete: "off",
    },
    {
      name: "pembimbingId",
      label: "Pembimbing / Ustadz",
      type: "select",
      placeholder: "Pilih pembimbing ustadz (opsional)",
      options: pembimbingOptions,
    },
  ];
}
