"use client";

import { ConfirmDeleteDialog } from "@/components/common/confirm-delete-dialog";
import { useDeleteSantri } from "@/hooks/use-santri";
import type { SantriWithRelations } from "@/services/santri-service";

interface DeleteSantriDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  santri: SantriWithRelations | null;
}

export function DeleteSantriDialog({
  open,
  onOpenChange,
  santri,
}: DeleteSantriDialogProps) {
  const deleteSantri = useDeleteSantri();

  if (!santri) return null;

  const handleDelete = () => {
    deleteSantri.mutate(santri.id, {
      onSuccess: () => onOpenChange(false),
    });
  };

  return (
    <ConfirmDeleteDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Hapus Data Santri"
      description={
        <>
          Apakah Anda yakin ingin menghapus data santri{" "}
          <span className="font-semibold text-foreground">{santri.nama}</span>?
          Tindakan ini tidak dapat dibatalkan.
        </>
      }
      onConfirm={handleDelete}
      isPending={deleteSantri.isPending}
      confirmLabel="Hapus Santri"
      pendingLabel="Menghapus..."
    />
  );
}
