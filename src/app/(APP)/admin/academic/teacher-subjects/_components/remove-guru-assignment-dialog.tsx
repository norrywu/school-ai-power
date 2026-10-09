"use client";

import { ConfirmDeleteDialog } from "@/components/common/confirm-delete-dialog";
import type { GuruPelajaranItem } from "@/services/guru-pelajaran-service";
import { useRemoveGuruPelajaran } from "@/hooks/use-guru-pelajaran";

interface RemoveGuruAssignmentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  assignment: GuruPelajaranItem | null;
}

export function RemoveGuruAssignmentDialog({
  open,
  onOpenChange,
  assignment,
}: RemoveGuruAssignmentDialogProps) {
  const removeAssignment = useRemoveGuruPelajaran();

  if (!assignment) return null;

  const handleConfirm = () => {
    removeAssignment.mutate(assignment.id, {
      onSuccess: () => onOpenChange(false),
    });
  };

  return (
    <ConfirmDeleteDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Hapus Penugasan Guru"
      description={
        <>
          Apakah Anda yakin ingin menghapus penugasan{" "}
          <span className="font-semibold text-foreground">
            {assignment.guruName}
          </span>{" "}
          dari mata pelajaran{" "}
          <span className="font-semibold text-foreground">
            {assignment.mataPelajaranNama}
          </span>
          ?
        </>
      }
      onConfirm={handleConfirm}
      isPending={removeAssignment.isPending}
      confirmLabel="Hapus Penugasan"
      pendingLabel="Menghapus..."
    />
  );
}
