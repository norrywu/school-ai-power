"use client";

import { useMemo, useState } from "react";
import { DataTableCard } from "@/components/common/data-table-card";
import { useSantri } from "@/hooks/use-santri";
import type { SantriWithRelations } from "@/services/santri-service";
import { getSantriColumns } from "./santri-columns";
import { SantriSkeleton } from "./santri-skeleton";
import { SantriFormSheet } from "./santri-form-sheet";
import { DeleteSantriDialog } from "./delete-santri-dialog";

export function SantriTable() {
  const { data: santriList = [], isLoading, error } = useSantri();

  const [santriToEdit, setSantriToEdit] = useState<SantriWithRelations | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const [santriToDelete, setSantriToDelete] = useState<SantriWithRelations | null>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const handleEdit = (santri: SantriWithRelations) => {
    setSantriToEdit(santri);
    setIsEditOpen(true);
  };

  const handleDelete = (santri: SantriWithRelations) => {
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
      <DataTableCard<SantriWithRelations>
        title="Daftar Santri"
        caption="Daftar seluruh santri, penempatan kelas, dan halaqah di Pondok Pesantren."
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
