"use client";

import { DataTableCard } from "@/components/common/data-table-card";
import type { AuthUser } from "@/types/auth-type";
import { useUsers } from "@/hooks/use-users";
import { usersColumns } from "./users-columns";
import { UsersSkeleton } from "./users-skeleton";

export function UsersTable() {
  const { data: users = [], isLoading, error } = useUsers();

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
    <DataTableCard<AuthUser>
      title="Pengguna Sistem"
      caption="Daftar seluruh akun pengguna yang terdaftar di aplikasi."
      columns={usersColumns}
      data={users}
      rowKey={(user) => user.id}
      emptyMessage="Belum ada pengguna yang terdaftar."
    />
  );
}
