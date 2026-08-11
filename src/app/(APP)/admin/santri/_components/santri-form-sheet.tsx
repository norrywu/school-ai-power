"use client";

import { useMemo } from "react";
import { TriggerSheet } from "@/components/sheet-trigger";
import { SANTRI_FORM_DEFAULTS, santriFields } from "@/constants/santri-constant";
import { useCreateSantri, useUpdateSantri } from "@/hooks/use-santri";
import { useKelas } from "@/hooks/use-kelas";
import { useHalaqah } from "@/hooks/use-halaqah";
import type { SantriWithRelations } from "@/services/santri-service";
import type { SelectOption } from "@/types/form";
import { santriSchema, type SantriInput } from "@/validations/santri-validation";

interface SantriFormSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  santriToEdit?: SantriWithRelations | null;
}

export function SantriFormSheet({
  open,
  onOpenChange,
  santriToEdit,
}: SantriFormSheetProps) {
  const { data: kelasList = [] } = useKelas();
  const { data: halaqahList = [] } = useHalaqah();
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

  const halaqahOptions: SelectOption<string>[] = useMemo(
    () =>
      halaqahList.map((h) => ({
        value: h.id,
        label: h.pembimbingNama
          ? `${h.nama} (Ustd. ${h.pembimbingNama})`
          : h.nama,
      })),
    [halaqahList]
  );

  const defaultValues: SantriInput =
    isEditing && santriToEdit
      ? {
          nama: santriToEdit.nama,
          jenisKelamin: santriToEdit.jenisKelamin,
          kelasId: santriToEdit.kelasId ?? null,
          halaqahId: santriToEdit.halaqahId ?? null,
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
      fields={santriFields(kelasOptions, halaqahOptions)}
      sheetTitle={isEditing ? "Ubah Data Santri" : "Tambah Santri Baru"}
      sheetDescription={
        isEditing
          ? "Ubah data santri, kelas, atau halaqah yang terdaftar."
          : "Isi data santri baru, pilih kelas dan halaqah di lingkungan Pondok Pesantren."
      }
      defaultValues={defaultValues}
      schema={santriSchema}
      onSubmit={handleSubmit}
      submitLabel={isEditing ? "Simpan Perubahan" : "Tambah Santri"}
      isPending={isPending}
    />
  );
}
