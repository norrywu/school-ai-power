"use client";

import { TriggerSheet } from "@/components/sheet-trigger";
import { SANTRI_FORM_DEFAULTS, santriFields } from "@/constants/santri-constant";
import type { Santri } from "@/db/santri-schema";
import { useCreateSantri, useUpdateSantri } from "@/hooks/use-santri";
import { santriSchema, type SantriInput } from "@/validations/santri-validation";

interface SantriFormSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  santriToEdit?: Santri | null;
}

export function SantriFormSheet({
  open,
  onOpenChange,
  santriToEdit,
}: SantriFormSheetProps) {
  const createSantri = useCreateSantri();
  const updateSantri = useUpdateSantri();
  const isEditing = Boolean(santriToEdit);

  const defaultValues: SantriInput =
    isEditing && santriToEdit
      ? {
          nama: santriToEdit.nama,
          jenisKelamin: santriToEdit.jenisKelamin,
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
      fields={santriFields()}
      sheetTitle={isEditing ? "Ubah Data Santri" : "Tambah Santri Baru"}
      sheetDescription={
        isEditing
          ? "Ubah data santri yang terdaftar."
          : "Isi data santri baru di lingkungan Pondok Pesantren."
      }
      defaultValues={defaultValues}
      schema={santriSchema}
      onSubmit={handleSubmit}
      submitLabel={isEditing ? "Simpan Perubahan" : "Tambah Santri"}
      isPending={isPending}
    />
  );
}
