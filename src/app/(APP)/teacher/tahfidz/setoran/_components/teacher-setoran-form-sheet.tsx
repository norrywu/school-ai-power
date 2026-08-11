"use client";

import { useMemo } from "react";
import { toast } from "sonner";
import { TriggerSheet } from "@/components/sheet-trigger";
import {
  SETORAN_HAFALAN_FORM_DEFAULTS,
  setoranHafalanFields,
} from "@/constants/setoran-hafalan-constant";
import {
  useCreateSetoranHafalan,
  useUpdateSetoranHafalan,
} from "@/hooks/use-setoran-hafalan";
import { useTeacherSantri, useTeacherHalaqah, TEACHER_KEYS } from "@/hooks/use-teacher-tahfidz";
import { useSurah } from "@/hooks/use-surah";
import { useQueryClient } from "@tanstack/react-query";
import type { SetoranHafalanWithRelations } from "@/services/setoran-hafalan-service";
import type { SelectOption } from "@/types/form";
import {
  setoranHafalanSchema,
  type SetoranHafalanFormValues,
  type SetoranHafalanInput,
} from "@/validations/setoran-hafalan-validation";

interface TeacherSetoranFormSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  setoranToEdit?: SetoranHafalanWithRelations | null;
}

export function TeacherSetoranFormSheet({
  open,
  onOpenChange,
  setoranToEdit,
}: TeacherSetoranFormSheetProps) {
  const queryClient = useQueryClient();
  const { data: santriList = [] } = useTeacherSantri();
  const { data: halaqahList = [] } = useTeacherHalaqah();
  const { data: surahList = [] } = useSurah();

  const createSetoran = useCreateSetoranHafalan();
  const updateSetoran = useUpdateSetoranHafalan();
  const isEditing = Boolean(setoranToEdit);

  const santriOptions: SelectOption<string>[] = useMemo(
    () =>
      santriList.map((s) => ({
        value: s.id,
        label: s.kelasNama ? `${s.nama} (${s.kelasNama})` : s.nama,
      })),
    [santriList]
  );

  const halaqahOptions: SelectOption<string>[] = useMemo(
    () =>
      halaqahList.map((h) => ({
        value: h.id,
        label: h.nama,
      })),
    [halaqahList]
  );

  const surahOptions: SelectOption<string>[] = useMemo(
    () =>
      surahList.map((s) => ({
        value: s.id,
        label: `${s.nomor}. ${s.nama} (${s.jumlahAyat} ayat)`,
      })),
    [surahList]
  );

  const defaultValues: SetoranHafalanFormValues =
    isEditing && setoranToEdit
      ? {
          santriId: setoranToEdit.santriId,
          halaqahId: setoranToEdit.halaqahId ?? null,
          tanggal: new Date(setoranToEdit.tanggal).toISOString().split("T")[0],
          surahId: setoranToEdit.surahId,
          ayatMulai: setoranToEdit.ayatMulai,
          ayatSelesai: setoranToEdit.ayatSelesai,
          jenis: setoranToEdit.jenis,
          nilai: setoranToEdit.nilai ?? "",
          catatan: setoranToEdit.catatan ?? "",
        }
      : {
          ...SETORAN_HAFALAN_FORM_DEFAULTS,
          halaqahId: halaqahList[0]?.id ?? null,
        };

  const handleSubmit = (data: SetoranHafalanInput) => {
    const selectedSurah = surahList.find((s) => s.id === data.surahId);
    if (selectedSurah) {
      if (data.ayatMulai > selectedSurah.jumlahAyat) {
        toast.error(
          `Ayat mulai (${data.ayatMulai}) tidak boleh melebihi total ayat Surah ${selectedSurah.nama} (${selectedSurah.jumlahAyat} ayat).`
        );
        return;
      }
      if (data.ayatSelesai > selectedSurah.jumlahAyat) {
        toast.error(
          `Ayat selesai (${data.ayatSelesai}) tidak boleh melebihi total ayat Surah ${selectedSurah.nama} (${selectedSurah.jumlahAyat} ayat).`
        );
        return;
      }
    }

    if (isEditing && setoranToEdit) {
      updateSetoran.mutate(
        { setoranId: setoranToEdit.id, data },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: TEACHER_KEYS.SETORAN });
            onOpenChange(false);
          },
        }
      );
    } else {
      createSetoran.mutate(data, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: TEACHER_KEYS.SETORAN });
          onOpenChange(false);
        },
      });
    }
  };

  const isPending = createSetoran.isPending || updateSetoran.isPending;

  return (
    <TriggerSheet<SetoranHafalanFormValues, SetoranHafalanInput>
      open={open}
      onOpenChange={onOpenChange}
      fields={setoranHafalanFields(santriOptions, halaqahOptions, surahOptions)}
      sheetTitle={isEditing ? "Ubah Setoran Hafalan" : "Input Setoran Hafalan Baru"}
      sheetDescription={
        isEditing
          ? "Ubah rincian data setoran hafalan santri bimbingan Anda."
          : "Isi data setoran hafalan baru untuk santri bimbingan Anda (ziyadah / murajaah)."
      }
      defaultValues={defaultValues}
      schema={setoranHafalanSchema}
      onSubmit={handleSubmit}
      submitLabel={isEditing ? "Simpan Perubahan" : "Simpan Setoran"}
      isPending={isPending}
    />
  );
}
