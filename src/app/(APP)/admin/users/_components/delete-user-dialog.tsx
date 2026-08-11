"use client";

import { ConfirmDeleteDialog } from "@/components/common/confirm-delete-dialog";
import { useDeleteUser } from "@/hooks/use-users";
import type { AuthUser } from "@/types/auth-type";

interface DeleteUserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: AuthUser | null;
}

export function DeleteUserDialog({
  open,
  onOpenChange,
  user,
}: DeleteUserDialogProps) {
  const deleteUser = useDeleteUser();

  if (!user) return null;

  const handleDelete = () => {
    deleteUser.mutate(user.id, {
      onSuccess: () => onOpenChange(false),
    });
  };

  return (
    <ConfirmDeleteDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Hapus Pengguna"
      description={
        <>
          Apakah Anda yakin ingin menghapus akun pengguna{" "}
          <span className="font-semibold text-foreground">
            {user.name || user.email}
          </span>
          ? Tindakan ini tidak dapat dibatalkan.
        </>
      }
      onConfirm={handleDelete}
      isPending={deleteUser.isPending}
      confirmLabel="Hapus Pengguna"
      pendingLabel="Menghapus..."
    />
  );
}
