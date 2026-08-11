"use client";

import { ConfirmDeleteDialog } from "@/components/common/confirm-delete-dialog";
import type { Kelas } from "@/db/kelas-schema";
import { useDeleteKelas } from "@/hooks/use-kelas";

interface DeleteKelasDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  kelas: Kelas | null;
}

export function DeleteKelasDialog({
  open,
  onOpenChange,
  kelas,
}: DeleteKelasDialogProps) {
  const deleteKelas = useDeleteKelas();

  if (!kelas) return null;

  const handleDelete = () => {
    deleteKelas.mutate(kelas.id, {
      onSuccess: () => onOpenChange(false),
    });
  };

  return (
    <ConfirmDeleteDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Hapus Data Kelas"
      description={
        <>
          Apakah Anda yakin ingin menghapus data kelas{" "}
          <span className="font-semibold text-foreground">{kelas.nama}</span>?
          Tindakan ini tidak dapat dibatalkan.
        </>
      }
      onConfirm={handleDelete}
      isPending={deleteKelas.isPending}
      confirmLabel="Hapus Kelas"
      pendingLabel="Menghapus..."
    />
  );
}
