"use client";

import { useMemo } from "react";
import { TriggerSheet, type SheetField } from "@/components/sheet-trigger";
import { useUsers } from "@/hooks/use-users";
import { useMataPelajaran } from "@/hooks/use-mata-pelajaran";
import { useAssignGuruPelajaran } from "@/hooks/use-guru-pelajaran";
import {
  guruPelajaranSchema,
  type GuruPelajaranInput,
} from "@/validations/guru-pelajaran-validation";

interface AssignGuruFormSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const DEFAULT_VALUES: GuruPelajaranInput = {
  guruId: "",
  mataPelajaranId: "",
};

export function AssignGuruFormSheet({
  open,
  onOpenChange,
}: AssignGuruFormSheetProps) {
  const { data: usersList = [] } = useUsers();
  const { data: mapelList = [] } = useMataPelajaran();
  const assignGuru = useAssignGuruPelajaran();

  // Filter pengajar (role teacher atau admin)
  const teacherOptions = useMemo(() => {
    return usersList
      .filter((u) => u.role === "teacher" || u.role === "admin")
      .map((u) => ({
        label: `${u.name} (${u.email})`,
        value: u.id,
      }));
  }, [usersList]);

  // Options mata pelajaran
  const mapelOptions = useMemo(() => {
    return mapelList.map((m) => ({
      label: `${m.nama} (${m.kode})`,
      value: m.id,
    }));
  }, [mapelList]);

  const fields: SheetField<GuruPelajaranInput>[] = [
    {
      name: "guruId",
      label: "Pilih Guru Pengajar",
      type: "select",
      placeholder: "Pilih guru...",
      options: teacherOptions,
    },
    {
      name: "mataPelajaranId",
      label: "Pilih Mata Pelajaran",
      type: "select",
      placeholder: "Pilih mata pelajaran...",
      options: mapelOptions,
    },
  ];

  const handleSubmit = (data: GuruPelajaranInput) => {
    assignGuru.mutate(data, {
      onSuccess: () => onOpenChange(false),
    });
  };

  return (
    <TriggerSheet<GuruPelajaranInput>
      open={open}
      onOpenChange={onOpenChange}
      fields={fields}
      sheetTitle="Tugaskan Guru ke Mata Pelajaran"
      sheetDescription="Pilih guru pengajar dan mata pelajaran yang akan diampu."
      defaultValues={DEFAULT_VALUES}
      schema={guruPelajaranSchema}
      onSubmit={handleSubmit}
      submitLabel="Tugaskan Guru"
      isPending={assignGuru.isPending}
    />
  );
}
