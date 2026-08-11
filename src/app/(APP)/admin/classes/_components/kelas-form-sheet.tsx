"use client";

import { TriggerSheet } from "@/components/sheet-trigger";
import { KELAS_FORM_DEFAULTS, kelasFields } from "@/constants/kelas-constant";
import type { Kelas } from "@/db/kelas-schema";
import { useCreateKelas, useUpdateKelas } from "@/hooks/use-kelas";
import { kelasSchema, type KelasInput } from "@/validations/kelas-validation";

interface KelasFormSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  kelasToEdit?: Kelas | null;
}

export function KelasFormSheet({
  open,
  onOpenChange,
  kelasToEdit,
}: KelasFormSheetProps) {
  const createKelas = useCreateKelas();
  const updateKelas = useUpdateKelas();
  const isEditing = Boolean(kelasToEdit);

  const defaultValues: KelasInput =
    isEditing && kelasToEdit
      ? {
          nama: kelasToEdit.nama,
          tingkat: kelasToEdit.tingkat,
        }
      : KELAS_FORM_DEFAULTS;

  const handleSubmit = (data: KelasInput) => {
    if (isEditing && kelasToEdit) {
      updateKelas.mutate(
        { kelasId: kelasToEdit.id, data },
        {
          onSuccess: () => onOpenChange(false),
        }
      );
    } else {
      createKelas.mutate(data, {
        onSuccess: () => onOpenChange(false),
      });
    }
  };

  const isPending = createKelas.isPending || updateKelas.isPending;

  return (
    <TriggerSheet<KelasInput>
      open={open}
      onOpenChange={onOpenChange}
      fields={kelasFields()}
      sheetTitle={isEditing ? "Ubah Data Kelas" : "Tambah Kelas Baru"}
      sheetDescription={
        isEditing
          ? "Ubah nama atau tingkat kelas."
          : "Isi data kelas baru di lingkungan Pondok Pesantren."
      }
      defaultValues={defaultValues}
      schema={kelasSchema}
      onSubmit={handleSubmit}
      submitLabel={isEditing ? "Simpan Perubahan" : "Tambah Kelas"}
      isPending={isPending}
    />
  );
}
