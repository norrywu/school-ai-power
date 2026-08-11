"use client";

import { ConfirmDeleteDialog } from "@/components/common/confirm-delete-dialog";
import { useDeleteHalaqah } from "@/hooks/use-halaqah";
import type { HalaqahWithPembimbing } from "@/services/halaqah-service";

interface DeleteHalaqahDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  halaqah: HalaqahWithPembimbing | null;
}

export function DeleteHalaqahDialog({
  open,
  onOpenChange,
  halaqah,
}: DeleteHalaqahDialogProps) {
  const deleteHalaqah = useDeleteHalaqah();

  if (!halaqah) return null;

  const handleDelete = () => {
    deleteHalaqah.mutate(halaqah.id, {
      onSuccess: () => onOpenChange(false),
    });
  };

  return (
    <ConfirmDeleteDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Hapus Data Halaqah"
      description={
        <>
          Apakah Anda yakin ingin menghapus data halaqah{" "}
          <span className="font-semibold text-foreground">{halaqah.nama}</span>?
          Tindakan ini tidak dapat dibatalkan.
        </>
      }
      onConfirm={handleDelete}
      isPending={deleteHalaqah.isPending}
      confirmLabel="Hapus Halaqah"
      pendingLabel="Menghapus..."
    />
  );
}
