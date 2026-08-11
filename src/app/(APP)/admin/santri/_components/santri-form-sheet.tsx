"use client";

import { useMemo } from "react";
import { TriggerSheet } from "@/components/sheet-trigger";
import { SANTRI_FORM_DEFAULTS, santriFields } from "@/constants/santri-constant";
import { useCreateSantri, useUpdateSantri } from "@/hooks/use-santri";
import { useKelas } from "@/hooks/use-kelas";
import type { SantriWithKelas } from "@/services/santri-service";
import type { SelectOption } from "@/types/form";
import { santriSchema, type SantriInput } from "@/validations/santri-validation";

interface SantriFormSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  santriToEdit?: SantriWithKelas | null;
}

export function SantriFormSheet({
  open,
  onOpenChange,
  santriToEdit,
}: SantriFormSheetProps) {
  const { data: kelasList = [] } = useKelas();
  const createSantri = useCreateSantri();
  const updateSantri = useUpdateSantri();
  const isEditing = Boolean(santriToEdit);

  const kelasOptions: SelectOption<string>[] = useMemo(
    () =>
      kelasList.map((k) => ({
        value: k.id,
        label: `${k.nama} (${k.tingkat})`,
      })),
    [kelasList]
  );

  const defaultValues: SantriInput =
    isEditing && santriToEdit
      ? {
          nama: santriToEdit.nama,
          jenisKelamin: santriToEdit.jenisKelamin,
          kelasId: santriToEdit.kelasId ?? null,
        }
      : SANTRI_FORM_DEFAULTS;

  const handleSubmit = (data: SantriInput) => {
    if (isEditing && santriToEdit) {
      updateSantri.mutate(
        { santriId: santriToEdit.id, data },
        {
          onSuccess: () => onOpenChange(false),
        }
      );
    } else {
      createSantri.mutate(data, {
        onSuccess: () => onOpenChange(false),
      });
    }
  };

  const isPending = createSantri.isPending || updateSantri.isPending;

  return (
    <TriggerSheet<SantriInput>
      open={open}
      onOpenChange={onOpenChange}
      fields={santriFields(kelasOptions)}
      sheetTitle={isEditing ? "Ubah Data Santri" : "Tambah Santri Baru"}
      sheetDescription={
        isEditing
          ? "Ubah data santri atau kelas yang terdaftar."
          : "Isi data santri baru dan pilih kelas di lingkungan Pondok Pesantren."
      }
      defaultValues={defaultValues}
      schema={santriSchema}
      onSubmit={handleSubmit}
      submitLabel={isEditing ? "Simpan Perubahan" : "Tambah Santri"}
      isPending={isPending}
    />
  );
}
