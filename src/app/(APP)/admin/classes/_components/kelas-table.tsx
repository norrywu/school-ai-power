"use client";

import { useMemo, useState } from "react";
import { DataTableCard } from "@/components/common/data-table-card";
import type { Kelas } from "@/db/kelas-schema";
import { useKelas } from "@/hooks/use-kelas";
import { getKelasColumns } from "./kelas-columns";
import { KelasSkeleton } from "./kelas-skeleton";
import { KelasFormSheet } from "./kelas-form-sheet";
import { DeleteKelasDialog } from "./delete-kelas-dialog";

export function KelasTable() {
  const { data: kelasList = [], isLoading, error } = useKelas();

  const [kelasToEdit, setKelasToEdit] = useState<Kelas | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const [kelasToDelete, setKelasToDelete] = useState<Kelas | null>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const handleEdit = (item: Kelas) => {
    setKelasToEdit(item);
    setIsEditOpen(true);
  };

  const handleDelete = (item: Kelas) => {
    setKelasToDelete(item);
    setIsDeleteOpen(true);
  };

  const columns = useMemo(
    () =>
      getKelasColumns({
        onEdit: handleEdit,
        onDelete: handleDelete,
      }),
    []
  );

  if (isLoading) {
    return <KelasSkeleton />;
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
      <DataTableCard<Kelas>
        title="Daftar Kelas"
        caption="Daftar seluruh kelas dan tingkat di Pondok Pesantren."
        columns={columns}
        data={kelasList}
        rowKey={(item) => item.id}
        emptyMessage="Belum ada data kelas yang terdaftar."
      />

      <KelasFormSheet
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
        kelasToEdit={kelasToEdit}
      />

      <DeleteKelasDialog
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        kelas={kelasToDelete}
      />
    </>
  );
}
