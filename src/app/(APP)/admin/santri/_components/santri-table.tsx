"use client";

import { useMemo, useState } from "react";
import { DataTableCard } from "@/components/common/data-table-card";
import type { Santri } from "@/db/santri-schema";
import { useSantri } from "@/hooks/use-santri";
import { getSantriColumns } from "./santri-columns";
import { SantriSkeleton } from "./santri-skeleton";
import { SantriFormSheet } from "./santri-form-sheet";
import { DeleteSantriDialog } from "./delete-santri-dialog";

export function SantriTable() {
  const { data: santriList = [], isLoading, error } = useSantri();

  const [santriToEdit, setSantriToEdit] = useState<Santri | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const [santriToDelete, setSantriToDelete] = useState<Santri | null>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const handleEdit = (santri: Santri) => {
    setSantriToEdit(santri);
    setIsEditOpen(true);
  };

  const handleDelete = (santri: Santri) => {
    setSantriToDelete(santri);
    setIsDeleteOpen(true);
  };

  const columns = useMemo(
    () =>
      getSantriColumns({
        onEdit: handleEdit,
        onDelete: handleDelete,
      }),
    []
  );

  if (isLoading) {
    return <SantriSkeleton />;
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
      <DataTableCard<Santri>
        title="Daftar Santri"
        caption="Daftar seluruh santri yang terdaftar di Pondok Pesantren."
        columns={columns}
        data={santriList}
        rowKey={(santri) => santri.id}
        emptyMessage="Belum ada data santri yang terdaftar."
      />

      <SantriFormSheet
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
        santriToEdit={santriToEdit}
      />

      <DeleteSantriDialog
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        santri={santriToDelete}
      />
    </>
  );
}
