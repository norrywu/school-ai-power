"use client";

import { ConfirmDeleteDialog } from "@/components/common/confirm-delete-dialog";
import { useDeleteSetoranHafalan } from "@/hooks/use-setoran-hafalan";
import type { SetoranHafalanWithRelations } from "@/services/setoran-hafalan-service";

interface DeleteSetoranHafalanDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  setoran: SetoranHafalanWithRelations | null;
}

export function DeleteSetoranHafalanDialog({
  open,
  onOpenChange,
  setoran,
}: DeleteSetoranHafalanDialogProps) {
  const deleteSetoran = useDeleteSetoranHafalan();

  if (!setoran) return null;

  const handleDelete = () => {
    deleteSetoran.mutate(setoran.id, {
      onSuccess: () => onOpenChange(false),
    });
  };

  return (
    <ConfirmDeleteDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Hapus Data Setoran Hafalan"
      description={
        <>
          Apakah Anda yakin ingin menghapus catatan setoran hafalan santri{" "}
          <span className="font-semibold text-foreground">
            {setoran.santriNama || "Santri"}
          </span>{" "}
          ({setoran.surahNama} ayat {setoran.ayatMulai}-{setoran.ayatSelesai})?
          Tindakan ini tidak dapat dibatalkan.
        </>
      }
      onConfirm={handleDelete}
      isPending={deleteSetoran.isPending}
      confirmLabel="Hapus Setoran"
      pendingLabel="Menghapus..."
    />
  );
}
