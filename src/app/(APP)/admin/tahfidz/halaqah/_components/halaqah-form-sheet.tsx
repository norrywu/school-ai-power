"use client";

import { useMemo } from "react";
import { TriggerSheet } from "@/components/sheet-trigger";
import { HALAQAH_FORM_DEFAULTS, halaqahFields } from "@/constants/halaqah-constant";
import { useCreateHalaqah, useUpdateHalaqah } from "@/hooks/use-halaqah";
import { useUsers } from "@/hooks/use-users";
import type { HalaqahWithPembimbing } from "@/services/halaqah-service";
import type { SelectOption } from "@/types/form";
import { halaqahSchema, type HalaqahInput } from "@/validations/halaqah-validation";

interface HalaqahFormSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  halaqahToEdit?: HalaqahWithPembimbing | null;
}

export function HalaqahFormSheet({
  open,
  onOpenChange,
  halaqahToEdit,
}: HalaqahFormSheetProps) {
  const { data: users = [] } = useUsers();
  const createHalaqah = useCreateHalaqah();
  const updateHalaqah = useUpdateHalaqah();
  const isEditing = Boolean(halaqahToEdit);

  // Hanya ambil user dengan role "teacher" untuk pilihan pembimbing
  const pembimbingOptions: SelectOption<string>[] = useMemo(
    () =>
      users
        .filter((u) => u.role === "teacher")
        .map((u) => ({
          value: u.id,
          label: `${u.name || u.email} (Pengajar)`,
        })),
    [users]
  );

  const defaultValues: HalaqahInput =
    isEditing && halaqahToEdit
      ? {
          nama: halaqahToEdit.nama,
          pembimbingId: halaqahToEdit.pembimbingId ?? null,
        }
      : HALAQAH_FORM_DEFAULTS;

  const handleSubmit = (data: HalaqahInput) => {
    if (isEditing && halaqahToEdit) {
      updateHalaqah.mutate(
        { halaqahId: halaqahToEdit.id, data },
        {
          onSuccess: () => onOpenChange(false),
        }
      );
    } else {
      createHalaqah.mutate(data, {
        onSuccess: () => onOpenChange(false),
      });
    }
  };

  const isPending = createHalaqah.isPending || updateHalaqah.isPending;

  return (
    <TriggerSheet<HalaqahInput>
      open={open}
      onOpenChange={onOpenChange}
      fields={halaqahFields(pembimbingOptions)}
      sheetTitle={isEditing ? "Ubah Data Halaqah" : "Tambah Halaqah Baru"}
      sheetDescription={
        isEditing
          ? "Ubah nama halaqah atau pembimbing ustadz."
          : "Isi data halaqah baru dan pilih pembimbing ustadz."
      }
      defaultValues={defaultValues}
      schema={halaqahSchema}
      onSubmit={handleSubmit}
      submitLabel={isEditing ? "Simpan Perubahan" : "Tambah Halaqah"}
      isPending={isPending}
    />
  );
}
