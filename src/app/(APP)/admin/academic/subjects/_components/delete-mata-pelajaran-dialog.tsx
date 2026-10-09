"use client";

import { ConfirmDeleteDialog } from "@/components/common/confirm-delete-dialog";
import type { MataPelajaran } from "@/db/mata-pelajaran-schema";
import { useDeleteMataPelajaran } from "@/hooks/use-mata-pelajaran";

interface DeleteMataPelajaranDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mapel: MataPelajaran | null;
}

export function DeleteMataPelajaranDialog({
  open,
  onOpenChange,
  mapel,
}: DeleteMataPelajaranDialogProps) {
  const deleteMapel = useDeleteMataPelajaran();

  if (!mapel) return null;

  const handleDelete = () => {
    deleteMapel.mutate(mapel.id, {
      onSuccess: () => onOpenChange(false),
    });
  };

  return (
    <ConfirmDeleteDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Hapus Mata Pelajaran"
      description={
        <>
          Apakah Anda yakin ingin menghapus mata pelajaran{" "}
          <span className="font-semibold text-foreground">{mapel.nama} ({mapel.kode})</span>?
          Tindakan ini tidak dapat dibatalkan.
        </>
      }
      onConfirm={handleDelete}
      isPending={deleteMapel.isPending}
      confirmLabel="Hapus Mata Pelajaran"
      pendingLabel="Menghapus..."
    />
  );
}
