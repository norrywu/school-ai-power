"use client";

import { useMemo, useState } from "react";
import { DataTableCard } from "@/components/common/data-table-card";
import type { MataPelajaran } from "@/db/mata-pelajaran-schema";
import { useMataPelajaran } from "@/hooks/use-mata-pelajaran";
import { getMataPelajaranColumns } from "./mata-pelajaran-columns";
import { MataPelajaranSkeleton } from "./mata-pelajaran-skeleton";
import { MataPelajaranFormSheet } from "./mata-pelajaran-form-sheet";
import { DeleteMataPelajaranDialog } from "./delete-mata-pelajaran-dialog";

export function MataPelajaranTable() {
  const { data: mapelList = [], isLoading, error } = useMataPelajaran();

  const [mapelToEdit, setMapelToEdit] = useState<MataPelajaran | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const [mapelToDelete, setMapelToDelete] = useState<MataPelajaran | null>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const handleEdit = (item: MataPelajaran) => {
    setMapelToEdit(item);
    setIsEditOpen(true);
  };

  const handleDelete = (item: MataPelajaran) => {
    setMapelToDelete(item);
    setIsDeleteOpen(true);
  };

  const columns = useMemo(
    () =>
      getMataPelajaranColumns({
        onEdit: handleEdit,
        onDelete: handleDelete,
      }),
    []
  );

  if (isLoading) {
    return <MataPelajaranSkeleton />;
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
      <DataTableCard<MataPelajaran>
        title="Daftar Mata Pelajaran"
        caption="Daftar seluruh mata pelajaran yang diajarkan."
        columns={columns}
        data={mapelList}
        rowKey={(item) => item.id}
        emptyMessage="Belum ada mata pelajaran yang terdaftar."
      />

      <MataPelajaranFormSheet
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
        mapelToEdit={mapelToEdit}
      />

      <DeleteMataPelajaranDialog
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        mapel={mapelToDelete}
      />
    </>
  );
}
