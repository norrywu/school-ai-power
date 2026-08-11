"use client";

import { useMemo, useState } from "react";
import { DataTableCard } from "@/components/common/data-table-card";
import { useHalaqah } from "@/hooks/use-halaqah";
import type { HalaqahWithPembimbing } from "@/services/halaqah-service";
import { getHalaqahColumns } from "./halaqah-columns";
import { HalaqahSkeleton } from "./halaqah-skeleton";
import { HalaqahFormSheet } from "./halaqah-form-sheet";
import { DeleteHalaqahDialog } from "./delete-halaqah-dialog";

export function HalaqahTable() {
  const { data: halaqahList = [], isLoading, error } = useHalaqah();

  const [halaqahToEdit, setHalaqahToEdit] = useState<HalaqahWithPembimbing | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const [halaqahToDelete, setHalaqahToDelete] = useState<HalaqahWithPembimbing | null>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const handleEdit = (item: HalaqahWithPembimbing) => {
    setHalaqahToEdit(item);
    setIsEditOpen(true);
  };

  const handleDelete = (item: HalaqahWithPembimbing) => {
    setHalaqahToDelete(item);
    setIsDeleteOpen(true);
  };

  const columns = useMemo(
    () =>
      getHalaqahColumns({
        onEdit: handleEdit,
        onDelete: handleDelete,
      }),
    []
  );

  if (isLoading) {
    return <HalaqahSkeleton />;
  }

  if (error) {
    return (
      <div className="p-4 text-center text-destructive">
        {(error as Error).message}
      </div>
    );
  }

  return (
    <>
      <DataTableCard<HalaqahWithPembimbing>
        title="Daftar Halaqah Tahfidz"
        caption="Daftar seluruh kelompok halaqah tahfidz dan pembimbing ustadz di Pondok Pesantren."
        columns={columns}
        data={halaqahList}
        rowKey={(item) => item.id}
        emptyMessage="Belum ada data halaqah yang terdaftar."
      />

      <HalaqahFormSheet
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
        halaqahToEdit={halaqahToEdit}
      />

      <DeleteHalaqahDialog
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        halaqah={halaqahToDelete}
      />
    </>
  );
}
