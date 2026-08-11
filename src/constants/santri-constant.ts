import type { SheetField } from "@/components/sheet-trigger";
import type { SelectOption } from "@/types/form";
import { JENIS_KELAMIN_VALUES, type SantriInput } from "@/validations/santri-validation";

export const SANTRI_KEY = ["santri"];

export const JENIS_KELAMIN_LABELS: Record<"L" | "P", string> = {
  L: "Laki-laki",
  P: "Perempuan",
};

export const JENIS_KELAMIN_OPTIONS: SelectOption<"L" | "P">[] =
  JENIS_KELAMIN_VALUES.map((jk) => ({
    value: jk,
    label: JENIS_KELAMIN_LABELS[jk],
  }));

export const SANTRI_FORM_DEFAULTS: SantriInput = {
  nama: "",
  jenisKelamin: "L",
  kelasId: null,
};

export function santriFields(
  kelasOptions: SelectOption<string>[] = []
): SheetField<SantriInput>[] {
  return [
    {
      name: "nama",
      label: "Nama Santri",
      placeholder: "mis. Muhammad Abdullah",
      autoComplete: "off",
    },
    {
      name: "jenisKelamin",
      label: "Jenis Kelamin",
      type: "select",
      placeholder: "Pilih jenis kelamin",
      options: JENIS_KELAMIN_OPTIONS,
    },
    {
      name: "kelasId",
      label: "Kelas",
      type: "select",
      placeholder: "Pilih kelas (opsional)",
      options: kelasOptions,
    },
  ];
}
