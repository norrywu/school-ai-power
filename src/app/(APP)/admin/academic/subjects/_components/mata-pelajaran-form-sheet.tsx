"use client";

import { TriggerSheet } from "@/components/sheet-trigger";
import {
  MATA_PELAJARAN_FORM_DEFAULTS,
  mataPelajaranFields,
} from "@/constants/mata-pelajaran-constant";
import type { MataPelajaran } from "@/db/mata-pelajaran-schema";
import {
  useCreateMataPelajaran,
  useUpdateMataPelajaran,
} from "@/hooks/use-mata-pelajaran";
import {
  mataPelajaranSchema,
  type MataPelajaranInput,
} from "@/validations/mata-pelajaran-validation";

interface MataPelajaranFormSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mapelToEdit?: MataPelajaran | null;
}

export function MataPelajaranFormSheet({
  open,
  onOpenChange,
  mapelToEdit,
}: MataPelajaranFormSheetProps) {
  const createMapel = useCreateMataPelajaran();
  const updateMapel = useUpdateMataPelajaran();
  const isEditing = Boolean(mapelToEdit);

  const defaultValues: MataPelajaranInput =
    isEditing && mapelToEdit
      ? {
          nama: mapelToEdit.nama,
          kode: mapelToEdit.kode,
        }
      : MATA_PELAJARAN_FORM_DEFAULTS;

  const handleSubmit = (data: MataPelajaranInput) => {
    if (isEditing && mapelToEdit) {
      updateMapel.mutate(
        { id: mapelToEdit.id, data },
        {
          onSuccess: () => onOpenChange(false),
        }
      );
    } else {
      createMapel.mutate(data, {
        onSuccess: () => onOpenChange(false),
      });
    }
  };

  const isPending = createMapel.isPending || updateMapel.isPending;

  return (
    <TriggerSheet<MataPelajaranInput>
      open={open}
      onOpenChange={onOpenChange}
      fields={mataPelajaranFields()}
      sheetTitle={isEditing ? "Ubah Mata Pelajaran" : "Tambah Mata Pelajaran Baru"}
      sheetDescription={
        isEditing
          ? "Ubah kode atau nama mata pelajaran."
          : "Isi data mata pelajaran baru."
      }
      defaultValues={defaultValues}
      schema={mataPelajaranSchema}
      onSubmit={handleSubmit}
      submitLabel={isEditing ? "Simpan Perubahan" : "Tambah Mata Pelajaran"}
      isPending={isPending}
    />
  );
}
