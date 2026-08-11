"use client";

import { useMemo, useState } from "react";
import { DataTableCard } from "@/components/common/data-table-card";
import type { AuthUser } from "@/types/auth-type";
import { useUsers } from "@/hooks/use-users";
import { getUsersColumns } from "./users-columns";
import { UsersSkeleton } from "./users-skeleton";
import { UserFormSheet } from "./user-form-sheet";
import { DeleteUserDialog } from "./delete-user-dialog";

export function UsersTable() {
  const { data: users = [], isLoading, error } = useUsers();

  const [userToEdit, setUserToEdit] = useState<AuthUser | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const [userToDelete, setUserToDelete] = useState<AuthUser | null>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const handleEdit = (user: AuthUser) => {
    setUserToEdit(user);
    setIsEditOpen(true);
  };

  const handleDelete = (user: AuthUser) => {
    setUserToDelete(user);
    setIsDeleteOpen(true);
  };

  const columns = useMemo(
    () =>
      getUsersColumns({
        onEdit: handleEdit,
        onDelete: handleDelete,
      }),
    []
  );

  if (isLoading) {
    return <UsersSkeleton />;
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
      <DataTableCard<AuthUser>
        title="Pengguna Sistem"
        caption="Daftar seluruh akun pengguna yang terdaftar di aplikasi."
        columns={columns}
        data={users}
        rowKey={(user) => user.id}
        emptyMessage="Belum ada pengguna yang terdaftar."
      />

      <UserFormSheet
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
        userToEdit={userToEdit}
      />

      <DeleteUserDialog
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        user={userToDelete}
      />
    </>
  );
}
